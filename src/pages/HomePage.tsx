import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Zap,
  Download,
  Star,
  CheckCircle2,
  Clock,
  Layers,
  ChevronDown,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/ProductGridSkeleton';
import { FAQS } from '../data/faqs';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

export const HomePage: React.FC = () => {
  const {
    products,
    setActivePage,
    setActiveCategoryFilter,
    navigateToProduct,
    addToCart,
    reviews,
    formatPrice,
    subscribeNewsletter,
    isLoadingProducts
  } = useStore();

  const [expandedFaq, setExpandedFaq] = useState<string | null>(FAQS[0]?.id || null);
  const [emailInput, setEmailInput] = useState('');
  const [newsStatus, setNewsStatus] = useState('');

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newReleases = products.filter(p => p.isNewRelease || !p.isBestSeller).slice(0, 4);

  const handleCategoryClick = (cat: string) => {
    setActiveCategoryFilter(cat);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    const res = subscribeNewsletter(emailInput, 'Hero Free Resource');
    setNewsStatus(res.message);
    if (res.success) setEmailInput('');
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-semibold text-neutral-300 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">2026 Editions Ready</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-300">Curated Digital Tools for Gen Z & Creators</span>
          </div>

          {/* Mandatory Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Digital Products That Help You <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-emerald-400 bg-clip-text text-transparent">
              Learn, Create & Grow.
            </span>
          </h1>

          {/* Mandatory Subheadline */}
          <p className="mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Practical e-books, AI prompts, templates, guides and digital resources designed to help you work smarter and build better.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => {
                setActiveCategoryFilter('All Products');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActivePage('ebooks');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Browse E-books</span>
            </button>
          </div>

          {/* Trust Value Ticker */}
          <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Instant Delivery</p>
                <p className="text-[11px] text-neutral-400">Download in 3 seconds</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400 shrink-0">
                <Star className="w-4 h-4 fill-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">4.95 / 5.0 Rating</p>
                <p className="text-[11px] text-neutral-400">1,800+ verified buyers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-purple-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Lifetime Updates</p>
                <p className="text-[11px] text-neutral-400">Free future editions</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">14-Day Guarantee</p>
                <p className="text-[11px] text-neutral-400">Hassle-free refund</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Browse by Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveCategoryFilter('All Products');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View all collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {[
            { name: 'E-books', desc: 'Practical Guides & Wealth', icon: BookOpen, color: 'text-emerald-400' },
            { name: 'AI Prompts', desc: 'ChatGPT & Claude Vaults', icon: Sparkles, color: 'text-indigo-400' },
            { name: 'Templates', desc: 'Notion OS & Figma Kits', icon: Layers, color: 'text-purple-400' },
            { name: 'Productivity', desc: 'Neuro-Protocols & Focus', icon: Clock, color: 'text-amber-400' },
            { name: 'Business', desc: 'Agencies, MRR & Freelance', icon: TrendingUp, color: 'text-sky-400' }
          ].map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                onClick={() => handleCategoryClick(cat.name)}
                className="group p-4 sm:p-5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer shadow-sm flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {cat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>Editor's Picks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Handcrafted digital materials with the highest customer satisfaction.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveCategoryFilter('All Products');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>See entire store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {isLoadingProducts ? (
          <ProductGridSkeleton count={4} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>
        )}
      </section>

      {/* 4. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/50 border border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                Best Sellers
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                The most downloaded resources by Gen Z founders, creators, and professionals.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveCategoryFilter('All Products');
                setActivePage('shop');
              }}
              className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Explore all best sellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {isLoadingProducts ? (
            <ProductGridSkeleton count={4} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            Built for Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-1">
            Practical digital resources for the modern creator.
          </h2>
          <p className="text-sm text-neutral-400 mt-3">
            Instant access. Download and start using. No fluffy filler, no 500-page bloated theory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant Automated Access</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Never wait for shipping or manual fulfillment. Your secure download links and access tokens appear immediately on screen and arrive in your inbox in 3 seconds.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Battle-Tested Frameworks</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Every prompt, template, and spreadsheet has been field-tested in real client projects, high-stakes student exams, and production digital businesses.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Lifetime Edition Updates</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Software and AI models evolve rapidly. When we update prompt syntax or release new e-book revisions, you get the updated files for free forever.
            </p>
          </div>
        </div>
      </section>

      {/* 6. LIMITED-TIME BUNDLE CONVERSION OFFER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950/80 via-neutral-900 to-purple-950/80 border border-indigo-500/30 p-8 sm:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>LIMITED TIME BUNDLE SPECIAL • SAVE 60%</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
                The Complete 2026 Gen Z Career & Wealth Suite
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                Get our flagship e-book <em>"How to Be Financially Free in Young Age"</em> + <em>The 3,500+ AI Creator Mega-Pack</em> + <em>The Life & Business Notion OS</em> bundled together.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  8-Page Illustrated Master Guide (PDF)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  3,500+ Prompt Vault
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Complete Notion 2nd Brain
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs text-neutral-400 line-through">
                  Total Value: {formatPrice(121)}
                </span>
                <div className="text-3xl sm:text-4xl font-bold font-display text-white">
                  {formatPrice(49)}
                </div>
                <span className="inline-block text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Instant Savings of $72
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const p1 = products.find(p => p.id === 'prod-fin-free');
                  const p2 = products.find(p => p.id === 'prod-ai-mega');
                  if (p1) addToCart(p1, 1);
                  if (p2) addToCart(p2, 1);
                }}
                className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Bundle to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-neutral-400">
                Instant delivery • 100% money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEW RELEASES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Out of the Lab</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              New Releases
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Newly published frameworks calibrated for the latest 2026 digital landscape.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveCategoryFilter('All Products');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View all new tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS / TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Verified Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-1">
            Loved by ambitious young operators.
          </h2>
          <p className="text-sm text-neutral-400 mt-3">
            Real feedback from college students, freelance designers, creators, and indie builders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map(rev => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.authorName}</h4>
                  <p className="text-[11px] text-neutral-400">{rev.authorRole}</p>
                </div>
                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Everything you need to know about purchasing, accessing, and using our digital materials.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.slice(0, 5).map(faq => {
            const isOpen = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-neutral-900/60 border border-neutral-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setActivePage('faq');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
          >
            <span>View all FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white max-w-xl mx-auto">
            Ready to build, create, and master high-income skills?
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto">
            Explore our curated catalog of digital products with instant automated access and lifetime updates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveCategoryFilter('All Products');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('ebooks');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
            >
              Browse E-books Only
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
