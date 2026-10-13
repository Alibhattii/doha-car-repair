import { Link } from 'react-router-dom'
import { business } from '../../data/business'
import HeroRoadScene from '../motion/HeroRoadScene'

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pb-16"
      id="hero"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Image/carser1.webp')" }}
        role="img"
        aria-label="Car repair workshop in Doha Qatar"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-primary/30" />

      {/* Content */}
      <div className="relative z-10 container text-center text-white py-16">
        {/* Offer badge */}
        <div className="inline-flex items-center gap-2 bg-primary text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6 animate-fade-in shadow-md -rotate-1">
          🎉 20% OFF — Limited Time Offer
        </div>

        <div className="relative inline-block mb-4">
          {/* Angled authentic red accent stripe behind heading */}
          <div
            className="hidden sm:block absolute -inset-1 bg-primary/25 -skew-y-1 rounded-sm -z-10"
            aria-hidden="true"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight animate-fade-in-up text-balance">
            Expert Car Repair in Doha, Qatar
            <br />
            <span className="text-primary">— Dohar Car Repair</span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-3 animate-fade-in-up animate-delay-1">
          Trusted car mechanic, garage &amp; auto repair services in Doha — plus scrap &amp; damaged
          car buyers across Qatar
        </p>

        <p className="text-base text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up animate-delay-2">
          Dohar Car Repair is a local garage in Doha offering professional car repair, engine and
          brake service, AC repair, battery replacement, and computer diagnostics, plus fast cash
          offers for scrap and accident car buying across Qatar, including Al Wakrah, Al Rayyan, and
          Lusail. Honest diagnostics, genuine parts, 24/7 emergency support, and clear communication
          from start to finish.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in-up animate-delay-3">
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Get Free Quote
          </Link>
          <Link to="/about" className="btn-secondary text-base px-8 py-4">
            Our Services
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-in-up animate-delay-4">
          {[
            { icon: 'fa-award', text: '15+ Years Experience' },
            { icon: 'fa-clock', text: '24/7 Emergency Service' },
            { icon: 'fa-truck', text: 'Free Pickup' },
            { icon: 'fa-shield-alt', text: 'Quality Guaranteed' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-white/90">
              <div className="w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center flex-shrink-0">
                <i className={`fas ${badge.icon} text-xs`} aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Road strip & animated generic silhouette car */}
      <HeroRoadScene />
    </section>
  )
}
