import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  currentSlug: string;
  allProducts: Product[];
  onQuickQuote?: (name: string) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentSlug,
  allProducts,
  onQuickQuote,
}) => {
  const related = allProducts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-24 pt-12 border-t border-charcoal-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            More Sustainable Solutions
          </span>
          <h3 className="text-2xl font-bold text-charcoal-900 mt-1">Related Paper Products</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} onQuickQuote={onQuickQuote} />
        ))}
      </div>
    </div>
  );
};
