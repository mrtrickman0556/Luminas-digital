import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { EbookReaderModal } from './components/EbookReaderModal';
import { PromptPreviewModal } from './components/PromptPreviewModal';
import { SocialProofToast } from './components/SocialProofToast';
import { ExitIntentModal } from './components/ExitIntentModal';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { EbooksPage } from './pages/EbooksPage';
import { AiPromptsPage } from './pages/AiPromptsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccessPage } from './pages/AccessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PolicyPage } from './pages/PolicyPage';
import { AdminPage } from './pages/AdminPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { activePage } = useStore();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'ebooks':
        return <EbooksPage />;
      case 'ai-prompts':
        return <AiPromptsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'access':
        return <AccessPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'policy':
        return <PolicyPage />;
      case 'admin':
        return <AdminPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <EbookReaderModal />
      <PromptPreviewModal />
      <SocialProofToast />
      <ExitIntentModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
