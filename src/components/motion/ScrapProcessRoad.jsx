import React, { useEffect, useRef, useState } from 'react'
import { motionConfig } from '../../motion/config'

/**
 * ScrapProcessRoad:
 * Connected 4-step scrap car buying roadmap.
 * Animated SVG road path draws itself via strokeDashoffset on scroll,
 * with a tiny red tow/transport car that advances along the path as each step is reached.
 */
export default function ScrapProcessRoad({ steps }) {
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const [dashOffset, setDashOffset] = useState(1000)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      setDashOffset(0)
      setActiveStep(steps.length - 1)
      return
    }

    let observer
    import('gsap')
      .then(({ default: gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)

          if (!containerRef.current) return

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1.0,
            onUpdate: (self) => {
              const progress = self.progress
              const pathLen = 1000
              setDashOffset(pathLen * (1 - progress))
              const stepIdx = Math.min(Math.floor(progress * steps.length), steps.length - 1)
              setActiveStep(stepIdx)
            },
          })
        })
      })
      .catch(() => {
        setDashOffset(0)
        setActiveStep(steps.length - 1)
      })

    return () => {
      if (observer) observer.disconnect()
    }
  }, [steps.length])

  return (
    <div ref={containerRef} className="relative mt-8">
      {/* Background SVG Road Path connecting the 4 cards (Desktop) */}
      <div
        className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-8 pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1000 40" className="w-full h-full overflow-visible" fill="none">
          {/* Base road outline */}
          <path d="M 0 20 L 1000 20" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
          {/* Animated road stroke that draws on scroll */}
          <path
            ref={pathRef}
            d="M 0 20 L 1000 20"
            stroke="#d62839"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
          {/* Tiny moving transport car indicator */}
          <g transform={`translate(${Math.max(20, (1 - dashOffset / 1000) * 960)}, 10)`}>
            <rect
              x="0"
              y="0"
              width="30"
              height="18"
              rx="3"
              fill="#d62839"
              stroke="#fff"
              strokeWidth="1.5"
            />
            <circle cx="7" cy="18" r="3.5" fill="#1f2937" />
            <circle cx="23" cy="18" r="3.5" fill="#1f2937" />
            <rect x="18" y="3" width="7" height="6" fill="#f8fafc" />
          </g>
        </svg>
      </div>

      {/* 4 Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {steps.map((step, i) => {
          const isPassed = i <= activeStep
          return (
            <div
              key={step.num}
              className={`relative rounded-2xl p-6 transition-all duration-500 border ${
                isPassed
                  ? 'bg-charcoal/90 border-primary shadow-[0_0_20px_rgba(214,40,57,0.25)] translate-y-[-2px]'
                  : 'bg-white/5 border-white/10 opacity-75'
              }`}
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-4xl font-display font-black leading-none ${isPassed ? 'text-primary' : 'text-gray-600'}`}
                >
                  {step.num}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isPassed ? 'bg-primary text-white shadow-md' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  <i className={`fas ${step.icon} text-sm`} aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display font-bold text-white text-base mb-2">{step.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{step.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
