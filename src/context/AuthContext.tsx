import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db, googleProvider, signInWithPopup, signOut, handleFirestoreError, OperationType } from '../lib/firebase';

export interface UserProfile {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  purchasedProductIds: string[];
  savedProductIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StoredEnquiry {
  id: string;
  userId: string;
  userEmail?: string;
  message: string;
  sender: 'user' | 'agent';
  timestamp: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  syncPurchasedProducts: (productIds: string[]) => Promise<void>;
  syncSavedProducts: (productIds: string[]) => Promise<void>;
  saveCustomerEnquiry: (enquiry: { id: string; message: string; sender: 'user' | 'agent'; timestamp?: string }) => Promise<void>;
  fetchCustomerEnquiries: () => Promise<StoredEnquiry[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadOrCreateUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadOrCreateUserProfile = async (firebaseUser: User) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setUserProfile(data);
      } else {
        // Create initial profile in Firestore
        const newProfile: UserProfile = {
          userId: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'Customer',
          photoURL: firebaseUser.photoURL || '',
          purchasedProductIds: [],
          savedProductIds: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, newProfile);
        setUserProfile(newProfile);
      }
    } catch (error) {
      console.error('Error in loadOrCreateUserProfile:', error);
      // Provide local fallback profile so user interface remains active
      setUserProfile({
        userId: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'Customer',
        photoURL: firebaseUser.photoURL || '',
        purchasedProductIds: [],
        savedProductIds: []
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await loadOrCreateUserProfile(result.user);
      }
    } catch (error: any) {
      if (
        error?.code === 'auth/popup-closed-by-user' ||
        error?.code === 'auth/cancelled-popup-request' ||
        error?.code === 'auth/popup-blocked'
      ) {
        console.info('Google Sign-In popup closed or cancelled by user.');
        return;
      }
      console.error('Sign in with Google error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const syncPurchasedProducts = async (productIds: string[]) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      const currentIds = userProfile?.purchasedProductIds || [];
      const merged = Array.from(new Set([...currentIds, ...productIds]));
      await updateDoc(userDocRef, {
        purchasedProductIds: merged,
        updatedAt: new Date().toISOString()
      });
      setUserProfile(prev => prev ? { ...prev, purchasedProductIds: merged } : null);
    } catch (error) {
      console.error('Failed to sync purchased products:', error);
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const syncSavedProducts = async (productIds: string[]) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        savedProductIds: productIds,
        updatedAt: new Date().toISOString()
      });
      setUserProfile(prev => prev ? { ...prev, savedProductIds: productIds } : null);
    } catch (error) {
      console.error('Failed to sync saved products:', error);
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const saveCustomerEnquiry = async (enquiry: {
    id: string;
    message: string;
    sender: 'user' | 'agent';
    timestamp?: string;
  }) => {
    if (!user) return;
    const enquiryDocRef = doc(db, 'users', user.uid, 'enquiries', enquiry.id);
    const payload: StoredEnquiry = {
      id: enquiry.id,
      userId: user.uid,
      userEmail: user.email || '',
      message: enquiry.message,
      sender: enquiry.sender,
      timestamp: enquiry.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(enquiryDocRef, payload);
    } catch (error) {
      console.error('Failed to save customer enquiry to Firestore:', error);
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/enquiries/${enquiry.id}`);
    }
  };

  const fetchCustomerEnquiries = async (): Promise<StoredEnquiry[]> => {
    if (!user) return [];
    const enquiriesRef = collection(db, 'users', user.uid, 'enquiries');
    try {
      const q = query(enquiriesRef, orderBy('createdAt', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => d.data() as StoredEnquiry);
    } catch (error) {
      console.warn('Could not fetch customer enquiries from Firestore:', error);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        logout,
        syncPurchasedProducts,
        syncSavedProducts,
        saveCustomerEnquiry,
        fetchCustomerEnquiries
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
