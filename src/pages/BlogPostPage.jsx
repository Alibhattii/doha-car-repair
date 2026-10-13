import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from '../components/seo/helmet'
import PageMeta from '../components/seo/PageMeta'
import Breadcrumb from '../components/ui/Breadcrumb'
import { blogPosts } from '../data/blogPosts'
import { business } from '../data/business'
import { blogContent } from '../data/blogContent'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/404" replace />

  const content = blogContent[slug]
  const related = blogPosts.filter((p) => post.relatedSlugs?.includes(p.slug)).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.metaTitle || post.title,
    description: post.metaDesc,
    image: `https://doharcarrepairqa.com${post.image}`,
    author: { '@type': 'Organization', name: 'Dohar Car Repair' },
    publisher: {
      '@type': 'Organization',
      name: 'Dohar Car Repair',
      logo: { '@type': 'ImageObject', url: 'https://doharcarrepairqa.com/Header-logo.webp' },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://doharcarrepairqa.com/blog/${slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://doharcarrepairqa.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://doharcarrepairqa.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://doharcarrepairqa.com/blog/${slug}`,
      },
    ],
  }

  const shareUrl = `https://doharcarrepairqa.com/blog/${slug}`

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).catch(() => {})
  }

  return (
    <>
      <PageMeta
        title={post.metaTitle || post.title}
        description={post.metaDesc}
        canonical={`/blog/${slug}`}
        ogType="article"
        ogImage={`https://doharcarrepairqa.com${post.image}`}
        article={{ datePublished: post.datePublished, dateModified: post.dateModified }}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="pt-[88px] md:pt-[96px]" />
      <Breadcrumb
        items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title }]}
      />

      {/* Post hero */}
      <section
        className="relative h-64 md:h-96 flex items-center justify-center text-white text-center overflow-hidden"
        style={{
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-primary/40" />
        <div className="relative z-10 container max-w-3xl px-4">
          <span className="badge-red text-xs mb-4 inline-block">{post.category}</span>
          <h1 className="text-2xl md:text-4xl font-display font-black mb-4 leading-tight text-balance">
            {post.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <i className="fas fa-calendar-alt text-yellow-400" aria-hidden="true" />
              {new Date(post.datePublished).toLocaleDateString('en-QA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-clock text-yellow-400" aria-hidden="true" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-user text-yellow-400" aria-hidden="true" />
              Dohar Car Repair Team
            </span>
          </div>
        </div>
      </section>

      {/* Content + sidebar */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 max-w-5xl mx-auto">
            {/* Article */}
            <article className="card p-6 md:p-10">
              {content ? (
                <div className="blog-prose" dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <div className="blog-prose">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full rounded-xl mb-6"
                    width={1200}
                    height={675}
                    loading="lazy"
                  />
                  <p className="text-lg leading-relaxed">{post.excerpt}</p>
                  <p className="mt-4">
                    For more details about this service, please{' '}
                    <Link to="/contact" className="text-primary font-semibold hover:underline">
                      contact Dohar Car Repair
                    </Link>{' '}
                    for a free consultation and quote.
                  </p>
                  <div className="bg-red-gradient text-white p-5 rounded-xl mt-6">
                    <h4 className="font-bold mb-2">
                      <i className="fas fa-wrench mr-2" aria-hidden="true" />
                      Need This Service?
                    </h4>
                    <p className="text-white/90 text-sm">
                      Call us at{' '}
                      <a href={`tel:${business.phone}`} className="font-bold underline">
                        {business.phoneDisplayFormatted}
                      </a>{' '}
                      or{' '}
                      <a
                        href={business.whatsappGeneral}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline"
                      >
                        WhatsApp
                      </a>{' '}
                      for a free quote.
                    </p>
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-8 pt-5 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-charcoal mb-3">Related Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full hover:bg-primary hover:text-white transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <h4 className="text-sm font-bold text-charcoal mb-3">Share This Article:</h4>
                <div className="flex gap-2">
                  {[
                    {
                      label: 'Facebook',
                      icon: 'fa-facebook-f',
                      color: 'bg-blue-600',
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    },
                    {
                      label: 'WhatsApp',
                      icon: 'fa-whatsapp',
                      color: 'bg-green-500',
                      href: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`,
                    },
                    {
                      label: 'Copy Link',
                      icon: 'fa-link',
                      color: 'bg-gray-500',
                      onClick: copyLink,
                    },
                  ].map((btn) =>
                    btn.href ? (
                      <a
                        key={btn.label}
                        href={btn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share on ${btn.label}`}
                        className={`w-10 h-10 ${btn.color} text-white rounded-full flex items-center justify-center hover:opacity-90 hover:-translate-y-0.5 transition-all`}
                      >
                        <i className={`fab ${btn.icon} text-sm`} aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        key={btn.label}
                        onClick={btn.onClick}
                        aria-label={btn.label}
                        className={`w-10 h-10 ${btn.color} text-white rounded-full flex items-center justify-center hover:opacity-90 hover:-translate-y-0.5 transition-all`}
                      >
                        <i className={`fas ${btn.icon} text-sm`} aria-hidden="true" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5">
              {/* Author */}
              <div className="card p-5 text-center">
                <div className="w-16 h-16 bg-red-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-car text-white text-2xl" aria-hidden="true" />
                </div>
                <p className="font-bold text-charcoal">Dohar Car Repair</p>
                <p className="text-gray-400 text-xs mb-2">Automotive Experts</p>
                <p className="text-xs text-gray-500">
                  15+ years of experience in car repair and automotive services across Qatar.
                </p>
              </div>

              {/* CTA widget */}
              <div className="bg-red-gradient text-white rounded-2xl p-5 text-center">
                <h3 className="font-display font-bold mb-2 text-lg">Need Help?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Get a free quote for this service. We respond quickly.
                </p>
                <Link
                  to="/contact"
                  className="inline-block w-full py-2.5 bg-white text-primary font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors text-center"
                >
                  Contact Us Now
                </Link>
              </div>

              {/* Quick contact */}
              <div className="card p-5">
                <h3 className="font-bold text-charcoal text-sm mb-3">Quick Contact</h3>
                <div className="space-y-2">
                  <a
                    href={`tel:${business.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <i className="fas fa-phone text-primary text-xs" aria-hidden="true" />
                    {business.phoneDisplay}
                  </a>
                  <a
                    href={business.whatsappGeneral}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <i className="fab fa-whatsapp text-green-500 text-xs" aria-hidden="true" />
                    WhatsApp Us
                  </a>
                  <a
                    href={`mailto:${business.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <i className="fas fa-envelope text-primary text-xs" aria-hidden="true" />
                    {business.email}
                  </a>
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-bold text-charcoal text-sm mb-3">Related Guides</h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link key={r.slug} to={`/blog/${r.slug}`} className="flex gap-3 group">
                        <img
                          src={r.image}
                          alt={r.imageAlt}
                          className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                          loading="lazy"
                          width={64}
                          height={48}
                        />
                        <p className="text-xs text-gray-600 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {r.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
