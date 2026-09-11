import React from 'react';
import { ArrowRight, Home, Package, Phone } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center bg-white">
      <SeoHead
        title="404 Page Not Found | ALFA PAPER PRODUCTS"
        description="The page you requested could not be found."
      />
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 font-extrabold text-2xl border border-brand-200">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-charcoal-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-charcoal-600 leading-relaxed">
          The page you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="primary" size="md" to="/" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button variant="outline" size="md" to="/products" leftIcon={<Package className="w-4 h-4" />}>
            View Products
          </Button>
        </div>

        <div className="pt-6 border-t border-charcoal-100 text-xs text-charcoal-500">
          Need immediate assistance?{' '}
          <a href="tel:+919895667040" className="text-brand-600 font-semibold hover:underline">
            Call +91 9895667040
          </a>
        </div>
      </div>
    </div>
  );
};
