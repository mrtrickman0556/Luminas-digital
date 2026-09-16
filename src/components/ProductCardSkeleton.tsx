import React from 'react';

interface ProductCardSkeletonProps {
  featured?: boolean;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ featured = false }) => {
  return (
    <div
      className={`relative rounded-2xl bg-neutral-900/70 border border-neutral-800/80 flex flex-col justify-between overflow-hidden skeleton-shimmer ${
        featured ? 'ring-1 ring-indigo-500/20' : ''
      }`}
      aria-hidden="true"
    >
      {/* Top badges & Wishlist placeholder */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-20 rounded-full bg-neutral-800/80 animate-pulse" />
          <div className="h-5 w-12 rounded-full bg-neutral-800/60 animate-pulse" />
        </div>
        <div className="w-8 h-8 rounded-full bg-neutral-800/80 border border-neutral-700/40 animate-pulse" />
      </div>

      {/* Mockup Preview Area Placeholder */}
      <div className="p-6 pt-12 pb-4 bg-gradient-to-b from-neutral-900 to-neutral-950 flex items-center justify-center overflow-hidden min-h-[220px]">
        <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-xl bg-neutral-800/60 border border-neutral-700/40 shadow-xl flex flex-col justify-between p-3.5 animate-pulse relative">
          {/* Subtle inside card lines */}
          <div className="space-y-1.5">
            <div className="h-2 w-10 rounded bg-neutral-700/60" />
            <div className="h-2 w-16 rounded bg-neutral-700/40" />
          </div>
          
          {/* Centered icon silhouette */}
          <div className="w-10 h-10 rounded-lg bg-neutral-700/50 mx-auto flex items-center justify-center">
            <div className="w-5 h-5 rounded-md bg-neutral-600/40" />
          </div>

          {/* Bottom title & badge silhouette */}
          <div className="space-y-1.5 pt-2 border-t border-neutral-700/30">
            <div className="h-2.5 w-20 rounded bg-neutral-700/60" />
            <div className="h-2 w-12 rounded bg-neutral-700/40" />
          </div>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Format & Rating row */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-3 w-16 rounded bg-neutral-800 animate-pulse" />
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-neutral-800 animate-pulse" />
              <div className="h-3 w-8 rounded bg-neutral-800 animate-pulse" />
              <div className="h-3 w-6 rounded bg-neutral-800/60 animate-pulse" />
            </div>
          </div>

          {/* Title skeleton */}
          <div className="space-y-1.5">
            <div className="h-4.5 w-4/5 rounded bg-neutral-800 animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-neutral-800/80 animate-pulse" />
          </div>

          {/* Short description skeleton */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full rounded bg-neutral-800/60 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-neutral-800/60 animate-pulse" />
          </div>
        </div>

        {/* Price & Actions bottom block */}
        <div className="mt-5 pt-4 border-t border-neutral-800/80">
          <div className="flex items-baseline justify-between gap-2 mb-3.5">
            <div className="flex items-baseline gap-2">
              <div className="h-6 w-16 rounded bg-neutral-800 animate-pulse" />
              <div className="h-4 w-12 rounded bg-neutral-800/50 animate-pulse" />
            </div>
            <div className="h-4 w-14 rounded bg-neutral-800/60 animate-pulse" />
          </div>

          {/* Action buttons skeleton */}
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8.5 rounded-xl bg-neutral-800/70 border border-neutral-700/40 animate-pulse" />
            <div className="h-8.5 rounded-xl bg-indigo-900/30 border border-indigo-500/20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
