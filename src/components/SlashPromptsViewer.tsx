import React, { useState, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  Terminal,
  Sparkles,
  Filter,
  ChevronRight,
  BookOpen,
  ExternalLink,
  Download,
  Lock,
  Unlock,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { TRENDING_100_SLASH_PROMPTS, SLASH_CATEGORIES, SlashPrompt } from '../data/trendingSlashPrompts';
import { useStore } from '../context/StoreContext';
import { copyTextToClipboard } from '../utils/clipboard';

const FREE_SAMPLE_IDS = [1, 2, 3, 4];

interface SlashPromptsViewerProps {
  initialCategory?: string;
  showHeroBanner?: boolean;
  onSelectPrompt?: (prompt: SlashPrompt) => void;
  className?: string;
}

export const SlashPromptsViewer: React.FC<SlashPromptsViewerProps> = ({
  initialCategory = 'All',
  showHeroBanner = true,
  onSelectPrompt,
  className = ''
}) => {
  const {
    showToast,
    addToCart,
    products,
    navigateToProduct,
    formatPrice,
    isProductPurchased,
    downloadItem
  } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPage, setSelectedPage] = useState<number | 'all'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const product = products.find(p => p.id === 'prod-chatgpt-100-slash');
  const isPurchased = isProductPurchased('prod-chatgpt-100-slash');

  const filteredPrompts = useMemo(() => {
    return TRENDING_100_SLASH_PROMPTS.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedPage !== 'all' && p.page !== selectedPage) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchCommand = p.command.toLowerCase().includes(q);
        const matchAction = p.action.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchTemplate = p.promptTemplate.toLowerCase().includes(q);
        return matchCommand || matchAction || matchCat || matchTemplate;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedPage]);

  const handleCopyCommand = async (prompt: SlashPrompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLocked = !isPurchased && !FREE_SAMPLE_IDS.includes(prompt.id);
    if (isLocked) {
      if (product) addToCart(product, 1);
      showToast('This prompt is locked. Added the $20 PDF Book to cart to unlock!', 'info');
      return;
    }
    await copyTextToClipboard(`${prompt.command} `);
    setCopiedId(prompt.id);
    showToast(`Copied "${prompt.command}" to clipboard!`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyTemplate = async (prompt: SlashPrompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLocked = !isPurchased && !FREE_SAMPLE_IDS.includes(prompt.id);
    if (isLocked) {
      if (product) addToCart(product, 1);
      showToast('Locked! Purchase the official 100 Prompts PDF Book ($20) to unlock full templates.', 'info');
      return;
    }
    await copyTextToClipboard(prompt.promptTemplate);
    setCopiedId(prompt.id);
    showToast(`Copied full template for ${prompt.command}!`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
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
                  : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
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
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {isPurchased ? 'Purchased & Active' : 'PDF Book Required: $20'}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                {isPurchased
                  ? 'You have full digital ownership. All 100 slash-command prompt templates are 1-click copyable. Download the official 4-page printable cheatsheet below.'
                  : 'Test the first 4 sample prompts below with 1-click copy. The remaining 96 prompt templates are protected and sold exclusively in the official $20 PDF Book.'}
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
                  <span>Download PDF Cheatsheet</span>
                </button>
              )
            ) : (
              product && (
                <button
                  type="button"
                  onClick={() => addToCart(product, 1)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Unlock All 100 Prompts ({formatPrice(product.price)})</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Featured Header Card if requested */}
      {showHeroBanner && (
        <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-cyan-950/30 border border-cyan-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Terminal className="w-3.5 h-3.5" />
                <span>OFFICIAL CHEATSHEET • 100 SLASH COMMANDS • $20 PDF BOOK</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
                100 Trending ChatGPT "/" Prompts
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                A quick-reference list of slash-style prompt commands, grouped by category. Type these directly or set them up in ChatGPT Custom Instructions for instant execution.
              </p>

              {/* Quick stats pills */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-neutral-400">
                <span className="px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-200">
                  <strong className="text-cyan-400">100</strong> Prompts
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-200">
                  <strong className="text-cyan-400">8</strong> Core Categories
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-200">
                  <strong className="text-cyan-400">4-Page</strong> PDF Book
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-200">
                  <strong className="text-emerald-400">$20</strong> Official Price
                </span>
              </div>
            </div>

            {/* Action buttons */}
            {product && (
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                {isPurchased ? (
                  <button
                    type="button"
                    onClick={() => downloadItem(product)}
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Book</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy PDF Book ({formatPrice(product.price)})</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigateToProduct(product.slug)}
                  className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-neutral-700 cursor-pointer"
                >
                  <span>View Product Details</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Control Bar: Search & Page Selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts (e.g. /plan, /debug, /eli5, resume)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* 4-Page Selector Tabs matching PDF Document */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs overflow-x-auto scrollbar-none">
          <span className="px-2 text-[11px] font-mono text-neutral-500 hidden md:inline">PDF Page:</span>
          {(['all', 1, 2, 3, 4] as const).map((page) => {
            const isActive = selectedPage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setSelectedPage(page)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {page === 'all' ? 'All (1-100)' : `Page ${page}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SLASH_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = cat === 'All'
            ? TRENDING_100_SLASH_PROMPTS.length
            : TRENDING_100_SLASH_PROMPTS.filter(p => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cyan-500 text-neutral-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                isSelected ? 'bg-neutral-950/20 text-neutral-900' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Count Indicator */}
      <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
        <div>
          Showing <strong className="text-white font-mono">{filteredPrompts.length}</strong> slash commands
          {selectedCategory !== 'All' && <span> in <strong className="text-cyan-400">{selectedCategory}</strong></span>}
          {selectedPage !== 'all' && <span> (Page {selectedPage})</span>}
        </div>
        <div className="text-[11px] text-neutral-500">
          Click any card to copy command or expand full template
        </div>
      </div>

      {/* Grid of 100 Slash Prompts */}
      {filteredPrompts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
          <p className="text-sm font-bold text-white">No prompt commands found</p>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search query or switching to "All" categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedPage('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrompts.map((prompt) => {
            const isExpanded = expandedId === prompt.id;
            const isCopied = copiedId === prompt.id;
            const isLocked = !isPurchased && !FREE_SAMPLE_IDS.includes(prompt.id);

            return (
              <div
                key={prompt.id}
                onClick={() => {
                  setExpandedId(isExpanded ? null : prompt.id);
                  if (onSelectPrompt) onSelectPrompt(prompt);
                }}
                className={`group relative p-4 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-neutral-900 border-cyan-500/50 shadow-xl shadow-cyan-500/5'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div>
                  {/* Top Bar: Number + Category Tag + Page */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-neutral-800/90 text-neutral-300 flex items-center justify-center font-mono text-[11px] font-bold border border-neutral-700/60">
                        {prompt.id}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                        {prompt.category}
                      </span>
                    </div>
                    {isLocked ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        <Lock className="w-2.5 h-2.5" />
                        <span>$20 PDF Book</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-500">
                        p.{prompt.page}
                      </span>
                    )}
                  </div>

                  {/* Slash Command and Action */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-mono font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        {prompt.command}
                      </span>
                      <span className="text-neutral-500 text-sm">—</span>
                      <span className="text-xs sm:text-sm font-medium text-neutral-200 line-clamp-1">
                        {prompt.action}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Prompt Template View */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-neutral-800 space-y-2.5 text-xs animate-in fade-in duration-150">
                      {isLocked ? (
                        <div className="p-3.5 rounded-xl bg-black/60 border border-neutral-800 space-y-2.5 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-cyan-400">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Locked Premium Prompt Template</span>
                          </div>
                          <p className="text-[11px] text-neutral-300 max-w-xs mx-auto leading-relaxed">
                            Included in the official <strong>ChatGPT 100 “/” Prompts PDF Book ($20)</strong>. Unlocks 1-click copy for all 100 commands and includes the printable 4-page master cheatsheet.
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (product) addToCart(product, 1);
                              showToast('Added $20 PDF Book to cart to unlock!', 'info');
                            }}
                            className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Unlock for $20</span>
                          </button>
                        </div>
                      ) : (
                        <>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                              Full Ready-to-Paste Prompt:
                            </span>
                            <div className="p-2.5 rounded-lg bg-black/60 border border-neutral-800 font-mono text-[11px] text-neutral-300 leading-relaxed">
                              {prompt.promptTemplate}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
                              Example Input:
                            </span>
                            <div className="text-[11px] font-mono text-neutral-400 italic">
                              "{prompt.exampleUsage}"
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Quick Action Bar */}
                <div className="mt-3 pt-2.5 border-t border-neutral-800/60 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-neutral-500">
                    {isExpanded ? 'Click to collapse' : 'Click to expand'}
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
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-[11px] font-mono text-cyan-300 transition-colors border border-cyan-500/30 cursor-pointer flex items-center gap-1"
                      >
                        <Lock className="w-3 h-3 text-cyan-400" />
                        <span>Unlock ($20)</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={(e) => handleCopyCommand(prompt, e)}
                          title={`Copy ${prompt.command}`}
                          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono text-cyan-300 transition-colors border border-neutral-700 cursor-pointer flex items-center gap-1"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        {isExpanded && (
                          <button
                            type="button"
                            onClick={(e) => handleCopyTemplate(prompt, e)}
                            title="Copy full calibrated prompt template"
                            className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-[11px] font-mono text-cyan-400 transition-colors border border-cyan-500/30 cursor-pointer"
                          >
                            Copy Template
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
