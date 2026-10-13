import { Helmet } from '../components/seo/helmet'
import { business } from '../data/business'
import PageMeta from '../components/seo/PageMeta'
import Hero from '../components/home/Hero'
import ServicesGrid from '../components/home/ServicesGrid'
import WhyChooseUs from '../components/home/WhyChooseUs'
import ScrapProcess from '../components/home/ScrapProcess'
import BrandsSection from '../components/home/BrandsSection'
import AreasWeServe from '../components/home/AreasWeServe'
import Testimonials from '../components/home/Testimonials'
import FAQSection from '../components/home/FAQSection'
import CTASection from '../components/home/CTASection'
import { AutomotiveTreadDivider } from '../components/motion/AutomotiveTreadDivider'

// Structured data — Home page
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Dohar Car Repair',
  url: 'https://doharcarrepairqa.com',
  telephone: '+97472223959',
  email: 'carrepairqa@gmail.com',
  sameAs: ['https://www.facebook.com/profile.php?id=61591072305168'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Street 27',
    addressLocality: 'Doha',
    addressCountry: 'QA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.1941171,
    longitude: 51.4421909,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '20:00',
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '14:00', closes: '20:00' },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '18:00',
    },
  ],
  areaServed: ['Doha', 'Al Wakrah', 'Al Rayyan', 'Al Khor', 'Lusail'],
  priceRange: '$$',
  description:
    'Dohar Car Repair offers expert car repair, engine repair, brake and AC service, battery replacement, and 24/7 emergency automotive solutions in Doha, Qatar, plus top cash offers for scrap and damaged car buying.',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dohar Car Repair',
  url: 'https://doharcarrepairqa.com',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much can I get for my scrap car in Qatar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The price for scrap cars in Qatar depends on the vehicle's make, model, year, and condition. We offer free on-site evaluation and provide competitive prices based on current market rates. Contact us for a free quote - we typically respond within 24 hours.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you buy damaged cars in Doha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we buy damaged cars, accident cars, and collision-damaged vehicles in Doha and throughout Qatar. Our expert evaluators assess the damage and offer fair prices. We handle all paperwork and provide free pickup service with same-day payment available.',
      },
    },
    {
      '@type': 'Question',
      name: 'What car repair services do you offer in Qatar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer comprehensive car repair services including engine repair, brake repair, AC repair, battery replacement, oil change, electrical repair, body repair, steering box repair, front windshield installation, body denting, car painting, and general maintenance for all makes and models.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide emergency car service in Qatar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide 24/7 emergency car service across Qatar including roadside assistance, towing, battery jump-start, flat tire service, and emergency repairs. We typically respond within 30-45 minutes in Doha. Call us anytime at 0097472223959.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents do I need to sell my scrap car in Qatar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "To sell your scrap car in Qatar, you typically need the vehicle registration card (Mulkiya), your Qatari ID or passport, and proof of ownership. If the vehicle is under finance, you'll need clearance from the bank. We handle all the paperwork and vehicle transfer process for you, making it hassle-free.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does car repair take in Doha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Car repair time depends on the type and extent of repair needed. Simple repairs like oil change or battery replacement can be done same-day. Engine repair or major repairs may take 2-5 days. We provide accurate time estimates after diagnosis and keep you updated throughout the repair process. Rush service available for urgent repairs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Dohar Car Repair located in Doha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our workshop is at Street 27, Doha, Qatar. We also offer free pickup and mobile emergency service across all areas of Qatar including Al Wakrah, Al Khor, and Lusail.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Dohar Car Repair have a Facebook page?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Follow us on Facebook for service updates, car tips, and special offers: facebook.com/profile.php?id=61591072305168',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Car Repair Doha & Scrap Car Buyers Qatar | Dohar Car Repair"
        description="Doha's trusted garage for engine, brake, AC & 24/7 emergency repair, plus top cash offers for scrap & damaged cars in Qatar. Free quote: +974 7222 3959."
        canonical="/"
      />

      {/* Structured data */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        {/* GA4 placeholder */}
        {business.analytics.ga4Id && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${business.analytics.ga4Id}`}
            />
            <script>{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${business.analytics.ga4Id}');`}</script>
          </>
        )}
      </Helmet>

      {/* Page sections */}
      <Hero />
      <AutomotiveTreadDivider />
      <ServicesGrid />
      <CTASection />
      <WhyChooseUs />
      <ScrapProcess />
      <AutomotiveTreadDivider />
      <BrandsSection />
      <Testimonials />
      <AreasWeServe />
      <FAQSection />
    </>
  )
}
