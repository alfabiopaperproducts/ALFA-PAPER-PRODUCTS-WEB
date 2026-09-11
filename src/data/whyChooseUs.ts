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
    description: 'Designed to naturally break down under suitable environmental conditions, leaving no permanent footprint.',
    icon: 'Leaf',
  },
  {
    id: 'compostable',
    title: 'Compostable',
    description: 'Products developed with compostability and responsible organic disposal in mind.',
    icon: 'Recycle',
  },
  {
    id: 'plastic-free',
    title: 'Plastic Free',
    description: 'Paper-based alternatives designed to reduce dependence on conventional single-use plastics.',
    icon: 'ShieldBan',
  },
  {
    id: 'recyclable',
    title: 'Recyclable',
    description: 'Paper-based products that support responsible material recovery wherever facilities exist.',
    icon: 'RefreshCw',
  },
  {
    id: 'food-grade',
    title: 'Food-Grade Board',
    description: 'Manufactured using certified virgin materials safe for hot, cold, and moist food-service applications.',
    icon: 'Utensils',
  },
  {
    id: 'oil-grease',
    title: 'Oil & Grease Resistant',
    description: 'Engineered barrier protection designed to handle demanding, oily, and saucy foods effectively.',
    icon: 'Droplets',
  },
  {
    id: 'environmentally-responsible',
    title: 'Environmentally Responsible',
    description: 'Created to support businesses transitioning toward sustainable, circular packaging solutions.',
    icon: 'Globe2',
  },
  {
    id: 'compostability-tested',
    title: 'Compostability Tested',
    description: 'Our products have undergone stringent compostability testing at CIPET, Kochi.',
    icon: 'Award',
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
