export default function WhyChooseUs() {
  const features = [
    {
      icon: 'fa-award',
      title: '15+ Years Experience',
      desc: "Over 15 years of experience serving car owners across Doha and Qatar. We've built our reputation on trust, repair quality, and fair pricing.",
    },
    {
      icon: 'fa-dollar-sign',
      title: 'Best Prices in Qatar',
      desc: 'We offer the most competitive prices for scrap cars, damaged cars, and car repair services in Doha and across Qatar. Get a free quote with no obligation.',
    },
    {
      icon: 'fa-clock',
      title: '24/7 Emergency Service',
      desc: 'Round-the-clock emergency car service available across Doha and Qatar. Fast response times, professional roadside assistance, and reliable car towing.',
    },
    {
      icon: 'fa-tools',
      title: 'Expert Mechanics',
      desc: 'Certified and experienced car mechanics in Doha using advanced diagnostic equipment. We work on all car makes and models with genuine parts.',
    },
    {
      icon: 'fa-file-contract',
      title: 'Complete Documentation',
      desc: 'We handle all paperwork for scrap car sales, vehicle transfers, and legal requirements. Hassle-free process from start to finish.',
    },
  ]

  return (
    <section
      className="section-pad bg-white"
      id="why-choose-us"
      aria-label="Why choose Dohar Car Repair"
    >
      <div className="container">
        <h2 className="section-title">Why Choose Dohar Car Repair in Doha?</h2>
        <p className="section-subtitle">
          A local Doha garage focused on honest car repairs, clear communication, and fair prices
          for scrap or accident car buying across Qatar
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="card p-6 text-center group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                <i
                  className={`fas ${f.icon} text-xl text-primary group-hover:text-white transition-colors duration-300`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display font-bold text-charcoal text-base mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
