import React from 'react'

/**
 * ServiceIconMotion:
 * Purposeful micro-actions matching the automotive service:
 * - brake-repair: Brake disc spinning with pulsing red caliper
 * - engine-repair: Mechanical wrench turning
 * - ac-repair: Cooling snowflake drift & pulse
 * - battery-replacement: High-voltage electric bolt flicker
 * - emergency-car-service: Tow hook crane swing
 * - default: Gentle tool rotation
 */
export default function ServiceIconMotion({ serviceId, isHovered = false }) {
  // Brake disc + caliper
  if (serviceId === 'brake-repair') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden="true">
        {/* Ventilated brake rotor spinning on hover */}
        <g
          className={`origin-center transition-transform duration-700 ease-out ${isHovered ? 'rotate-[360deg]' : ''}`}
        >
          <circle cx="24" cy="24" r="18" stroke="#94a3b8" strokeWidth="3" strokeDasharray="3 3" />
          <circle cx="24" cy="24" r="10" stroke="#64748b" strokeWidth="2" />
          <circle cx="24" cy="24" r="4" fill="#cbd5e1" />
          {/* Rotor cooling holes */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={deg}
              cx={24 + 14 * Math.cos((deg * Math.PI) / 180)}
              cy={24 + 14 * Math.sin((deg * Math.PI) / 180)}
              r="1.2"
              fill="#475569"
            />
          ))}
        </g>
        {/* Red brake caliper with hydraulic grip pulse */}
        <path
          d="M 12 12 Q 24 6 36 12 L 34 19 Q 24 15 14 19 Z"
          fill="#d62839"
          className={`transition-all duration-300 ${isHovered ? 'scale-105 filter drop-shadow-[0_0_8px_rgba(214,40,57,0.8)]' : ''}`}
        />
      </svg>
    )
  }

  // Engine repair: turning chrome wrench
  if (serviceId === 'engine-repair' || serviceId === 'car-repair') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden="true">
        <g
          className={`origin-center transition-transform duration-500 ease-out ${isHovered ? 'rotate-[45deg]' : ''}`}
        >
          <path
            d="M 33 9 C 30 6 25 7 22 10 L 10 22 C 7 25 6 30 9 33 L 13 37 C 16 40 21 39 24 36 L 36 24 C 39 21 40 16 37 13 Z"
            stroke="#d62839"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="33" cy="13" r="3" fill="#cbd5e1" />
        </g>
      </svg>
    )
  }

  // AC Repair: drifting snowflake
  if (serviceId === 'ac-repair') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden="true">
        <g
          className={`origin-center transition-all duration-700 ${isHovered ? 'rotate-90 scale-110' : ''}`}
        >
          <path
            d="M 24 6 L 24 42 M 6 24 L 42 24"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 11 11 L 37 37 M 11 37 L 37 11"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="24" cy="24" r="3" fill="#0284c7" />
          {/* Branch feathers */}
          <path
            d="M 20 10 L 24 14 L 28 10 M 20 38 L 24 34 L 28 38"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    )
  }

  // Battery replacement: electric voltage bolt flicker
  if (serviceId === 'battery-replacement') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden="true">
        <rect x="8" y="14" width="32" height="24" rx="4" stroke="#94a3b8" strokeWidth="2.5" />
        <rect x="14" y="9" width="6" height="5" rx="1" fill="#ef4444" />
        <rect x="28" y="9" width="6" height="5" rx="1" fill="#3b82f6" />
        {/* Lightning bolt flickering */}
        <path
          d="M 26 19 L 20 27 L 25 27 L 22 33 L 30 25 L 25 25 Z"
          fill="#facc15"
          className={`transition-all duration-300 ${isHovered ? 'scale-125 filter drop-shadow-[0_0_6px_rgba(250,204,21,0.9)] animate-pulse' : ''}`}
        />
      </svg>
    )
  }

  // Emergency Car Service: swinging tow hook
  if (serviceId === 'emergency-car-service') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden="true">
        <line x1="24" y1="4" x2="24" y2="16" stroke="#94a3b8" strokeWidth="2.5" />
        <g
          className={`origin-top transition-transform duration-500 ease-in-out ${isHovered ? 'rotate-[-20deg]' : ''}`}
        >
          <circle cx="24" cy="18" r="3" stroke="#d62839" strokeWidth="2" />
          <path
            d="M 24 21 L 24 30 Q 24 38 18 38 Q 12 38 12 31"
            stroke="#d62839"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    )
  }

  // Scrap / accident car purchase
  if (
    serviceId === 'scrap-car-buyers' ||
    serviceId === 'buy-damaged-cars' ||
    serviceId === 'sell-accident-car'
  ) {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden="true">
        <g
          className={`origin-center transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
        >
          <path d="M 6 32 L 14 20 L 32 20 L 42 32 Z" fill="#b91c1c" fillOpacity="0.8" />
          <circle cx="14" cy="34" r="5" fill="#18181b" stroke="#71717a" strokeWidth="2" />
          <circle cx="34" cy="34" r="5" fill="#18181b" stroke="#71717a" strokeWidth="2" />
          {/* Cash coin overlay */}
          <circle
            cx="34"
            cy="15"
            r="8"
            fill="#22c55e"
            className={`transition-transform duration-300 ${isHovered ? '-translate-y-1' : ''}`}
          />
          <text x="31" y="19" fill="#ffffff" fontSize="11" fontWeight="bold">
            Q
          </text>
        </g>
      </svg>
    )
  }

  // Default automotive icon
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="#d62839" strokeWidth="2" />
      <path
        d="M 18 24 L 22 28 L 30 20"
        stroke="#d62839"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
      />
    </svg>
  )
}
