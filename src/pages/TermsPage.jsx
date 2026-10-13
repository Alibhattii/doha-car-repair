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
      name: 'Terms of Service',
      item: 'https://doharcarrepairqa.com/terms',
    },
  ],
}

export default function TermsPage() {
  return (
    <>
      <PageMeta
        title="Terms of Service | Dohar Car Repair"
        description="Terms of Service for Dohar Car Repair — the rules and conditions that govern your use of our website and automotive services in Doha, Qatar."
        canonical="/terms"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="pt-[88px] md:pt-[96px]" />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Terms of Service' }]} />

      <section className="bg-charcoal-dark text-white py-14">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-display font-black mb-3">Terms of Service</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            The rules and conditions that govern your use of our website and services
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
              Welcome to Dohar Car Repair. By accessing or using the website doharcarrepairqa.com
              ("Site") or contacting us to request services, you agree to these Terms of Service
              ("Terms"). Please read them carefully.
            </p>

            <h2>1. About Dohar Car Repair</h2>
            <p>
              Dohar Car Repair is an automotive repair and vehicle purchasing business operating in
              Doha, Qatar. We provide car repair services, emergency roadside assistance, scrap car
              buying, damaged car purchasing, and related automotive services.
            </p>

            <h2>2. Website Use</h2>
            <p>
              This Site is provided for informational purposes and to facilitate contact with our
              business. You agree to:
            </p>
            <ul>
              <li>Use this Site only for lawful purposes</li>
              <li>
                Not attempt to gain unauthorized access to any part of the Site or its related
                systems
              </li>
              <li>Not use the Site in any way that could damage, disable, or impair it</li>
              <li>Provide accurate information when submitting contact forms or inquiries</li>
            </ul>

            <h2>3. Service Inquiries and Quotes</h2>
            <p>
              Quotes provided via our contact form, phone, WhatsApp, or email are estimates only and
              are not binding contracts until confirmed in writing by a Dohar Car Repair
              representative. Actual service prices may vary based on the final assessment of the
              vehicle and work required.
            </p>
            <p>We reserve the right to decline any service request at our discretion.</p>

            <h2>4. Vehicle Purchasing Services</h2>
            <p>When you contact us to sell a scrap, damaged, or junk vehicle:</p>
            <ul>
              <li>
                You represent that you are the legal owner of the vehicle or have full authority to
                sell it
              </li>
              <li>
                You agree to provide accurate information about the vehicle's condition, title, and
                registration status
              </li>
              <li>
                Prices offered are subject to physical inspection and verification of documents
              </li>
              <li>
                All necessary transfer paperwork must be completed in accordance with Qatar traffic
                law
              </li>
            </ul>

            <h2>5. Accuracy of Information</h2>
            <p>
              We strive to keep information on this Site accurate and up to date, including service
              descriptions, contact details, and business hours. However, we make no warranties
              regarding the completeness, accuracy, or reliability of any information on the Site.
              We reserve the right to update or correct information at any time without notice.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content on this Site — including text, images, logos, and design — is owned by or
              licensed to Dohar Car Repair and is protected by applicable intellectual property
              laws. You may not reproduce, distribute, or create derivative works from our content
              without our written permission.
            </p>

            <h2>7. Third-Party Links and Services</h2>
            <p>
              Our Site may contain links to third-party websites such as Google Maps, WhatsApp, or
              Facebook. These links are provided for your convenience. We are not responsible for
              the content, privacy practices, or accuracy of third-party sites. Accessing
              third-party links is at your own risk.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Dohar Car Repair and its staff
              shall not be liable for any indirect, incidental, consequential, or punitive damages
              arising from your use of this Site or our services. Our total liability for any direct
              damages shall not exceed the amount paid (if any) for the specific service in
              question.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              State of Qatar. Any disputes arising from these Terms or your use of our services
              shall be subject to the jurisdiction of the courts of Qatar.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The "Last updated" date above will
              reflect the latest revision. Your continued use of the Site after changes are posted
              constitutes acceptance of the updated Terms.
            </p>

            <h2>11. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us:</p>
            <ul>
              <li>
                <strong>Address:</strong> Street 27, Doha, Qatar
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
              </li>
              <li>
                <strong>Email:</strong> <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
              <li>
                <strong>Contact page:</strong> <Link to="/contact">/contact</Link>
              </li>
            </ul>
            <p>
              See also our <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
