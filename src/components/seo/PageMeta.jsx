import { Helmet } from './helmet'
import { business } from '../../data/business'

/**
 * PageMeta — renders all <head> SEO tags for a page.
 * Usage: <PageMeta title="..." description="..." canonical="/about" />
 */
export default function PageMeta({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = `${business.url}/Image/carser1.webp`,
  article = null, // { datePublished, dateModified, author }
  noindex = false,
  children,
}) {
  const fullCanonical = canonical ? `${business.url}${canonical}` : business.url

  const robotsContent = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  return (
    <Helmet>
      {/* Core */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={business.name} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullCanonical} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en-qa" href={fullCanonical} />
      <link rel="alternate" hrefLang="en" href={fullCanonical} />

      {/* Geo */}
      <meta name="geo.region" content={business.geo.region} />
      <meta name="geo.placename" content={business.geo.placename} />
      <meta name="geo.position" content={business.geo.position} />
      <meta name="ICBM" content={business.geo.icbm} />

      {/* Theme */}
      <meta name="theme-color" content={business.colors.primary} />
      <meta name="msapplication-navbutton-color" content={business.colors.primary} />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={business.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article-specific */}
      {article && (
        <>
          <meta property="article:published_time" content={article.datePublished} />
          <meta property="article:modified_time" content={article.dateModified} />
          <meta property="article:author" content={article.author || business.name} />
        </>
      )}

      {/* Google Search Console verification placeholder */}
      {business.analytics.gscVerification && (
        <meta name="google-site-verification" content={business.analytics.gscVerification} />
      )}

      {children}
    </Helmet>
  )
}
