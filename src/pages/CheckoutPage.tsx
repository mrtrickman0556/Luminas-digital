import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  CheckCircle2,
  Tag,
  ArrowRight,
  Zap,
  Gift,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    formatPrice,
    placeOrder,
    setActivePage
  } = useStore();

  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'razorpay' | 'apple_pay'>('card');
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock card inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4 text-neutral-300">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
          <Zap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-display text-white">Your Cart is Empty</h2>
        <p className="text-sm text-neutral-400">
          Select digital products to proceed with our instant automated checkout.
        </p>
        <button
          type="button"
          onClick={() => setActivePage('shop')}
          className="px-6 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg"
        >
          Browse All Products
        </button>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCodeInput('');
    }
  };

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerEmail.includes('@')) {
      alert('Please enter a valid customer email for your digital download delivery.');
      return;
    }

    setIsProcessing(true);
    // Simulate real gateway authorization latency
    setTimeout(() => {
      placeOrder({
        customerEmail,
        customerName: customerName || 'Customer',
        paymentMethod
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Safe & Secure Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-0.5">
            Instant Digital Delivery Checkout
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            256-Bit SSL Encrypted
          </span>
          <span className="text-neutral-600">•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            Instant Download
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Customer & Payment */}
        <form onSubmit={handleCompletePurchase} className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Contact Info */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono font-bold">
                  1
                </span>
                <span>Delivery Email & Name</span>
              </h3>
              <span className="text-[11px] text-neutral-400">No physical shipping needed</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Your digital product download link and order receipt will be sent directly to this address immediately upon purchase.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="alex.creator@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Full Name (Optional for invoice)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Provider Selection */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono font-bold">
                  2
                </span>
                <span>Payment Gateway</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> PCI Compliant
              </span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'paypal', label: 'PayPal', icon: Zap },
                { id: 'razorpay', label: 'Razorpay / UPI', icon: ShieldCheck },
                { id: 'apple_pay', label: 'Apple Pay', icon: Lock }
              ].map(m => {
                const isSelected = paymentMethod === m.id;
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Payment Sub-Fields */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-1 border-b border-neutral-800">
                  <span>Stripe Powered Test Gateway</span>
                  <span className="text-[10px] font-mono text-emerald-400">Sandbox Ready</span>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Expiration</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">CVC Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                <p>You will be authenticated via PayPal Instant Checkout with 1-click tokenized access.</p>
              </div>
            )}

            {paymentMethod === 'razorpay' && (
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                <p>Supports UPI, NetBanking, and RuPay across international & Asian regions.</p>
              </div>
            )}

            {paymentMethod === 'apple_pay' && (
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                <p>Touch ID / Face ID authorized 1-click purchase.</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-xl text-base font-bold bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 text-white flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all cursor-pointer"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authorizing & Generating Download Tokens...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Complete Purchase ({formatPrice(finalTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

          <p className="text-[11px] text-center text-neutral-400">
            By completing your purchase, you agree to our Terms of Service & 14-Day Refund Policy.
          </p>
        </form>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white font-display">Order Summary</h3>
              <span className="text-xs font-mono text-neutral-400">
                {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            {/* Item list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-start justify-between gap-3 text-xs pb-3 border-b border-neutral-800/60"
                >
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">
                      {item.product.format}
                    </span>
                    <h4 className="font-semibold text-white line-clamp-1">{item.product.title}</h4>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Qty: {item.quantity} • {item.product.pagesOrCount}
                    </span>
                  </div>
                  <span className="font-bold text-white font-mono shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Discount Code Form */}
            <div>
              {appliedCoupon ? (
                <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono font-bold text-emerald-300">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-neutral-400">({appliedCoupon.description})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => {
                      setCouponCodeInput(e.target.value);
                      if (couponError) setCouponError('');
                    }}
                    placeholder="Discount code (e.g. LUMINA20)"
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white uppercase font-mono placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>}
            </div>

            {/* Financial Math */}
            <div className="space-y-2 pt-2 border-t border-neutral-800 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-mono">{formatPrice(cartSubtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Digital Delivery Fee</span>
                <span className="text-emerald-400 font-medium font-mono">$0.00 (Instant)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800 font-display">
                <span>Total Due</span>
                <span className="text-indigo-400 font-mono">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Guarantee card */}
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex items-start gap-3 text-xs text-neutral-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">14-Day Money-Back Guarantee</strong>
              <p className="mt-0.5 leading-relaxed">
                If the digital materials don't meet your expectations, simply reply to your receipt email within 14 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
