import React from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 skeleton-shimmer" role="status" aria-label="Loading product details">
      {/* Breadcrumb skeleton */}
      <nav className="flex items-center gap-2 text-xs">
        <div className="h-3.5 w-12 rounded bg-neutral-800 animate-pulse" />
        <span className="text-neutral-600">/</span>
        <div className="h-3.5 w-18 rounded bg-neutral-800 animate-pulse" />
        <span className="text-neutral-600">/</span>
        <div className="h-3.5 w-48 rounded bg-neutral-800/70 animate-pulse" />
      </nav>

      {/* Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Large Mockup Preview Skeleton */}
        <div className="lg:col-span-6 sticky top-24 space-y-4">
          <div className="rounded-3xl bg-neutral-900/80 border border-neutral-800 p-8 sm:p-14 flex items-center justify-center relative overflow-hidden shadow-2xl min-h-[440px] sm:min-h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
            
            {/* 3D Book / Digital Resource Silhouette */}
            <div className="w-52 sm:w-64 h-76 sm:h-92 rounded-2xl bg-neutral-800/80 border border-neutral-700/50 p-6 flex flex-col justify-between shadow-2xl relative animate-pulse">
              {/* Top tag & author placeholder */}
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-neutral-700/70" />
                <div className="h-2.5 w-14 rounded bg-neutral-700/40" />
              </div>

              {/* Center emblem placeholder */}
              <div className="w-16 h-16 rounded-2xl bg-neutral-700/50 mx-auto flex items-center justify-center border border-neutral-600/30">
                <div className="w-8 h-8 rounded-lg bg-neutral-600/40" />
              </div>

              {/* Bottom book title and edition line */}
              <div className="space-y-2 pt-4 border-t border-neutral-700/40">
                <div className="h-4 w-36 rounded bg-neutral-700/80" />
                <div className="h-3 w-24 rounded bg-neutral-700/50" />
              </div>
            </div>
          </div>

          {/* Quick sample preview modal button skeleton */}
          <div className="flex items-center justify-center">
            <div className="h-10 w-64 rounded-xl bg-neutral-900 border border-neutral-800 animate-pulse" />
          </div>
        </div>

        {/* Right: Product Details & Purchase Box Skeleton */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Meta */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="h-6 w-24 rounded-full bg-neutral-800 animate-pulse" />
                <div className="h-6 w-20 rounded-full bg-neutral-800/70 animate-pulse" />
                <div className="h-6 w-16 rounded-full bg-neutral-800/50 animate-pulse" />
              </div>

              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 animate-pulse" />
            </div>

            {/* Title skeleton */}
            <div className="space-y-2 pt-1">
              <div className="h-8 sm:h-10 w-11/12 rounded-lg bg-neutral-800 animate-pulse" />
              <div className="h-8 sm:h-10 w-3/4 rounded-lg bg-neutral-800/80 animate-pulse" />
            </div>

            {/* Subtitle skeleton */}
            <div className="h-4.5 w-4/5 rounded bg-neutral-800/60 animate-pulse pt-1" />

            {/* Rating skeleton */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded bg-neutral-800 animate-pulse" />
                ))}
              </div>
              <div className="h-4 w-10 rounded bg-neutral-800 animate-pulse" />
              <div className="h-4 w-32 rounded bg-neutral-800/50 animate-pulse" />
            </div>
          </div>

          {/* Pricing Box Skeleton */}
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <div className="h-9 sm:h-10 w-24 rounded-lg bg-neutral-800 animate-pulse" />
                <div className="h-5 w-16 rounded bg-neutral-800/60 animate-pulse" />
                <div className="h-5 w-20 rounded-md bg-neutral-800/70 animate-pulse" />
              </div>
              <div className="h-4 w-28 rounded bg-neutral-800/60 animate-pulse" />
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="h-12 rounded-xl bg-indigo-900/40 border border-indigo-500/30 animate-pulse" />
              <div className="h-12 rounded-xl bg-neutral-800 border border-neutral-700 animate-pulse" />
            </div>

            {/* Micro Guarantees */}
            <div className="pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-2">
              <div className="h-4 w-36 rounded bg-neutral-800/60 animate-pulse" />
              <div className="h-4 w-36 rounded bg-neutral-800/60 animate-pulse" />
            </div>
          </div>

          {/* Quick Specifications Checklist Skeleton */}
          <div className="space-y-2.5">
            <div className="h-4 w-40 rounded bg-neutral-800 animate-pulse" />
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5 animate-pulse">
                  <div className="h-3 w-14 rounded bg-neutral-800" />
                  <div className="h-4 w-24 rounded bg-neutral-700/60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Skeleton */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 overflow-x-auto scrollbar-none">
          {['Overview & Details', "What's Included", 'Customer Reviews', 'Frequently Asked Questions'].map((_, idx) => (
            <div
              key={idx}
              className={`h-9 rounded-xl animate-pulse ${
                idx === 0
                  ? 'w-36 bg-neutral-800 border border-neutral-700'
                  : 'w-28 bg-neutral-900 border border-neutral-800/60'
              }`}
            />
          ))}
        </div>

        {/* Tab Content Box Skeleton */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-4">
          <div className="h-5 w-48 rounded bg-neutral-800 animate-pulse" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full rounded bg-neutral-800/60 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-neutral-800/60 animate-pulse" />
            <div className="h-4 w-4/5 rounded bg-neutral-800/60 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-neutral-900 border border-neutral-800/80 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="space-y-6 pt-6 border-t border-neutral-800/80">
        <div className="flex items-center justify-between">
          <div className="h-7 w-52 rounded-lg bg-neutral-800 animate-pulse" />
          <div className="h-4 w-24 rounded bg-neutral-800/60 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
