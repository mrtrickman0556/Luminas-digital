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
  Flame,
  HelpCircle,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  Palette,
  Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { STORE_SECTIONS, StoreSection } from '../data/searchSections';
import { TRENDING_100_SLASH_PROMPTS, SlashPrompt } from '../data/trendingSlashPrompts';
import { ONE_WORD_EDITING_PROMPTS, OneWordPrompt } from '../data/editingDesigningPrompts';

const FREE_SAMPLE_IDS = [1, 2, 3, 4];

interface LiveSearchDropdownProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory?: (category: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

const POPULAR_REQUIREMENTS = [
  { label: '🔥 100 Slash Prompts', query: '100 trending chatgpt prompts' },
  { label: '🎨 50 One-Word Prompts (Editing & Design)', query: 'editing' },
  { label: '📈 Trading & AI Prompts', query: 'trading' },
  { label: '💰 Gen Z Financial Playbook', query: 'financial playbook' },
  { label: '💻 Coding & Debug Commands', query: 'coding' },
  { label: '⚡ Notion Solopreneur OS', query: 'notion os' },
  { label: '📚 Strategy E-Books Library', query: 'ebooks' },
  { label: '🛡️ 14-Day Guarantee & FAQ', query: 'faq' }
];

export const LiveSearchDropdown: React.FC<LiveSearchDropdownProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  placeholder = 'Search products, sections, slash prompts, requirements (e.g., "trading", "/plan")...',
  className = '',
  autoFocus = false
}) => {
  const {
    products,
    navigateToProduct,
    addToCart,
    formatPrice,
    navigateToSection,
    navigateToRequirement,
    showToast,
    isProductPurchased
  } = useStore();

  const isPurchased100 = isProductPurchased('prod-chatgpt-100-slash');
  const isPurchased50 = isProductPurchased('prod-editing-designing-50-slash');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);

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

  const queryClean = searchQuery.trim().toLowerCase();

  // 1. Matching Sections based on user requirement
  const matchingSections = useMemo(() => {
    if (!queryClean) return [];
    return STORE_SECTIONS.filter(sec => {
      const matchTitle = sec.title.toLowerCase().includes(queryClean);
      const matchSubtitle = sec.subtitle.toLowerCase().includes(queryClean);
      const matchDesc = sec.description.toLowerCase().includes(queryClean);
      const matchKeywords = sec.keywords.some(k => k.includes(queryClean) || queryClean.includes(k));
      return matchTitle || matchSubtitle || matchDesc || matchKeywords;
    }).slice(0, 3);
  }, [queryClean]);

  // 2. Matching Slash Prompts (if user searches for slash commands or prompt tasks)
  const matchingSlashPrompts = useMemo(() => {
    if (!queryClean || queryClean.length < 2) return [];
    const cleanNoSlash = queryClean.replace('/', '');
    return TRENDING_100_SLASH_PROMPTS.filter(sp => {
      const matchCmd = sp.command.toLowerCase().includes(cleanNoSlash);
      const matchAction = sp.action.toLowerCase().includes(queryClean);
      const matchCat = sp.category.toLowerCase().includes(queryClean);
      const matchTemplate = sp.promptTemplate.toLowerCase().includes(queryClean);
      return matchCmd || matchAction || matchCat || matchTemplate;
    }).slice(0, 3);
  }, [queryClean]);

  // 2.5 Matching One-Word Editing & Designing Prompts
  const matchingOneWordPrompts = useMemo(() => {
    if (!queryClean || queryClean.length < 2) return [];
    const cleanNoSlash = queryClean.replace('/', '');
    return ONE_WORD_EDITING_PROMPTS.filter(p => {
      const matchCmd = p.command.toLowerCase().includes(cleanNoSlash);
      const matchKeyword = p.keyword.toLowerCase().includes(cleanNoSlash);
      const matchAction = p.action.toLowerCase().includes(queryClean);
      const matchCat = p.category.toLowerCase().includes(queryClean);
      const matchTemplate = p.promptTemplate.toLowerCase().includes(queryClean);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(queryClean));
      return matchCmd || matchKeyword || matchAction || matchCat || matchTemplate || matchTags;
    }).slice(0, 3);
  }, [queryClean]);

  // 3. Matching Products in Catalog
  const matchingProducts = useMemo(() => {
    if (!queryClean) return [];
    return products.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(queryClean);
      const matchSubtitle = p.subtitle ? p.subtitle.toLowerCase().includes(queryClean) : false;
      const matchDesc = p.shortDescription.toLowerCase().includes(queryClean);
      const matchCat = p.category.toLowerCase().includes(queryClean);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(queryClean));
      return matchTitle || matchSubtitle || matchDesc || matchCat || matchTags;
    }).slice(0, 4);
  }, [products, queryClean]);

  // 4. Matching Categories
  const matchingCategories = useMemo(() => {
    if (!queryClean) return [];
    const categories: string[] = Array.from(new Set(products.map(p => String(p.category))));
    return categories.filter((cat: string) => cat.toLowerCase().includes(queryClean));
  }, [products, queryClean]);

  const hasAnyResults =
    matchingSections.length > 0 ||
    matchingSlashPrompts.length > 0 ||
    matchingOneWordPrompts.length > 0 ||
    matchingProducts.length > 0 ||
    matchingCategories.length > 0;

  const handleCopySlashPrompt = (e: React.MouseEvent, prompt: SlashPrompt) => {
    e.stopPropagation();
    const isLocked = !isPurchased100 && !FREE_SAMPLE_IDS.includes(prompt.id);
    if (isLocked) {
      const prod = products.find(p => p.id === 'prod-chatgpt-100-slash' || p.id === 'prod-trending-100-slash-prompts');
      if (prod) addToCart(prod, 1);
      showToast('Prompt is protected! Added the $20 PDF Book to your cart.', 'info');
      return;
    }
    navigator.clipboard.writeText(prompt.promptTemplate);
    setCopiedPromptId(prompt.id);
    showToast(`Copied ${prompt.command} prompt to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedPromptId(null);
    }, 2000);
  };

  const handleCopyOneWordPrompt = (e: React.MouseEvent, prompt: OneWordPrompt) => {
    e.stopPropagation();
    const isLocked = !isPurchased50 && !FREE_SAMPLE_IDS.includes(prompt.id);
    if (isLocked) {
      const prod = products.find(p => p.id === 'prod-editing-designing-50-slash');
      if (prod) addToCart(prod, 1);
      showToast('Prompt is protected! Added the $20 Editing PDF Book to your cart.', 'info');
      return;
    }
    navigator.clipboard.writeText(prompt.promptTemplate);
    setCopiedPromptId(1000 + prompt.id);
    showToast(`Copied ${prompt.command} prompt for ${prompt.keyword}!`, 'success');
    setTimeout(() => {
      setCopiedPromptId(null);
    }, 2000);
  };

  const handleSectionClick = (section: StoreSection) => {
    setIsOpen(false);
    navigateToSection(section);
  };

  const handleSlashPromptClick = (prompt: SlashPrompt) => {
    setIsOpen(false);
    // Find the 100 Trending Prompts section and jump to it
    const trendingSec = STORE_SECTIONS.find(s => s.id === 'trending-slash-prompts');
    if (trendingSec) {
      navigateToSection(trendingSec);
    }
  };

  const handleOneWordPromptClick = (prompt: OneWordPrompt) => {
    setIsOpen(false);
    const editingSec = STORE_SECTIONS.find(s => s.id === 'editing-designing-prompts');
    if (editingSec) {
      navigateToSection(editingSec);
    } else {
      navigateToProduct('50-trending-one-word-slash-prompts-editing-designing');
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

  const handleRequirementClick = (query: string) => {
    onSearchChange(query);
    setIsOpen(false);
    navigateToRequirement(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (matchingProducts.length > 0 && selectedIndex >= 0 && selectedIndex < matchingProducts.length) {
        handleProductClick(matchingProducts[selectedIndex]);
      } else if (matchingSections.length > 0 && !queryClean.includes('all')) {
        handleSectionClick(matchingSections[0]);
      } else if (searchQuery.trim()) {
        setIsOpen(false);
        navigateToRequirement(searchQuery);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const renderSectionIcon = (iconName: StoreSection['iconName']) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-4 h-4 text-cyan-400" />;
      case 'Palette':
        return <Palette className="w-4 h-4 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-purple-400" />;
      case 'Star':
        return <Star className="w-4 h-4 text-amber-400" />;
      case 'HelpCircle':
        return <HelpCircle className="w-4 h-4 text-sky-400" />;
      case 'Zap':
      default:
        return <Zap className="w-4 h-4 text-emerald-400" />;
    }
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

      {/* Real-time Search Dropdown connected to Sections, Prompts & Products */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-50 bg-neutral-900/98 backdrop-blur-xl border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto divide-y divide-neutral-800/80">
          {/* Active Query Results */}
          {queryClean.length > 0 && hasAnyResults && (
            <>
              {/* Category Quick Filter Pills */}
              {matchingCategories.length > 0 && (
                <div className="p-2.5 bg-neutral-950/70 flex items-center gap-2 overflow-x-auto text-xs">
                  <span className="text-[11px] text-neutral-400 font-mono shrink-0">Collection Match:</span>
                  {matchingCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        if (onSelectCategory) {
                          onSelectCategory(cat);
                        } else {
                          navigateToRequirement(cat);
                        }
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

              {/* 1. SECTION MATCHES (Connects search directly to store sections) */}
              {matchingSections.length > 0 && (
                <div className="p-2.5 space-y-1.5 bg-neutral-950/40">
                  <div className="px-2 py-1 flex items-center justify-between text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Matching Store Sections ({matchingSections.length})
                    </span>
                    <span className="text-[10px] text-neutral-500 font-normal">Direct Section Navigation</span>
                  </div>

                  {matchingSections.map(sec => (
                    <div
                      key={sec.id}
                      onClick={() => handleSectionClick(sec)}
                      className="p-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          {renderSectionIcon(sec.iconName)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                              {sec.title}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0">
                              {sec.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                            {sec.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
                        <span>Go to section</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. MATCHING CHATGPT SLASH PROMPTS (Connects queries like /plan, trading, debug, exam to exact commands) */}
              {matchingSlashPrompts.length > 0 && (
                <div className="p-2.5 space-y-1.5 bg-neutral-950/30">
                  <div className="px-2 py-1 flex items-center justify-between text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-cyan-400" />
                      Matching Slash Commands ({matchingSlashPrompts.length})
                    </span>
                    <span className="text-[10px] text-neutral-500 font-normal">From 100 Prompts Vault</span>
                  </div>

                  {matchingSlashPrompts.map(prompt => {
                    const isLocked = !isPurchased100 && !FREE_SAMPLE_IDS.includes(prompt.id);

                    return (
                      <div
                        key={prompt.id}
                        onClick={() => handleSlashPromptClick(prompt)}
                        className="p-2.5 rounded-xl bg-neutral-900/70 hover:bg-neutral-850 border border-neutral-800/80 hover:border-indigo-500/30 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="px-2 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs shrink-0">
                            {prompt.command}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white truncate">
                                {prompt.action}
                              </span>
                              {isLocked ? (
                                <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                                  <Lock className="w-2.5 h-2.5" /> $20 Book
                                </span>
                              ) : (
                                <span className="text-[10px] text-neutral-500 font-mono">
                                  ({prompt.category})
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-400 font-mono truncate mt-0.5">
                              {isLocked ? 'Full template protected • Available in $20 PDF Book' : prompt.promptTemplate}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isLocked ? (
                            <button
                              type="button"
                              onClick={(e) => handleCopySlashPrompt(e, prompt)}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Unlock with $20 PDF Book"
                            >
                              <Lock className="w-3 h-3 text-cyan-400" />
                              <span>Unlock</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleCopySlashPrompt(e, prompt)}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Copy prompt template"
                            >
                              {copiedPromptId === prompt.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-neutral-400" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 2.5 MATCHING ONE-WORD EDITING & DESIGNING PROMPTS */}
              {matchingOneWordPrompts.length > 0 && (
                <div className="p-2 space-y-1 border-b border-neutral-800/80">
                  <div className="px-3 py-1 flex items-center justify-between text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5" />
                      <span>One-Word Editing & Design Prompts ({matchingOneWordPrompts.length})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        const sec = STORE_SECTIONS.find(s => s.id === 'editing-designing-prompts');
                        if (sec) navigateToSection(sec);
                      }}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open 50 Prompts</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  {matchingOneWordPrompts.map((prompt) => {
                    const isLocked = !isPurchased50 && !FREE_SAMPLE_IDS.includes(prompt.id);

                    return (
                      <div
                        key={prompt.id}
                        onClick={() => handleOneWordPromptClick(prompt)}
                        className="p-2.5 rounded-xl hover:bg-neutral-800/70 cursor-pointer transition-all flex items-center justify-between gap-3 border border-transparent hover:border-indigo-500/20"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="px-2 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono font-bold text-xs shrink-0">
                            {prompt.command}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white truncate">
                                {prompt.keyword}: {prompt.action}
                              </span>
                              {isLocked ? (
                                <span className="text-[10px] text-indigo-400 font-mono flex items-center gap-1 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">
                                  <Lock className="w-2.5 h-2.5" /> $20 Book
                                </span>
                              ) : (
                                <span className="text-[10px] text-neutral-500 font-mono">
                                  ({prompt.category})
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-400 font-mono truncate mt-0.5">
                              {isLocked ? 'Visual directive protected • Available in $20 PDF Book' : prompt.promptTemplate}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isLocked ? (
                            <button
                              type="button"
                              onClick={(e) => handleCopyOneWordPrompt(e, prompt)}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Unlock with $20 PDF Book"
                            >
                              <Lock className="w-3 h-3 text-indigo-400" />
                              <span>Unlock</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleCopyOneWordPrompt(e, prompt)}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Copy prompt template"
                            >
                              {copiedPromptId === 1000 + prompt.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-neutral-400" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. MATCHING PRODUCTS */}
              {matchingProducts.length > 0 && (
                <div className="p-2 space-y-1">
                  <div className="px-3 py-1 flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    <span>Matching Products ({matchingProducts.length})</span>
                    <span className="hidden sm:inline text-[10px]">Click to view details</span>
                  </div>

                  {matchingProducts.map((product, idx) => {
                    const discountPercent = product.originalPrice
                      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                      : null;

                    return (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          selectedIndex === idx
                            ? 'bg-neutral-800 text-white'
                            : 'hover:bg-neutral-800/60 text-neutral-200'
                        }`}
                      >
                        {/* Thumbnail & Info */}
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
                              <span className="hidden sm:flex items-center gap-0.5 text-amber-400">
                                <Star className="w-3 h-3 fill-amber-400" />
                                <span>{product.rating.toFixed(1)}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing & Add Button */}
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

                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(e, product)}
                            className="p-2 rounded-lg bg-neutral-700/60 hover:bg-indigo-600 text-neutral-300 hover:text-white transition-colors"
                            title="Add to cart"
                            aria-label="Add to cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Action: View all matching items in catalog */}
              <div className="p-3 bg-neutral-950/90 flex items-center justify-between text-xs text-neutral-400">
                <span>
                  Showing results for <strong className="text-white">"{searchQuery}"</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigateToRequirement(searchQuery);
                  }}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Filter entire catalog view</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </>
          )}

          {/* No direct match: suggest topics & sections */}
          {queryClean.length > 0 && !hasAnyResults && (
            <div className="p-6 text-center space-y-4">
              <div className="w-10 h-10 mx-auto rounded-xl bg-neutral-800 text-neutral-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  No exact matches found for "{searchQuery}"
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Explore our core requirement sections or click below to search all available digital assets.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-neutral-400 block mb-2">
                  Jump to requirement category:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {POPULAR_REQUIREMENTS.map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleRequirementClick(item.query)}
                      className="px-3 py-1.5 rounded-xl text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700/60 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty query or initial focus: Popular requirements shortcuts */}
          {queryClean.length === 0 && (
            <div className="p-4 space-y-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Popular Requirements & Shortcuts</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_REQUIREMENTS.map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleRequirementClick(item.query)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/60 transition-colors flex items-center gap-1.5"
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Jump to Store Sections */}
              <div className="pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Quick-Jump Store Sections</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STORE_SECTIONS.slice(0, 4).map(sec => (
                    <div
                      key={sec.id}
                      onClick={() => handleSectionClick(sec)}
                      className="p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/70 hover:border-neutral-700 cursor-pointer flex items-center gap-2.5 text-xs transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-neutral-950 flex items-center justify-center shrink-0">
                        {renderSectionIcon(sec.iconName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-white font-semibold block truncate">
                          {sec.title}
                        </span>
                        <span className="text-[10px] text-neutral-400 truncate block">
                          {sec.badge}
                        </span>
                      </div>
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
