import { business } from '../../data/business'

// NEW SEO SECTION — Areas We Serve
export default function AreasWeServe() {
  const areas = [
    {
      name: 'Doha',
      desc: 'Our main workshop and primary service area in the capital city.',
      icon: 'fa-building',
    },
    {
      name: 'Al Wakrah',
      desc: 'Mobile service and free vehicle pickup available across Al Wakrah.',
      icon: 'fa-map-marker-alt',
    },
    {
      name: 'Al Rayyan',
      desc: 'Emergency car service and scrap car pickup throughout Al Rayyan.',
      icon: 'fa-map-marker-alt',
    },
    {
      name: 'Al Khor',
      desc: 'We travel to Al Khor for scrap car evaluation and emergency repairs.',
      icon: 'fa-map-marker-alt',
    },
    {
      name: 'Lusail',
      desc: 'Full service coverage including emergency roadside assistance in Lusail.',
      icon: 'fa-map-marker-alt',
    },
  ]

  return (
    <section className="section-pad bg-gray-50" id="areas" aria-label="Areas we serve in Qatar">
      <div className="container">
        <h2 className="section-title">Areas We Serve in Qatar</h2>
        <p className="section-subtitle">
          Dohar Car Repair provides car repair, scrap car buying, and emergency services across all
          major areas of Qatar
        </p>

        {/* Area cards */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {areas.map((area) => (
            <div
              key={area.name}
              className="card p-5 text-center group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                <i
                  className={`fas ${area.icon} text-primary group-hover:text-white text-sm transition-colors`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display font-bold text-charcoal text-sm mb-1.5">{area.name}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>

        {/* Embedded Google Map */}
        <div className="mt-10 rounded-2xl overflow-hidden shadow-card">
          <iframe
            src={business.address.embedUrl}
            title="Dohar Car Repair location on Google Maps — Street 27, Doha, Qatar"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* NAP */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <a
            href={business.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <i className="fas fa-map-marker-alt text-primary" aria-hidden="true" />
            {business.address.full}
          </a>
          <a
            href={`tel:${business.phone}`}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <i className="fas fa-phone text-primary" aria-hidden="true" />
            {business.phoneDisplayFormatted}
          </a>
        </div>
      </div>
    </section>
  )
}
