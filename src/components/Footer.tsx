import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  HelpCircle,
  Mail,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActivePage, setActiveCategoryFilter, setPolicyTab, subscribeNewsletter, settings } = useStore();
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = subscribeNewsletter(email, 'Footer Newsletter');
    setStatusMsg(res.message);
    if (res.success) setEmail('');
  };

  const handleNav = (page: string, category?: string) => {
    setActivePage(page);
    if (category) setActiveCategoryFilter(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePolicy = (tab: 'privacy' | 'terms' | 'refund') => {
    setPolicyTab(tab);
    setActivePage('policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400">
      {/* Newsletter Bar */}
      <div className="border-b border-neutral-900 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free Creator Starter Pack</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Learn smarter. Create faster. Build better.
              </h3>
              <p className="text-sm text-neutral-400 max-w-lg">
                Join 18,000+ ambitious creators, students, and young professionals. Receive our curated 50+ Creator Prompt Kit immediately upon subscribing.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md lg:ml-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
                >
                  <span>Get Free Pack</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {statusMsg && (
                <p className="text-xs text-emerald-400 mt-2 text-left lg:text-right flex items-center gap-1 justify-start lg:justify-end">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {statusMsg}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-display font-black text-white text-sm">
                L✦
              </div>
              <span className="font-display font-bold text-lg text-white">
                Lumina<span className="text-indigo-400">Digital</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              A premium, beginner-friendly digital marketplace for Gen Z, students, creators, freelancers, entrepreneurs, and young professionals. Practical e-books, AI prompts, templates, and guides built for real execution.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Instant Delivery
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                256-bit Secure
              </span>
            </div>
          </div>

          {/* Marketplace Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('shop', 'All Products')}
                  className="hover:text-white transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('ebooks')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>E-books</span>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                    Popular
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('ai-prompts')}
                  className="hover:text-white transition-colors"
                >
                  AI Prompts & Packs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('shop', 'Templates')}
                  className="hover:text-white transition-colors"
                >
                  Notion & Figma Templates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('shop', 'Productivity')}
                  className="hover:text-white transition-colors"
                >
                  Productivity Resources
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('shop', 'Business')}
                  className="hover:text-white transition-colors"
                >
                  Business & Agency Kits
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  About Our Brand
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('access')}
                  className="hover:text-white transition-colors"
                >
                  Customer Access & Downloads
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('settings')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer text-indigo-400/90 font-medium"
                >
                  Store Settings & Config
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('admin')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Store Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Policies & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicy('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicy('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicy('refund')}
                  className="hover:text-white transition-colors"
                >
                  Refund Policy (14-Day)
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Digital Product License</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} {settings.storeName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-neutral-400">
              Made with precision for the modern creator economy.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
