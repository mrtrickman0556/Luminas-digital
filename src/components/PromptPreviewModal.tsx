import React, { useState } from 'react';
import { X, Terminal, Copy, Check, Sparkles, ShoppingBag, Bot, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromptPreviewModal: React.FC = () => {
  const { promptModalProduct, closePromptModal, addToCart, formatPrice, showToast } = useStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!promptModalProduct) return null;

  const ai = promptModalProduct.aiDetails;
  const examplePrompts = ai?.examplePrompts || [];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    showToast('Prompt copied to clipboard! Ready to paste into ChatGPT or Claude.', 'success');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold">
                Interactive Prompt Preview & Tester
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {promptModalProduct.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={closePromptModal}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Compatible tools pill row */}
          {ai?.compatibleTools && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-neutral-400 font-medium">Compatible with:</span>
              {ai.compatibleTools.map((tool, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[11px]"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}

          {/* Example Prompts List */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Sample Prompts from this Vault ({examplePrompts.length} of {ai?.promptCount || promptModalProduct.pagesOrCount})
            </h4>

            {examplePrompts.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {item.category}
                    </span>
                    <h5 className="text-sm font-bold text-white">{item.title}</h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.prompt, idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-all border border-neutral-700"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Prompt Text Box */}
                <div className="p-3.5 rounded-lg bg-black/60 border border-neutral-800/80 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto selection:bg-indigo-500">
                  {item.prompt}
                </div>

                {item.outputPreview && (
                  <div className="text-[11px] text-neutral-400 flex items-start gap-1.5 pt-1">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span>Expected Result: {item.outputPreview}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to action footer box */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-950/40 via-neutral-900 to-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                Instant Access Deliverable
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                Get all {ai?.promptCount || promptModalProduct.pagesOrCount} + JSON & Notion Vault
              </h4>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xl font-bold font-display text-white">
                {formatPrice(promptModalProduct.price)}
              </span>
              <button
                type="button"
                onClick={() => {
                  addToCart(promptModalProduct, 1);
                  closePromptModal();
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Prompt Pack</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
