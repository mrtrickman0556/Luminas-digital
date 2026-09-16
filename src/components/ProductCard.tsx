import React from 'react';
import { Star, ShoppingBag, Eye, Heart, ArrowRight, Zap } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { EbookMockup } from './EbookMockup';
import { PromptPackMockup } from './PromptPackMockup';
import { TemplateMockup } from './TemplateMockup';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const {
    navigateToProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    openSampleModal,
    openPromptModal
  } = useStore();

  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const renderMockup = () => {
    if (product.category === 'E-books') {
      return <EbookMockup product={product} size="md" />;
    }
    if (product.category === 'AI Prompts' || product.category === 'Prompt Packs') {
      return <PromptPackMockup product={product} size="md" />;
    }
    return <TemplateMockup product={product} size="md" />;
  };

  const handleQuickPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.category === 'E-books' && product.ebookDetails) {
      openSampleModal(product);
    } else if (product.aiDetails) {
      openPromptModal(product);
    } else {
      navigateToProduct(product.slug);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => navigateToProduct(product.slug)}
      className={`group relative rounded-2xl bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col justify-between overflow-hidden cursor-pointer ${
        featured ? 'ring-1 ring-indigo-500/30' : ''
      }`}
    >
      {/* Top badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
              Best Seller
            </span>
          )}
          {product.isNewRelease && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
              New
            </span>
          )}
          {discountPercent && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-black/50 text-neutral-300 hover:text-white hover:bg-black/70 border border-white/10'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Mockup Preview Area */}
      <div className="p-6 pt-12 pb-4 bg-gradient-to-b from-neutral-900 to-neutral-950 flex items-center justify-center overflow-hidden min-h-[220px]">
        {renderMockup()}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Format & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-2">
            <span className="text-neutral-400 font-medium tracking-wide uppercase text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-semibold text-neutral-200">{product.rating.toFixed(2)}</span>
              <span className="text-neutral-500 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors line-clamp-1 leading-snug">
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-5 pt-4 border-t border-neutral-800/80">
          <div className="flex items-baseline justify-between gap-2 mb-3.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-display text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800/60 px-2 py-0.5 rounded">
              {product.pagesOrCount}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickPreview}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
