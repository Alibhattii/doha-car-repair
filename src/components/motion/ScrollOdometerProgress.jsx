import React, { useEffect, useState } from 'react'

/**
 * ScrollOdometerProgress:
 * Slim header progress bar styled like an asphalt road with a tiny moving car silhouette.
 * Displays scroll percentage like an odometer gauge.
 */
export default function ScrollOdometerProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const total = document.documentElement.scrollHeight - window.innerHeight
          const current = window.scrollY
          const pct = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0
          setProgress(pct)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="hidden md:block absolute bottom-0 left-0 right-0 h-[3px] bg-charcoal/50 overflow-visible pointer-events-none z-30"
      aria-hidden="true"
    >
      {/* Red progress track */}
      <div
        className="h-full bg-gradient-to-r from-red-700 via-primary to-red-500 relative transition-all duration-75 ease-out"
        style={{ width: `${progress * 100}%` }}
      >
        {/* Tiny car indicator at leading tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-5 h-3 flex items-center justify-center filter drop-shadow-[0_1px_3px_rgba(214,40,57,0.7)]">
          <svg viewBox="0 0 24 12" className="w-full h-full fill-white" fill="none">
            {/* Tiny car top view / silhouette */}
            <path d="M 2 8 L 5 4 L 16 4 L 20 7 L 22 8 L 22 10 L 2 10 Z" fill="#ffffff" />
            <circle cx="6" cy="10" r="2" fill="#d62839" />
            <circle cx="17" cy="10" r="2" fill="#d62839" />
          </svg>
        </div>
      </div>
    </div>
  )
}
