import React from 'react'

/**
 * AutomotiveTreadDivider:
 * Hand-crafted tire tread or asphalt road-marking section divider SVG.
 * Replaces generic flat divider lines.
 */
export function AutomotiveTreadDivider({ className = '', inverted = false }) {
  return (
    <div
      className={`w-full overflow-hidden leading-none py-2 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 24"
        className="w-full h-4 opacity-25 text-primary"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        {/* Repeating tire tread chevron pattern */}
        <pattern id="treadPattern" width="60" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 5 4 L 25 12 L 5 20 M 35 4 L 55 12 L 35 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </pattern>
        <rect width="1200" height="24" fill="url(#treadPattern)" />
      </svg>
    </div>
  )
}
