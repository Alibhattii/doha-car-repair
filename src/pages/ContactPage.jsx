import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from '../components/seo/helmet'
import PageMeta from '../components/seo/PageMeta'
import Breadcrumb from '../components/ui/Breadcrumb'
import { business } from '../data/business'
import { services } from '../data/services'

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Dohar Car Repair',
  url: 'https://doharcarrepairqa.com/contact',
  description:
    'Contact Dohar Car Repair in Doha to book a service, request a free quote, or reach us by phone and WhatsApp.',
  mainEntity: {
    '@type': 'AutoRepair',
    name: 'Dohar Car Repair',
    telephone: '+97472223959',
    email: 'carrepairqa@gmail.com',
    url: 'https://doharcarrepairqa.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Street 27',
      addressLocality: 'Doha',
      addressCountry: 'QA',
    },
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://doharcarrepairqa.com/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: 'https://doharcarrepairqa.com/contact',
    },
  ],
}

const serviceOptions = [
  'Car Repair Service - General Maintenance & Repairs',
  'Engine Repair - Diagnostics & Repairs',
  'Buy Scrap Car - We Buy Scrap Vehicles',
  'Buy Damaged Car - Accident & Damaged Vehicles',
  'Sell Accident Car - Quick Sale Service',
  'Buy Junk Car - Junk Car Removal',
  'Emergency Car Service - 24/7 Roadside Assistance',
  'Brake Repair & Replacement',
  'Transmission Repair',
  'Car AC Repair & Service',
  'Battery Replacement',
  'Oil Change & Fluid Service',
  'Car Body Repair & Paint',
  'Electrical System Repair',
  'Car Diagnostic Service',
  'Other Service',
]

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')

  // Prefill service from ?service= query param
  useEffect(() => {
    const svc = searchParams.get('service')
    if (svc) {
      const match = serviceOptions.find((o) => o.toLowerCase().includes(svc.toLowerCase()))
      if (match) setForm((f) => ({ ...f, subject: match }))
    }
  }, [searchParams])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.subject) e.subject = 'Please select a service'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Honeypot check
    if (form.website) return

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    const msg = encodeURIComponent(
      `Hello Dohar Car Repair!\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.subject}\n\nMessage:\n${form.message}`
    )
    const waUrl = `https://wa.me/97472223959?text=${msg}`
    setWhatsappUrl(waUrl)
    setSubmitted(true)

    // Track
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', { event_category: 'Lead', event_label: form.subject })
    }

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((err) => ({ ...err, [name]: '' }))
  }

  return (
    <>
      <PageMeta
        title="Contact Dohar Car Repair | Book Service or Free Quote in Doha"
        description="Contact Dohar Car Repair to book a service or request a free quote in Doha. Call +974 7222 3959, WhatsApp, or send the form — we respond quickly."
        canonical="/contact"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="pt-[88px] md:pt-[96px]" />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      {/* Header */}
      <section className="bg-charcoal-dark text-white py-14">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-display font-black mb-4">
            Contact Dohar Car Repair | Book Service or Free Quote in Doha
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Reach our workshop to book an appointment, ask a question, or request a free quote — by
            phone, WhatsApp, or the form below
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Use this form to book a visit or request a free quote. Tell us what you need — from
                routine service to scrap or damaged-car evaluation — and we will respond within 24
                hours.
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-green-600 text-2xl" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Your details have been saved. WhatsApp should open in a new tab — tap{' '}
                    <strong>Send</strong> to deliver your inquiry to us at{' '}
                    {business.phoneDisplayFormatted}.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <i className="fab fa-whatsapp" aria-hidden="true" />
                    Open WhatsApp &amp; Send Message
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <div
                    style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your full name"
                        required
                        autoComplete="name"
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                        autoComplete="email"
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="form-label">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="0097472223959"
                        required
                        autoComplete="tel"
                      />
                      {errors.phone && <p className="form-error">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="subject" className="form-label">
                        Service Needed *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="form-input"
                        required
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.subject && <p className="form-error">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="form-label">
                        Message / Car Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="form-input resize-none"
                        placeholder="Please describe your car issue, vehicle make/model/year, or service needed..."
                        required
                      />
                      {errors.message && <p className="form-error">{errors.message}</p>}
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center py-4">
                      Send Message &amp; Get Free Quote
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Get in Touch</h2>
              <p className="text-gray-500 text-sm mb-6">
                Call, WhatsApp, email, or visit our service centre on Street 27 in Doha. We are
                happy to help you book service, arrange pickup, or answer a quick question before
                you decide.
              </p>

              <div className="space-y-5">
                {/* Address */}
                <div className="card p-5 flex gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-sm mb-1">Service Center Address</h3>
                    <a
                      href={business.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      {business.address.full}
                    </a>
                    <p className="text-xs text-gray-400 mt-1">
                      Visit our workshop for car repair, diagnostics, and vehicle evaluation.{' '}
                      <a
                        href={business.address.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Open in Google Maps
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="card p-5 flex gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-sm mb-1">Phone</h3>
                    <a
                      href={`tel:${business.phone}`}
                      className="text-primary text-sm hover:underline"
                    >
                      {business.phoneDisplay}
                    </a>
                    <p className="text-xs text-gray-400 mt-1">
                      Call us for immediate assistance, free quotes, or emergency car service.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="card p-5 flex gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-sm mb-1">Email</h3>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-primary text-sm hover:underline block"
                    >
                      {business.email}
                    </a>
                    <a
                      href={`mailto:${business.email2}`}
                      className="text-primary text-sm hover:underline block"
                    >
                      {business.email2}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="card p-5 flex gap-4">
                  <div className="w-11 h-11 bg-[#25d366]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fab fa-whatsapp text-[#25d366]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-sm mb-1">WhatsApp</h3>
                    <a
                      href={business.whatsappGeneral}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      {business.phoneDisplay}
                    </a>
                    <p className="text-xs text-gray-400 mt-1">
                      Quick response via WhatsApp for instant quotes and service booking.
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="card p-5 bg-gray-50">
                  <h3 className="font-bold text-charcoal text-sm mb-3">Business Hours</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>
                      <strong>Sunday – Thursday:</strong> 8:00 AM – 8:00 PM
                    </li>
                    <li>
                      <strong>Friday:</strong> 2:00 PM – 8:00 PM
                    </li>
                    <li>
                      <strong>Saturday:</strong> 8:00 AM – 6:00 PM
                    </li>
                    <li className="text-primary font-semibold mt-2">
                      <i className="fas fa-clock mr-1" aria-hidden="true" />
                      Emergency Service: 24/7 Available
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
