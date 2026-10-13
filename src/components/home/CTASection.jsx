import { Link } from 'react-router-dom'
import { business } from '../../data/business'

export default function CTASection() {
  return (
    <section
      className="py-16 bg-dark-gradient text-white text-center relative overflow-hidden"
      aria-label="Call to action"
    >
      {/* Decorative circle */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-black mb-4">
          Need a Car Mechanic in Doha or Want to Sell Your Car?
        </h2>
        <p className="text-white/85 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Contact Dohar Car Repair today for a free quote, professional car repair service, or to
          sell your scrap or damaged car in Qatar. Expert mechanics, competitive pricing, and 24/7
          emergency service available.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Get Free Quote Now
          </Link>
          <a
            href={business.whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25d366] hover:bg-[#20bc5a] text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <i className="fab fa-whatsapp text-lg" aria-hidden="true" />
            WhatsApp Us
          </a>
          <a
            href={`tel:${business.phone}`}
            className="btn-secondary text-base px-8 py-4"
            onClick={() => {
              if (typeof gtag !== 'undefined') {
                gtag('event', 'click_call', {
                  event_category: 'Contact',
                  event_label: 'CTA Section',
                })
              }
            }}
          >
            <i className="fas fa-phone text-sm" aria-hidden="true" />
            {business.phoneDisplayFormatted}
          </a>
        </div>
      </div>
    </section>
  )
}
