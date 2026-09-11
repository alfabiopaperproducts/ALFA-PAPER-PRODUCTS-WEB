export interface CredentialItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  highlight: string;
  iconName: 'Award' | 'ShieldCheck' | 'Recycle' | 'CheckCircle2' | 'Leaf';
}

export const certificationsData: CredentialItem[] = [
  {
    id: 'cipet',
    title: 'CIPET Kochi Compostability Testing',
    badge: 'Compostability Tested',
    description: 'Our products have successfully undergone rigorous compostability testing at the Central Institute of Petrochemicals Engineering & Technology (CIPET), Kochi.',
    highlight: 'Rigorous disintegration & eco-toxicity validation',
    iconName: 'Award',
  },
  {
    id: 'cpcb',
    title: 'CPCB Approval',
    badge: 'Regulatory Compliant',
    description: 'ALFA PAPER PRODUCTS products are approved by the Central Pollution Control Board (CPCB) as applicable to our product category and regulatory requirements.',
    highlight: 'Strict compliance with plastic ban mandates',
    iconName: 'ShieldCheck',
  },
  {
    id: 'epr',
    title: 'EPR Registration',
    badge: 'Registered Producer',
    description: 'ALFA PAPER PRODUCTS is registered under applicable Extended Producer Responsibility (EPR) requirements, promoting circular economy accountability.',
    highlight: 'Demonstrated lifecycle waste stewardship',
    iconName: 'Recycle',
  },
  {
    id: 'food-grade',
    title: 'Food-Grade Materials',
    badge: 'Food-Safe Certified',
    description: 'Products intended for food-service applications are manufactured using certified food-grade virgin paperboard with zero toxic chemical migration.',
    highlight: 'Direct food contact safety standard',
    iconName: 'CheckCircle2',
  },
  {
    id: 'plastic-free',
    title: 'Plastic-Free Product Range',
    badge: 'Zero Single-Use Plastic',
    description: 'We are committed to offering paper-based alternatives designed to eliminate dependence on conventional single-use plastics and harmful coatings.',
    highlight: 'Sustainable water-based & natural barriers',
    iconName: 'Leaf',
  },
];

export const qualityPriorities = [
  { title: 'Material Quality', desc: 'Premium grade paperboard with consistent strength and density' },
  { title: 'Food Safety', desc: 'Complies with rigorous standards for direct food contact' },
  { title: 'Functional Performance', desc: 'Thermal stability and structural rigidity under load' },
  { title: 'Oil & Grease Resistance', desc: 'Effective barrier treatment without plastic leakage' },
  { title: 'Product Consistency', desc: 'Uniform die-cutting and folding precision on modern equipment' },
  { title: 'Responsible Manufacturing', desc: 'Clean, low-waste production practices established since 1985' },
  { title: 'Environmental Compliance', desc: 'Full adherence to national environmental directives and EPR norms' },
];
