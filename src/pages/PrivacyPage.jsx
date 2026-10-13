import { Helmet } from '../components/seo/helmet'
import { Link } from 'react-router-dom'
import PageMeta from '../components/seo/PageMeta'
import Breadcrumb from '../components/ui/Breadcrumb'
import { business } from '../data/business'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://doharcarrepairqa.com/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Privacy Policy',
      item: 'https://doharcarrepairqa.com/privacy',
    },
  ],
}

export default function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Privacy Policy | Dohar Car Repair"
        description="Privacy Policy for Dohar Car Repair — how we collect, use, and protect your information when you visit our website or contact us in Doha, Qatar."
        canonical="/privacy"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="pt-[88px] md:pt-[96px]" />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />

      <section className="bg-charcoal-dark text-white py-14">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-display font-black mb-3">Privacy Policy</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            How Dohar Car Repair collects, uses, and protects your information
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container max-w-4xl">
          <div className="card p-8 md:p-12 blog-prose">
            <p className="text-gray-400 text-sm mb-6">
              <strong>Last updated:</strong> August 9, 2026
            </p>

            <p>
              Dohar Car Repair ("we," "us," or "our") operates the website doharcarrepairqa.com and
              provides automotive repair and related services in Doha, Qatar. This Privacy Policy
              explains what information we collect when you use our website, how we use it, and the
              choices available to you.
            </p>

            <h2>1. Information We Collect</h2>
            <h3>Contact form submissions</h3>
            <p>
              When you use our <Link to="/contact">contact form</Link> or reach us by email, phone,
              or WhatsApp, we may collect information you voluntarily provide, such as:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>
                Service requested and message details (for example vehicle make, model, or repair
                description)
              </li>
            </ul>
            <p>
              We use this information only to respond to your inquiry, provide quotes, schedule
              services, and follow up on your request.
            </p>

            <h3>General site analytics</h3>
            <p>
              Like most websites, we may collect general, non-identifying technical information
              about visits to our site. This can include browser type, device type, approximate
              location (country/city level), pages viewed, and referring URLs. This helps us
              understand how visitors use the site so we can improve content and performance. We do
              not use analytics data to sell your personal information.
            </p>

            <h2>2. Cookies</h2>
            <p>
              Our website may use cookies and similar technologies. Cookies are small text files
              stored on your device. They may be used to:
            </p>
            <ul>
              <li>Remember basic preferences and improve site functionality</li>
              <li>Measure traffic and usage patterns (analytics)</li>
              <li>Support advertising features described below</li>
            </ul>
            <p>
              You can control or delete cookies through your browser settings. Blocking some cookies
              may affect how certain parts of the site work.
            </p>

            <h2>3. Google AdSense and Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google and its
              partners use cookies (and similar technologies) to serve ads based on your prior
              visits to this website and/or other websites on the Internet. This helps Google and
              partners show more relevant ads and measure ad performance.
            </p>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user's
              previous visits to this or other websites. Google's use of advertising cookies enables
              it and its partners to serve ads to users based on their visit to this site and/or
              other sites on the Internet.
            </p>
            <p>
              Users may opt out of personalized advertising by visiting Google's Ads Settings at{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.google.com/settings/ads
              </a>
              . You can also learn more about how Google uses data when you use our partners' sites
              or apps at{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google's Partner Sites Policy
              </a>
              .
            </p>

            <h2>4. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to contact requests and provide automotive service quotes</li>
              <li>Operate, maintain, and improve our website</li>
              <li>Display advertising through Google AdSense</li>
              <li>Comply with legal obligations where applicable</li>
            </ul>
            <p>
              We do not sell your personal contact details to third parties for their marketing.
            </p>

            <h2>5. Data Sharing</h2>
            <p>
              We may share information with service providers who help us run the website or
              communicate with you (for example email or hosting providers), only as needed to
              perform those services. Advertising partners such as Google may receive cookie and
              usage data as described in the AdSense section above. We may also disclose information
              if required by law or to protect our rights and safety.
            </p>

            <h2>6. Data Retention and Security</h2>
            <p>
              We keep contact inquiries for as long as needed to handle your request and for
              legitimate business records. We take reasonable steps to protect information we hold,
              but no method of transmission over the Internet is completely secure.
            </p>

            <h2>7. Your Choices</h2>
            <ul>
              <li>
                You may request updates or deletion of contact information you previously sent us by
                emailing us.
              </li>
              <li>
                You may opt out of personalized ads via{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>
                .
              </li>
              <li>You may disable cookies in your browser.</li>
            </ul>

            <h2>8. Children's Privacy</h2>
            <p>
              Our services are directed to vehicle owners and the general public seeking automotive
              services. We do not knowingly collect personal information from children under 13. If
              you believe a child has provided us information, please contact us so we can delete
              it.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The "Last updated" date at the
              top of this page will reflect the latest revision. Continued use of the website after
              changes means you accept the updated policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your personal data, contact Dohar
              Car Repair:
            </p>
            <ul>
              <li>
                <strong>Address:</strong> Street 27, Doha, Qatar
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
              </li>
              <li>
                <strong>Email:</strong> <a href={`mailto:${business.email}`}>{business.email}</a> ·{' '}
                <a href={`mailto:${business.email2}`}>{business.email2}</a>
              </li>
              <li>
                <strong>Contact page:</strong> <Link to="/contact">/contact</Link>
              </li>
            </ul>
            <p>
              See also our <Link to="/terms">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
