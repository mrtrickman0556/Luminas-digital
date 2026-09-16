import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Filter, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';
import { LiveSearchDropdown } from '../components/LiveSearchDropdown';

export const ShopPage: React.FC = () => {
  const { products, activeCategoryFilter, setActiveCategoryFilter } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryFilter || 'All Products');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under20' | '20to30' | 'above30'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'>('popular');

  // Keep local category synced if store filter changes
  React.useEffect(() => {
    if (activeCategoryFilter) {
      setSelectedCategory(activeCategoryFilter);
    }
  }, [activeCategoryFilter]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setActiveCategoryFilter(cat);
  };

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
              onChange={(e) => setPriceFilter(e.target.value as any)}
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
              onChange={(e) => setSortBy(e.target.value as any)}
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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
        <div>
          Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> products
          {selectedCategory !== 'All Products' && (
            <span> in <span className="text-indigo-300 font-semibold">{selectedCategory}</span></span>
          )}
        </div>

        {(searchQuery || selectedCategory !== 'All Products' || priceFilter !== 'all') && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
          <p className="text-base font-bold text-white">No products found</p>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            We couldn't find any products matching your active search or category filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
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
