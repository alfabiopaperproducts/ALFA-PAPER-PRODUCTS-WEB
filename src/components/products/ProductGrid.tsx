import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickQuote?: (productName: string) => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickQuote,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}>
      {products.map((product) => (
        <div key={product.id} className="gsap-stagger-item">
          <ProductCard product={product} onQuickQuote={onQuickQuote} />
        </div>
      ))}
    </div>
  );
};
