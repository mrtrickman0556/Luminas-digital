import React, { useState } from 'react';
import { Sparkles, Terminal, Copy, Check, Bot, Cpu, ArrowRight, Eye, ShoppingBag, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/ProductGridSkeleton';
import { AI_PROMPT_SUBCATEGORIES } from '../data/initialProducts';

export const AiPromptsPage: React.FC = () => {
  const { products, openPromptModal, addToCart, formatPrice, isLoadingProducts } = useStore();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All AI Prompts');
  const [activeCopied, setActiveCopied] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubcategoryChange = (sub: string) => {
    if (selectedSubcategory === sub) return;
    setIsTransitioning(true);
    setSelectedSubcategory(sub);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 280);
  };

  const isLoading = isLoadingProducts || isTransitioning;

  const promptProducts = products.filter(
    p => p.category === 'AI Prompts' || p.category === 'Prompt Packs' || p.aiDetails !== undefined
  );

  const filteredPromptProducts = promptProducts.filter(p => {
    if (selectedSubcategory === 'All AI Prompts') return true;
    const cat = selectedSubcategory;
    if (p.tags.includes(cat)) return true;
    if (p.aiDetails?.categoriesIncluded.includes(cat)) return true;
    return false;
  });

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setActiveCopied(id);
    setTimeout(() => setActiveCopied(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Terminal className="w-3.5 h-3.5" />
          <span>Curated AI Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">
          Engineered AI Prompts & Mega-Packs
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Stop prompting with simple questions and getting generic robotic fluff. Unlock calibrated prompt vaults tested on GPT-4o, Claude 3.5 Sonnet, and Midjourney.
        </p>
      </div>

      {/* Interactive Quick-Test Prompt Playground Banner */}
      <div className="rounded-2xl bg-neutral-900 border border-indigo-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Try a Live Sample Prompt from the 3,500+ Mega-Pack
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">100% Free to test</span>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-neutral-800 font-mono text-xs sm:text-sm text-neutral-200 leading-relaxed relative">
          <p>
            <span className="text-indigo-400 font-bold">System:</span> Act as an elite direct-response growth marketer.<br />
            <span className="text-emerald-400 font-bold">Prompt:</span> I am selling [PRODUCT_NAME] to [GEN_Z_AUDIENCE]. The primary pain point is [PAIN_POINT]. Generate 3 high-converting landing page hooks using psychological pattern interrupts. Remove all corporate jargon like "revolutionize" or "supercharge".
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800/80">
            <span className="text-[11px] text-neutral-400">
              Compatible with ChatGPT, Claude 3.5 Sonnet, and Gemini Pro
            </span>
            <button
              type="button"
              onClick={() =>
                handleCopyPrompt(
                  `Act as an elite direct-response growth marketer. I am selling [PRODUCT_NAME] to [GEN_Z_AUDIENCE]. The primary pain point is [PAIN_POINT]. Generate 3 high-converting landing page hooks using psychological pattern interrupts. Remove all corporate jargon like "revolutionize" or "supercharge".`,
                  'hero-test-prompt'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors border border-neutral-700 cursor-pointer"
            >
              {activeCopied === 'hero-test-prompt' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Browse Prompt Specialties
          </h3>
          <span className="text-xs text-neutral-400">
            {filteredPromptProducts.length} Premium Packs
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {AI_PROMPT_SUBCATEGORIES.map(sub => {
            const isSelected = selectedSubcategory === sub;
            return (
              <button
                key={sub}
                type="button"
                onClick={() => handleSubcategoryChange(sub)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt Packs Products Grid / Skeleton Loading */}
      {isLoading ? (
        <ProductGridSkeleton count={3} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromptProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* How to use AI Prompts Information box */}
      <section className="p-8 sm:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-6">
        <div className="max-w-xl">
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            Quick Tutorial
          </span>
          <h2 className="text-2xl font-bold font-display text-white mt-1">
            How to Use Lumina Prompt Vaults
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Our prompt packs are engineered with strict parameter brackets to give you instant executive-level outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <span className="text-indigo-400 font-mono text-xs font-bold">STEP 01</span>
            <h4 className="text-sm font-bold text-white">Choose & Copy Prompt</h4>
            <p className="text-xs text-neutral-400">
              Browse your downloaded Notion vault or plain text file and copy any calibrated prompt with 1 click.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <span className="text-emerald-400 font-mono text-xs font-bold">STEP 02</span>
            <h4 className="text-sm font-bold text-white">Fill in Your Parameters</h4>
            <p className="text-xs text-neutral-400">
              Replace bracketed fields like &#123;target_audience&#125; or &#123;product_goal&#125; with your exact business details.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <span className="text-purple-400 font-mono text-xs font-bold">STEP 03</span>
            <h4 className="text-sm font-bold text-white">Paste & Get Elite Results</h4>
            <p className="text-xs text-neutral-400">
              Paste directly into ChatGPT, Claude 3.5, or Gemini. Experience human-quality, high-converting outputs immediately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
