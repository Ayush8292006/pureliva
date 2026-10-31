# Pureliva Foods – Website Prototype Prompt (React, frontend only)

> Copy everything below the line into Antigravity. Before running, copy the `public/` folder from this pack into the project root so all image paths work.

---

Build a **frontend-only, fully responsive website prototype in React** for **"Pureliva Foods"** (purelivafoods.com), a natural seeds brand by Patidar Enterprises, Khandwa, Madhya Pradesh. This is a REDESIGN of their existing informational site.

This is a **PROTOTYPE**: no backend, no database, no API calls, no login, no cart, no payment. All content comes from local data files. All ordering and enquiries happen by opening **WhatsApp** with a pre-filled message.

## 1. TECH STACK

- **React 18 + Vite + TypeScript** (NOT Next.js)
- **React Router v6** for pages
- **Tailwind CSS**
- **Framer Motion** (intro animation, page transitions, component animations)
- **GSAP + ScrollTrigger** (pinned/horizontal scroll, parallax)
- **Lenis** (smooth scroll)
- **lucide-react** for icons, plus a WhatsApp SVG icon component
- `react-helmet-async` for per-page title/meta
- All images are local files in `/public/images/...` (already provided, see section 7). Use `<picture>` with `.webp` source and `.png`/`.jpg` fallback, `loading="lazy"` (except hero), explicit width/height to avoid layout shift.
- Respect `prefers-reduced-motion` (disable heavy animation).
- Must run with `npm install && npm run dev`, build with `npm run build`, deployable on Vercel/Netlify (add SPA rewrite config).

## 2. DESIGN SYSTEM

- **Background: WHITE `#FFFFFF`** for the whole site; very light cream `#FBF8F1` only for alternate sections.
- Primary: deep forest green `#0B3D1E` (from logo & packaging)
- Secondary: warm earthy brown `#B5652A` (from logo tagline)
- Text: `#1A1A1A` headings, `#555555` body
- WhatsApp green: `#25D366`
- Product accent colours (from each pack):
  - Flax Seeds `#B5652A` · Seed Mix `#7A0F2E` · Chia Seed `#B57EDC` · Sunflower Seeds `#F5C518` · Pumpkin Seeds `#F28C0F`
- Fonts (Google Fonts): headings **"Playfair Display"**, body **"Poppins"**, script accents (e.g. "Ready to Eat") **"Caveat"**.
- Style: premium, clean, natural, lots of white space, rounded corners 16–24px, soft shadows, leaf-line motifs, curved green wave dividers (like the bottom of the packs). Product bowl images are transparent PNGs, so place them directly on white/cream with a soft shadow ellipse under them and floating animation.

## 3. FIRST-LOAD INTRO ANIMATION (VERY IMPORTANT)

On first open (once per session; flag in `sessionStorage` wrapped in try/catch), show a full-screen animated intro, ~3 seconds, skippable on click:

1. White screen. A leaf icon draws itself with an SVG stroke animation in green.
2. The logo `/images/brand/logo.png` fades + scales in (0.8 → 1) with a soft blur-to-sharp effect.
3. Small seed shapes (dots/ovals in the 5 product accent colours) fall and scatter softly around the logo.
4. A thin green progress line fills 0 → 100% with a counter.
5. Exit: the intro panel slides up with a curved green wave edge, revealing the homepage.
6. Hero then animates in with stagger: headline words slide up from a mask, subtitle fades, buttons pop in, the hero product bowls float in from different directions with slight rotation.

On later route changes use a short page transition (fade + slight slide, or a green wave wipe).

## 4. SCROLL ANIMATIONS (WHOLE SITE)

- Lenis smooth scroll, synced with GSAP ScrollTrigger.
- Headings: word-by-word reveal from a mask.
- Paragraphs/cards: fade-up with stagger.
- Images: clip-path reveal + scale 1.1 → 1.
- Hero: parallax on bowls and floating seed particles at different speeds; subtle mouse-move tilt on desktop.
- **Products section: pinned horizontal scroll on desktop** (GSAP ScrollTrigger pin). The 5 products slide horizontally as the user scrolls; the section background tints softly to each product's accent colour (very light, ~6% opacity) as it comes into focus. Mobile: swipeable carousel with snap.
- Stats count-up when visible.
- Certificates: infinite marquee strip.
- Animated/morphing wave dividers.
- Magnetic hover on main buttons (desktop), press scale on mobile.
- Custom cursor (small green dot that grows on links/cards), desktop only.
- Green scroll progress bar at the top.
- 60fps: animate transform/opacity only; clean up GSAP contexts on unmount (`gsap.context` + revert in useEffect cleanup).

## 5. WHATSAPP ORDERING (CORE FEATURE)

Number: **+91 97531 64155** → `https://wa.me/919753164155?text=<encodeURIComponent(message)>`

- Utility `buildWhatsAppLink(message)` in `/src/lib/whatsapp.ts`. Open in a new tab.
- Every product card and product page: big **"Order on WhatsApp"** button (WhatsApp green + icon).
- Pre-filled message: `Hello Pureliva, I want to order *Flax Seeds – Roasted & Salted (100g)*. Please share price and delivery details.`
- Product detail page: quantity stepper (1–10) before the button; message becomes `... I want to order 3 x *Chia Seed – Raw & Natural (100g)* ...`
- **"Build Your Order"** section/page: tick products + set quantities, live summary, one button sends a combined message listing every item.
- Floating WhatsApp button bottom-right on every page, gentle pulse, tooltip "Order on WhatsApp".
- "How to Order" section: 3 animated steps: Choose your product → Tap "Order on WhatsApp" → Confirm details & get it delivered.
- "Bulk / Export Enquiry" button: `Hello, I want to enquire about bulk/export supply.`
- All forms (bulk enquiry, contact) have client-side validation and on submit open WhatsApp with all fields formatted in the message. No backend.

## 6. PAGES & SECTIONS

### Layout (all pages)
- **Navbar**: logo (`/images/brand/logo.png`) left; links Home, Products, About, Bulk & Export, Contact; right "Order on WhatsApp" button. Transparent at top, white + blur + shadow on scroll, hides on scroll down / shows on scroll up. Mobile: animated hamburger → full-screen menu with staggered links.
- **Footer**: dark green bg, white text, curved wave top. White logo (`/images/brand/logo-white.png`), short about line, quick links, products, contact (address, email, WhatsApp), Instagram, FSSAI logo (`/images/brand/fssai-logo.png`, on a white rounded chip) with "Lic. No. 21426950001159", "Packed & Marketed by Patidar Enterprises", "© 2026 Pureliva Foods by Patidar Enterprises. All rights reserved.", Privacy Policy / Terms links.
- Floating WhatsApp button, scroll progress bar, custom cursor.

### Home (`/`)
1. **Hero**: label "Farm-to-Table. Honest. Pure."; headline "Pure Nutrition in Every Spoon"; subtext "Premium seeds, naturally sourced from Indian farms. Roasted, raw and ready for your everyday wellness."; buttons "Explore Products" + "Order on WhatsApp". Right side: a composition of the bowl images (`seed-mix-bowl` large in centre, `chia-seed-bowl` and `pumpkin-seeds-bowl` smaller behind/aside), plus `decor/flax-flower-seeds` as an accent, all floating with parallax. Trust row: 100% Natural · No Additives · Plant Based · FSSAI Licensed.
2. **Certificate marquee**: ISO Certified · GMP Certified · HACCP Certified · USDA Certified · FSSAI Licensed.
3. **Our Products** (pinned horizontal scroll): one large panel per product with the bowl image, name, type badge, script tag, short description, 3 key nutrition stats, buttons "View Details" + "Order on WhatsApp". Show the pack front image as a small tilted card in the corner of each panel.
4. **Why Pureliva**: 6 icon cards: 100% Natural, No Additives, Plant Based, Direct Farm Sourcing, Resealable Zipper Pack, Certified Quality Handling.
5. **Who We Are**: image collage (pack front images fanned, or `decor/chia-flower-seeds` + `decor/sunflower-kernels-pile`) with reveal; heading "Rooted in Farming. Built on Trust."; text: "Pureliva is an agro brand by Patidar Enterprises, Khandwa, Madhya Pradesh. Our founder grew up in a farming family — purity isn't a marketing promise, it's a standard we lived by long before it became a trend. We work directly with trusted farmers and certified processing units, with no middlemen and no shortcuts."; quote: "When the soil is your teacher, purity is our promise."
6. **How to Order on WhatsApp**: 3 steps with a connecting animated line.
7. **Nutrition at a glance**: tabs per product (tab colour = accent), animated bars/rings for Protein, Dietary Fibre, Energy (per 100g), with the bowl image beside.
8. **Ways to Enjoy**: cards — Smoothies & shakes, Salads & raita, Oats & breakfast bowls, Anytime snacking, Baking & laddoos, Curd & yogurt toppings.
9. **Bulk & Export teaser**: "Also supplying bulk Chia Seeds, Flax Seeds, Onion Flakes, Garlic Powder and Dry Garlic to retailers, manufacturers, importers and distributors across India and worldwide." Button: "Bulk Enquiry on WhatsApp".
10. **FAQs** (accordion, smooth height animation):
    - How do I place an order? → Tap "Order on WhatsApp" on any product; we'll confirm price, quantity and delivery on chat.
    - Do you deliver across India? → Please message us on WhatsApp with your pincode and we'll confirm delivery options.
    - Are your seeds ready to eat? → Flax, Sunflower, Pumpkin and Seed Mix are roasted & salted and ready to eat. Chia Seeds are raw and natural.
    - How should I store the pack? → Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.
    - Do you support bulk/export orders? → Yes, we supply bulk buyers, retailers, manufacturers, importers and distributors, and respond within 24 hours.
    - Do you offer custom packaging? → We can discuss packaging based on quantity, destination and product type.
11. **Instagram CTA**: "Show your Pureliva creation to us @purelivafoods" → https://instagram.com/purelivafoods

### Products (`/products`)
Grid of the 5 products, filter chips (All / Roasted & Salted / Raw) with animated layout (Framer Motion `layout`). Card: bowl image on top (hover: bowl lifts and rotates slightly, accent glow), name, badge, tag, 100g, "View Details" + "Order on WhatsApp".

### Product detail (`/products/:slug`)
- Image gallery: tabs/thumbnails for **Bowl**, **Pack Front**, **Pack Back**; 3D flip animation between pack front and back; hover zoom on desktop.
- Name, type badge, script tag, "Premium", net weight 100g, short description.
- Badges: 100% Natural · No Additives · Plant Based · Resealable Zipper.
- Ingredients.
- **Nutritional Information table** (Per 100g / Per Serve / %RDA where given), note: "%RDA values are based on a 2,000 kcal diet for an average adult as per ICMR 2020."
- Storage instructions.
- Allergen caution box: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds."
- Quantity stepper + "Order on WhatsApp" (sticky bottom bar on mobile).
- "You may also like" (other products).
- Page highlights use the product accent colour (CSS variable set per page).
- Unknown slug → friendly 404 with link to products.

### About (`/about`)
Story, founder's farming roots, animated vertical timeline: Farm → Cleaning & Sorting → Roasting / Processing → Quality Check → Packing in Resealable Zipper Packs. Values grid, certifications.

### Bulk & Export (`/bulk-export`)
B2B content: bulk products (Chia Seeds, Flax Seeds, Onion Flakes, Garlic Powder, Dry Garlic), "Why buyers choose Pureliva" (Direct farm sourcing, Certified handling, Bulk export readiness, Fast quotation support), certifications. Enquiry form (Name, Company, Country, Product, Quantity, Message) → opens WhatsApp with details. (For Onion Flakes / Garlic products use simple illustrated icon cards, no photos.)

### Build Your Order (`/order`)
Multi-product order builder from section 5.

### Contact (`/contact`)
Address: 31, Vaikunth Nagar, Khandwa, Madhya Pradesh – 450001, India
Email: info@purelivafood.com
WhatsApp: +91 97531 64155
Instagram: @purelivafoods
Embedded Google Maps iframe for the address, contact form → WhatsApp.

## 7. IMAGES (already provided — use these exact paths)

Each image exists as `.webp` + fallback (`.png` for transparent, `.jpg` for packs).

```
/images/brand/logo.(webp|png)            transparent, green/brown logo – navbar, intro
/images/brand/logo-white.(webp|png)      transparent, all-white logo – footer, dark sections
/images/brand/fssai-logo.png             FSSAI logo – footer, trust row

/images/products/<slug>-bowl.(webp|png)        transparent bowl photo – cards, hero, panels
/images/products/<slug>-pack-front.(webp|jpg)  real pack front design
/images/products/<slug>-pack-back.(webp|jpg)   real pack back design (nutrition, etc.)
  slugs: flax-seeds, seed-mix, chia-seed, sunflower-seeds, pumpkin-seeds

/images/decor/flax-flower-seeds.(webp|png)      transparent – flax flowers + seeds
/images/decor/chia-flower-seeds.(webp|png)      transparent – chia flowers + seeds
/images/decor/sunflower-kernels-pile.(webp|png) transparent – pile of sunflower kernels
/images/decor/seed-mix-bowl-alt.(webp|png)      transparent – alternate seed mix bowl
```

Create a reusable `<Img src="/images/products/flax-seeds-bowl" alt="..." transparent />` component that outputs `<picture>` with webp + correct fallback extension. Write meaningful alt text for every image. Also generate a favicon from the leaf of the logo (simple green leaf SVG).

## 8. PRODUCT DATA (`/src/data/products.ts` — single source of truth)

All packs: Net weight 100 g, resealable zipper, vegetarian (green dot), FSSAI 21426950001159.

1. **Flax Seeds – Roasted & Salted** | slug `flax-seeds` | SKU PUR-FLX-100 | tag "Ready to Eat" | type Roasted & Salted | accent `#B5652A`
   Ingredients: Roasted Flax Seeds & Iodised Salt · Serving 30 g (approx. 2 tbsp), about 3 per pack
   Per 100g: Energy 585.7 kcal, Total Carbohydrate 34.5 g, Dietary Fibre 27.2 g, Total Sugars 1.5 g, Added Sugars <0.1 g, Protein 18.1 g, Total Fat 41.7 g, Saturated Fat 3.1 g, Trans Fat <0.1 g, Sodium 492 mg, Potassium 785 mg, Calcium 232 mg, Iron 5.1 mg
   Description: Crunchy roasted flax seeds, lightly salted. Naturally rich in fibre and plant protein — sprinkle on salads, raita, oats or enjoy straight from the pack.

2. **Seed Mix – Roasted & Salted** | slug `seed-mix` | SKU PUR-MIX-100 | tag "Power Seed Blend" | type Roasted & Salted | accent `#7A0F2E`
   Ingredients: Chia Seeds, Pumpkin Seeds, Sunflower Seeds, Flax Seeds, Sesame Seeds, Watermelon Seeds, Iodised Salt · Serving 25 g (approx. 2 tbsp), about 4 per pack
   Per 100g: Energy 578.7 kcal, Protein 20.8 g, Carbohydrate 24.2 g, Dietary Fibre 13.2 g, Total Sugars 2.0 g, Added Sugars <0.1 g, Total Fat 44.3 g, Saturated Fat 5.8 g, Trans Fat <0.1 g, Sodium 550 mg
   Description: A power blend of six seeds, roasted and lightly salted. One handful, many nutrients — the perfect everyday healthy snack.

3. **Chia Seed – Raw & Natural** | slug `chia-seed` | SKU PUR-CHI-100 | tag "Superfood for Everyday" | type Raw | accent `#B57EDC`
   Ingredients: Raw Chia Seeds · Serving 25 g (approx. 2 tbsp), about 4 per pack
   Per 100g: Energy 491.2 kcal, Carbohydrate 40.0 g, Total Sugars 0.5 g, Dietary Fibre 26.3 g, Protein 22.5 g, Total Fat 26.8 g, Saturated Fat 3.3 g, Trans Fat 0.0 g, Cholesterol 0.0 mg, Sodium 16 mg
   Description: Pure, raw chia seeds with nothing added. Soak for puddings, add to smoothies, lemonade or overnight oats.

4. **Sunflower Seeds – Roasted & Salted** | slug `sunflower-seeds` | SKU PUR-SUN-100 | tag "Ready to Eat" | type Roasted & Salted | accent `#F5C518`
   Ingredients: Roasted Sunflower Seeds & Iodised Salt · Serving 30 g, approx. 3.3 per pack
   Per 100g: Energy 613.7 kcal, Protein 20.8 g, Carbohydrate 26.2 g, Total Sugars 2.6 g, Added Sugars <0.1 g, Dietary Fibre 8.6 g, Total Fat 47.3 g, Saturated Fat 5.2 g, Trans Fat <0.1 g, Sodium 468 mg, Potassium 642 mg, Calcium 78.0 mg, Iron 5.3 mg
   Description: Golden roasted sunflower kernels with a light touch of salt. A crunchy, satisfying snack for any time of day.

5. **Pumpkin Seeds – Roasted & Salted** | slug `pumpkin-seeds` | SKU PUR-RPS-100 | tag "Ready to Eat" | type Roasted & Salted | accent `#F28C0F`
   Ingredients: Roasted Pumpkin Seeds & Iodised Salt · Serving 30 g, approx. 3.3 per pack
   Per 100g: Energy 593.9 kcal, Protein 29.8 g, Carbohydrate 21.7 g, Total Sugars 1.4 g, Added Sugars <0.1 g, Dietary Fibre 5.8 g, Total Fat 43.1 g, Saturated Fat 7.5 g, Trans Fat <0.1 g, Sodium 443 mg, Potassium 720 mg, Calcium 48.0 mg, Iron 7.8 mg
   Description: Roasted green pumpkin seeds, lightly salted. The highest-protein seed in our range — great for snacking and topping.

Per-serve values: compute from per-100g × serving size / 100 (round to 1 decimal), in a helper — do not hard-code.

## 9. PROJECT STRUCTURE & QUALITY

```
src/
  config/site.ts          WhatsApp number, email, address, Instagram, FSSAI no.
  data/products.ts        product data (section 8)
  data/faqs.ts
  lib/whatsapp.ts         buildWhatsAppLink, order message builders
  components/             Navbar, Footer, Preloader, PageTransition, Img, ProductCard,
                          ProductPanel, NutritionTable, NutritionBars, WhatsAppButton,
                          FloatingWhatsApp, QuantityStepper, SectionHeading, RevealText,
                          FAQAccordion, Marquee, WaveDivider, CustomCursor, ScrollProgress
  hooks/                  useLenis, useReducedMotion, useScrollDirection
  pages/                  Home, Products, ProductDetail, About, BulkExport, Order, Contact, NotFound
```

- Mobile-first; test 360px, 768px, 1024px, 1440px; no horizontal page scroll on mobile.
- Accessibility: alt text, visible focus states, keyboard navigation, aria-labels on icon buttons, colour contrast AA (note: yellow accent text on white fails contrast — use yellow only for backgrounds/badges with dark text).
- Per-page `<title>` "<Page> | Pureliva Foods" and meta description via react-helmet-async; add Organization JSON-LD in index.html.
- Scroll to top on route change.
- No lorem ipsum; use only the real content above.
