import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Served at /sitemap.xml. The site is a single page (sections are anchors and
// the legal pages are modals), so there's one URL. Add real routes here if you
// create separate pages later (e.g. /careers).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
}
