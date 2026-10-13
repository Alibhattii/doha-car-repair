# Dohar Car Repair — Modern React + Vite Rebuild

Modern, fast, mobile-first website rebuild for **Dohar Car Repair** (Doha, Qatar), built with **React 18**, **Vite**, **Tailwind CSS**, and pre-rendered SSG for top-tier SEO and Core Web Vitals performance.

---

## 🛠 Tech Stack

- **Framework**: React 18
- **Bundler & Dev Server**: Vite 5
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v3 with `@tailwindcss/typography`
- **SEO & Meta**: `react-helmet-async`
- **Animations**: Framer Motion & CSS hardware-accelerated transitions
- **Icons**: Font Awesome 6 (CDN with crossorigin) & Lucide-compatible icons
- **Static Site Generation (SSG)**: `vite-react-ssg`

---

## 📁 Folder Structure

```
doha-car-repair/
├── public/
│   ├── Image/                    # Original WebP assets (uncompressed, identical filenames)
│   ├── Header-logo.webp          # Main site logo
│   ├── Favicon-logo.webp         # Site favicon
│   ├── og-image.webp             # Open Graph fallback preview image
│   ├── robots.txt                # Search engine crawler instructions
│   ├── sitemap.xml               # Auto-generated XML sitemap
│   ├── site.webmanifest          # PWA Web manifest
│   ├── google894706982a5f5ff3.html # Google Search Console verification token
│   ├── _headers                  # Security & cache headers (Cloudflare Pages / Netlify)
│   └── _redirects                # 301 redirects from .html to clean routes
├── scripts/
│   └── generate-sitemap.js       # Dynamic script to regenerate sitemap at build time
├── src/
│   ├── components/
│   │   ├── home/                 # Hero, ServicesGrid, WhyChooseUs, ScrapProcess, Brands, etc.
│   │   ├── layout/               # Header, Footer, FloatingButtons
│   │   ├── seo/                  # PageMeta (<head> manager with OpenGraph/Twitter/Geo)
│   │   └── ui/                   # Breadcrumbs, reusable cards
│   ├── data/                     # Single source of truth for all business details
│   │   ├── business.js           # NAP, coordinates, phone numbers, WhatsApp, emails
│   │   ├── services.js           # 16 services with slugs, FAQs, meta descriptions
│   │   ├── faqs.js               # 8 original FAQs
│   │   ├── testimonials.js       # 10 verified customer testimonials
│   │   ├── blogPosts.js          # Metadata for all 25 blog guides
│   │   └── blogContent.js        # Full HTML articles
│   ├── pages/                    # Home, About, Contact, Services, Blog, Privacy, Terms, 404
│   ├── App.jsx                   # Route configuration with React Router & lazy loading
│   ├── index.css                 # Tailwind directives & design tokens
│   └── main.jsx                  # React application entry point
├── tailwind.config.js            # Design tokens (brand red #d62839, charcoal, shadows)
├── vite.config.js                # Vite configuration with chunk splitting
├── package.json
├── MIGRATION_CHECKLIST.md        # Line-by-line verification of preserved items
└── README.md
```

---

## 🚀 How to Run & Build

### Development Mode
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build & SSG
```bash
npm run build
npm run sitemap
```
This pre-renders routes into static HTML files inside `dist/` and generates the updated `sitemap.xml`.

---

## ✏️ How to Edit Information in One Place

All business information is decoupled from UI components and stored in `src/data/`:

1. **Phone, Address, Emails, Coordinates, Socials**:
   - Edit [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js)
2. **Services & Pricing / Features**:
   - Edit [`src/data/services.js`](file:///e:/Doha%20Car%20Repair/src/data/services.js)
3. **FAQs**:
   - Edit [`src/data/faqs.js`](file:///e:/Doha%20Car%20Repair/src/data/faqs.js)
4. **Testimonials**:
   - Edit [`src/data/testimonials.js`](file:///e:/Doha%20Car%20Repair/src/data/testimonials.js)
5. **Add New Blog Posts**:
   - Add metadata entry to `src/data/blogPosts.js`
   - Add article content HTML to `src/data/blogContent.js`
   - Run `npm run sitemap`

---

## 🌐 Deployment & Redirects

The project is configured for **Cloudflare Pages / Netlify / GitHub Pages / Vercel**:
- Clean 301 redirects are specified in `_redirects` and `public/_redirects` mapping legacy `.html` URLs (e.g. `/blog/engine-repair-doha-qatar.html`) to clean URLs (`/blog/engine-repair-doha-qatar`).
- Root `CNAME` for custom domain `doharcarrepairqa.com` is preserved in `public/CNAME`.
- Security headers and cache-control directives are specified in `public/_headers`.
