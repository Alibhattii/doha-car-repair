# Migration Checklist — Dohar Car Repair Rebuild

This checklist confirms that all non-negotiable business information, contact details, coordinates, services, and content from the original website (`https://doharcarrepairqa.com/`) have been preserved **verbatim** in the new React + Vite rebuild without truncation, modification, or deletion.

---

## 1. Non-Negotiable Business Information

| Item | Expected Original Value | Preserved Location in Code | Status |
| :--- | :--- | :--- | :---: |
| **Brand Name** | `Dohar Car Repair` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L5) (line 5)<br>All component headings & SEO meta | **Preserved** |
| **Address** | `Street 27, Doha, Qatar` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L20-L24)<br>[`src/components/layout/Footer.jsx`](file:///e:/Doha%20Car%20Repair/src/components/layout/Footer.jsx#L71) | **Preserved** |
| **Google Maps Link** | `https://www.google.com/maps/place/Street+27,+Doha,+Qatar/@25.1943016,51.4414828,17z/...` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L25) (line 25) | **Preserved** |
| **Geo Coordinates** | `25.1941171, 51.4421909` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L30-L40)<br>[`src/components/seo/PageMeta.jsx`](file:///e:/Doha%20Car%20Repair/src/components/seo/PageMeta.jsx#L42-L46) | **Preserved** |
| **Phone Number** | `+974 7222 3959` (displayed as `0097472223959`, `tel:+97472223959`) | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L11-L14)<br>[`src/components/layout/Header.jsx`](file:///e:/Doha%20Car%20Repair/src/components/layout/Header.jsx#L68) | **Preserved** |
| **WhatsApp Link** | `https://wa.me/97472223959` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L15) (line 15) | **Preserved** |
| **WhatsApp Prefilled Msg (General)** | `Hello%20Dohar%20Car%20Repair,%20I%20need%20your%20car%20repair%20service` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L16) (line 16) | **Preserved** |
| **WhatsApp Prefilled Msg (Promo)** | `Hi%2C%20I%20want%20to%20claim%20the%2020%25%20discount%20offer!` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L17) (line 17) | **Preserved** |
| **Primary Email** | `carrepairqa@gmail.com` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L18) (line 18) | **Preserved** |
| **Secondary Email** | `frontify7@gmail.com` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L19) (line 19) | **Preserved** |
| **Facebook Profile** | `https://www.facebook.com/profile.php?id=61591072305168` | [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L34) (line 34) | **Preserved** |
| **Brand Color** | `#d62839` (red) | [`tailwind.config.js`](file:///e:/Doha%20Car%20Repair/tailwind.config.js#L11)<br>[`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L42) | **Preserved** |
| **20% OFF Offer Bar** | Limited Time Offer: 20% OFF on All Car Repair Services in Doha! | [`src/components/layout/Header.jsx`](file:///e:/Doha%20Car%20Repair/src/components/layout/Header.jsx#L59-L86)<br>[`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L68-L72) | **Preserved** |

---

## 2. All 16 Service Names & Descriptions Preserved

All 16 services are defined in [`src/data/services.js`](file:///e:/Doha%20Car%20Repair/src/data/services.js) and dynamically mapped across landing pages and home grids:

1. **Car Repair Services** (`/services/car-repair`)
2. **Engine Repair** (`/services/engine-repair`)
3. **Buy Scrap Cars** (`/services/scrap-car-buyers`)
4. **Buy Damaged Cars** (`/services/buy-damaged-cars`)
5. **Sell Accident Car** (`/services/sell-accident-car`)
6. **Emergency Car Service (24/7)** (`/services/emergency-car-service`)
7. **Brake Repair & Replacement** (`/services/brake-repair`)
8. **AC Repair & Service** (`/services/ac-repair`)
9. **Battery Replacement** (`/services/battery-replacement`)
10. **Steering Box Repair** (`/services/steering-box-repair`)
11. **Front Windshield Installation** (`/services/front-windshield`)
12. **Body Denting** (`/services/body-denting`)
13. **Car Painting** (`/services/car-painting`)
14. **Suspension Repair** (`/services/suspension-repair`)
15. **Computer Diagnostics** (`/services/computer-diagnostics`)
16. **Oil Change** (`/services/oil-change`)

---

## 3. Why Choose Us & Trust Badges

- **15+ Years Experience**: Preserved in [`src/components/home/WhyChooseUs.jsx`](file:///e:/Doha%20Car%20Repair/src/components/home/WhyChooseUs.jsx#L4)
- **Best Prices in Qatar**: Preserved in [`src/components/home/WhyChooseUs.jsx`](file:///e:/Doha%20Car%20Repair/src/components/home/WhyChooseUs.jsx#L9)
- **24/7 Emergency Service**: Preserved in [`src/components/home/WhyChooseUs.jsx`](file:///e:/Doha%20Car%20Repair/src/components/home/WhyChooseUs.jsx#L14)
- **Expert Mechanics**: Preserved in [`src/components/home/WhyChooseUs.jsx`](file:///e:/Doha%20Car%20Repair/src/components/home/WhyChooseUs.jsx#L19)
- **Complete Documentation**: Preserved in [`src/components/home/WhyChooseUs.jsx`](file:///e:/Doha%20Car%20Repair/src/components/home/WhyChooseUs.jsx#L24)

---

## 4. FAQs & Testimonials

- **All 8 FAQs**: Preserved with exact questions and answers in [`src/data/faqs.js`](file:///e:/Doha%20Car%20Repair/src/data/faqs.js)
- **All 10 Client Testimonials**: Preserved with initials and names in [`src/data/testimonials.js`](file:///e:/Doha%20Car%20Repair/src/data/testimonials.js)

---

## 5. Directory & Citation Links

Preserved in [`src/data/business.js`](file:///e:/Doha%20Car%20Repair/src/data/business.js#L50-L57) and rendered in [`src/components/layout/Footer.jsx`](file:///e:/Doha%20Car%20Repair/src/components/layout/Footer.jsx#L130-L150):
- Qatar Yellow Pages (`https://www.yellow.com.qa`)
- Qatar Living (`https://www.qatarliving.com`)
- Cylex Qatar (`https://qatar.cylex-gulf.com`)
- Expat Ads Qatar (`https://www.expatads.com/Qatar/`)
- 4WD Qatar (`https://www.4wdqatar.com`)
- Just Landed Qatar (`https://www.justlanded.com/english/Qatar`)

---

## 6. Images & Assets

- Retained all existing webp image files in `/public/Image/` with original filenames.
- Logo: `/public/Header-logo.webp` and Favicon: `/public/Favicon-logo.webp`.
- Google Search Console verification: `/public/google894706982a5f5ff3.html`.
