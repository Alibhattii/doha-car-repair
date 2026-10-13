import React, { useEffect, useRef } from 'react'
import { motionConfig } from '../../motion/config'

/**
 * Hand-drawn generic automotive side profile SVG
 * Brand red (#d62839) body, charcoal (#1f2937) chassis/wheels, rotating spoke rims
 */
export function CarSilhouette({ className = '', headlightGlow = false, wheelRotation = 0 }) {
  return (
    <svg
      viewBox="0 0 240 90"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Soft headlight beam */}
        <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#ffeb3b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffeb3b" stopOpacity="0" />
        </linearGradient>
        {/* Subtle body paint gradient */}
        <linearGradient id="bodyRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e83849" />
          <stop offset="100%" stopColor="#b51b2a" />
        </linearGradient>
        {/* Tinted cabin glass */}
        <linearGradient id="glassTint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c3e50" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1a252f" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Headlight cone (illuminates when stopped) */}
      <polygon
        points="225,48 290,30 290,66 225,56"
        fill="url(#headlightBeam)"
        className={`transition-opacity duration-700 ${headlightGlow ? 'opacity-80' : 'opacity-0'}`}
      />

      {/* Ground drop shadow */}
      <ellipse cx="120" cy="78" rx="85" ry="6" fill="#000000" fillOpacity="0.35" />

      {/* Lower chassis / rockers */}
      <path
        d="M 38 68 L 74 68 Q 90 68 93 62 L 147 62 Q 150 68 166 68 L 206 68 Q 216 68 214 62 L 208 58 L 34 58 L 28 64 Z"
        fill="#1a202c"
      />

      {/* Main Car Body - Sedan/Fastback generic profile */}
      <path
        d="M 28 58 
           Q 22 55 24 48 
           L 30 46 
           Q 46 47 58 45 
           L 86 24 
           Q 96 17 114 17 
           L 158 17 
           Q 176 17 194 36 
           L 214 44 
           Q 224 48 222 56 
           L 210 60 
           L 28 60 Z"
        fill="url(#bodyRed)"
      />

      {/* Roof & Pillars outline accent */}
      <path
        d="M 84 25 L 114 18 L 158 18 Q 174 18 192 36 L 194 38"
        stroke="#ff6b77"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Cabin Windows */}
      {/* Front Windshield & Front Side Window */}
      <path
        d="M 138 21 L 162 21 Q 173 21 184 34 L 140 34 Z"
        fill="url(#glassTint)"
        stroke="#111827"
        strokeWidth="1.5"
      />
      {/* Rear Window & B-Pillar */}
      <path
        d="M 94 25 L 132 21 L 134 34 L 84 34 Q 89 28 94 25 Z"
        fill="url(#glassTint)"
        stroke="#111827"
        strokeWidth="1.5"
      />

      {/* Door cut lines */}
      <path d="M 136 21 L 138 58" stroke="#8e121e" strokeWidth="1.2" />
      <path d="M 88 34 L 86 58" stroke="#8e121e" strokeWidth="1.2" />
      <path d="M 188 36 L 186 58" stroke="#8e121e" strokeWidth="1.2" />

      {/* Door handles */}
      <rect x="144" y="38" width="10" height="2" rx="1" fill="#111827" />
      <rect x="96" y="38" width="10" height="2" rx="1" fill="#111827" />

      {/* Headlight cluster */}
      <path d="M 216 46 L 222 52 L 214 54 Z" fill="#ffffff" />
      {/* Taillight cluster */}
      <path d="M 24 50 L 29 48 L 29 55 L 24 54 Z" fill="#ff1744" />

      {/* Wheel Arch Cutouts */}
      {/* Rear Wheel (cx=62, cy=66) */}
      <g transform={`rotate(${wheelRotation} 62 66)`}>
        {/* Rubber tyre */}
        <circle cx="62" cy="66" r="17" fill="#18181b" stroke="#09090b" strokeWidth="3" />
        {/* Alloy rim outer */}
        <circle cx="62" cy="66" r="11" fill="#52525b" />
        {/* Rim center cap */}
        <circle cx="62" cy="66" r="4" fill="#d4d4d8" />
        {/* 5 Wheel Spokes */}
        <line x1="62" y1="55" x2="62" y2="77" stroke="#e4e4e7" strokeWidth="2" />
        <line x1="51.5" y1="62.5" x2="72.5" y2="69.5" stroke="#e4e4e7" strokeWidth="2" />
        <line x1="53.5" y1="72.5" x2="70.5" y2="59.5" stroke="#e4e4e7" strokeWidth="2" />
      </g>

      {/* Front Wheel (cx=178, cy=66) */}
      <g transform={`rotate(${wheelRotation} 178 66)`}>
        {/* Rubber tyre */}
        <circle cx="178" cy="66" r="17" fill="#18181b" stroke="#09090b" strokeWidth="3" />
        {/* Alloy rim outer */}
        <circle cx="178" cy="66" r="11" fill="#52525b" />
        {/* Rim center cap */}
        <circle cx="178" cy="66" r="4" fill="#d4d4d8" />
        {/* 5 Wheel Spokes */}
        <line x1="178" y1="55" x2="178" y2="77" stroke="#e4e4e7" strokeWidth="2" />
        <line x1="167.5" y1="62.5" x2="188.5" y2="69.5" stroke="#e4e4e7" strokeWidth="2" />
        <line x1="169.5" y1="72.5" x2="186.5" y2="59.5" stroke="#e4e4e7" strokeWidth="2" />
      </g>
    </svg>
  )
}

/**
 * HeroRoadScene:
 * Continuous scrolling dashed asphalt road at bottom of hero.
 * Car enters from left on mount, settles with soft suspension bounce and glowing headlights,
 * drives off to right as user scrolls down.
 */
export default function HeroRoadScene() {
  const containerRef = useRef(null)
  const carWrapperRef = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (carWrapperRef.current) {
        carWrapperRef.current.style.transform = 'translateX(60px)'
      }
      return
    }

    let ctx
    let gsapInstance
    let scrollTriggerInstance

    // Dynamically import GSAP + ScrollTrigger so hero initial LCP is never delayed
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ default: gsap }, { ScrollTrigger }]) => {
        gsapInstance = gsap
        scrollTriggerInstance = ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        const carEl = carWrapperRef.current
        if (!carEl) return

        ctx = gsap.context(() => {
          // Initial entrance from left
          const tl = gsap.timeline({ defaults: { ease: motionConfig.heroRoad.carEntranceEase } })

          tl.fromTo(
            carEl,
            { x: -280, y: 0 },
            {
              x: 40,
              duration: motionConfig.heroRoad.carEntranceDuration,
              onUpdate: function () {
                // Rotate wheels via attribute or state proxy if needed
              },
            }
          )
            // Suspension settle bounce
            .to(carEl, {
              y: -motionConfig.heroRoad.bounceAmount,
              duration: 0.18,
              yoyo: true,
              repeat: 2,
              ease: 'power1.inOut',
            })

          // Scroll exit: Drive forward & off-screen as page scrolls
          gsap.to(carEl, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
            x: '85vw',
            opacity: 0.2,
            ease: 'power1.in',
          })
        }, containerRef)
      })
      .catch(() => {
        // Graceful fallback if GSAP fails
        if (carWrapperRef.current) {
          carWrapperRef.current.style.transform = 'translateX(40px)'
        }
      })

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden pointer-events-none z-20"
      aria-hidden="true"
    >
      {/* Asphalt road base */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#151922] border-t border-white/10 shadow-2xl">
        {/* Continuous looping dashed road line (CSS transform only, 60fps) */}
        <div className="road-dash-track absolute top-1/2 left-0 w-[200%] h-[3px] -translate-y-1/2" />
        {/* Curbside reflector studs */}
        <div className="absolute top-1 left-0 right-0 flex justify-around opacity-40">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="w-1.5 h-0.5 bg-yellow-400 rounded-full" />
          ))}
        </div>
      </div>

      {/* Driving Car */}
      <div
        ref={carWrapperRef}
        className="absolute bottom-3 left-0 w-44 md:w-56 will-change-transform"
        style={{ transform: 'translateX(-280px)' }}
      >
        <CarSilhouette className="w-full h-auto drop-shadow-xl" headlightGlow={true} />
      </div>
    </div>
  )
}
