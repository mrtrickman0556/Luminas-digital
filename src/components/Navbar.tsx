import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  BookOpen,
  Sparkles,
  Layers,
  Heart,
  Settings,
  HelpCircle,
  Mail,
  Info,
  Globe,
  ArrowRight,
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LiveSearchDropdown } from './LiveSearchDropdown';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartItemCount,
    setIsCartOpen,
    wishlist,
    currency,
    setCurrency,
    setActiveCategoryFilter,
    settings
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchOpen, setNavSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');

  const handleNavClick = (page: string, categoryFilter?: string) => {
    setActivePage(page);
    if (categoryFilter) {
      setActiveCategoryFilter(categoryFilter);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      setActivePage('shop');
      setNavSearchOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/85 border-b border-neutral-800/80 transition-all">
      {/* Top micro announcement bar */}
      {settings.enableAnnouncementBar && (
        <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-emerald-900/60 py-1.5 px-4 text-center border-b border-white/5">
          <p className="text-[11px] font-medium text-white/90 flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>{settings.announcementText}</span>
            <button
              type="button"
              onClick={() => handleNavClick('shop')}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-white underline hover:text-indigo-200 ml-1 cursor-pointer"
            >
              Claim discount <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-neutral-950 rounded-[11px] flex items-center justify-center">
                <span className="font-display font-black text-white text-base tracking-tighter group-hover:scale-105 transition-transform">
                  L✦
                </span>
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white tracking-tight flex items-center gap-1">
                {settings.storeName.includes(' ') ? (
                  <>
                    {settings.storeName.split(' ')[0]}
                    <span className="text-indigo-400">
                      {settings.storeName.split(' ').slice(1).join(' ')}
                    </span>
                  </>
                ) : (
                  <>
                    {settings.storeName}
                    <span className="text-indigo-400">✦</span>
                  </>
                )}
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-neutral-400 -mt-1 font-mono">
                Digital Marketplace
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activePage === 'home'
                  ? 'text-white bg-neutral-800'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('shop', 'All Products')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activePage === 'shop'
                  ? 'text-white bg-neutral-800'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Shop All
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('ebooks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activePage === 'ebooks'
                  ? 'text-white bg-neutral-800'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>E-books</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('ai-prompts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activePage === 'ai-prompts'
                  ? 'text-white bg-neutral-800'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Prompts</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activePage === 'about'
                  ? 'text-white bg-neutral-800'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activePage === 'faq'
                  ? 'text-white bg-neutral-800'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activePage === 'contact'
                  ? 'text-white bg-neutral-800'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="relative hidden sm:flex items-center">
              <select
                aria-label="Select currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer font-mono"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => setNavSearchOpen(!navSearchOpen)}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                navSearchOpen
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
              }`}
              title="Search products"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-indigo-900 flex items-center justify-center font-bold text-[11px] font-mono">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Store Settings link */}
            <button
              type="button"
              onClick={() => handleNavClick('settings')}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                activePage === 'settings'
                  ? 'bg-neutral-800 border-indigo-500/50 text-indigo-400'
                  : 'bg-neutral-900/60 hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
              title="Store Settings & Configuration"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Live Search Header Bar */}
      {navSearchOpen && (
        <div className="border-t border-neutral-800/80 bg-neutral-950/95 backdrop-blur-xl px-4 py-3 animate-in slide-in-from-top-2">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <LiveSearchDropdown
              autoFocus
              searchQuery={navSearchQuery}
              onSearchChange={setNavSearchQuery}
              onSelectCategory={(cat) => {
                handleNavClick('shop', cat);
                setNavSearchOpen(false);
              }}
              placeholder="Search e-books, AI prompts, Notion templates..."
            />
            <button
              type="button"
              onClick={() => setNavSearchOpen(false)}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors shrink-0"
              title="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-xs text-neutral-400">
            <span>Currency:</span>
            <select
              aria-label="Select mobile currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-neutral-900 border border-neutral-800 text-white rounded px-2 py-1 font-mono text-xs"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'home' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop', 'All Products')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'shop' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
            }`}
          >
            Shop All Products
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('ebooks')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activePage === 'ebooks' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              E-books Marketplace
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              Gen Z Guide
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('ai-prompts')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activePage === 'ai-prompts' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              AI Prompts & Packs
            </span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
              3,500+
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'about' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
            }`}
          >
            About Lumina
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'faq' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
            }`}
          >
            FAQ & Product Access
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
              activePage === 'contact' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
            }`}
          >
            Customer Support
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('settings')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              activePage === 'settings' ? 'bg-neutral-800 text-indigo-400' : 'text-neutral-300'
            }`}
          >
            <Settings className="w-4 h-4 text-indigo-400" />
            Store Settings & Config
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('admin')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              activePage === 'admin' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            <FileText className="w-4 h-4" />
            Store Admin & Catalog
          </button>
        </div>
      )}
    </header>
  );
};
