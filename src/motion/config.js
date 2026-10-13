export const motionConfig = {
  // Road & car scene in hero
  heroRoad: {
    roadSpeed: 2.2, // seconds per dash cycle
    carEntranceDuration: 1.6,
    carEntranceEase: 'power2.out',
    bounceAmount: 4, // px subtle vertical suspension bounce
    headlightGlowDelay: 1.2,
  },

  // Service bay parking motion
  serviceCards: {
    stagger: 0.08,
    slideDistance: 32, // px
    tiltAngle: -2.5, // deg
    duration: 0.65,
    ease: 'power3.out',
  },

  // Odometer / dial gauges
  gauges: {
    countDuration: 1.8,
    needleSweepDuration: 1.4,
    overshootDegrees: 6,
    ease: 'back.out(1.4)',
  },

  // Scrap 4-step route
  scrapRoute: {
    strokeDuration: 1.2,
    carMoveDuration: 1.0,
    ease: 'power1.inOut',
  },

  // Garage shutter route transition
  transitions: {
    shutterDuration: 0.45,
    loaderMaxWait: 850, // ms
  },
}
