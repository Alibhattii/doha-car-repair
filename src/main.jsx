import React, { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'

import { HelmetProvider } from './components/seo/helmet'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import FloatingButtons from './components/layout/FloatingButtons'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const BlogListPage = lazy(() => import('./pages/BlogListPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
        aria-label="Loading page..."
      />
    </div>
  )
}

import { GarageShutterTransition } from './components/motion/GarageShutterTransition'

function Layout() {
  return (
    <HelmetProvider>
      <GarageShutterTransition>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <FloatingButtons />
      </GarageShutterTransition>
    </HelmetProvider>
  )
}

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog', element: <BlogListPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'services/:slug', element: <ServicePage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

import { blogPosts } from './data/blogPosts'
import { services } from './data/services'

export const includedRoutes = async (paths) => {
  const dynamicPaths = [
    ...services.map((s) => `/services/${s.slug}`),
    ...blogPosts.map((b) => `/blog/${b.slug}`),
  ]
  return [...paths.filter((p) => !p.includes(':') && !p.includes('*')), ...dynamicPaths]
}

export const createRoot = ViteReactSSG({ routes }, () => {})
