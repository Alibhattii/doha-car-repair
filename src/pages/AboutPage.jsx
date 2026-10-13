import { Helmet } from '../components/seo/helmet'
import { Link } from 'react-router-dom'
import PageMeta from '../components/seo/PageMeta'
import Breadcrumb from '../components/ui/Breadcrumb'
import Testimonials from '../components/home/Testimonials'
import CTASection from '../components/home/CTASection'
import DialGaugeStat from '../components/motion/DialGaugeStat'
import { business } from '../data/business'

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Dohar Car Repair',
  url: 'https://doharcarrepairqa.com/about',
  description:
    "Learn about Dohar Car Repair, Doha's trusted auto repair workshop with 15+ years of experience serving Qatar.",
  mainEntity: {
    '@type': 'Organization',
    name: 'Dohar Car Repair',
    url: 'https://doharcarrepairqa.com',
    foundingDate: '2009',
    numberOfEmployees: '10',
    telephone: '+97472223959',
    email: 'carrepairqa@gmail.com',
    sameAs: ['https://www.facebook.com/profile.php?id=61591072305168'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Street 27',
      addressLocality: 'Doha',
      addressCountry: 'QA',
    },
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://doharcarrepairqa.com/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About Us',
      item: 'https://doharcarrepairqa.com/about',
    },
  ],
}

const stats = [
  { target: 500, label: 'Cars Repaired Successfully', suffix: '+' },
  { target: 300, label: 'Scrap Cars Bought', suffix: '+' },
  { target: 800, label: 'Satisfied Clients Served', suffix: '+' },
  { target: 15, label: 'Years of Experience', suffix: '+' },
]

const whyFeatures = [
  {
    icon: 'fa-check-circle',
    title: 'Fair Pricing',
    desc: 'We offer competitive prices based on market value and vehicle condition.',
  },
  {
    icon: 'fa-bolt',
    title: 'Quick Service',
    desc: 'Fast evaluation and processing. Get your quote and payment quickly.',
  },
  {
    icon: 'fa-users',
    title: 'Expert Team',
    desc: 'Experienced professionals with years of industry knowledge.',
  },
  {
    icon: 'fa-file-alt',
    title: 'Complete Documentation',
    desc: 'We handle all paperwork and legal requirements for you.',
  },
  {
    icon: 'fa-truck',
    title: 'Free Pickup',
    desc: 'We provide free vehicle pickup service across Qatar.',
  },
  {
    icon: 'fa-star',
    title: 'Customer Satisfaction',
    desc: 'Thousands of satisfied customers trust us for their car needs.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us | Dohar Car Repair — Trusted Auto Workshop in Doha"
        description="Learn about Dohar Car Repair — Doha's trusted auto workshop with 15+ years experience. Expert technicians, honest pricing, and 800+ satisfied customers in Qatar."
        canonical="/about"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Page spacing for fixed header */}
      <div className="pt-[88px] md:pt-[96px]" />

      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />

      {/* Page header */}
      <section className="bg-charcoal-dark text-white py-14">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-4">
            About Dohar Car Repair — Trusted Car Repair Doha
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Your Trusted Partner for Professional Car Repair &amp; Automotive Services in Doha,
            Qatar
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-pad bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-6">
            Who We Are
          </h2>
          <div className="prose-like space-y-4 text-gray-600 leading-relaxed">
            <p>
              Dohar Car Repair is a leading provider of professional car repair, scrap car buying,
              damaged car services, and comprehensive automotive solutions across Qatar. With over
              15 years of experience in the automotive industry, we have established ourselves as
              the premier destination for car owners looking for expert repair services, vehicle
              sales, or professional automotive solutions in Doha and throughout Qatar.
            </p>
            <p>
              Our mission is to provide honest, transparent, and efficient automotive services that
              exceed customer expectations. Whether you need expert car repair, engine diagnostics,
              to sell a scrap car, damaged vehicle, or require emergency roadside assistance, Dohar
              Car Repair is committed to delivering exceptional value, quality workmanship, and
              outstanding customer satisfaction.
            </p>
            <p>
              We pride ourselves on our team of certified mechanics, state-of-the-art diagnostic
              equipment, genuine parts, and commitment to fair pricing. At Dohar Car Repair, your
              vehicle is in expert hands, and your satisfaction is our top priority.
            </p>
            <p>
              <Link to="/" className="text-primary font-semibold hover:underline">
                See Our Services →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* Stats - Gauge-Style Automotive Dials */}
      <section className="section-pad bg-charcoal-dark text-white">
        <div className="container">
          <h2 className="section-title text-white mb-2">Our Achievements &amp; Experience</h2>
          <p className="section-subtitle text-gray-400">
            Trusted by thousands of customers across Qatar
          </p>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <DialGaugeStat key={s.label} target={s.target} label={s.label} suffix={s.suffix} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-pad bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-8">
            What We Offer
          </h2>
          <div className="space-y-8">
            {[
              {
                title: 'Professional Car Repair Services in Doha',
                body: 'Our state-of-the-art workshop in Doha is equipped with modern diagnostic tools, hydraulic lifts, and professional-grade equipment. Staffed by certified and experienced mechanics, we provide comprehensive car repair services covering all aspects of vehicle maintenance and repair. From routine oil changes and brake service to complex transmission repairs and electrical diagnostics, we ensure your vehicle runs smoothly and safely. We work on all makes and models including European, Japanese, American, and Korean vehicles.',
              },
              {
                title: 'Engine Repair & Diagnostics',
                body: "Engine problems can be complex and expensive if not addressed properly. Our specialized engine repair services in Qatar use advanced diagnostic equipment including OBD-II scanners, compression testers, and engine analyzers. We use genuine OEM parts and high-quality aftermarket components to restore your engine's performance. Our certified mechanics handle everything from minor tune-ups and timing belt replacement to complete engine rebuilds. We work on all engine types including gasoline, diesel, hybrid, and electric vehicle systems.",
              },
              {
                title: 'Scrap Car Buying in Qatar',
                body: "We purchase scrap cars at competitive market prices throughout Qatar. Our evaluation process is quick, fair, and completely transparent. If you have an old, non-functional, or unwanted vehicle taking up space, we'll provide a free on-site evaluation and give you a fair price based on current market rates. We handle all paperwork including vehicle transfer, deregistration, and documentation, making the entire process hassle-free. Free pickup service is available across Doha and surrounding areas.",
              },
              {
                title: 'Damaged Car Services & Accident Car Buyers',
                body: "Accidents happen, but that doesn't mean your car is worthless. We specialize in buying damaged and accident cars in Doha and throughout Qatar. Our expert evaluators assess structural damage, mechanical issues, and cosmetic problems to determine fair market value. We offer competitive prices based on the vehicle's condition, age, make, model, and current market value. Whether your car has minor collision damage or is a total loss, we provide honest evaluations and fair offers. Same-day evaluation and payment available.",
              },
              {
                title: 'Junk Car Buyers & Removal',
                body: "As one of the leading junk car buyers in Qatar, we make it easy to dispose of your unwanted, non-running, or end-of-life vehicles. We handle everything from initial evaluation to vehicle pickup and proper disposal. Our environmentally responsible approach ensures vehicles are recycled or disposed of according to Qatar's regulations. We accept all types of junk vehicles regardless of condition - no title, no problem. Free removal service available throughout Doha and Qatar.",
              },
              {
                title: '24/7 Emergency Car Services',
                body: "When you're stranded on the road, time matters. Our 24/7 emergency car services across Qatar ensure quick response times, typically within 30-45 minutes in Doha. Whether it's a breakdown, flat tire, dead battery, lockout, or any roadside emergency, we're here to help. Our emergency service fleet includes fully equipped service vehicles with tools, spare parts, and towing equipment. We provide jump-start service, tire change, fuel delivery, lockout assistance, and emergency towing. Available round the clock, 365 days a year.",
              },
              {
                title: 'Additional Services',
                body: 'Beyond our core services, Dohar Car Repair offers comprehensive automotive solutions including brake repair and replacement, transmission service, AC repair and recharge, battery replacement, oil change and fluid service, car body repair and paint, electrical system diagnostics and repair, wheel alignment and balancing, tire service, and preventive maintenance programs. We also provide car diagnostic services using advanced computer systems to identify issues before they become major problems.',
              },
            ].map((item) => (
              <div key={item.title} className="border-l-4 border-primary/30 pl-6">
                <h3 className="text-lg font-display font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="section-title">Why Choose Dohar Car Repair?</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-5">
            {whyFeatures.map((f) => (
              <div
                key={f.title}
                className="card p-5 text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                  <i
                    className={`fas ${f.icon} text-primary group-hover:text-white transition-colors`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display font-bold text-charcoal text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="container">
          <h3 className="text-center font-display font-bold text-charcoal mb-6">
            Trusted &amp; Listed On
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {business.directories.slice(0, 4).map((dir) => (
              <a
                key={dir.name}
                href={dir.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                {dir.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-pad bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-charcoal text-center mb-8">
            Find Us in Doha
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-card">
            <iframe
              src={business.address.embedUrl}
              title="Dohar Car Repair location on Google Maps"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Testimonials />
      <CTASection />
    </>
  )
}
