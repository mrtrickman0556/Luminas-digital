import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Star,
  ShoppingBag,
  Zap,
  TrendingUp,
  Tag,
  CornerDownLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface LiveSearchDropdownProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory?: (category: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

const POPULAR_SEARCH_TERMS = [
  'Financially Free',
  'AI Mega-Pack',
  'Notion OS',
  'Viral Prompts',
  'Freelance Guide',
  'Midjourney'
];

export const LiveSearchDropdown: React.FC<LiveSearchDropdownProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  placeholder = 'Search products, AI prompts, e-books, Notion templates...',
  className = '',
  autoFocus = false
}) => {
  const { products, navigateToProduct, addToCart, formatPrice } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for suggestions in real time
  const matchingProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle ? p.subtitle.toLowerCase().includes(q) : false;
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchDesc || matchCat || matchTags;
    }).slice(0, 5); // top 5 recommendations
  }, [products, searchQuery]);

  // Matching categories
  const matchingCategories = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const categories: string[] = Array.from(new Set(products.map(p => String(p.category))));
    return categories.filter((cat: string) => cat.toLowerCase().includes(q));
  }, [products, searchQuery]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < matchingProducts.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev > 0 ? prev - 1 : matchingProducts.length - 1
      );
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && matchingProducts[selectedIndex]) {
        e.preventDefault();
        handleProductClick(matchingProducts[selectedIndex]);
      } else {
        // Close dropdown and let page filter take over
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleProductClick = (product: Product) => {
    setIsOpen(false);
    navigateToProduct(product.slug);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleChipClick = (term: string) => {
    onSearchChange(term);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'E-books':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
      case 'AI Prompts':
      case 'Prompt Packs':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative flex-1 ${className}`}>
      {/* Search Input Bar */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          autoFocus={autoFocus}
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Real-time Live Search Suggestion Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-50 bg-neutral-900/98 backdrop-blur-xl border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Case 1: User has typed a query and we have matching products */}
          {searchQuery.trim().length > 0 && matchingProducts.length > 0 && (
            <div className="divide-y divide-neutral-800/80">
              {/* Category Quick Matches (if any) */}
              {matchingCategories.length > 0 && onSelectCategory && (
                <div className="p-2.5 bg-neutral-950/60 flex items-center gap-2 overflow-x-auto text-xs">
                  <span className="text-[11px] text-neutral-400 font-mono shrink-0">Matching Collections:</span>
                  {matchingCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat);
                        setIsOpen(false);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 text-[11px] font-semibold flex items-center gap-1 border border-indigo-500/30 transition-colors shrink-0"
                    >
                      {getCategoryIcon(cat)}
                      <span>Filter by {cat}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Product Suggestions List */}
              <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  <span>Product Suggestions ({matchingProducts.length})</span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px]">
                    Use <span className="px-1 py-0.2 bg-neutral-800 rounded">↑</span> <span className="px-1 py-0.2 bg-neutral-800 rounded">↓</span> to navigate
                  </span>
                </div>

                {matchingProducts.map((product, idx) => {
                  const isSelected = selectedIndex === idx;
                  const discountPercent = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : null;

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-neutral-800 text-white'
                          : 'hover:bg-neutral-800/60 text-neutral-200'
                      }`}
                    >
                      {/* Left: Thumbnail Icon Badge & Info */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-sm"
                          style={{
                            background: `linear-gradient(135deg, ${product.coverGradient.from}, ${product.coverGradient.to})`
                          }}
                        >
                          {getCategoryIcon(product.category)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                              {product.title}
                            </span>
                            {product.isBestSeller && (
                              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Best Seller
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                            <span className="text-indigo-400 font-medium">{product.category}</span>
                            <span>•</span>
                            <span>{product.pagesOrCount}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:flex items-center gap-0.5 text-amber-400">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{product.rating.toFixed(1)}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Pricing & Quick Add Button */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 justify-end">
                            <span className="text-xs sm:text-sm font-bold font-mono text-white">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="hidden sm:inline text-[10px] text-neutral-500 line-through font-mono">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          {discountPercent && (
                            <span className="text-[9px] text-emerald-400 font-bold font-mono">
                              Save {discountPercent}%
                            </span>
                          )}
                        </div>

                        {/* 1-Click Quick Add Button */}
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="p-2 rounded-lg bg-neutral-700/60 hover:bg-indigo-600 text-neutral-300 hover:text-white transition-colors"
                          title="Quick add to cart"
                          aria-label="Add to cart"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer: View all in catalog */}
              <div className="p-3 bg-neutral-950/80 flex items-center justify-between text-xs text-neutral-400">
                <span>
                  Showing top matches for <strong className="text-white">"{searchQuery}"</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Filter catalog view</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Case 2: User has typed a query but no products match */}
          {searchQuery.trim().length > 0 && matchingProducts.length === 0 && (
            <div className="p-6 text-center space-y-4">
              <div className="w-10 h-10 mx-auto rounded-xl bg-neutral-800 text-neutral-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  No products found for "{searchQuery}"
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Try checking for spelling mistakes or explore our popular topics below.
                </p>
              </div>

              {/* Suggested popular keywords */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-neutral-400 block mb-2">
                  Recommended searches:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {POPULAR_SEARCH_TERMS.map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleChipClick(term)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700/60"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Case 3: Empty query or initial focus (Popular suggestions & discovery helper) */}
          {searchQuery.trim().length === 0 && (
            <div className="p-4 space-y-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Popular & Trending Searches</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TERMS.map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleChipClick(term)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 transition-colors flex items-center gap-1.5"
                    >
                      <Search className="w-3 h-3 text-neutral-500" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Jump to Best Sellers */}
              <div className="pt-2 border-t border-neutral-800/80">
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Top Rated Instant Downloads</span>
                </span>
                <div className="space-y-1">
                  {products.filter(p => p.isBestSeller).slice(0, 3).map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod)}
                      className="p-2 rounded-xl hover:bg-neutral-800/60 cursor-pointer flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {getCategoryIcon(prod.category)}
                        <span className="text-white font-medium truncate">{prod.title}</span>
                      </div>
                      <span className="font-mono text-indigo-300 font-bold shrink-0">
                        {formatPrice(prod.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
