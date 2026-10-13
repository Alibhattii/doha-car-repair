import { useState } from 'react'
import { faqs } from '../../data/faqs'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="faq-item" itemScope itemType="https://schema.org/Question">
      <button
        className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <h3
          className="text-base font-display font-semibold text-charcoal leading-snug"
          itemProp="name"
        >
          {faq.question}
        </h3>
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-500'
          }`}
          aria-hidden="true"
        >
          <i className="fas fa-chevron-down text-xs" />
        </div>
      </button>

      <div
        id={`faq-answer-${faq.id}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        itemScope
        itemType="https://schema.org/Answer"
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm" itemProp="text">
          {faq.answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <section
      className="section-pad bg-gray-50"
      id="faq"
      aria-label="Frequently asked questions"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Common questions about car repair, garage services, and scrap or damaged vehicle buying in
          Doha, Qatar
        </p>

        <div className="mt-10 max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
