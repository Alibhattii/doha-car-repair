import ScrapProcessRoad from '../motion/ScrapProcessRoad'

// NEW SEO SECTION — How Our Scrap Car Buying Process Works
export default function ScrapProcess() {
  const steps = [
    {
      num: '01',
      title: 'Contact Us for Free Quote',
      desc: "Call, WhatsApp, or fill out our form. Tell us your car's make, model, year, and condition. We respond within 24 hours with an initial estimate.",
      icon: 'fa-phone',
    },
    {
      num: '02',
      title: 'Free On-Site Evaluation',
      desc: 'Our expert evaluators come to you anywhere in Qatar — Doha, Al Wakrah, Al Rayyan, Al Khor, or Lusail — for a free physical inspection of your vehicle.',
      icon: 'fa-search',
    },
    {
      num: '03',
      title: 'Receive Your Cash Offer',
      desc: "We provide a transparent, competitive cash offer based on your car's market value, condition, and current scrap rates. No hidden fees, no pressure.",
      icon: 'fa-handshake',
    },
    {
      num: '04',
      title: 'Same-Day Payment & Pickup',
      desc: 'Accept the offer and receive same-day cash payment. We handle all transfer paperwork (Mulkiya, ownership transfer) and provide free vehicle pickup.',
      icon: 'fa-check-circle',
    },
  ]

  return (
    <section
      className="section-pad bg-charcoal-dark text-white"
      aria-label="How our scrap car buying process works"
    >
      <div className="container">
        <h2 className="section-title text-white">How Our Scrap Car Buying Process Works</h2>
        <p className="section-subtitle text-gray-400">
          Selling your scrap or damaged car in Qatar is simple with Dohar Car Repair — fair prices,
          free pickup, and all paperwork handled
        </p>

        <ScrapProcessRoad steps={steps} />
      </div>
    </section>
  )
}
