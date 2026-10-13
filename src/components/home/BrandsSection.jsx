import { business } from '../../data/business'

// NEW SEO SECTION — Brands We Service
export default function BrandsSection() {
  return (
    <section className="py-12 bg-white border-t border-gray-100" aria-label="Car brands we service">
      <div className="container">
        <h2 className="section-title text-2xl md:text-3xl">Brands We Service in Doha</h2>
        <p className="section-subtitle text-base mt-2">
          Our expert mechanics in Doha are trained to service all major car brands
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {business.brands.map((brand) => (
            <div
              key={brand}
              className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-charcoal font-semibold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-5">
          Don't see your brand? We service <strong>all makes and models</strong> — contact us for a
          free consultation.
        </p>
      </div>
    </section>
  )
}
