import { Link } from 'react-router-dom'
import PageMeta from '../components/seo/PageMeta'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page Not Found | Dohar Car Repair"
        description="The page you're looking for doesn't exist. Return to Dohar Car Repair homepage for car repair services in Doha, Qatar."
        canonical="/404"
        noindex
      />

      <div className="pt-[88px] md:pt-[96px]" />

      <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-16">
        <div className="container text-center max-w-lg">
          <div
            className="text-8xl md:text-9xl font-display font-black text-primary/20 leading-none mb-4 select-none"
            aria-hidden="true"
          >
            404
          </div>

          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-car text-primary text-3xl" aria-hidden="true" />
          </div>

          <h1 className="text-3xl font-display font-bold text-charcoal mb-3">Page Not Found</h1>
          <p className="text-gray-500 text-base mb-8 leading-relaxed">
            Oops — the page you're looking for doesn't exist or may have been moved. If you typed in
            a URL, double-check for typos. Otherwise, head back home.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-primary">
              <i className="fas fa-home text-sm" aria-hidden="true" />
              Back to Home
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-gray-400 text-sm mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {[
                { to: '/blog', label: 'Blog & Guides' },
                { to: '/services/engine-repair', label: 'Engine Repair' },
                { to: '/services/scrap-car-buyers', label: 'Sell Scrap Car' },
                { to: '/services/emergency-car-service', label: 'Emergency Service' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
