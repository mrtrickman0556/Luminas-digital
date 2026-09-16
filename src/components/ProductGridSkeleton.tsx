import React from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
  featuredIndices?: number[];
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 8,
  className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  featuredIndices = []
}) => {
  return (
    <div className={className} aria-label="Loading products" role="status">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton
          key={`skeleton-card-${index}`}
          featured={featuredIndices.includes(index)}
        />
      ))}
    </div>
  );
};
