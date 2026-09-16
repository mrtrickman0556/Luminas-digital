import React, { useState, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  Sparkles,
  Palette,
  Camera,
  Layers,
  Share2,
  Tv,
  ArrowRight,
  BookOpen,
  Filter,
  Flame,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  Download,
  Lock,
  Unlock,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import {
  ONE_WORD_EDITING_PROMPTS,
  EDITING_PROMPT_CATEGORIES,
  OneWordPrompt
} from '../data/editingDesigningPrompts';
import { useStore } from '../context/StoreContext';

const FREE_SAMPLE_IDS = [1, 2, 3, 4];

interface EditingPromptsViewerProps {
  initialCategory?: string;
  showHeroBanner?: boolean;
  className?: string;
}

export const EditingPromptsViewer: React.FC<EditingPromptsViewerProps> = ({
  initialCategory = 'All Styles',
  showHeroBanner = true,
  className = ''
}) => {
  const {
    showToast,
    products,
    navigateToProduct,
    formatPrice,
    addToCart,
    isProductPurchased,
    downloadItem
  } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPage, setSelectedPage] = useState<number | 'all'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const product =
    products.find(p => p.id === 'prod-editing-designing-50-slash') ||
    products.find(p => p.slug === '50-trending-one-word-slash-prompts-editing-designing');

  const isPurchased = isProductPurchased('prod-editing-designing-50-slash');

  const filteredPrompts = useMemo(() => {
    return ONE_WORD_EDITING_PROMPTS.filter(p => {
      if (selectedCategory !== 'All Styles' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedPage !== 'all' && p.page !== selectedPage) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim().replace('/', '');
        const matchKeyword = p.keyword.toLowerCase().includes(q);
        const matchCommand = p.command.toLowerCase().includes(q);
        const matchAction = p.action.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchUseCase = p.useCase.toLowerCase().includes(q);
        const matchTemplate = p.promptTemplate.toLowerCase().includes(q);
        const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
        return (
          matchKeyword ||
          matchCommand ||
          matchAction ||
          matchCat ||
          matchUseCase ||
          matchTemplate ||
          matchTags
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedPage]);

  const handleCopyCommandOnly = (prompt: OneWordPrompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLocked = !isPurchased && !FREE_SAMPLE_IDS.includes(prompt.id);
    if (isLocked) {
      if (product) addToCart(product, 1);
      showToast('This prompt is locked. Added the $20 PDF Book to cart to unlock!', 'info');
      return;
    }
    navigator.clipboard.writeText(`${prompt.command} `);
    setCopiedId(prompt.id);
    showToast(`Copied command "${prompt.command}" to clipboard!`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyFullPrompt = (prompt: OneWordPrompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLocked = !isPurchased && !FREE_SAMPLE_IDS.includes(prompt.id);
    if (isLocked) {
      if (product) addToCart(product, 1);
      showToast('Locked! Purchase the official 50 Prompts PDF Book ($20) to unlock full templates.', 'info');
      return;
    }
    navigator.clipboard.writeText(prompt.promptTemplate);
    setCopiedId(prompt.id);
    showToast(`Copied ready-to-use prompt for ${prompt.command}!`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: OneWordPrompt['category']) => {
    switch (category) {
      case 'Photo & Lighting':
        return <Camera className="w-3.5 h-3.5 text-amber-400" />;
      case 'Aesthetic & Mood':
        return <Palette className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Social & Content Formats':
        return <Share2 className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Fashion & Lifestyle':
        return <Tv className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Materials & Creative Effects':
      default:
        return <Layers className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Access Status Banner (Sample Preview vs Full Access) */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-4 sm:p-5 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                isPurchased
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
              }`}
            >
              {isPurchased ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-white">
                  {isPurchased
                    ? 'Full Vault Access Unlocked'
                    : 'Sample Preview Mode (4 Free Prompts Unlocked)'}
                </h4>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    isPurchased
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {isPurchased ? 'Purchased & Active' : 'PDF Book Required: $20'}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                {isPurchased
                  ? 'You own the official 5-page PDF Book! All 50 editing & designing prompt directives are 1-click copyable.'
                  : 'Test the first 4 sample prompts below. The remaining 46 visual editing directives are locked and sold exclusively in the official $20 PDF Book.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            {isPurchased ? (
              product && (
                <button
                  type="button"
                  onClick={() => downloadItem(product)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download 5-Page PDF</span>
                </button>
              )
            ) : (
              product && (
                <button
                  type="button"
                  onClick={() => addToCart(product, 1)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Unlock All 50 Prompts ({formatPrice(product.price)})</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Featured Header Card */}
      {showHeroBanner && (
        <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/40 border border-indigo-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
                <span>EDITING & DESIGNING COLLECTION • 50 ONE-WORD PROMPTS • $20 PDF BOOK</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
                50 Trending One-Word “/” Prompts
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Ready to copy and use with ChatGPT & generative AI tools. Each prompt starts with a single trending-style keyword after <code className="text-indigo-300 bg-neutral-950 px-1.5 py-0.5 rounded font-mono text-xs">“/”</code> (like <code className="text-cyan-300 font-mono text-xs">/Cinematic</code>, <code className="text-cyan-300 font-mono text-xs">/Minimal</code>, <code className="text-cyan-300 font-mono text-xs">/Luxury</code>, <code className="text-cyan-300 font-mono text-xs">/Glitch</code>) for instant image and visual transformations.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-neutral-400 font-mono">Quick Format:</span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-950/80 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
                  /Keyword — [Visual Transformation Directive]
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] font-bold">
                  $20 Official PDF Book
                </span>
              </div>
            </div>

            {product && (
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 shrink-0 text-center space-y-3 max-w-xs backdrop-blur-md">
                <div className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  Official 5-Page PDF Book
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold font-mono text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-500 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {isPurchased ? (
                  <button
                    type="button"
                    onClick={() => downloadItem(product)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Book</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy PDF Book ({formatPrice(product.price)})</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigateToProduct(product.slug)}
                  className="w-full text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  View Details & Sample →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Control Bar: Search & Page Selection */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search one-word prompts (e.g. 'Cinematic', '3D', 'Thumbnail', 'Minimal', 'Lighting')..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Page Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] font-mono text-neutral-400 pr-1">PDF Page:</span>
          <button
            type="button"
            onClick={() => setSelectedPage('all')}
            className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors ${
              selectedPage === 'all'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            All (50)
          </button>
          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setSelectedPage(pageNum as any)}
              className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors ${
                selectedPage === pageNum
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              Pg {pageNum}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {EDITING_PROMPT_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === 'All Styles'
              ? ONE_WORD_EDITING_PROMPTS.length
              : ONE_WORD_EDITING_PROMPTS.filter(p => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map(prompt => {
          const isExpanded = expandedId === prompt.id;
          const isCopied = copiedId === prompt.id;
          const isLocked = !isPurchased && !FREE_SAMPLE_IDS.includes(prompt.id);

          return (
            <div
              key={prompt.id}
              onClick={() => setExpandedId(isExpanded ? null : prompt.id)}
              className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isExpanded
                  ? 'bg-neutral-900 border-indigo-500/50 shadow-xl shadow-indigo-950/20'
                  : 'bg-neutral-900/60 hover:bg-neutral-850 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="space-y-2.5">
                {/* Header row: ID + Command + Category */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 font-semibold">
                      #{prompt.id.toString().padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono font-bold text-xs">
                      {prompt.command}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isLocked && (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        <Lock className="w-2.5 h-2.5" />
                        <span>$20 PDF Book</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
                      {getCategoryIcon(prompt.category)}
                      <span className="truncate max-w-[120px]">{prompt.category}</span>
                    </span>
                  </div>
                </div>

                {/* Keyword & Action */}
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {prompt.keyword}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
                    {prompt.action}
                  </p>
                </div>

                {/* Prompt Template Box */}
                {isLocked ? (
                  <div className="relative p-3 rounded-xl bg-black/60 border border-neutral-800/80 font-mono text-[11px] overflow-hidden text-center space-y-1.5">
                    <div className="filter blur-sm select-none opacity-30 text-neutral-400 text-[10px] leading-tight line-clamp-2">
                      /{prompt.keyword} — Transform this image into a calibrated editorial composition with high-definition styling, lighting balance, and atmospheric fidelity...
                    </div>
                    <div className="text-[11px] font-medium text-indigo-300 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3 text-indigo-400" />
                      <span>Full Directive Locked in $20 PDF Book</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-black/50 border border-neutral-800/80 font-mono text-[11px] text-neutral-300 leading-relaxed">
                    <p className={isExpanded ? '' : 'line-clamp-3'}>
                      {prompt.promptTemplate}
                    </p>
                  </div>
                )}

                {/* Tags & Use Case */}
                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-neutral-500 font-mono">Use Case:</span>
                  <span className="text-[11px] text-neutral-300 truncate max-w-full font-sans">
                    {prompt.useCase}
                  </span>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-neutral-500">
                  PDF Page {prompt.page}
                </span>

                <div className="flex items-center gap-1.5">
                  {isLocked ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product) addToCart(product, 1);
                        showToast('Added $20 PDF Book to cart to unlock!', 'info');
                      }}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Unlock for $20</span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleCopyCommandOnly(prompt, e)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-mono transition-colors cursor-pointer"
                        title={`Copy only "${prompt.command}"`}
                      >
                        Copy /{prompt.keyword}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleCopyFullPrompt(prompt, e)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                        title="Copy full ready-to-use prompt"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No results fallback */}
      {filteredPrompts.length === 0 && (
        <div className="text-center py-12 bg-neutral-900/40 rounded-2xl border border-neutral-800 space-y-3">
          <Palette className="w-8 h-8 text-neutral-500 mx-auto" />
          <p className="text-sm font-semibold text-white">
            No one-word editing prompts found for "{searchQuery}"
          </p>
          <p className="text-xs text-neutral-400">
            Try searching for terms like "3D", "Cinematic", "Minimal", "Thumbnail", "Lighting", or "Story".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Styles');
              setSelectedPage('all');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-800 text-xs text-white hover:bg-neutral-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
