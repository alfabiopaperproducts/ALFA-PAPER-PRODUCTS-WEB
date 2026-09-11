export interface IndustryItem {
  id: string;
  name: string;
  shortDesc: string;
  detailedDesc: string;
  keyProducts: string[];
  image: string;
}

export const industriesData: IndustryItem[] = [
  {
    id: 'restaurants-cafes',
    name: 'Restaurants & Cafes',
    shortDesc: 'Paper plates, trays, boxes, cups and food packaging solutions for dine-in, takeaway and food delivery requirements.',
    detailedDesc: 'Modern dining spaces and bustling bistros require food packaging that upholds their presentation quality while being leak-proof, hygienic, and environmentally responsible.',
    keyProducts: ['Paper Cups', 'Paper Plates', 'Food Packaging Products', 'Burger Boxes'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bakeries',
    name: 'Bakeries & Confectionery',
    shortDesc: 'Paper boxes and packaging solutions for cakes, pastries, desserts, cookies and other bakery products.',
    detailedDesc: 'Delicate baked goods need sturdy, pristine boxes that preserve crumb texture, protect artistic frosting, and provide an enticing presentation for your patrons.',
    keyProducts: ['Bakery Boxes', 'Paper Trays', 'Custom Pastry Packaging'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'catering',
    name: 'Catering Companies',
    shortDesc: 'Disposable paper serving solutions designed for events, functions, institutional catering and large-scale food service.',
    detailedDesc: 'High-volume catering demands durable, stackable, and easily disposable tableware that speeds up service while offering a plastic-free dining experience.',
    keyProducts: ['Paper Plates', 'Paper Trays', 'Paper Cups', 'Food Containers'],
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hospitality',
    name: 'Hotels & Hospitality',
    shortDesc: 'Paper products suitable for food service, events, room service and hospitality applications.',
    detailedDesc: 'Luxury hotels and resorts enhance guest satisfaction and meet sustainable tourism goals by replacing plastic disposables with elegant paper alternatives.',
    keyProducts: ['Paper Cups', 'In-Room Dining Trays', 'Snack Packaging', 'Bakery Boxes'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'takeaway-delivery',
    name: 'Takeaway & Delivery',
    shortDesc: 'Functional paper packaging solutions for food businesses looking for practical alternatives to conventional plastic packaging.',
    detailedDesc: 'Engineered with moisture vents and secure locking flaps to withstand transit, ensuring meals arrive hot, crisp, and fresh without plastic sweating.',
    keyProducts: ['Burger Boxes', 'Food Packaging Products', 'Paper Trays'],
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'events-functions',
    name: 'Events & Functions',
    shortDesc: 'Paper plates, cups, trays and other disposable solutions suitable for weddings, corporate events, gatherings and large functions.',
    detailedDesc: 'From intimate wedding banquets to large-scale corporate summits, our clean, food-grade tableware provides seamless, hassle-free serving.',
    keyProducts: ['Paper Plates', 'Paper Cups', 'Paper Trays', 'Serving Boxes'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'institutional',
    name: 'Institutional Food Service',
    shortDesc: 'Paper-based food-service products suitable for organizations, educational institutions and other large-scale catering operations.',
    detailedDesc: 'Hospitals, universities, industrial canteens, and government facilities trust our cost-effective, bulk-manufactured paper tableware for hygienic daily operations.',
    keyProducts: ['Paper Plates', 'Paper Cups', 'Food Trays', 'Meal Boxes'],
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'retail-distribution',
    name: 'Retail & Distribution',
    shortDesc: 'Bulk manufacturing support for distributors and businesses requiring paper products for commercial resale and distribution.',
    detailedDesc: 'Consistent supply chains, competitive wholesale packaging, and custom brand labeling for distribution partners across India and overseas.',
    keyProducts: ['Bulk Packed Plates', 'Standard Sleeve Cups', 'Carton Packaging Solutions'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
];
