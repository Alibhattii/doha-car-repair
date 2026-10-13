import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { business } from '../../data/business'
import ScrollOdometerProgress from '../motion/ScrollOdometerProgress'

export default function Header() {
  const [promoVisible, setPromoVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Sticky header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Dismiss promo and remember in sessionStorage
  const closePromo = () => {
    setPromoVisible(false)
    try {
      sessionStorage.setItem('promoHidden', '1')
    } catch {}
  }

  // Check session storage on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem('promoHidden')) setPromoVisible(false)
    } catch {}
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-[100]">
      {/* Promo bar */}
      {promoVisible && (
        <div
          className="bg-red-gradient text-white text-sm py-2 px-4 flex items-center justify-between gap-4"
          id="promoBar"
        >
          <p className="text-center flex-1 flex flex-wrap items-center justify-center gap-1.5">
            <span>🔧 {business.promoBar.text}</span>
            <strong className="font-extrabold bg-white text-primary px-2 py-0.5 rounded shadow-sm inline-block -rotate-2 transform mx-1">
              {business.promoBar.highlight}
            </strong>
            <span>{business.promoBar.suffix}</span>
            <span className="hidden sm:inline">|</span>
            <a
              href={`tel:${business.phone}`}
              className="font-semibold underline hover:no-underline"
              onClick={() => {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click_call', {
                    event_category: 'Contact',
                    event_label: 'Promo Bar',
                  })
                }
              }}
            >
              Call Now: {business.phoneDisplayFormatted}
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href={business.whatsappPromo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:no-underline"
            >
              Claim on WhatsApp →
            </a>
          </p>
          <button
            onClick={closePromo}
            aria-label="Close promotion bar"
            className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main navbar */}
      <nav
        ref={menuRef}
        className={`bg-charcoal-dark transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}
        aria-label="Main navigation"
      >
        <div className="container flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Dohar Car Repair — Home">
            <img
              src="/Header-logo.webp"
              alt="Dohar Car Repair Logo"
              width="180"
              height="60"
              className="h-12 w-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-primary bg-white/10'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${business.phone}`}
              className="btn-primary text-sm px-5 py-2.5"
              onClick={() => {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click_call', {
                    event_category: 'Contact',
                    event_label: 'Header Button',
                  })
                }
              }}
            >
              <i className="fas fa-phone text-xs" aria-hidden="true" />
              Call Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="container pb-4 flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-primary bg-white/10'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={`tel:${business.phone}`}
                className="btn-primary w-full justify-center text-sm"
              >
                <i className="fas fa-phone text-xs" aria-hidden="true" />
                Call Now: {business.phoneDisplayFormatted}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <ScrollOdometerProgress />
    </header>
  )
}
