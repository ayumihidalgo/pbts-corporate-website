/**
 * Look up items and photos from services-data.ts by category slug + title,
 * so other sections (Projects, Timeline, About) reuse the same photos and
 * automatically follow wherever the images live (e.g. /images/services/…).
 * Plain module (no 'use client') so server components can call it too.
 */
import { serviceCategories, type ServiceCategory, type ServiceItem } from './services-data'

export function findService(
  slug: string,
  title: string,
): { item: ServiceItem; category: ServiceCategory } | null {
  const category = serviceCategories.find((c) => c.slug === slug)
  const item = category?.items.find((i) => i.title === title)
  if (!category || !item) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[service-lookup] not found: ${slug} / ${title}`)
    }
    return null
  }
  return { item, category }
}

/** Bare image path (no -sm / .webp suffix) of photo `n` of an item, or undefined. */
export function servicePhoto(slug: string, title: string, n = 0): string | undefined {
  return findService(slug, title)?.item.images[n]
}

/** Card-size (640px) and full-size (1600px) URLs for a bare path or full URL. */
export function photoUrls(src: string): { sm: string; lg: string } {
  if (/^https?:\/\//.test(src) || /\.(png|jpe?g|webp|avif|gif)$/i.test(src)) return { sm: src, lg: src }
  return { sm: `${src}-sm.webp`, lg: `${src}.webp` }
}
