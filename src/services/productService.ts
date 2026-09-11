import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { productsData, productCategories } from '../data/products';
import { Product, ProductCategory } from '../types/product';

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return productsData;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, category, short_description, description, features, applications, sustainability_highlights, image_url, gallery, seo_title, seo_description, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return productsData;
    }

    return data as Product[];
  } catch (err) {
    console.warn('Error fetching products from Supabase, serving local data:', err);
    return productsData;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const localMatch = productsData.find((p) => p.slug === slug);

  if (!isSupabaseConfigured || !supabase) {
    return localMatch || null;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, category, short_description, description, features, applications, sustainability_highlights, image_url, gallery, seo_title, seo_description, sort_order, is_active')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return localMatch || null;
    }

    return data as Product;
  } catch (err) {
    console.warn(`Error fetching product [${slug}] from Supabase, using local fallback:`, err);
    return localMatch || null;
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  if (!isSupabaseConfigured || !supabase) {
    return productCategories;
  }

  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('id, name, slug, description, image_url, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return productCategories;
    }

    return data as ProductCategory[];
  } catch (err) {
    console.warn('Error fetching categories from Supabase, using local fallback:', err);
    return productCategories;
  }
}
