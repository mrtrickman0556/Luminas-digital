import React, { useState } from 'react';
import {
  Settings,
  Store,
  CreditCard,
  Bell,
  Database,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Palette,
  FileText,
  DollarSign,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { StoreSettings } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetSettingsToDefault,
    resetProductsToDefault,
    clearOrders,
    exportStoreBackup,
    importStoreBackup,
    products,
    orders,
    subscribers,
    setActivePage,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState<'general' | 'storefront' | 'payments' | 'data'>('general');

  // Local draft state for form edits
  const [draftSettings, setDraftSettings] = useState<StoreSettings>({ ...settings });
  const [importJsonText, setImportJsonText] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearOrdersConfirm, setShowClearOrdersConfirm] = useState(false);
  const [showCatalogResetConfirm, setShowCatalogResetConfirm] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync draft when global settings change
  const handleDraftChange = <K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) => {
    setDraftSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNestedGatewayChange = (gateway: keyof StoreSettings['paymentGateways'], value: boolean) => {
    setDraftSettings(prev => ({
      ...prev,
      paymentGateways: {
        ...prev.paymentGateways,
        [gateway]: value
      }
    }));
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSettings(draftSettings);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importStoreBackup(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Control Panel & Settings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1 flex items-center gap-3">
            <span>Store Configuration</span>
            {draftSettings.testMode ? (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Sandbox Mode
              </span>
            ) : (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Store
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Configure branding, payments, conversion popups, notifications, and local database storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActivePage('admin')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Store Analytics & Catalog</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePage('shop')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <span>View Live Storefront</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-800">
        {[
          { id: 'general', label: 'General & Branding', icon: Store },
          { id: 'storefront', label: 'Storefront & Promos', icon: Bell },
          { id: 'payments', label: 'Payments & Checkout', icon: CreditCard },
          { id: 'data', label: 'Data & Backups', icon: Database }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GENERAL & BRANDING */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveAll} className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Brand Details Card */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-5">
                <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                  <Store className="w-4 h-4 text-indigo-400" />
                  <span>Store Identity & Public Profile</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-neutral-300">
                      Store Brand Name
                    </label>
                    <input
                      type="text"
                      value={draftSettings.storeName}
                      onChange={(e) => handleDraftChange('storeName', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white"
                      placeholder="e.g. Lumina Digital"
                      required
                    />
                    <p className="text-[11px] text-neutral-500">Appears in header, footer, and emails</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-neutral-300">
                      Support Contact Email
                    </label>
                    <input
                      type="email"
                      value={draftSettings.supportEmail}
                      onChange={(e) => handleDraftChange('supportEmail', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white"
                      placeholder="support@luminadigital.com"
                      required
                    />
                    <p className="text-[11px] text-neutral-500">Destination for customer inquiries</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-neutral-300">
                    Store Tagline / Slogan
                  </label>
                  <input
                    type="text"
                    value={draftSettings.tagline}
                    onChange={(e) => handleDraftChange('tagline', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white"
                    placeholder="Digital Products That Help You Learn, Create & Grow"
                  />
                  <p className="text-[11px] text-neutral-500">Displayed in metadata and brand descriptions</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-neutral-300">
                    Creator Attribution Handle
                  </label>
                  <input
                    type="text"
                    value={draftSettings.creatorHandle}
                    onChange={(e) => handleDraftChange('creatorHandle', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white font-mono"
                    placeholder="@nikhil0556__"
                  />
                  <p className="text-[11px] text-neutral-500">Credited on the flagship financial freedom guide and social links</p>
                </div>
              </div>

              {/* Theme & Aesthetics Card */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                  <Palette className="w-4 h-4 text-emerald-400" />
                  <span>Storefront Theme & Aesthetics</span>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono font-medium text-neutral-300">
                    Accent Glow Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'indigo', name: 'Electric Indigo', color: '#6366f1' },
                      { id: 'emerald', name: 'Mint Emerald', color: '#10b981' },
                      { id: 'blue', name: 'Royal Cobalt', color: '#2563eb' },
                      { id: 'purple', name: 'Sunset Purple', color: '#a855f7' }
                    ].map(theme => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleDraftChange('accentTheme', theme.id as any)}
                        className={`p-3 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                          draftSettings.accentTheme === theme.id
                            ? 'bg-neutral-800 border-indigo-500 text-white ring-1 ring-indigo-500'
                            : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full" style={{ background: theme.color }} />
                        <span className="text-xs font-bold">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Overview */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-white font-display">Live Preview</h3>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
                      L✦
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {draftSettings.storeName || 'Lumina Digital'}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        {draftSettings.creatorHandle || '@nikhil0556__'}
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-300 italic">
                    "{draftSettings.tagline || 'Digital Products That Help You Learn, Create & Grow'}"
                  </p>
                </div>
                <div className="text-[11px] text-neutral-400 space-y-1 pt-2 border-t border-neutral-800">
                  <div className="flex justify-between">
                    <span>Products in Catalog:</span>
                    <strong className="text-white font-mono">{products.length}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Orders:</span>
                    <strong className="text-white font-mono">{orders.length}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Support:</span>
                    <strong className="text-white font-mono truncate max-w-[150px]">
                      {draftSettings.supportEmail}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              {saveSuccessMsg && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Settings saved & applied!</span>
                </span>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              Save General Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: STOREFRONT & PROMOS */}
      {activeTab === 'storefront' && (
        <form onSubmit={handleSaveAll} className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Announcement Bar Section */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                    <Bell className="w-4 h-4 text-indigo-400" />
                    <span>Top Announcement Header Bar</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftSettings.enableAnnouncementBar}
                      onChange={(e) => handleDraftChange('enableAnnouncementBar', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-neutral-300">
                    Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={draftSettings.announcementText}
                    onChange={(e) => handleDraftChange('announcementText', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white"
                    placeholder="Special Launch Offer: Use code LUMINA20 for 20% off all digital assets!"
                  />
                  <p className="text-[11px] text-neutral-500">Highlighted on every page at the top of the header</p>
                </div>

                {/* Banner Live Preview */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                    Header Banner Preview:
                  </span>
                  <div className="mt-1.5 bg-gradient-to-r from-indigo-900/70 via-purple-900/70 to-emerald-900/70 py-2 px-4 text-center rounded-xl border border-white/10 text-[11px] text-white font-medium flex items-center justify-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    <span>{draftSettings.announcementText || 'Special Launch Offer!'}</span>
                  </div>
                </div>
              </div>

              {/* Conversion Popups & Promos */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-5">
                <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Growth & Conversion Micro-Features</span>
                </div>

                <div className="divide-y divide-neutral-800/80">
                  {/* Social Proof Toasts */}
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-white">Live Social Proof Sales Toasts</div>
                      <div className="text-[11px] text-neutral-400">
                        Displays subtle bottom-left notifications of recent verified digital downloads.
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={draftSettings.enableSocialProofToasts}
                        onChange={(e) => handleDraftChange('enableSocialProofToasts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>

                  {/* Exit Intent Modal */}
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-white">Exit-Intent Coupon Discount Modal</div>
                      <div className="text-[11px] text-neutral-400">
                        Offers visitors a 15% VIP discount voucher when cursor moves to leave the screen.
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={draftSettings.enableExitIntentModal}
                        onChange={(e) => handleDraftChange('enableExitIntentModal', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Code Management */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Featured Promo Code</span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-medium text-neutral-300">
                      Primary Discount Code
                    </label>
                    <input
                      type="text"
                      value={draftSettings.activeCouponCode}
                      onChange={(e) => handleDraftChange('activeCouponCode', e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white font-mono uppercase"
                      placeholder="LUMINA20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-medium text-neutral-300">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={draftSettings.activeCouponDiscount}
                      onChange={(e) => handleDraftChange('activeCouponDiscount', Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] space-y-1">
                  <div className="font-bold font-mono uppercase">Applied at checkout</div>
                  <div>Customers entering this code receive {draftSettings.activeCouponDiscount}% discount instantly.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              {saveSuccessMsg && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Storefront settings saved!</span>
                </span>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              Save Storefront Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: PAYMENTS & CHECKOUT */}
      {activeTab === 'payments' && (
        <form onSubmit={handleSaveAll} className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Gateways Card */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-5">
                <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span>Accepted Payment Gateways</span>
                </div>

                <p className="text-xs text-neutral-400">
                  Select which payment options are displayed to customers in the checkout drawer.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'card' as const, name: 'Credit / Debit Cards', desc: 'Visa, Mastercard, Amex (Stripe)', badge: 'Fast Checkout' },
                    { key: 'paypal' as const, name: 'PayPal Express', desc: 'One-click wallet checkout', badge: 'Global' },
                    { key: 'razorpay' as const, name: 'Razorpay / UPI', desc: 'Instant UPI, QR & Netbanking', badge: 'India / Asia' },
                    { key: 'applePay' as const, name: 'Apple Pay / Google Pay', desc: 'Mobile native frictionless pay', badge: 'Mobile' }
                  ].map(gw => (
                    <div
                      key={gw.key}
                      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        draftSettings.paymentGateways[gw.key]
                          ? 'bg-neutral-950/80 border-indigo-500/50'
                          : 'bg-neutral-950/30 border-neutral-800 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{gw.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                            {gw.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-1">{gw.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={draftSettings.paymentGateways[gw.key]}
                          onChange={(e) => handleNestedGatewayChange(gw.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout & Delivery Logic */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Automatic Fulfillment & Tax</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div>
                      <div className="text-xs font-bold text-white">Instant Automated Delivery</div>
                      <div className="text-[11px] text-neutral-400">
                        Automatically generates unique access tokens and direct download links upon successful payment.
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={draftSettings.enableInstantFulfillment}
                        onChange={(e) => handleDraftChange('enableInstantFulfillment', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-neutral-300">
                        Default Currency
                      </label>
                      <select
                        aria-label="Select default store currency"
                        value={draftSettings.defaultCurrency}
                        onChange={(e) => handleDraftChange('defaultCurrency', e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white font-mono cursor-pointer"
                      >
                        <option value="USD">USD ($) - US Dollar</option>
                        <option value="EUR">EUR (€) - Euro</option>
                        <option value="GBP">GBP (£) - British Pound</option>
                        <option value="INR">INR (₹) - Indian Rupee</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-neutral-300">
                        Digital Goods Tax (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={draftSettings.taxRatePercent}
                        onChange={(e) => handleDraftChange('taxRatePercent', Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-xs text-white font-mono"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Sandbox Info Card */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white font-display">Sandbox Simulation</div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftSettings.testMode}
                      onChange={(e) => handleDraftChange('testMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
                  </label>
                </div>

                <p className="text-[11px] text-neutral-400">
                  When enabled, orders can be tested without real monetary transactions. Instant downloads and order tokens are generated immediately.
                </p>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-[11px] font-mono text-neutral-300">
                  <div className="text-neutral-400 uppercase text-[10px] font-bold">Simulated Test Card:</div>
                  <div className="text-indigo-400 font-bold">4242 •••• •••• 4242</div>
                  <div className="flex justify-between text-neutral-500 text-[10px]">
                    <span>EXP: 12/28</span>
                    <span>CVC: 123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              {saveSuccessMsg && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Payment settings updated!</span>
                </span>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              Save Payment Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: DATA, BACKUPS & MAINTENANCE */}
      {activeTab === 'data' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Backup & Export */}
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Full Store Backup</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Download a complete `.json` snapshot of your store including all active products (e-books, AI prompt vaults, templates), order logs, reviews, customer subscribers, and configurations.
              </p>
              <button
                type="button"
                onClick={exportStoreBackup}
                className="w-full py-3 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Store Backup JSON</span>
              </button>
            </div>

            {/* Restore / Import */}
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Restore Store from Backup</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Upload a valid Lumina Digital backup JSON file to restore configurations, products, or order history.
              </p>
              <label className="w-full py-3 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Choose Backup JSON File</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Database Diagnostics & Health */}
          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-base font-display">
                <Database className="w-4 h-4 text-purple-400" />
                <span>Local Storage Engine Status</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Persistent & Operational</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-400 text-[11px]">Catalog Products</div>
                <div className="text-xl font-bold font-display text-white mt-1">{products.length}</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Active resources</div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-400 text-[11px]">Order Records</div>
                <div className="text-xl font-bold font-display text-white mt-1">{orders.length}</div>
                <div className="text-[10px] text-indigo-400 font-mono mt-0.5">Recorded checkouts</div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-400 text-[11px]">Subscribers</div>
                <div className="text-xl font-bold font-display text-white mt-1">{subscribers.length}</div>
                <div className="text-[10px] text-purple-400 font-mono mt-0.5">Verified contacts</div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-400 text-[11px]">Storage Health</div>
                <div className="text-xl font-bold font-display text-white mt-1">100%</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Zero corruption</div>
              </div>
            </div>
          </div>

          {/* Dangerous / Factory Reset Operations */}
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-red-500/20 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-display">
              <AlertTriangle className="w-4 h-4" />
              <span>Reset & Maintenance Zone</span>
            </div>
            <p className="text-xs text-neutral-400">
              Actions below modify your local browser storage. They are helpful for resetting demo data or debugging store states.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Reset Catalog */}
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all products back to default factory catalog (including the 8-page Financial Freedom ebook)?')) {
                    resetProductsToDefault();
                  }
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                <span>Reset Products to Initial Catalog</span>
              </button>

              {/* Clear Orders */}
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Clear all test customer orders from order history?')) {
                    clearOrders();
                  }
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Clear Order History & Test Logs</span>
              </button>

              {/* Reset Settings */}
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Revert all store settings back to original factory defaults?')) {
                    resetSettingsToDefault();
                    setDraftSettings({ ...settings });
                  }
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Revert Settings to Factory Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
