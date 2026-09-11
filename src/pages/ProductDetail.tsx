import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, Leaf, Recycle, Utensils, MessageSquare, Phone } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { RelatedProducts } from '../components/products/RelatedProducts';
import { getProductBySlug } from '../services/productService';
import { productsData } from '../data/products';
import { Product } from '../types/product';
import { generateProductSchema } from '../utils/seo';

interface ProductDetailProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    if (slug) {
      getProductBySlug(slug).then((prod) => {
        if (prod) {
          setProduct(prod);
          setActiveImage(prod.image_url);
        } else {
          setProduct(null);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-pulse space-y-4 max-w-md mx-auto">
          <div className="h-8 bg-charcoal-100 rounded w-3/4 mx-auto" />
          <div className="h-64 bg-charcoal-100 rounded-2xl" />
          <div className="h-4 bg-charcoal-100 rounded w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-charcoal-900">Product Not Found</h1>
        <p className="text-charcoal-600 max-w-md mx-auto">
          The paper product you are looking for does not exist or has been relocated.
        </p>
        <div className="pt-2">
          <Button variant="primary" to="/products">
            Back to Products Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28">
      <SeoHead
        title={product.seo_title || `${product.name} | ALFA PAPER PRODUCTS`}
        description={product.seo_description || product.short_description}
        canonicalUrl={`https://alfapaperproducts.com/products/${product.slug}`}
        schema={generateProductSchema(product)}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            { label: product.name },
          ]}
        />
      </div>

      {/* Main Product Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Product Images (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-charcoal-200/80 bg-[#fbfbf9] p-6 sm:p-10 flex items-center justify-center aspect-[4/3] shadow-soft">
                <img
                  src={activeImage || product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Gallery Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImage === img
                          ? 'border-brand-500 ring-2 ring-brand-500/20'
                          : 'border-charcoal-200 hover:border-charcoal-300'
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Callout */}
              <div className="p-4 rounded-xl bg-kraft-50 border border-kraft-200/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-xs text-charcoal-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  CIPET Tested Compostability
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Utensils className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  100% Food-Grade Safe
                </span>
              </div>
            </div>

            {/* Right: Product Details (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="green" size="md">
                    {product.category}
                  </Badge>
                  <Badge variant="kraft" size="md">
                    Est. 1985
                  </Badge>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight">
                  {product.name}
                </h1>
                <p className="mt-2 text-base text-charcoal-600 leading-relaxed font-medium">
                  {product.short_description}
                </p>
              </div>

              <div className="text-sm text-charcoal-600 leading-relaxed border-t border-charcoal-100 pt-4">
                <p>{product.description}</p>
              </div>

              {/* Key Features List */}
              <div className="border-t border-charcoal-100 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 mb-3">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal-700">
                      <Check className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable Applications */}
              <div className="border-t border-charcoal-100 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 mb-3">
                  Ideal Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-kraft-100/70 border border-kraft-200 text-charcoal-800"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specifications (if available) */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="border-t border-charcoal-100 pt-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 mb-3">
                    Technical Specifications
                  </h3>
                  <div className="bg-kraft-50/60 rounded-xl border border-charcoal-200/60 overflow-hidden divide-y divide-charcoal-100 text-xs sm:text-sm">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between px-4 py-2.5">
                        <span className="text-charcoal-500 font-medium">{key}</span>
                        <span className="text-charcoal-900 font-semibold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bulk Enquiries Box & CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-50/60 to-kraft-50 border border-brand-200/80 space-y-4">
                <div>
                  <h4 className="font-bold text-base text-charcoal-900">Need Bulk Quantities?</h4>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1 leading-relaxed">
                    Contact our team for product availability, specifications, bulk enquiries and customized requirements.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onOpenQuoteModal(product.name)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Request Product Details
                  </Button>
                  <a
                    href="https://wa.me/919895667040?text=Hello%20ALFA%20Team%2C%20I%20am%20enquiring%20about%20your%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-charcoal-300 text-charcoal-800 text-sm font-semibold hover:bg-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-brand-600" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts
            currentSlug={product.slug}
            allProducts={productsData}
            onQuickQuote={(name) => onOpenQuoteModal(name)}
          />
        </div>
      </section>
    </div>
  );
};
