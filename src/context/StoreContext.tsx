import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  Product,
  CartItem,
  Order,
  Coupon,
  CustomerReview,
  NewsletterSubscriber,
  ProductCategory,
  StoreSettings
} from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { REVIEWS } from '../data/reviews';
import { downloadProductFile } from '../utils/fileDownloader';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Lumina Digital',
  tagline: 'Digital Products That Help You Learn, Create & Grow',
  supportEmail: 'support@luminadigital.com',
  creatorHandle: '@nikhil0556__',
  announcementText: 'Special Launch Offer: Use code LUMINA20 for 20% off all digital assets!',
  enableAnnouncementBar: true,
  activeCouponCode: 'LUMINA20',
  activeCouponDiscount: 20,
  defaultCurrency: 'USD',
  enableInstantFulfillment: true,
  enableSocialProofToasts: true,
  enableExitIntentModal: true,
  taxRatePercent: 0,
  testMode: false,
  paymentGateways: {
    card: true,
    paypal: true,
    razorpay: true,
    applePay: true
  },
  accentTheme: 'indigo'
};

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation & View
  activePage: string;
  setActivePage: (page: string) => void;
  selectedProductSlug: string | null;
  navigateToProduct: (slug: string) => void;
  selectedOrderId: string | null;
  navigateToOrder: (orderId: string) => void;
  activeCategoryFilter: string;
  setActiveCategoryFilter: (cat: string) => void;
  policyTab: 'privacy' | 'terms' | 'refund';
  setPolicyTab: (tab: 'privacy' | 'terms' | 'refund') => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  discountAmount: number;
  finalTotal: number;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (customerData: {
    customerEmail: string;
    customerName: string;
    paymentMethod: 'card' | 'paypal' | 'razorpay' | 'apple_pay';
  }) => Order;
  downloadItem: (product: Product, orderNumber?: string) => void;

  // Reviews
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;

  // Newsletter
  subscribers: NewsletterSubscriber[];
  subscribeNewsletter: (email: string, source?: string) => { success: boolean; message: string };

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Modals
  sampleModalProduct: Product | null;
  openSampleModal: (product: Product) => void;
  closeSampleModal: () => void;

  promptModalProduct: Product | null;
  openPromptModal: (product: Product) => void;
  closePromptModal: () => void;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  setCurrency: (c: 'USD' | 'EUR' | 'GBP' | 'INR') => void;
  formatPrice: (amount: number) => string;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Store Settings & Operations
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetSettingsToDefault: () => void;
  clearOrders: () => void;
  exportStoreBackup: () => void;
  importStoreBackup: (jsonData: string) => { success: boolean; message: string };
  newsletterSubscribers: NewsletterSubscriber[];

  // Data Fetching & Skeleton Loading States
  isLoadingProducts: boolean;
  setIsLoadingProducts: (loading: boolean) => void;
  isLoadingProductDetail: boolean;
  setIsLoadingProductDetail: (loading: boolean) => void;
  simulateDataFetch: (durationMs?: number) => Promise<void>;
}

const DEFAULT_COUPONS: Coupon[] = [
  {
    code: 'LUMINA20',
    discountType: 'percentage',
    value: 20,
    description: '20% off entire store for Gen Z creators',
    usageCount: 142
  },
  {
    code: 'WELCOME10',
    discountType: 'fixed',
    value: 10,
    minOrderAmount: 25,
    description: '$10 off orders over $25',
    usageCount: 89
  },
  {
    code: 'GENZ30',
    discountType: 'percentage',
    value: 30,
    description: '30% student & young professional launch discount',
    usageCount: 265
  },
  {
    code: 'CREATOR15',
    discountType: 'percentage',
    value: 15,
    description: '15% creator welcome perk',
    usageCount: 54
  }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All Products');
  const [policyTab, setPolicyTab] = useState<'privacy' | 'terms' | 'refund'>('privacy');

  // Modals
  const [sampleModalProduct, setSampleModalProduct] = useState<Product | null>(null);
  const [promptModalProduct, setPromptModalProduct] = useState<Product | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Data Fetching & Loading States
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [isLoadingProductDetail, setIsLoadingProductDetail] = useState<boolean>(false);

  const simulateDataFetch = (durationMs = 600): Promise<void> => {
    setIsLoadingProducts(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsLoadingProducts(false);
        resolve();
      }, durationMs);
    });
  };

  // Save products on change
  useEffect(() => {
    localStorage.setItem('lumina_products', JSON.stringify(products));
  }, [products]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_coupons');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Seed initial order for preview demonstration
    return [
      {
        id: 'ord-sample-01',
        orderNumber: 'LUM-94821',
        customerEmail: 'alex.creator@example.com',
        customerName: 'Alex Rivera',
        items: [
          {
            productId: 'prod-fin-free',
            title: 'How to Be Financially Free at a Young Age',
            price: 24,
            format: 'PDF',
            downloadFilename: 'How-To-Be-Financially-Free-Young-Age-Lumina.pdf'
          },
          {
            productId: 'prod-ai-mega',
            title: 'The Ultimate AI Creator & Business Mega-Pack',
            price: 29,
            format: 'Prompt Vault (JSON/TXT)',
            downloadFilename: 'AI-Creator-Business-MegaPack-Vault.zip'
          }
        ],
        subtotal: 53,
        discountAmount: 10.6,
        total: 42.4,
        couponCode: 'LUMINA20',
        paymentMethod: 'card',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        accessToken: 'sec_tok_99182a7f82',
        downloadCount: 3
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
  }, [orders]);

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Reviews State
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('lumina_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Newsletter Subscribers State
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_subscribers');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      { email: 'creator.jordan@example.com', date: '2026-09-10', source: 'Homepage Exit Modal' },
      { email: 'sarah.student@university.edu', date: '2026-09-12', source: 'Free Prompt Starter Kit' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('lumina_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'INR'>('USD');

  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
    INR: { symbol: '₹', rate: 83.5 }
  };

  const formatPrice = (amount: number): string => {
    const info = currencyRates[currency] || currencyRates.USD;
    const converted = amount * info.rate;
    if (currency === 'INR') {
      return `${info.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${info.symbol}${converted.toFixed(2)}`;
  };

  // Toast System
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Store Settings State
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('lumina_store_settings');
      if (saved) {
        return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_STORE_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('lumina_store_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
    showToast('Store settings updated successfully!', 'success');
  };

  const resetSettingsToDefault = () => {
    setSettings(DEFAULT_STORE_SETTINGS);
    localStorage.setItem('lumina_store_settings', JSON.stringify(DEFAULT_STORE_SETTINGS));
    showToast('Settings restored to initial default.', 'info');
  };

  const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem('lumina_orders');
    showToast('Order history and test customer data cleared.', 'info');
  };

  const exportStoreBackup = () => {
    try {
      const backupData = {
        version: '2.1',
        exportDate: new Date().toISOString(),
        storeName: settings.storeName,
        settings,
        products,
        orders,
        coupons,
        reviews,
        subscribers
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${settings.storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-backup-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Store backup exported successfully!', 'success');
    } catch {
      showToast('Error exporting backup file', 'error');
    }
  };

  const importStoreBackup = (jsonData: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.settings) {
        setSettings({ ...DEFAULT_STORE_SETTINGS, ...parsed.settings });
      }
      if (Array.isArray(parsed.products) && parsed.products.length > 0) {
        setProducts(parsed.products);
      }
      if (Array.isArray(parsed.orders)) {
        setOrders(parsed.orders);
      }
      if (Array.isArray(parsed.coupons) && parsed.coupons.length > 0) {
        setCoupons(parsed.coupons);
      }
      showToast('Store backup restored successfully!', 'success');
      return { success: true, message: 'Store data successfully imported!' };
    } catch {
      showToast('Failed to import backup: invalid JSON format', 'error');
      return { success: false, message: 'Invalid JSON file format' };
    }
  };

  // Navigation helpers
  const navigateToProduct = (slug: string) => {
    setIsLoadingProductDetail(true);
    setSelectedProductSlug(slug);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Smooth transition to simulate data fetching and show skeleton
    setTimeout(() => {
      setIsLoadingProductDetail(false);
    }, 380);
  };

  const navigateToOrder = (orderId: string) => {
    const ord = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (ord) {
      setCurrentOrder(ord);
      setSelectedOrderId(ord.id);
      setActivePage('access');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (cartSubtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = Math.min(appliedCoupon.value, cartSubtotal);
    }
  }
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        // Digital products typically only need 1 per customer, but allow increment if desired
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title}" to your cart!`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isSaved = prev.includes(productId);
      if (isSaved) {
        showToast('Removed from saved items', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  // Coupon actions
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === trimmed);
    if (!found) {
      return { success: false, message: 'Invalid discount coupon code' };
    }
    if (found.minOrderAmount && cartSubtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Order must be at least $${found.minOrderAmount} to use this coupon`
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon applied! ${found.description}`, 'success');
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
    showToast(`Coupon "${newCoupon.code}" created!`, 'success');
  };

  // Place Order
  const placeOrder = (customerData: {
    customerEmail: string;
    customerName: string;
    paymentMethod: 'card' | 'paypal' | 'razorpay' | 'apple_pay';
  }): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `LUM-${randomNum}`;
    const orderId = `ord-${Date.now()}`;
    const accessToken = `sec_tok_${Math.random().toString(36).substring(2, 12)}`;

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      title: item.product.title,
      price: item.product.price,
      format: item.product.format,
      downloadFilename: item.product.downloadFilename,
      downloadContent: item.product.downloadContent
    }));

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerEmail: customerData.customerEmail,
      customerName: customerData.customerName || 'Customer',
      items: orderItems,
      subtotal: cartSubtotal,
      discountAmount,
      total: finalTotal,
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      paymentMethod: customerData.paymentMethod,
      createdAt: new Date().toISOString(),
      accessToken,
      downloadCount: 0
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setSelectedOrderId(newOrder.id);
    clearCart();
    setAppliedCoupon(null);

    // Trigger celebration confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setActivePage('access');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Purchase completed successfully! Access your downloads below.', 'success');
    return newOrder;
  };

  // Download item action
  const downloadItem = (product: Product, orderNumber?: string) => {
    downloadProductFile(product, orderNumber);
    showToast(`Downloading "${product.downloadFilename}"...`, 'success');

    // Update download count if in an order
    if (currentOrder) {
      setOrders(prev =>
        prev.map(o => (o.id === currentOrder.id ? { ...o, downloadCount: o.downloadCount + 1 } : o))
      );
    }
  };

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.title}" added to store!`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from store', 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('lumina_products');
    showToast('Products reset to initial catalog', 'info');
  };

  // Reviews
  const addReview = (reviewData: Omit<CustomerReview, 'id' | 'date'>) => {
    const newReview: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    setReviews(prev => [newReview, ...prev]);
    showToast('Thank you! Your verified review was posted.', 'success');
  };

  // Newsletter
  const subscribeNewsletter = (email: string, source = 'Website Form') => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      return { success: false, message: 'Please enter a valid email address' };
    }
    if (subscribers.some(s => s.email.toLowerCase() === trimmed)) {
      return { success: true, message: 'You are already on our insider list! Check your inbox.' };
    }
    const newSub: NewsletterSubscriber = {
      email: trimmed,
      date: new Date().toISOString().split('T')[0],
      source
    };
    setSubscribers(prev => [newSub, ...prev]);
    showToast('Welcome to Lumina! Check your inbox for your 15% discount code.', 'success');
    return { success: true, message: 'Success! Welcome to Lumina Digital.' };
  };

  // Sample Modals
  const openSampleModal = (product: Product) => {
    setSampleModalProduct(product);
  };
  const closeSampleModal = () => {
    setSampleModalProduct(null);
  };

  const openPromptModal = (product: Product) => {
    setPromptModalProduct(product);
  };
  const closePromptModal = () => {
    setPromptModalProduct(null);
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductSlug,
        navigateToProduct,
        selectedOrderId,
        navigateToOrder,
        activeCategoryFilter,
        setActiveCategoryFilter,
        policyTab,
        setPolicyTab,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartItemCount,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        discountAmount,
        finalTotal,
        orders,
        currentOrder,
        placeOrder,
        downloadItem,
        reviews,
        addReview,
        subscribers,
        subscribeNewsletter,
        wishlist,
        toggleWishlist,
        sampleModalProduct,
        openSampleModal,
        closeSampleModal,
        promptModalProduct,
        openPromptModal,
        closePromptModal,
        currency,
        setCurrency,
        formatPrice,
        toasts,
        showToast,
        removeToast,
        settings,
        updateSettings,
        resetSettingsToDefault,
        clearOrders,
        exportStoreBackup,
        importStoreBackup,
        newsletterSubscribers: subscribers,
        isLoadingProducts,
        setIsLoadingProducts,
        isLoadingProductDetail,
        setIsLoadingProductDetail,
        simulateDataFetch
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
