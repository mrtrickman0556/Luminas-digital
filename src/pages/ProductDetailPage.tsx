import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  BookOpen,
  Sparkles,
  Terminal,
  Copy,
  Check,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Heart,
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { EbookMockup } from '../components/EbookMockup';
import { PromptPackMockup } from '../components/PromptPackMockup';
import { TemplateMockup } from '../components/TemplateMockup';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailSkeleton } from '../components/ProductDetailSkeleton';
import { SlashPromptsViewer } from '../components/SlashPromptsViewer';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductSlug,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    openSampleModal,
    openPromptModal,
    reviews,
    addReview,
    showToast,
    setActivePage,
    isLoadingProductDetail
  } = useStore();

  // Find product by slug or default to first
  const product = products.find(p => p.slug === selectedProductSlug) || products[0];

  const [activeTab, setActiveTab] = useState<'details' | 'included' | 'reviews' | 'faq'>('details');
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Perceived performance loading skeleton state
  if (isLoadingProductDetail) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-400">
        Product not found.{' '}
        <button
          type="button"
          onClick={() => setActivePage('shop')}
          className="text-indigo-400 underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id || r.productId === undefined);
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleCopyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(idx);
    showToast('Prompt copied to clipboard!', 'success');
    setTimeout(() => setCopiedPromptIndex(null), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    addReview({
      productId: product.id,
      authorName: newReviewAuthor,
      authorRole: newReviewRole || 'Verified Customer',
      rating: newReviewRating,
      comment: newReviewComment,
      verifiedPurchase: true
    });
    setNewReviewAuthor('');
    setNewReviewRole('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  const renderProductMockup = () => {
    if (product.category === 'E-books') {
      return <EbookMockup product={product} size="lg" />;
    }
    if (product.category === 'AI Prompts' || product.category === 'Prompt Packs') {
      return <PromptPackMockup product={product} size="lg" />;
    }
    return <TemplateMockup product={product} size="lg" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400">
        <button
          type="button"
          onClick={() => setActivePage('home')}
          className="hover:text-white transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => setActivePage('shop')}
          className="hover:text-white transition-colors"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-neutral-200 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Large Mockup Preview */}
        <div className="lg:col-span-6 sticky top-24">
          <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-8 sm:p-14 flex items-center justify-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
            {renderProductMockup()}
          </div>

          {/* Quick preview modal trigger */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {product.ebookDetails && (
              <button
                type="button"
                onClick={() => openSampleModal(product)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>
                  {product.ebookDetails.pdfPages
                    ? `Open ${product.ebookDetails.pdfPages.length}-Page PDF Viewer`
                    : 'Read Free Sample Chapter'}
                </span>
              </button>
            )}
            {product.aiDetails && (
              <button
                type="button"
                onClick={() => openPromptModal(product)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Test Prompts in Interactive Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Product Details & Purchase Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                  {product.category}
                </span>
                {product.isBestSeller && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Best Seller
                  </span>
                )}
                <span className="text-xs text-neutral-400 font-mono">
                  {product.pagesOrCount}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-500/20 border-rose-500/30 text-rose-400'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
                title="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-display text-white leading-tight">
              {product.title}
            </h1>

            {product.subtitle && (
              <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
                {product.subtitle}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-3 text-xs pt-1">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">{product.rating.toFixed(2)}</span>
              <span className="text-neutral-500">
                ({product.reviewCount} customer ratings)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold font-display text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountPercent && (
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Instant Delivery
              </span>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleBuyNow}
                className="py-3.5 px-6 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now (Instant Access)</span>
              </button>

              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                className="py-3.5 px-6 rounded-xl text-sm font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                14-Day Money Back Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Free Lifetime File Updates
              </span>
            </div>
          </div>

          {/* Quick Specifications Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Product Specifications:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">Format:</span>
                <span className="text-white font-medium">{product.format}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">Deliverable:</span>
                <span className="text-white font-medium">{product.pagesOrCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">File Size:</span>
                <span className="text-white font-medium">{product.fileSize || 'Digital Download'}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">Delivery:</span>
                <span className="text-emerald-400 font-medium">Automatic / Immediate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation: Details, What's Included, Reviews, FAQ */}
      <div className="border-t border-neutral-800 pt-10">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'details'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Overview & Benefits
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('included')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'included'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            What's Included & Who It's For
          </button>
          {product.aiDetails && (
            <button
              type="button"
              onClick={() => setActiveTab('included')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20"
            >
              AI Prompt Vault Specs ({product.aiDetails.promptCount} Prompts)
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>Reviews</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-800 text-neutral-300 font-mono">
              {productReviews.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'faq'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Product FAQ
          </button>
        </div>

        {/* Tab 1: Overview & Benefits */}
        {activeTab === 'details' && (
          <div className="py-8 space-y-8 animate-in fade-in duration-150">
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-xl font-bold font-display text-white">Product Overview</h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
                {product.fullDescription}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold font-display text-white">Key Transformation & Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.keyBenefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Prompts Specific Preview if applicable */}
            {product.aiDetails && (
              <div className="mt-8 p-6 rounded-2xl bg-neutral-900 border border-indigo-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-base font-bold text-white">Sample Prompts Included in this Pack</h4>
                  </div>
                  <span className="text-xs font-mono text-indigo-300">
                    {product.aiDetails.promptCount} Total Prompts
                  </span>
                </div>

                <div className="space-y-3">
                  {product.aiDetails.examplePrompts.map((sample, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-black/60 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-indigo-400">
                          {sample.category} • {sample.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyPrompt(sample.prompt, idx)}
                          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                        >
                          {copiedPromptIndex === idx ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Copied
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Copy className="w-3.5 h-3.5" /> Copy
                            </span>
                          )}
                        </button>
                      </div>
                      <p className="font-mono text-xs text-neutral-300 leading-relaxed">
                        {sample.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* If product is the 100 Slash Prompts product, embed the full interactive viewer */}
            {product.id === 'prod-chatgpt-100-slash' && (
              <div className="mt-10 pt-8 border-t border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-display text-white">
                    Interactive 100 Slash Prompts Cheatsheet Vault
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    Live 1-Click Copy Ready
                  </span>
                </div>
                <SlashPromptsViewer showHeroBanner={false} />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: What's Included & Who It's For */}
        {activeTab === 'included' && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-150">
            {/* What's Included */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-white">What is Included in Your Purchase</h3>
              <div className="space-y-3">
                {product.whatsIncluded.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3"
                  >
                    <Download className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It's For */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-white">Who This Product Is Specifically For</h3>
              <div className="space-y-3">
                {product.whoItsFor.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-8 space-y-8 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <h3 className="text-xl font-bold font-display text-white">Customer Reviews</h3>
                <p className="text-xs text-neutral-400">
                  Showing verified customer reviews and ratings.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors border border-neutral-700"
              >
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </button>
            </div>

            {/* Review submission form */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 max-w-xl"
              >
                <h4 className="text-sm font-bold text-white">Leave Your Review</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Jordan T."
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Role / Occupation</label>
                    <input
                      type="text"
                      value={newReviewRole}
                      onChange={(e) => setNewReviewRole(e.target.value)}
                      placeholder="e.g. Student / Freelancer"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Rating</label>
                  <select
                    aria-label="Select star rating"
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                  >
                    <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Your Feedback</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="How did this product help your workflow or learning?"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Submit Verified Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productReviews.map(rev => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono">{rev.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 text-xs">
                    <div>
                      <span className="font-bold text-white block">{rev.authorName}</span>
                      <span className="text-[11px] text-neutral-400">{rev.authorRole}</span>
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Product FAQ */}
        {activeTab === 'faq' && (
          <div className="py-8 space-y-4 max-w-3xl animate-in fade-in duration-150">
            <h3 className="text-xl font-bold font-display text-white mb-4">Product FAQ</h3>
            {[
              {
                q: 'How will I receive this product after payment?',
                a: 'Immediately upon checkout completion, you will be redirected to your personal Customer Access Page where you can download the file right away. A download link is also sent to your email.'
              },
              {
                q: 'What if I need help setting this up?',
                a: 'Every digital product includes detailed instructions, walkthrough videos, or cheat sheets. If you ever have a question, our support team at support@luminadigital.com responds within 12 hours.'
              },
              {
                q: 'Do I have to pay a subscription?',
                a: 'No. This is a one-time purchase with lifetime access and free future updates.'
              }
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                <h4 className="text-sm font-bold text-white">{faq.q}</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-display text-white">
              Frequently Bought Together & Related
            </h2>
            <button
              type="button"
              onClick={() => setActivePage('shop')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Explore more</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
