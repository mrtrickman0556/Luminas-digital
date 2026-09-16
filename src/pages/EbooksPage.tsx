import React from 'react';
import { BookOpen, Star, Sparkles, CheckCircle2, ArrowRight, Eye, ShoppingBag, ShieldCheck, Download } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { EbookMockup } from '../components/EbookMockup';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/ProductGridSkeleton';

export const EbooksPage: React.FC = () => {
  const { products, openSampleModal, addToCart, navigateToProduct, formatPrice, isLoadingProducts } = useStore();

  const ebooks = products.filter(p => p.category === 'E-books');
  const featuredEbook =
    ebooks.find(
      p =>
        p.slug === 'how-to-be-financially-free-in-young-age' ||
        p.slug === 'how-to-be-financially-free-at-a-young-age' ||
        p.id === 'prod-fin-free'
    ) || ebooks[0];
  const otherEbooks = ebooks.filter(p => p.id !== featuredEbook?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curated Digital Publishing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">
          Practical E-Books for Young Ambitious Minds
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Zero theory fluff. Real tactical playbooks covering asymmetric wealth creation, modern freelancing, and solo software businesses.
        </p>
      </div>

      {/* Featured E-Book Showcase */}
      {featuredEbook && (
        <section className="relative rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          {/* Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Cover Mockup */}
            <div className="lg:col-span-5 flex justify-center py-4">
              <EbookMockup product={featuredEbook} size="lg" />
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  FEATURED E-BOOK
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-300">
                  {featuredEbook.pagesOrCount}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-300">
                  PDF & ePub
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs ml-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-white">{featuredEbook.rating.toFixed(2)}</span>
                  <span className="text-neutral-500">({featuredEbook.reviewCount} reviews)</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-bold font-display text-white leading-tight">
                  {featuredEbook.title}
                </h2>
                {featuredEbook.subtitle && (
                  <p className="text-base sm:text-lg text-emerald-300/90 font-medium mt-1">
                    {featuredEbook.subtitle}
                  </p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {featuredEbook.shortDescription}
              </p>

              {/* What's included preview */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  What is included:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {featuredEbook.whatsIncluded.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-display text-white">
                    {formatPrice(featuredEbook.price)}
                  </span>
                  {featuredEbook.originalPrice && (
                    <span className="text-sm text-neutral-500 line-through">
                      {formatPrice(featuredEbook.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Save 50%
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto">
                  <button
                    type="button"
                    onClick={() => openSampleModal(featuredEbook)}
                    className="flex-1 sm:flex-initial px-4 py-3 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors flex items-center justify-center gap-1.5 border border-neutral-700"
                  >
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span>Preview 8-Page Guide</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(featuredEbook, 1)}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy E-Book</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Instant download link
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Lifetime update access
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All E-books Marketplace Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              All E-Books & Guides
            </h2>
            <p className="text-xs text-neutral-400">
              Downloadable in high-resolution PDF and mobile ePub formats.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {ebooks.length} Publications
          </span>
        </div>

        {isLoadingProducts ? (
          <ProductGridSkeleton count={3} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebooks.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
