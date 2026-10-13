/**
 * Look up items and photos by category slug + title across Services and
 * Projects, so other sections (Timeline, About) reuse the same
 * photos and follow wherever the images live (e.g. /images/services/…).
 * Plain module (no 'use client') so server components can call it too.
 */
import { serviceCategories, type ServiceItem } from './services-data'
import { projectGroups } from './projects-data'

type Lookup = { slug: string; title: string; contactService: string; items: ServiceItem[]; equipment?: ServiceItem[] }
const collections: Lookup[] = [...serviceCategories, ...projectGroups]

export function findService(slug: string, title: string): { item: ServiceItem; slug: string } | null {
  for (const c of collections) {
    if (c.slug !== slug) continue
    const item = [...c.items, ...(c.equipment ?? [])].find((i) => i.title === title)
    if (item) return { item, slug }
  }
  if (process.env.NODE_ENV !== 'production') console.warn(`[service-lookup] not found: ${slug} / ${title}`)
  return null
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
