import React, { useEffect, useRef, useState } from 'react'
import { motionConfig } from '../../motion/config'

/**
 * DialGaugeStat:
 * Automotive speedometer/tachometer dial gauge for real stats:
 * - 500+ Cars Repaired
 * - 300+ Scrap Cars Bought
 * - 800+ Clients Served
 * - 15+ Years Experience
 *
 * Counts up smoothly on scroll into view with spring needle sweep and slight overshoot settle.
 */
export default function DialGaugeStat({ target, label, suffix = '+' }) {
  const [count, setCount] = useState(0)
  const [needleAngle, setNeedleAngle] = useState(-110) // Rest position (-110 deg)
  const containerRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(target)
      setNeedleAngle(65)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          // Dynamically import GSAP for spring needle sweep
          import('gsap')
            .then(({ default: gsap }) => {
              const countObj = { val: 0, angle: -110 }
              const finalAngle = 65 // Active dial sweep

              gsap.to(countObj, {
                val: target,
                angle: finalAngle,
                duration: motionConfig.gauges.needleSweepDuration,
                ease: motionConfig.gauges.ease,
                onUpdate: () => {
                  setCount(Math.floor(countObj.val))
                  setNeedleAngle(countObj.angle)
                },
              })
            })
            .catch(() => {
              setCount(target)
              setNeedleAngle(65)
            })
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [target])

  return (
    <div
      ref={containerRef}
      className="card p-6 flex flex-col items-center text-center relative overflow-hidden group hover:border-primary/40 border border-transparent transition-colors"
    >
      {/* Gauge Face SVG */}
      <div className="w-36 h-24 relative flex items-center justify-center -mb-2" aria-hidden="true">
        <svg viewBox="0 0 160 100" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d62839" />
            </linearGradient>
          </defs>

          {/* Background track arc (180 to 0 deg) */}
          <path
            d="M 20 85 A 60 60 0 0 1 140 85"
            fill="none"
            stroke="#1f2937"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Active colored arc */}
          <path
            d="M 20 85 A 60 60 0 0 1 140 85"
            fill="none"
            stroke="url(#gaugeArc)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="188"
            strokeDashoffset="45"
          />

          {/* Dial tick marks */}
          {[-60, -30, 0, 30, 60].map((angle, idx) => {
            const rad = ((angle - 90) * Math.PI) / 180
            const x1 = 80 + 52 * Math.cos(rad)
            const y1 = 85 + 52 * Math.sin(rad)
            const x2 = 80 + 44 * Math.cos(rad)
            const y2 = 85 + 44 * Math.sin(rad)
            return (
              <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9ca3af" strokeWidth="1.5" />
            )
          })}

          {/* Needle pivot center hub */}
          <circle cx="80" cy="85" r="7" fill="#111827" stroke="#4b5563" strokeWidth="2" />

          {/* Needle pointer */}
          <g transform={`rotate(${needleAngle} 80 85)`}>
            <polygon points="78,85 82,85 80.5,32 79.5,32" fill="#d62839" />
            <circle cx="80" cy="85" r="3" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Numerical display */}
      <div className="font-display font-black text-3xl md:text-4xl text-charcoal tracking-tight mt-1 mb-1">
        {count}
        <span className="text-primary">{suffix}</span>
      </div>

      <p className="text-gray-500 text-xs md:text-sm font-medium leading-snug max-w-[180px]">
        {label}
      </p>
    </div>
  )
}
