# ALFA PAPER PRODUCTS — Corporate Portfolio Website

> **Committed to a Cleaner, Greener Future**  
> Established in 1985 • Vailathur, Athanikkal, Tirur – 676106, Kerala, India

A modern, production-ready corporate website built for **ALFA PAPER PRODUCTS**, a premier B2B manufacturer of food-grade, biodegradable, compostable, and plastic-free paper products.

---

## 🌟 Key Features

* **Legacy & Positioning**: Highlights 40+ years of manufacturing experience (Est. 1985), CIPET Kochi compostability testing, CPCB regulatory approval, and EPR registration.
* **Complete Product Portfolio**:
  * Paper Plates (`/products/paper-plates`)
  * Paper Cups (`/products/paper-cups`)
  * Paper Trays (`/products/paper-trays`)
  * Burger Boxes (`/products/burger-boxes`)
  * Bakery Boxes (`/products/bakery-boxes`)
  * Food Packaging Products (`/products/food-packaging`)
  * Customized Paper Products (`/products/custom-paper-products`)
* **Dedicated Corporate Pages**:
  * **Home**: Hero with heritage counter, category cards, Why Choose ALFA (8 pillars), environmental comparison, industry highlights, custom manufacturing CTA.
  * **About Us**: Four decades of history, Purpose, Mission, Vision, and core values.
  * **Sustainability**: Transition away from single-use plastics, CIPET test credentials, and circularity principles.
  * **Quality & Compliance**: Rigorous food safety, CPCB approval, Extended Producer Responsibility (EPR), and 7 quality priorities.
  * **Custom Solutions**: 4-step collaborative engineering workflow, customizable dimensions, GSM, and direct custom quote tool.
  * **Industries We Serve**: 8 commercial segments with dedicated packaging recommendations.
  * **Contact & Factory**: Factory address, direct phone/mobile, email, map directions, and honeypot-protected enquiry form.
* **Interactive GSAP Animations**: Modular ScrollTrigger reveals, staggered product cards, and floating elements with automatic `prefers-reduced-motion` compliance.
* **Dual-Mode Data Architecture (Supabase / Local Fallback)**:
  * Works out-of-the-box with zero downtime using local data.
  * Automatically connects to Supabase database for products, categories, and enquiry submissions when credentials are provided.
* **SEO & Local SEO Optimization**:
  * Dynamic `SeoHead` component for titles, meta descriptions, canonical URLs, and OpenGraph tags.
  * JSON-LD Structured Data for `Organization`, `LocalBusiness` (Tirur, Kerala), and `Product` schemas.
  * `robots.txt` and `sitemap.xml` included.

---

## 🛠️ Tech Stack

* **Frontend**: React 18 + Vite + TypeScript
* **Styling**: Tailwind CSS (Semantic brand tokens `#399139`, kraft paper neutrals)
* **Animations**: GSAP 3 + ScrollTrigger
* **Icons**: Lucide React
* **Database / Backend**: Supabase (PostgreSQL with Row Level Security)
* **Hosting / Deployment**: Vercel & GitHub ready

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🗄️ Supabase Setup (Optional)

The website functions seamlessly with or without Supabase. To connect a live Supabase project:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Add your project URL and public anon key:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```
3. Run the SQL schema in your Supabase SQL Editor from:
   ```
   supabase/schema.sql
   ```

---

## 📦 Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add environment variables if Supabase is connected.
7. Click **Deploy**.
