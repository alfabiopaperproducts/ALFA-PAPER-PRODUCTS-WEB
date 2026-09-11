import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Product } from '../../types/product';
import { Badge } from '../common/Badge';

interface ProductCardProps {
  product: Product;
  onQuickQuote?: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickQuote }) => {
  return (
    <div className="group bg-white rounded-2xl border border-charcoal-200/80 overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Product Image */}
        <div className="relative aspect-[4/3] bg-[#fbfbf9] p-4 overflow-hidden flex items-center justify-center border-b border-charcoal-100/70">
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback placeholder
              e.currentTarget.src = '/assets/hero-sustainable-paper.jpg';
            }}
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge variant="green" size="sm">
              Food-Grade
            </Badge>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors">
            <Link to={`/products/${product.slug}`} className="focus:outline-none">
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>

          {/* Key Features Chips */}
          <div className="mt-4 space-y-1.5">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-charcoal-700">
                <Check className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-charcoal-100 gap-2">
        <Link
          to={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal-800 hover:text-brand-600 transition-colors group/link"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
        {onQuickQuote && (
          <button
            type="button"
            onClick={() => onQuickQuote(product.name)}
            className="text-xs font-medium text-brand-600 hover:text-brand-700 hover:bg-brand-50 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            Get Quote
          </button>
        )}
      </div>
    </div>
  );
};
