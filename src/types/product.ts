export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId?: string;
  short_description: string;
  description: string;
  features: string[];
  applications: string[];
  sustainability_highlights: string[];
  image_url: string;
  gallery: string[];
  seo_title: string;
  seo_description: string;
  sort_order: number;
  is_active: boolean;
  specs?: Record<string, string>;
}
