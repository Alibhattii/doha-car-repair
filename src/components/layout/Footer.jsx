import { Link } from 'react-router-dom'
import { business } from '../../data/business'
import { services } from '../../data/services'

export default function Footer() {
  const year = new Date().getFullYear()

  const topServices = services.slice(0, 6)

  return (
    <footer className="bg-charcoal-dark text-white" aria-label="Site footer">
      {/* Main footer grid */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div>
            <Link to="/" aria-label="Dohar Car Repair — Home">
              <img
                src="/Header-logo.webp"
                alt="Dohar Car Repair Logo"
                width="160"
                height="54"
                className="h-12 w-auto mb-4"
                loading="lazy"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional car repair, scrap car buying, damaged car services, and automotive
              solutions in Doha, Qatar. Expert mechanics, 24/7 emergency service, and fair pricing.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dohar Car Repair on Facebook"
                className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <i className="fab fa-facebook-f text-sm" aria-hidden="true" />
              </a>
              <a
                href={business.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Dohar Car Repair on WhatsApp"
                className="w-9 h-9 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <i className="fab fa-whatsapp text-sm" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white font-display font-bold text-base mb-4">Services</h4>
            <ul className="space-y-2" role="list">
              {topServices.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-gray-400 hover:text-primary text-sm transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-display font-bold text-base mb-4">Contact</h4>
            <address className="not-italic space-y-3">
              <p className="flex items-start gap-2 text-gray-400 text-sm">
                <i
                  className="fas fa-map-marker-alt text-primary mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={business.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {business.address.full}
                </a>
              </p>
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <i className="fas fa-phone text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${business.phone}`}
                  className="hover:text-primary transition-colors"
                  onClick={() => {
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'click_call', {
                        event_category: 'Contact',
                        event_label: 'Footer',
                      })
                    }
                  }}
                >
                  {business.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <i className="fas fa-envelope text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${business.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {business.email}
                </a>
              </p>
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <i className="fas fa-envelope text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${business.email2}`}
                  className="hover:text-primary transition-colors"
                >
                  {business.email2}
                </a>
              </p>
            </address>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-white font-display font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2" role="list">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/blog', label: 'Blog' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/10">
        <div className="container py-5">
          {/* Directory citations */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mb-3">
            <span>Find us on:</span>
            {business.directories.map((dir, i) => (
              <span key={dir.name} className="flex items-center gap-3">
                <a
                  href={dir.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  {dir.name}
                </a>
                {i < business.directories.length - 1 && (
                  <span className="text-gray-700" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            &copy; {year} {business.name}. All rights reserved. | Professional Car Repair &amp;
            Automotive Services in Doha, Qatar
          </p>
        </div>
      </div>
    </footer>
  )
}
