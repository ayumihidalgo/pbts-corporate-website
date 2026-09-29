'use client'

/**
 * Shared photo/detail viewer used by the Services section and Featured
 * Projects. Swipeable gallery, full description + lists, prev/next item,
 * and "Enquire about this" (pre-fills contact.tsx's form, then scrolls).
 * Keys: ← → photos · J / K previous / next item · Esc closes.
 */

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ServiceCategory, ServiceItem } from './services-data'

/** Only what the viewer needs from a category — lets Projects pass its own. */
export type ViewerCategory = Pick<ServiceCategory, 'icon' | 'title' | 'contactService'>
export type ViewerEntry = { item: ServiceItem; category: ViewerCategory }

// full URLs and paths that already end in an image extension are used as-is;
// bare paths get the pre-generated -sm.webp / .webp variants
const isExternal = (src: string) => /^https?:\/\//.test(src) || /\.(png|jpe?g|webp|avif|gif)$/i.test(src)
export const thumbSrc = (src: string) => (isExternal(src) ? src : `${src}-sm.webp`)
export const fullSrc = (src: string) => (isExternal(src) ? src : `${src}.webp`)

/** Horizontal swipe on touch/pen (mouse drags are ignored so text stays selectable). */
export function useSwipe(onLeft: () => void, onRight: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null)
  return {
    onPointerDown: (e: ReactPointerEvent) => {
      if (e.pointerType === 'mouse') return
      start.current = { x: e.clientX, y: e.clientY }
    },
    onPointerUp: (e: ReactPointerEvent) => {
      const s = start.current
      start.current = null
      if (!s) return
      const dx = e.clientX - s.x
      const dy = e.clientY - s.y
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return
      if (dx < 0) onLeft()
      else onRight()
    },
    onPointerCancel: () => {
      start.current = null
    },
  }
}

/** Pre-fill contact.tsx's (uncontrolled) form fields, then scroll to it. */
export function enquireAbout(category: ViewerCategory, item?: ServiceItem) {
  const option = item?.contactService ?? category.contactService
  const select = document.getElementById('service') as HTMLSelectElement | null
  if (select && option && Array.from(select.options).some((o) => o.text === option)) {
    select.value = option
  }
  const message = document.getElementById('message') as HTMLTextAreaElement | null
  if (message && item && !message.value.trim()) {
    message.value = `Hi PBTS, I'd like to know more about: ${item.title}${
      item.location ? ` (${item.location})` : ''
    }.\n\n`
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.setTimeout(() => message?.focus({ preventScroll: true }), 700)
}

/* ------------------------------------------------------------------ */
/* detail viewer                                                       */
/* ------------------------------------------------------------------ */

export function ServiceViewer({
  entries,
  index,
  onIndex,
  onClose,
}: {
  entries: ViewerEntry[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const { item, category } = entries[index]
  const items = entries
  const [photo, setPhoto] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const photos = item.images
  const hasPrevItem = index > 0
  const hasNextItem = index < items.length - 1

  // reset photo + scroll when the item changes
  useEffect(() => {
    setPhoto(0)
    textRef.current?.scrollTo({ top: 0 })
  }, [index])

  const prevPhoto = useCallback(
    () => setPhoto((p) => (photos.length ? (p - 1 + photos.length) % photos.length : 0)),
    [photos.length],
  )
  const nextPhoto = useCallback(
    () => setPhoto((p) => (photos.length ? (p + 1) % photos.length : 0)),
    [photos.length],
  )

  // lock page scroll, focus close button, restore focus on unmount
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prevPhoto()
      else if (e.key === 'ArrowRight') nextPhoto()
      else if ((e.key === 'j' || e.key === 'J') && hasNextItem) onIndex(index + 1)
      else if ((e.key === 'k' || e.key === 'K') && hasPrevItem) onIndex(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prevPhoto, nextPhoto, onIndex, index, hasNextItem, hasPrevItem])

  // warm the cache for the next photo so swiping feels instant
  useEffect(() => {
    if (photos.length > 1) {
      const img = new Image()
      img.src = fullSrc(photos[(photo + 1) % photos.length])
    }
  }, [photo, photos])

  const swipe = useSwipe(nextPhoto, prevPhoto)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-viewer-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:h-[min(85vh,720px)] md:flex-row"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-navy shadow-md hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
          <X className="size-4" />
        </button>

        {/* gallery */}
        <div className="relative flex shrink-0 flex-col bg-navy md:w-[58%]">
          <div
            className="relative aspect-[4/3] w-full touch-pan-y select-none md:aspect-auto md:flex-1"
            {...swipe}
          >
            {photos.length ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photos[photo]}
                src={fullSrc(photos[photo])}
                alt={`${item.title}${photos.length > 1 ? ` — photo ${photo + 1} of ${photos.length}` : ''}`}
                className="absolute inset-0 size-full object-contain"
                draggable={false}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/60">
                <category.icon className="size-12" />
                <span className="text-xs">Photos coming soon</span>
              </div>
            )}
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevPhoto}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow hover:bg-white"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow hover:bg-white"
                >
                  <ChevronRight className="size-4" />
                </button>
                <span className="absolute bottom-2 left-2 rounded-md bg-navy/70 px-1.5 py-0.5 text-[11px] tabular-nums text-white">
                  {photo + 1} / {photos.length}
                </span>
              </>
            )}
          </div>
          {photos.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === photo}
                  className={cn(
                    'size-12 shrink-0 overflow-hidden rounded-md ring-2 transition-opacity',
                    i === photo ? 'opacity-100 ring-orange' : 'opacity-60 ring-transparent hover:opacity-100',
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumbSrc(src)} alt="" className="size-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* text */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div ref={textRef} className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider text-orange">
              <span>{category.title}</span>
              {item.group && (
                <>
                  <span className="text-border">/</span>
                  <span>{item.group}</span>
                </>
              )}
            </p>
            <h3
              id="service-viewer-title"
              className="mt-2 pr-8 font-display text-xl font-bold leading-tight text-navy sm:text-2xl"
            >
              {item.title}
            </h3>
            {item.location && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5 text-orange" />
                {item.location}
              </p>
            )}
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{item.desc}</p>
              {item.more?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {item.lists?.map((list) => (
              <div key={list.title} className="mt-5">
                <p className="text-sm font-semibold text-navy">{list.title}</p>
                <ul className="mt-2 space-y-1.5">
                  {list.items.map((li) => (
                    <li key={li} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3 sm:px-5">
            <button
              type="button"
              onClick={() => {
                onClose()
                // wait for the viewer to unmount (restores page scrolling) before scrolling
                window.setTimeout(() => enquireAbout(category, item), 50)
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-4 py-2.5 text-sm font-semibold text-orange-foreground transition-opacity hover:opacity-90 sm:flex-none"
            >
              Enquire about this
              <ArrowRight className="size-4" />
            </button>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => onIndex(index - 1)}
                disabled={!hasPrevItem}
                aria-label="Previous item (K)"
                title="Previous (K)"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-navy hover:bg-secondary disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="min-w-[3.5rem] text-center text-xs tabular-nums text-muted-foreground">
                {index + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => onIndex(index + 1)}
                disabled={!hasNextItem}
                aria-label="Next item (J)"
                title="Next (J)"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-navy hover:bg-secondary disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


/** Renders the viewer into <body> so no transformed/overflow-hidden ancestor clips it. */
export function ServiceViewerPortal(props: Parameters<typeof ServiceViewer>[0] | { entries: ViewerEntry[]; index: null }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted || props.index === null || !props.entries[props.index]) return null
  return createPortal(<ServiceViewer {...(props as Parameters<typeof ServiceViewer>[0])} />, document.body)
}
