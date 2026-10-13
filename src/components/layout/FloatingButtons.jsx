import { business } from '../../data/business'

export default function FloatingButtons() {
  const trackCall = () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click_call', { event_category: 'Contact', event_label: 'Floating Button' })
    }
  }
  const trackWhatsApp = () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click_whatsapp', { event_category: 'Contact', event_label: 'Floating Button' })
    }
  }

  return (
    <>
      {/* WhatsApp floating button with gentle idle pulse every few seconds */}
      <a
        href={business.whatsappGeneral}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Dohar Car Repair on WhatsApp"
        className="float-btn w-14 h-14 bg-[#25d366] text-white bottom-24 right-5 md:bottom-8 md:right-8 hover:bg-[#20bc5a] hover:scale-110 animate-idle-pulse shadow-lg"
        onClick={trackWhatsApp}
      >
        <i className="fab fa-whatsapp text-2xl" aria-hidden="true" />
      </a>

      {/* Mobile bottom call bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex">
          <a
            href={`tel:${business.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 font-semibold text-sm"
            onClick={trackCall}
          >
            <i className="fas fa-phone" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={business.whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] text-white py-4 font-semibold text-sm"
            onClick={trackWhatsApp}
          >
            <i className="fab fa-whatsapp" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Back to top button */}
      <BackToTopButton />
    </>
  )
}

function BackToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className="float-btn w-11 h-11 bg-charcoal hover:bg-primary text-white bottom-40 right-5 md:bottom-24 md:right-8 opacity-80 hover:opacity-100"
    >
      <i className="fas fa-arrow-up text-sm" aria-hidden="true" />
    </button>
  )
}
