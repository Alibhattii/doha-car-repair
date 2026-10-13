import { Link } from 'react-router-dom'
import { Helmet } from '../components/seo/helmet'
import PageMeta from '../components/seo/PageMeta'
import Breadcrumb from '../components/ui/Breadcrumb'
import { blogPosts } from '../data/blogPosts'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://doharcarrepairqa.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://doharcarrepairqa.com/blog' },
  ],
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Car Repair Tips & Guides — Dohar Car Repair Blog',
  url: 'https://doharcarrepairqa.com/blog',
  description:
    'Expert car repair guides, maintenance tips and automotive advice from Dohar Car Repair in Doha, Qatar.',
  publisher: {
    '@type': 'Organization',
    name: 'Dohar Car Repair',
    url: 'https://doharcarrepairqa.com',
  },
}

function BlogCard({ post }) {
  return (
    <article className="card group overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link
        to={`/blog/${post.slug}`}
        className="block overflow-hidden relative"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.imageAlt}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <span className="absolute top-3 left-3 badge-red text-xs">{post.category}</span>
        {post.featured && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <i className="fas fa-calendar text-primary" aria-hidden="true" />
            {new Date(post.datePublished).toLocaleDateString('en-QA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-clock text-primary" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <h2 className="font-display font-bold text-charcoal text-base mb-2 leading-snug group-hover:text-primary transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
        >
          Read More <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default function BlogListPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.datePublished) - new Date(a.datePublished)
  )

  return (
    <>
      <PageMeta
        title="Car Repair Tips & Guides | Dohar Car Repair Blog — Doha Qatar"
        description="Read expert car repair guides, maintenance tips, and auto service advice from Dohar Car Repair — your trusted workshop in Doha, Qatar."
        canonical="/blog"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <div className="pt-[88px] md:pt-[96px]" />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />

      {/* Blog hero */}
      <section
        className="relative h-64 md:h-80 flex items-center justify-center text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7a1220 0%, #1f2937 100%)' }}
      >
        <div className="relative z-10 px-4">
          <h1 className="text-3xl md:text-4xl font-display font-black mb-3">
            Car Repair Doha Tips &amp; Guides — Dohar Car Repair Blog
          </h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            Expert insights, tips, and guides on car repair, scrap car buying, and automotive
            services in Qatar
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section
        className="py-14 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #7a1220 0%, #1f2937 100%)' }}
      >
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            Need Expert Car Repair in Doha?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Read our guides then contact us for a free quote or same-day service.
          </p>
          <Link to="/contact" className="btn-primary">
            Get Free Quote Now
          </Link>
        </div>
      </section>
    </>
  )
}
