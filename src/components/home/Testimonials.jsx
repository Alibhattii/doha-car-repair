import { useState, useEffect, useRef, useCallback } from 'react'
import { testimonials } from '../../data/testimonials'

function TestimonialCard({ testimonial }) {
  return (
    <article className="bg-white rounded-2xl p-6 shadow-card flex flex-col gap-4 min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0">
      {/* Stars */}
      <div className="flex gap-1" aria-label="5 stars">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="fas fa-star text-yellow-400 text-sm" aria-hidden="true" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-600 text-sm leading-relaxed italic flex-1">
        {testimonial.text}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 bg-red-gradient rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          aria-hidden="true"
        >
          {testimonial.initial}
        </div>
        <cite className="not-italic font-semibold text-charcoal text-sm">{testimonial.name}</cite>
      </div>
    </article>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef(null)
  const autoplayRef = useRef(null)
  const total = testimonials.length

  const goTo = useCallback(
    (idx) => {
      const clamped = (idx + total) % total
      setCurrent(clamped)
    },
    [total]
  )

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => goTo(current + 1), 4000)
    return () => clearInterval(autoplayRef.current)
  }, [current, goTo])

  const pause = () => clearInterval(autoplayRef.current)

  const visible = 3
  const cardWidth = 320 + 24 // width + gap

  return (
    <section className="section-pad bg-gray-50" id="testimonials" aria-label="Client testimonials">
      <div className="container">
        <h2 className="section-title">Client Testimonials</h2>
        <p className="section-subtitle">
          What our car repair and scrap car buying clients in Doha and Qatar say about us
        </p>

        <div className="mt-10 relative">
          {/* Scrollable track */}
          <div className="overflow-hidden" onMouseEnter={pause} onMouseLeave={() => {}}>
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * cardWidth}px)` }}
              role="region"
              aria-label="Customer testimonials carousel"
              aria-live="polite"
            >
              {/* Duplicate for infinite feel */}
              {[...testimonials, ...testimonials].map((t, i) => (
                <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
              ))}
            </div>
          </div>

          {/* Prev/Next */}
          <button
            onClick={() => {
              pause()
              goTo(current - 1)
            }}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center text-charcoal hover:bg-primary hover:text-white transition-colors hidden md:flex"
          >
            <i className="fas fa-chevron-left text-sm" aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              pause()
              goTo(current + 1)
            }}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center text-charcoal hover:bg-primary hover:text-white transition-colors hidden md:flex"
          >
            <i className="fas fa-chevron-right text-sm" aria-hidden="true" />
          </button>
        </div>

        {/* Dots */}
        <div
          className="flex justify-center gap-2 mt-6"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={current === i}
              onClick={() => {
                pause()
                goTo(i)
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === i ? 'bg-primary w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
