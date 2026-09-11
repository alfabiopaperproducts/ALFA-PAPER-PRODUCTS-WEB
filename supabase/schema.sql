-- ALFA PAPER PRODUCTS
-- Supabase PostgreSQL Schema & Security Policies

-- Enable pgcrypto extension for UUID generation if needed
create extension if not exists "pgcrypto";

-- 1. Product Categories Table
create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Index for fast lookup
create index if not exists idx_product_categories_slug on public.product_categories(slug);

-- 2. Products Table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null,
  category_id uuid references public.product_categories(id) on delete set null,
  short_description text not null,
  description text not null,
  features text[] default '{}',
  applications text[] default '{}',
  sustainability_highlights text[] default '{}',
  image_url text not null,
  gallery text[] default '{}',
  seo_title text,
  seo_description text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_active on public.products(is_active);

-- 3. Enquiries Table
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text,
  phone text not null,
  email text not null,
  product_interest text not null,
  estimated_quantity text,
  message text not null,
  source_page text default 'contact',
  created_at timestamptz default now()
);

-- Index for admin retrieval
create index if not exists idx_enquiries_created_at on public.enquiries(created_at desc);

-- 4. Enable Row Level Security (RLS)
alter table public.product_categories enable row level security;
alter table public.products enable row level security;
alter table public.enquiries enable row level security;

-- 5. RLS Policies

-- Public Read on active categories
create policy "Allow public read active categories"
  on public.product_categories for select
  using (is_active = true);

-- Public Read on active products
create policy "Allow public read active products"
  on public.products for select
  using (is_active = true);

-- Public Insert for enquiries (Strictly INSERT only, no read/update/delete for anon)
create policy "Allow public insert enquiry"
  on public.enquiries for insert
  with check (
    length(trim(name)) > 0 and
    length(trim(phone)) >= 7 and
    length(trim(email)) >= 5 and
    length(trim(message)) > 0
  );

-- 6. Initial Seed Data
insert into public.product_categories (name, slug, description, sort_order) values
  ('Paper Plates', 'paper-plates', 'Durable, food-grade paper plates designed for convenient serving across events, catering and food-service applications.', 1),
  ('Paper Cups', 'paper-cups', 'Practical paper cup solutions suitable for a variety of food and beverage applications.', 2),
  ('Paper Trays', 'paper-trays', 'Functional food-grade trays designed for serving, takeaway and food presentation.', 3),
  ('Burger Boxes', 'burger-boxes', 'Convenient paper-based packaging designed for burgers, snacks and takeaway food.', 4),
  ('Bakery Boxes', 'bakery-boxes', 'Paper packaging solutions developed for cakes, pastries, baked goods and bakery products.', 5),
  ('Food Packaging Products', 'food-packaging', 'Sustainable paper packaging solutions for restaurants, cafes, caterers and food-service businesses.', 6),
  ('Customized Paper Products', 'custom-paper-products', 'Custom paper products developed according to specific sizes, applications and business requirements.', 7)
on conflict (slug) do nothing;
