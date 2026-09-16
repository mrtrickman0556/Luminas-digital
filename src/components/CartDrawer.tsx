import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap, Gift, Tag, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    formatPrice,
    setActivePage,
    navigateToProduct
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeGiftThreshold = 35;
  const progressPercent = Math.min(100, (cartSubtotal / freeGiftThreshold) * 100);
  const remainingForGift = Math.max(0, freeGiftThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col justify-between text-neutral-200">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-display">Your Cart</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-neutral-800 text-neutral-300">
                {cart.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Freebie Progress Bar */}
          <div className="px-5 py-3 bg-neutral-950 border-b border-neutral-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-neutral-300">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                {remainingForGift === 0 ? (
                  <span className="text-emerald-400 font-semibold">Bonus Creator Starter Kit Unlocked!</span>
                ) : (
                  <span>
                    Add <strong className="text-white">{formatPrice(remainingForGift)}</strong> more for Free Bonus Pack
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-neutral-400">
                <div className="w-14 h-14 rounded-2xl bg-neutral-800/80 flex items-center justify-center text-neutral-500">
                  <Zap className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Your cart is empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs">
                  Browse our curated e-books, AI prompt packs, and productivity templates to start growing.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="mt-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/90 flex gap-3.5 items-center justify-between"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[10px] font-mono uppercase text-indigo-400 font-semibold">
                      {item.product.format}
                    </span>
                    <h4
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateToProduct(item.product.slug);
                      }}
                      className="text-sm font-semibold text-white truncate hover:text-indigo-300 cursor-pointer transition-colors"
                    >
                      {item.product.title}
                    </h4>
                    <div className="text-xs font-bold text-neutral-200 mt-1">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center rounded-lg bg-neutral-800 border border-neutral-700/60 p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals and checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-950/90 space-y-4">
              {/* Discount coupon box */}
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
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      if (couponError) setCouponError('');
                    }}
                    placeholder="Coupon code (e.g. LUMINA20)"
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700/80 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors border border-neutral-700"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>}

              {/* Price summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-neutral-200">{formatPrice(cartSubtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800 font-display">
                  <span>Total Due</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Instant Download
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  256-bit Encrypted
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
