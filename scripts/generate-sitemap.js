import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import data lists
// Since this script runs under node, we can read blogPosts and services data directly
const blogPostsPath = path.resolve(__dirname, '../src/data/blogPosts.js')
const servicesPath = path.resolve(__dirname, '../src/data/services.js')

async function generateSitemap() {
  const baseUrl = 'https://doharcarrepairqa.com'
  const today = new Date().toISOString().split('T')[0]

  const { blogPosts } = await import('../src/data/blogPosts.js')
  const { services } = await import('../src/data/services.js')

  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  ]

  const serviceRoutes = services.map((s) => ({
    url: `/services/${s.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: today,
  }))

  const blogRoutes = blogPosts.map((p) => ({
    url: `/blog/${p.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: p.dateModified || p.datePublished || today,
  }))

  const allUrls = [
    ...staticRoutes.map((r) => ({ ...r, lastmod: today })),
    ...serviceRoutes,
    ...blogRoutes,
  ]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  const publicPath = path.resolve(__dirname, '../public/sitemap.xml')
  fs.writeFileSync(publicPath, sitemapXml, 'utf-8')
  console.log(`Generated sitemap.xml with ${allUrls.length} URLs at ${publicPath}`)
}

generateSitemap().catch((err) => {
  console.error('Error generating sitemap:', err)
  process.exit(1)
})
