# Dohar Car Repair — Website

Business website for Dohar Car Repair, a car repair, maintenance and
scrap/damaged car buying service in Doha, Qatar.

Live: https://doharcarrepairqa.com/

## Project structure

```
├── index.html, about.html, contact.html, blog.html   # main pages
├── privacy.html, terms.html                          # legal pages
├── blog/                                              # 25 individual guide/service posts
├── css/
│   ├── style.css          # layout, components, colors, responsive rules
│   └── animations.css     # scroll-reveal + reduced-motion rules
├── js/
│   ├── main.js              # nav, mobile menu, promo bar, navbar/back-to-top scroll state
│   ├── smooth-animations.js # scroll-reveal observer, parallax, back-to-top, page transitions
│   ├── animations.js        # button ripple micro-interaction only
│   ├── sliders.js           # testimonials/team horizontal sliders
│   ├── contact.js           # contact form validation + submission
│   ├── counters.js          # animated stat counters (About page)
│   ├── faq.js               # FAQ accordion
│   └── service-navigation.js
├── Image/                  # WebP images (logos, hero photos, blog images)
├── google-apps-script.js   # backend for the contact form (Google Apps Script)
├── sitemap.xml, robots.txt, ads.txt
└── CNAME, _headers
```

There is no build step — this is a static, framework-free site. Edit the
HTML/CSS/JS directly and deploy the folder as-is.

## ⚠️ Action required: redeploy the Apps Script backend

`google-apps-script.js` was rewritten to remove the public `getMessages`,
`updateStatus` and `deleteMessage` actions that the old `admin.html` used —
those had **no authentication**, so anyone who found the deployed URL could
read or delete every customer's name, email and phone number. `admin.html`,
`js/admin.js` and `css/admin.css` have been deleted from the site for the
same reason (the old admin password was visible in the page source).

**This file being fixed in the repo does not fix the live backend.** To
close the security hole, copy the current contents of
`google-apps-script.js` into your Apps Script project (Extensions → Apps
Script, from the linked Google Sheet) and redeploy the web app. Until you
do that, the old deployed version — with the old open endpoints — is still
live at whatever URL was hardcoded in the previous `admin.js` (now removed
from this repo, but the deployment itself isn't affected by deleting a
file here).

Going forward, review and manage leads directly in the Google Sheet the
form writes to — there is no admin panel anymore.

## What changed in this pass

- **Security:** removed the public admin panel and hardened the Apps
  Script backend (see above — requires redeployment).
- **Ads:** removed AdSense entirely (script, meta tag, `ads.txt`).
- **Layout:** the promo banner no longer covers the logo/menu — it and the
  navbar are now one sticky header, so they never overlap regardless of
  screen width or how many lines the banner wraps to.
- **Broken content:** fixed 10 broken blog images (pointed at existing
  photos), 2 wrong file extensions, and a live "Our Expert Team" section
  on the homepage that showed placeholder.com images and invented staff
  names (now commented out — re-enable with real photos/names when ready).
- **Images:** swapped 29 PNGs for their existing WebP versions, removed
  33 unused image files (`Image/` folder: 21 MB → 3.6 MB), added
  width/height + lazy loading to blog images, fixed the broken
  `og:image` link-preview path on 24 pages.
- **Design:** removed the animated red-to-pink gradient and bouncy
  spring/overshoot easing used across buttons and cards (site-wide
  `cubic-bezier` overshoot transitions), removed the cursor-following
  "magnetic" button effect and floating particles, consolidated three
  overlapping scroll-animation systems into one. Fixed brand red
  (`#e63946` → `#d62839`) for WCAG AA contrast.
  If you'd rather keep any of the removed effects, they're easy to
  re-add — just ask.
- **Accessibility:** fixed remaining low-contrast text/links, added a
  skip-link, `<main>` landmark, visible keyboard focus styles, reduced-
  motion support, heading-order fixes, keyboard access to the
  horizontally-scrolling sliders, and a title on the embedded map.
  Content (service cards, etc.) is no longer invisible when JavaScript
  is off or hasn't loaded yet.
- **Forms:** contact form now requires a phone number, has a honeypot
  field against spam bots, and validates phone format client-side.
- **SEO:** added the 5 newest blog posts to `sitemap.xml`, removed the
  ignored `meta keywords` tag and a non-functional search action from
  the structured data.
- **Mobile:** fixed a horizontal-scroll bug on the contact page at very
  narrow widths, and fixed button text getting clipped instead of
  wrapping on small screens.

## Still worth doing (not code fixes — needs your input)

- Replace the Unsplash stock hero/card photography with real photos of
  the workshop, vehicles and team.
- Confirm the "15+ years", "800+ customers" and certification claims,
  and the testimonials, are accurate — replace with real Google reviews
  if possible.
- Give the "20% off — Limited Time" offer a real end date, or drop the
  "limited time" framing.
- Decide whether `frontify7@gmail.com` should stay in the public footer
  alongside the main business email.
- Consider Arabic (`ar-QA`) versions of key pages for local search.
- Claim/complete the Google Business Profile and link it from the site
  (`sameAs`, `hasMap`).
