export interface SeoProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'product';
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ALFA PAPER PRODUCTS',
    foundingDate: '1985',
    description: 'Eco-friendly and sustainable paper products manufacturer in Kerala, India. Manufacturers of biodegradable, compostable and plastic-free paper plates, cups, trays, and food packaging.',
    url: 'https://alfapaperproducts.com',
    logo: 'https://alfapaperproducts.com/assets/logo.png',
    image: 'https://alfapaperproducts.com/assets/logo.png',
    telephone: ['+914942586155', '+919895667040'],
    email: 'alfabiopaperproducts@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vailathur, Athanikkal',
      addressLocality: 'Tirur',
      addressRegion: 'Kerala',
      postalCode: '676106',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '10.9168',
      longitude: '75.9234',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image_url: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    brand: {
      '@type': 'Brand',
      name: 'ALFA PAPER PRODUCTS',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'ALFA PAPER PRODUCTS',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'ALFA PAPER PRODUCTS',
      },
    },
  };
}
