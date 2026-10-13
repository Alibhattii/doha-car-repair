import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from '../components/seo/helmet'
import PageMeta from '../components/seo/PageMeta'
import Breadcrumb from '../components/ui/Breadcrumb'
import { services } from '../data/services'
import { blogPosts } from '../data/blogPosts'
import { business } from '../data/business'
import FAQSection from '../components/home/FAQSection'
import CTASection from '../components/home/CTASection'

export default function ServicePage() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/404" replace />

  const relatedPost = service.blogSlug ? blogPosts.find((p) => p.slug === service.blogSlug) : null

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    provider: {
      '@type': 'AutoRepair',
      name: 'Dohar Car Repair',
      url: 'https://doharcarrepairqa.com',
      telephone: '+97472223959',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Street 27',
        addressLocality: 'Doha',
        addressCountry: 'QA',
      },
    },
    areaServed: ['Doha', 'Al Wakrah', 'Al Rayyan', 'Al Khor', 'Lusail'],
    description: service.description,
    url: `https://doharcarrepairqa.com/services/${service.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://doharcarrepairqa.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://doharcarrepairqa.com/#services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: `https://doharcarrepairqa.com/services/${slug}`,
      },
    ],
  }

  const whatsappMsg = encodeURIComponent(
    `Hello Dohar Car Repair, I need ${service.name} service. Please provide a quote.`
  )

  return (
    <>
      <PageMeta
        title={service.metaTitle}
        description={service.metaDesc}
        canonical={`/services/${slug}`}
        ogImage={`https://doharcarrepairqa.com${service.image}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="pt-[88px] md:pt-[96px]" />
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/#services' },
          { label: service.name },
        ]}
      />

      {/* Hero */}
      <section
        className="relative h-64 md:h-80 flex items-center justify-center text-white text-center overflow-hidden"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-primary/40" />
        <div className="relative z-10 container max-w-3xl">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className={`fas ${service.icon} text-white text-2xl`} aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black mb-3">{service.name}</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            Professional {service.name.toLowerCase()} in Doha, Qatar — Expert service for all makes
            and models
          </p>
        </div>
      </section>

      {/* Service content */}
      <section className="section-pad bg-white">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            {/* Main content */}
            <div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-4">
                About Our {service.name} in Doha
              </h2>
              <p className="text-gray-600 leading-relaxed text-base mb-6">{service.description}</p>

              {/* Service image */}
              <img
                src={service.image}
                alt={service.imageAlt}
                className="w-full rounded-2xl shadow-card mb-6"
                width={1200}
                height={675}
                loading="lazy"
              />

              {/* Why choose us for this service */}
              <h2 className="text-xl font-display font-bold text-charcoal mb-4">
                Why Choose Dohar Car Repair for {service.name}?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: 'fa-award', text: '15+ Years of Experience' },
                  { icon: 'fa-tools', text: 'Certified Expert Mechanics' },
                  { icon: 'fa-dollar-sign', text: 'Best Prices in Qatar' },
                  { icon: 'fa-clock', text: '24/7 Emergency Service' },
                  { icon: 'fa-file-contract', text: 'Complete Documentation' },
                  { icon: 'fa-car', text: 'All Makes & Models' },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`fas ${item.icon} text-primary text-sm`} aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium text-charcoal">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Service-specific FAQ */}
              {service.faq?.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-display font-bold text-charcoal mb-4">
                    {service.name} — Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {service.faq.map((item, i) => (
                      <details key={i} className="card p-5 group">
                        <summary className="font-semibold text-charcoal text-sm cursor-pointer list-none flex justify-between items-center gap-3">
                          {item.q}
                          <i
                            className="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0"
                            aria-hidden="true"
                          />
                        </summary>
                        <p className="text-gray-500 text-sm leading-relaxed mt-3">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Related blog link */}
              {relatedPost && (
                <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">📖 Read our complete guide:</p>
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    className="font-display font-bold text-primary hover:underline text-base"
                  >
                    {relatedPost.title} →
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <aside className="flex flex-col gap-5">
              <div className="bg-red-gradient text-white rounded-2xl p-6 text-center sticky top-28">
                <i className={`fas ${service.icon} text-3xl mb-3`} aria-hidden="true" />
                <h3 className="font-display font-bold text-xl mb-2">Get a Free Quote</h3>
                <p className="text-white/85 text-sm mb-5">
                  Contact us for a free {service.name.toLowerCase()} assessment in Doha.
                </p>
                <Link
                  to="/contact"
                  className="block w-full py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors mb-3"
                >
                  Contact Us
                </Link>
                <a
                  href={`https://wa.me/97472223959?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25d366] text-white font-bold rounded-xl text-sm hover:bg-[#20bc5a] transition-colors mb-3"
                >
                  <i className="fab fa-whatsapp" aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center justify-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <i className="fas fa-phone" aria-hidden="true" />
                  {business.phoneDisplayFormatted}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
