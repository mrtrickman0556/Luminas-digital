import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Share2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { downloadProductFile } from '../utils/fileDownloader';

export const EbookReaderModal: React.FC = () => {
  const { sampleModalProduct, closeSampleModal, addToCart, formatPrice, showToast } = useStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'page' | 'toc'>('page');

  useEffect(() => {
    // Reset to page 1 whenever a new product modal opens
    setCurrentPage(1);
    setViewMode('page');
  }, [sampleModalProduct?.id]);

  if (!sampleModalProduct) return null;

  const ebook = sampleModalProduct.ebookDetails;
  const pdfPages = ebook?.pdfPages || [];
  const totalPages = pdfPages.length > 0 ? pdfPages.length : (ebook?.pages || 8);

  const activePageData = pdfPages.find(p => p.pageNumber === currentPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleDownload = () => {
    downloadProductFile(sampleModalProduct);
    showToast('Download started for ' + sampleModalProduct.title, 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeSampleModal}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navigation Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/90 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Interactive E-Book Viewer
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neutral-800 text-neutral-300">
                  {pdfPages.length > 0 ? 'Full 8-Page Edition' : `${sampleModalProduct.pagesOrCount}`}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
                {sampleModalProduct.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Download button */}
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center gap-1.5 border border-neutral-700 transition-colors"
              title="Download E-Book copy"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={closeSampleModal}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subheader: Page Navigation Controls */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-950/50 border-b border-neutral-800 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-white transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs font-bold text-white">
              Page <span className="text-blue-400">{currentPage}</span> of {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-white transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Page Picker Pill Buttons */}
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pNum = idx + 1;
              return (
                <button
                  key={pNum}
                  type="button"
                  onClick={() => setCurrentPage(pNum)}
                  className={`w-6 h-6 rounded text-[10px] font-mono font-bold transition-all ${
                    currentPage === pNum
                      ? 'bg-blue-600 text-white shadow-sm scale-105'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {pNum}
                </button>
              );
            })}
          </div>

          {/* Table of Contents toggle */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'page' ? 'toc' : 'page')}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium"
          >
            {viewMode === 'page' ? 'View Index' : 'Back to Page'}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950/70">
          {viewMode === 'toc' ? (
            /* Table of Contents view */
            <div className="max-w-2xl mx-auto space-y-4 py-4 animate-in fade-in">
              <h4 className="text-base font-bold font-display text-white border-b border-neutral-800 pb-2">
                Document Index & Chapters
              </h4>
              <div className="space-y-2">
                {(ebook?.tableOfContents || []).map((chapter, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      setViewMode('page');
                    }}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 cursor-pointer flex items-center justify-between text-xs transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-blue-500/10 text-blue-400 font-mono text-[11px] font-bold flex items-center justify-center border border-blue-500/20">
                        {i + 1}
                      </span>
                      <span className="text-neutral-200 group-hover:text-white font-medium">
                        {chapter}
                      </span>
                    </div>
                    <span className="text-[11px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Page →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : activePageData ? (
            /* Authentic PDF Page Rendering (matching the uploaded user PDF style) */
            <div className="max-w-2xl mx-auto bg-[#2563eb] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1d4ed8] animate-in fade-in duration-150 text-slate-900">
              {/* Top Sunset Gradient Header Band on Page 1 */}
              {currentPage === 1 && (
                <div className="relative p-6 sm:p-8 bg-gradient-to-b from-orange-400 via-amber-300 to-amber-200 text-center border-b-2 border-blue-700/30">
                  <div className="absolute top-2 right-3 text-[10px] font-mono text-amber-950/60 uppercase tracking-wider font-semibold">
                    Lumina Digital Publishing
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight leading-tight">
                    How to Be Financially Free in Young Age
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1.5 tracking-wide">
                    A guide to budgeting and saving
                  </p>
                </div>
              )}

              {/* Page Title & Subtitle for Pages 2 to 8 */}
              {currentPage > 1 && (
                <div className="px-6 py-4 bg-[#1d4ed8] text-white flex items-center justify-between border-b border-blue-500/40">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-blue-200 uppercase">
                      Page {currentPage} of {totalPages}
                    </span>
                    <h2 className="text-sm sm:text-base font-black text-white font-display">
                      {activePageData.title}
                    </h2>
                    {activePageData.subtitle && (
                      <p className="text-[11px] text-blue-100/90 font-medium">
                        {activePageData.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-500/40 text-white flex items-center justify-center text-xs font-mono font-bold">
                    {currentPage}
                  </div>
                </div>
              )}

              {/* Page Body: Crisp White Rounded Cards on Cobalt Blue */}
              <div className="p-4 sm:p-6 space-y-4">
                {activePageData.cards?.map((card, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-white shadow-md border border-blue-100 space-y-2.5 text-slate-900"
                  >
                    {card.title && (
                      <h3 className="text-sm sm:text-base font-black text-slate-950 font-display tracking-tight border-b border-slate-100 pb-1.5 flex items-center justify-between">
                        <span>{card.title}</span>
                        {card.badge && (
                          <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                            {card.badge}
                          </span>
                        )}
                      </h3>
                    )}

                    {card.text && (
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-800 whitespace-pre-line font-normal">
                        {card.text}
                      </p>
                    )}

                    {/* Bullets with styled checkmarks/emojis */}
                    {card.bullets && card.bullets.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {card.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="text-xs sm:text-sm leading-relaxed flex items-start gap-2 text-slate-800">
                            <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Special Callout / Key Idea Note */}
                    {card.callout && (
                      <div className="mt-2.5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs font-semibold flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{card.callout}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Page Bottom Footer with Handle & Navigation */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-white/90 font-medium px-1">
                  <span>Author: @nikhil0556__</span>
                  <div className="flex items-center gap-2">
                    {currentPage < totalPages ? (
                      <button
                        type="button"
                        onClick={handleNextPage}
                        className="text-xs font-bold text-white bg-blue-700/80 hover:bg-blue-700 px-3 py-1 rounded-lg transition-colors"
                      >
                        Next: Page {currentPage + 1} →
                      </button>
                    ) : (
                      <span className="text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Complete Guide
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Fallback generic chapter text reader */
            <div className="max-w-2xl mx-auto bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <h4 className="text-lg font-bold text-white font-display">
                {ebook?.sampleChapterTitle}
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {ebook?.sampleChapterContent}
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-4 sm:px-6 py-3 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official digital edition by Lumina Digital & @nikhil0556__</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={() => {
                addToCart(sampleModalProduct, 1);
                closeSampleModal();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Get Full Access ({formatPrice(sampleModalProduct.price)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
