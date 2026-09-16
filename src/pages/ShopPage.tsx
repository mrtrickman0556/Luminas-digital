import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Filter, Sparkles, RotateCw, Flame, ArrowRight, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/ProductGridSkeleton';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';
import { LiveSearchDropdown } from '../components/LiveSearchDropdown';
import { STORE_SECTIONS } from '../data/searchSections';

export const ShopPage: React.FC = () => {
  const {
    products,
    activeCategoryFilter,
    setActiveCategoryFilter,
    isLoadingProducts,
    simulateDataFetch,
    globalSearchQuery,
    setGlobalSearchQuery,
    navigateToSection
  } = useStore();

  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryFilter || 'All Products');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under20' | '20to30' | 'above30'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Keep local category synced if store filter changes
  useEffect(() => {
    if (activeCategoryFilter) {
      setSelectedCategory(activeCategoryFilter);
    }
  }, [activeCategoryFilter]);

  // Keep search synced with globalSearchQuery
  useEffect(() => {
    if (globalSearchQuery !== undefined) {
      setSearchQuery(globalSearchQuery);
    }
  }, [globalSearchQuery]);

  const handleCategorySelect = (cat: string) => {
    if (selectedCategory === cat) return;
    setIsTransitioning(true);
    setSelectedCategory(cat);
    setActiveCategoryFilter(cat);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 320);
  };

  const handlePriceFilterChange = (val: 'all' | 'under20' | '20to30' | 'above30') => {
    setIsTransitioning(true);
    setPriceFilter(val);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  };

  const handleSortChange = (val: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating') => {
    setIsTransitioning(true);
    setSortBy(val);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  };

  const handleManualRefresh = () => {
    simulateDataFetch(450);
  };

  const isLoading = isLoadingProducts || isTransitioning;

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchDesc = product.shortDescription.toLowerCase().includes(q);
          const matchTags = product.tags.some(t => t.toLowerCase().includes(q));
          const matchCat = product.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchTags && !matchCat) return false;
        }

        // Category
        if (selectedCategory !== 'All Products') {
          if (selectedCategory === 'Prompt Packs') {
            if (product.category !== 'AI Prompts' && product.category !== 'Prompt Packs') return false;
          } else if (product.category !== selectedCategory && !product.tags.includes(selectedCategory)) {
            return false;
          }
        }

        // Price Filter
        if (priceFilter === 'under20' && product.price >= 20) return false;
        if (priceFilter === '20to30' && (product.price < 20 || product.price > 30)) return false;
        if (priceFilter === 'above30' && product.price <= 30) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.isNewRelease ? 1 : 0) - (a.isNewRelease ? 1 : 0);
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default popular: reviewCount + rating
        return b.reviewCount * b.rating - a.reviewCount * a.rating;
      });
  }, [products, searchQuery, selectedCategory, priceFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Products');
    setActiveCategoryFilter('All Products');
    setPriceFilter('all');
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2 border-b border-neutral-800 pb-6">
        <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
          Complete Marketplace
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
          All Digital Products & Resources
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Browse our curated digital materials including e-books, AI prompts, productivity Notion OS workspaces, and agency business templates.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Real-Time Live Search Suggestion Dropdown */}
          <LiveSearchDropdown
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectCategory={handleCategorySelect}
            placeholder="Search products, AI prompts, e-books, Notion templates..."
          />

          {/* Price Range Selector */}
          <div className="flex items-center gap-2">
            <select
              aria-label="Filter by price range"
              value={priceFilter}
              onChange={(e) => handlePriceFilterChange(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under20">Under $20</option>
              <option value="20to30">$20 to $30</option>
              <option value="above30">$30 & Above</option>
            </select>

            {/* Sort Selector */}
            <select
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">New Releases</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PRODUCT_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Indicators & Product Count */}
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-3">
          <div>
            Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> products
            {selectedCategory !== 'All Products' && (
              <span> in <span className="text-indigo-300 font-semibold">{selectedCategory}</span></span>
            )}
          </div>
          <button
            type="button"
            onClick={handleManualRefresh}
            title="Simulate data fetch"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <RotateCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
            <span>{isLoading ? 'Fetching...' : 'Simulate Fetch'}</span>
          </button>
        </div>

        {(searchQuery || selectedCategory !== 'All Products' || priceFilter !== 'all') && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Relevant Section Suggestion Banner */}
      {searchQuery && (() => {
        const qClean = searchQuery.toLowerCase().trim();
        const matchedSec = STORE_SECTIONS.find(s =>
          s.title.toLowerCase().includes(qClean) ||
          s.keywords.some(k => k.includes(qClean) || qClean.includes(k))
        );
        if (!matchedSec) return null;

        return (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-neutral-900 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Related Store Section</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono">{matchedSec.badge}</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-0.5">{matchedSec.title}</h3>
                <p className="text-xs text-neutral-400">{matchedSec.description}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateToSection(matchedSec)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-all shrink-0 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <span>Jump to Section</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })()}

      {/* Products Grid / Skeleton Loading State */}
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : filteredProducts.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
          <p className="text-base font-bold text-white">No products found</p>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            We couldn't find any products matching your active search or category filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
