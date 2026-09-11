import { Product, ProductCategory } from '../types/product';

// Direct asset imports so Vite bundles and resolves them with 100% reliability
import plateImg from '../assets/products/paper-plates.jpg';
import cupImg from '../assets/products/paper-cups.jpg';
import trayImg from '../assets/products/paper-trays.jpg';
import burgerImg from '../assets/products/burger-boxes.jpg';
import bakeryImg from '../assets/products/bakery-boxes.jpg';
import foodImg from '../assets/products/food-packaging.jpg';
import customImg from '../assets/products/custom-paper-products.jpg';
import heroImg from '../assets/hero-sustainable-paper.jpg';

export const productCategories: ProductCategory[] = [
  {
    id: 'cat-1',
    name: 'Paper Plates',
    slug: 'paper-plates',
    description: 'Durable, food-grade paper plates designed for convenient serving across events, catering and food-service applications.',
    image_url: plateImg,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'cat-2',
    name: 'Paper Cups',
    slug: 'paper-cups',
    description: 'Practical paper cup solutions suitable for a variety of food and beverage applications.',
    image_url: cupImg,
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'cat-3',
    name: 'Paper Trays',
    slug: 'paper-trays',
    description: 'Functional food-grade trays designed for serving, takeaway and food presentation.',
    image_url: trayImg,
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'cat-4',
    name: 'Burger Boxes',
    slug: 'burger-boxes',
    description: 'Convenient paper-based packaging designed for burgers, snacks and takeaway food.',
    image_url: burgerImg,
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'cat-5',
    name: 'Bakery Boxes',
    slug: 'bakery-boxes',
    description: 'Paper packaging solutions developed for cakes, pastries, baked goods and bakery products.',
    image_url: bakeryImg,
    sort_order: 5,
    is_active: true,
  },
  {
    id: 'cat-6',
    name: 'Food Packaging Products',
    slug: 'food-packaging',
    description: 'Sustainable paper packaging solutions for restaurants, cafes, caterers and food-service businesses.',
    image_url: foodImg,
    sort_order: 6,
    is_active: true,
  },
  {
    id: 'cat-7',
    name: 'Customized Paper Products',
    slug: 'custom-paper-products',
    description: 'Custom paper products developed according to specific sizes, applications and business requirements.',
    image_url: customImg,
    sort_order: 7,
    is_active: true,
  },
];

export const productsData: Product[] = [
  {
    id: 'prod-paper-plates',
    name: 'Paper Plates',
    slug: 'paper-plates',
    category: 'Paper Plates',
    short_description: 'Practical, food-grade and environmentally responsible paper plates for food-service applications.',
    description: 'ALFA PAPER PRODUCTS manufactures paper plates designed for restaurants, caterers, events, food-service businesses and institutional applications. Our paper plates are developed to provide convenient serving while offering businesses a paper-based alternative to conventional disposable plastic products.',
    features: [
      'Food-grade board',
      'Plastic-free options',
      'Biodegradable',
      'Compostable',
      'Recyclable',
      'Oil and grease resistant',
      'Suitable for commercial food-service applications'
    ],
    applications: [
      'Restaurants',
      'Catering',
      'Weddings and functions',
      'Events',
      'Food courts',
      'Institutional catering',
      'Takeaway food'
    ],
    sustainability_highlights: [
      '100% Plastic-Free construction available',
      'CIPET Kochi Compostability Tested',
      'Biodegradable under appropriate ambient conditions',
      'Responsibly sourced food-grade board'
    ],
    image_url: plateImg,
    gallery: [plateImg, heroImg],
    seo_title: 'Paper Plates Manufacturer in Kerala | ALFA PAPER PRODUCTS',
    seo_description: 'Food-grade biodegradable and compostable paper plates manufactured by ALFA PAPER PRODUCTS in Tirur, Kerala for catering, events, and restaurants.',
    sort_order: 1,
    is_active: true,
    specs: {
      'Material': 'Food-Grade Certified Paperboard',
      'Compostability': 'CIPET Kochi Tested',
      'Plastic Coating': 'Plastic-Free / Water-based Barrier Options',
      'Usage': 'Hot & Cold Food Serving',
      'Compliance': 'CPCB Approved & EPR Registered'
    }
  },
  {
    id: 'prod-paper-cups',
    name: 'Paper Cups',
    slug: 'paper-cups',
    category: 'Paper Cups',
    short_description: 'Practical paper cup solutions suitable for a variety of food and beverage applications.',
    description: 'ALFA PAPER PRODUCTS manufactures dependable paper cups engineered for hot and cold beverages across cafes, restaurants, catering, and institutional use. Manufactured using food-grade board with sturdy construction to prevent leaks and deformation.',
    features: [
      'Food-grade board',
      'Hot & cold beverage compatibility',
      'Sturdy rim and leak-resistant base',
      'Plastic-free coating alternatives',
      'Biodegradable & recyclable options',
      'High insulation performance'
    ],
    applications: [
      'Cafes & Coffee Shops',
      'Restaurants & Food Courts',
      'Events & Conferences',
      'Catering Services',
      'Hospitality & Hotels',
      'Corporate & Institutional Beverage Service'
    ],
    sustainability_highlights: [
      'Biodegradable and compostable options',
      'Substantially reduced plastic dependency',
      'Tested under CIPET standards'
    ],
    image_url: cupImg,
    gallery: [cupImg, heroImg],
    seo_title: 'Paper Cups Manufacturer in Kerala | ALFA PAPER PRODUCTS',
    seo_description: 'Reliable eco-friendly paper cups for hot and cold drinks. Food-grade, leak-resistant, and sustainable solutions by ALFA PAPER PRODUCTS.',
    sort_order: 2,
    is_active: true,
    specs: {
      'Material': 'Virgin Food-Grade Paperboard',
      'Applications': 'Coffee, Tea, Cold Drinks, Soups',
      'Features': 'Comfort Grip, Leak-Proof Base',
      'Environmental Status': 'Compostable & Recyclable Options'
    }
  },
  {
    id: 'prod-paper-trays',
    name: 'Paper Trays',
    slug: 'paper-trays',
    category: 'Paper Trays',
    short_description: 'Functional food-grade trays designed for serving, takeaway and food presentation.',
    description: 'Our paper trays offer sturdy, hygienic serving solutions for street food, snacks, fast-food outlets, and catered events. Designed to hold greasy and saucy foods securely without buckling or leaking.',
    features: [
      'Rigid food-grade construction',
      'Oil & grease resistant barrier',
      'Easy stacking for fast service',
      'Biodegradable & compostable',
      'Plastic-free material composition'
    ],
    applications: [
      'Snacks & Appetizers',
      'Bakery Items',
      'Fast Food & Street Food',
      'Takeaway Counters',
      'Catering & Food Stalls',
      'Food Festivals & Events'
    ],
    sustainability_highlights: [
      'Compostable disposal profile',
      'Zero single-use plastic waste',
      'Safe for direct food contact'
    ],
    image_url: trayImg,
    gallery: [trayImg, heroImg],
    seo_title: 'Paper Trays Manufacturer in Kerala | ALFA PAPER PRODUCTS',
    seo_description: 'Durable, grease-resistant food-grade paper trays for snacks, bakery, and takeaway food by ALFA PAPER PRODUCTS, Tirur.',
    sort_order: 3,
    is_active: true,
    specs: {
      'Material': 'Heavy-duty Food-Grade Board',
      'Grease Resistance': 'Enhanced Oil Barrier',
      'Design': 'Open-top easy serve format',
      'Eco Profile': '100% Biodegradable & Recyclable'
    }
  },
  {
    id: 'prod-burger-boxes',
    name: 'Burger Boxes',
    slug: 'burger-boxes',
    category: 'Burger Boxes',
    short_description: 'Convenient paper-based packaging designed for burgers, snacks and takeaway food.',
    description: 'ALFA PAPER PRODUCTS manufactures durable paper burger boxes with secure interlocking closures, engineered to retain heat while venting steam to keep burgers and fries crisp and fresh during delivery.',
    features: [
      'Sturdy locking clasp to prevent accidental opening',
      'Ventilation properties to keep food crisp',
      'Oil and grease resistant coating',
      '100% Food-safe paperboard',
      'Flat-pack or pre-formed delivery options'
    ],
    applications: [
      'Burgers & Sliders',
      'Sandwiches & Wraps',
      'Fries & Finger Snacks',
      'Fast Food Outlets',
      'Takeaway & Online Delivery'
    ],
    sustainability_highlights: [
      'Direct alternative to Styrofoam/thermocol boxes',
      'Biodegradable and compostable',
      'CPCB approved compliant materials'
    ],
    image_url: burgerImg,
    gallery: [burgerImg, heroImg],
    seo_title: 'Burger Boxes Manufacturer in Kerala | ALFA PAPER PRODUCTS',
    seo_description: 'Eco-friendly burger and fast-food paper boxes with secure locking and grease resistance. Reliable manufacturing in Kerala.',
    sort_order: 4,
    is_active: true,
    specs: {
      'Material': 'Greaseproof Food-Grade Kraft Paperboard',
      'Closure': 'Self-locking Clamshell Design',
      'Thermal Performance': 'Heat retention with moisture dissipation',
      'Safety': 'No harmful chemical migration'
    }
  },
  {
    id: 'prod-bakery-boxes',
    name: 'Bakery Boxes',
    slug: 'bakery-boxes',
    category: 'Bakery Boxes',
    short_description: 'Paper packaging solutions developed for cakes, pastries, baked goods and bakery products.',
    description: 'Designed specifically for the bakery and confectionery sector, our bakery boxes protect delicate pastries, cakes, and cookies during transit while showcasing your treats with immaculate presentation.',
    features: [
      'Food-grade board preserving aroma and freshness',
      'High structural integrity for stacking and transit',
      'Window and non-window variants available',
      'Smooth outer finish suitable for brand stamping or printing',
      'Easy assembly and secure closure'
    ],
    applications: [
      'Cakes & Cheesecakes',
      'Pastries & Brownies',
      'Cookies & Macarons',
      'Desserts & Donuts',
      'Baked Artisanal Goods',
      'Confectionery & Sweets'
    ],
    sustainability_highlights: [
      'Renewable paperboard raw materials',
      'Recyclable in standard paper streams',
      'Free from non-biodegradable laminates'
    ],
    image_url: bakeryImg,
    gallery: [bakeryImg, heroImg],
    seo_title: 'Bakery Boxes Manufacturer in Kerala | ALFA PAPER PRODUCTS',
    seo_description: 'Premium paper packaging solutions for cakes, pastries, and confectionery. Food-grade, sturdy, and sustainable bakery boxes.',
    sort_order: 5,
    is_active: true,
    specs: {
      'Material': 'White and Natural Kraft Food-Grade Board',
      'Structural Rating': 'High stacking strength',
      'Food Contact': '100% direct food-safe certified'
    }
  },
  {
    id: 'prod-food-packaging',
    name: 'Food Packaging Products',
    slug: 'food-packaging',
    category: 'Food Packaging Products',
    short_description: 'Sustainable paper packaging solutions for restaurants, cafes, caterers and food-service businesses.',
    description: 'A comprehensive suite of paper-based food packaging developed for diverse serving and takeaway requirements. Designed to replace single-use plastic containers without compromising durability or temperature stability.',
    features: [
      'Versatile formats for hot meals, gravies, and snacks',
      'Grease-resistant barrier for leak-proof performance',
      'Microwavable and heat-tolerant options',
      'Sustainably sourced paper fibers',
      'Ergonomic handling for delivery riders and end-users'
    ],
    applications: [
      'Restaurants & Cloud Kitchens',
      'Cafes & Bistros',
      'Catering & Banquet Operations',
      'Takeaway Food Outlets',
      'Hospitality & Room Service'
    ],
    sustainability_highlights: [
      'Replaces polystyrene and single-use plastic containers',
      'Compostable disposal profile',
      'CPCB compliant and EPR registered'
    ],
    image_url: foodImg,
    gallery: [foodImg, heroImg],
    seo_title: 'Sustainable Food Packaging Manufacturer Kerala | ALFA PAPER PRODUCTS',
    seo_description: 'Complete range of plastic-free, biodegradable paper food packaging for restaurants and cloud kitchens across Kerala and India.',
    sort_order: 6,
    is_active: true,
    specs: {
      'Material': 'High GSM Sustainable Barrier Paperboard',
      'Barrier': 'Natural plant-based/aqueous coating',
      'Compliance': 'CIPET tested for compostability'
    }
  },
  {
    id: 'prod-custom-paper-products',
    name: 'Customized Paper Products',
    slug: 'custom-paper-products',
    category: 'Customized Paper Products',
    short_description: 'Custom paper products developed according to specific sizes, applications and business requirements.',
    description: 'ALFA PAPER PRODUCTS works closely with businesses to engineer custom paper solutions tailored to unique packaging dimensions, board specifications, volume requirements, and functional challenges. Backed by 40+ years of manufacturing experience.',
    features: [
      'Custom dimensions, die-cuts, and folding profiles',
      'Tailored paperboard thickness (GSM) selection',
      'Application-specific barrier properties (moisture, oil, grease)',
      'Bulk manufacturing capability with rigorous quality checks',
      'Prototyping and feasibility evaluation'
    ],
    applications: [
      'Bespoke Food Service Chains',
      'Specialty Bakeries and Food Brands',
      'Food Equipment & Institutional Manufacturers',
      'Distributors & Resellers',
      'Export and Institutional Packaging Contracts'
    ],
    sustainability_highlights: [
      'Designed from inception with environmental compliance',
      'CPCB and EPR regulatory alignment',
      'Zero unnecessary plastic use'
    ],
    image_url: customImg,
    gallery: [customImg, heroImg],
    seo_title: 'Custom Paper Product Manufacturer in Kerala | ALFA PAPER PRODUCTS',
    seo_description: 'Customized paper packaging engineered to your exact dimensions and specifications. Decades of manufacturing expertise in Tirur, Kerala.',
    sort_order: 7,
    is_active: true,
    specs: {
      'Dimensions': 'Fully customizable',
      'Materials': 'Food-Grade Kraft, Virgin Paperboard, Barrier Boards',
      'Lead Time': 'Evaluated per volume & tooling requirement',
      'Support': 'Technical design and material consultation'
    }
  }
];
