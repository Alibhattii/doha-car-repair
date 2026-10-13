import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { business } from '../../data/business'
import ServiceIconMotion from '../motion/ServiceIconMotion'

function ServiceCard({ service, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        if (!cardRef.current) return

        ctx = gsap.context(() => {
          // Staggered parking bay slide-in motion (translateX + slight rotation to 0)
          gsap.fromTo(
            cardRef.current,
            { x: -30, rotation: -2, opacity: 0 },
            {
              x: 0,
              rotation: 0,
              opacity: 1,
              duration: 0.65,
              delay: (index % 4) * 0.09,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          )
        }, cardRef)
      })
    })

    return () => {
      if (ctx) ctx.revert()
    }
  }, [index])

  const whatsappMsg = encodeURIComponent(
    `Hello Dohar Car Repair, I need ${service.name} service. Please provide a quote.`
  )

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card group flex flex-col overflow-hidden hover:-translate-y-1.5 transition-all duration-300 border border-transparent hover:border-primary/30"
    >
      {/* Icon header */}
      <div className="bg-gradient-to-br from-charcoal to-charcoal-light p-6 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
          <ServiceIconMotion serviceId={service.id} isHovered={isHovered} />
        </div>
        <h3 className="text-white font-display font-bold text-lg">{service.name}</h3>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{service.description}</p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/97472223959?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2.5 justify-center"
            onClick={() => {
              if (typeof gtag !== 'undefined') {
                gtag('event', 'click_whatsapp', {
                  event_category: 'Lead',
                  event_label: service.name,
                })
              }
            }}
          >
            <i className="fab fa-whatsapp" aria-hidden="true" />
            {service.ctaLabel}
          </a>

          <div className="flex gap-2">
            <Link
              to={`/services/${service.slug}`}
              className="flex-1 text-xs text-center text-primary font-semibold py-2 border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
            >
              Service Details →
            </Link>
            {service.blogSlug && (
              <Link
                to={`/blog/${service.blogSlug}`}
                className="flex-1 text-xs text-center text-gray-500 font-semibold py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {service.guideLabel || 'Read Guide'} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ServicesGrid() {
  return (
    <section className="section-pad bg-gray-50" id="services" aria-label="Our services">
      <div className="container">
        <h2 className="section-title">Our Professional Car Repair Services in Doha</h2>
        <p className="section-subtitle">
          Comprehensive car repair, maintenance, and scrap/damaged car buying solutions across Doha
          and Qatar — expert mechanics, modern diagnostic equipment, and honest, fast service
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
