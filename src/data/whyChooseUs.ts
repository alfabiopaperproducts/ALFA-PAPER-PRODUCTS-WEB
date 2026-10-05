export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const whyChooseFeatures: FeatureItem[] = [
  {
    id: 'biodegradable',
    title: 'Biodegradable',
    description: 'Naturally breaks down under suitable environmental conditions, returning safely to the soil with zero microplastics.',
    icon: 'Leaf',
  },
  {
    id: 'compostable',
    title: 'Compostability Verified',
    description: 'Undergone rigorous government-accredited laboratory testing to validate complete organic disintegration and safety.',
    icon: 'Award',
  },
  {
    id: 'plastic-free',
    title: '100% Plastic Free',
    description: 'Pure paperboard packaging engineered to eliminate reliance on conventional single-use polymers.',
    icon: 'ShieldBan',
  },
  {
    id: 'recyclable',
    title: 'Recyclable Fiber',
    description: 'High-grade virgin paperboard that supports responsible material recovery in paper recycling streams.',
    icon: 'RefreshCw',
  },
  {
    id: 'food-grade',
    title: 'Certified Food-Safe',
    description: 'Manufactured with virgin food-contact paperboard meeting stringent domestic and global hygiene standards.',
    icon: 'Utensils',
  },
  {
    id: 'oil-grease',
    title: 'Oil & Grease Resistant',
    description: 'Advanced water-based barrier coatings engineered to handle scalding soups, gravies, and oily foods without sogginess.',
    icon: 'Droplets',
  },
  {
    id: 'industrial-capacity',
    title: 'Industrial Scale Capacity',
    description: 'High-speed automated production lines delivering 20+ tons daily for dependable hypermarket supply.',
    icon: 'Globe2',
  },
  {
    id: 'custom-tooling',
    title: 'Custom Tooling & Branding',
    description: 'Bespoke dimensions, precision die-cutting, and multi-color flexo printing tailored to your commercial specifications.',
    icon: 'Recycle',
  },
];

export interface HeritageStat {
  label: string;
  value: string;
  numericValue: number;
  valueSuffix?: string;
  suffix: string;
}

export const companyHeritageStats: HeritageStat[] = [
  { label: 'Established', value: '1985', numericValue: 1985, valueSuffix: '', suffix: '' },
  { label: 'Industry Experience', value: '40+', numericValue: 40, valueSuffix: '+', suffix: 'Years' },
  { label: 'Food-Grade Materials', value: '100', numericValue: 100, valueSuffix: '', suffix: '%' },
  { label: 'Plastic-Free Focus', value: '100', numericValue: 100, valueSuffix: '', suffix: '%' },
];
