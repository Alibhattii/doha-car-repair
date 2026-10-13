import React, { useEffect, useState } from 'react'

/**
 * GarageShutterTransition:
 * Route transition simulating an automotive garage rolling shutter wiping up.
 * Also handles a short (<900ms) wheel-spin first-visit brand splash.
 */
export function GarageShutterTransition({ children }) {
  const [showSplash, setShowSplash] = useState(false)
  const [splashExiting, setSplashExiting] = useState(false)

  useEffect(() => {
    // Check first visit session
    try {
      const hasVisited = sessionStorage.getItem('doharVisited')
      if (!hasVisited && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setShowSplash(true)
        sessionStorage.setItem('doharVisited', '1')

        const timer = setTimeout(() => {
          setSplashExiting(true)
          setTimeout(() => setShowSplash(false), 300)
        }, 750)

        return () => clearTimeout(timer)
      }
    } catch {}
  }, [])

  return (
    <>
      {/* First visit wheel-spin loader overlay */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-[99999] bg-[#111827] flex flex-col items-center justify-center transition-opacity duration-300 ${
            splashExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          {/* Wheel spin SVG */}
          <div className="w-16 h-16 relative animate-spin">
            <svg viewBox="0 0 64 64" className="w-full h-full fill-none">
              <circle cx="32" cy="32" r="26" stroke="#27272a" strokeWidth="6" />
              <circle cx="32" cy="32" r="20" stroke="#d62839" strokeWidth="2.5" />
              <circle cx="32" cy="32" r="7" fill="#d62839" />
              {/* Spokes */}
              <line x1="32" y1="12" x2="32" y2="52" stroke="#fff" strokeWidth="2.5" />
              <line x1="12" y1="32" x2="52" y2="32" stroke="#fff" strokeWidth="2.5" />
              <line x1="18" y1="18" x2="46" y2="46" stroke="#fff" strokeWidth="2" />
              <line x1="18" y1="46" x2="46" y2="18" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>
          <p className="font-display font-bold text-white text-sm tracking-wider mt-4">
            DOHAR CAR REPAIR
          </p>
        </div>
      )}
      {children}
    </>
  )
}
