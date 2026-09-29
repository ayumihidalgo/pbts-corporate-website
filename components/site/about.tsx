'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, MapPin } from 'lucide-react'
import { Reveal } from './reveal'
import { photoUrls, servicePhoto } from './service-lookup'

const highlights = [
  'Established in 2006',
  'Engineering Excellence',
  'Innovation-Driven',
  'Safety First Culture',
  'ISO-Aligned Standards',
]

// "Areas of Operation" — each chip jumps to the Contact section, where the
// full address and phone numbers for that branch are listed.
const branches = [
  { label: 'Cavite', note: 'Main Office' },
  { label: 'Bataan', note: 'Branch' },
  { label: 'Cebu', note: 'Branch' },
]

// The video is the Bataan (Hermosa) site, so the warehouse photo makes a
// matching poster frame while the video loads.
const posterSrc = servicePhoto('warehouses', 'PBTS Warehouse', 0)

/**
 * Autoplaying background video that:
 * - loads only metadata until it's near the viewport (saves mobile data)
 * - pauses when scrolled away, resumes when back
 * - never autoplays for visitors who prefer reduced motion (poster only)
 */
function SiteVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay blocked — poster stays */
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src="/videos/PBTS-Bataan-Hermosa.mp4"
      poster={posterSrc ? photoUrls(posterSrc).lg : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="PBTS Bataan site in Hermosa"
      className="h-full w-full object-cover"
    />
  )
}

export function About() {
  return (
    <section id="about" className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="relative">
          <div className="relative aspect-[720/820] overflow-hidden rounded-3xl border border-border bg-navy shadow-2xl shadow-navy/10">
            <SiteVideo />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-border bg-white p-6 shadow-xl sm:block lg:-right-6">
            <div className="font-display text-4xl font-bold text-navy">2006</div>
            <div className="mt-1 max-w-[9rem] text-sm text-muted-foreground">
              Engineering excellence, delivered ever since
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              About PBTS
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
              Built on Years of Industrial Experience
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Pro Board Technology Services Corporation started in 2006 providing industrial circuit
              board repair services and has since expanded into automation, custom equipment,
              engineering, and construction. PBTS provides technical and project support for
              industrial and commercial requirements, guided by quality workmanship and a
              &ldquo;Zero-Time Accident&rdquo; safety culture.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="size-5 shrink-0 text-steel" />
                  <span className="font-medium">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Areas of Operation
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {branches.map((b) => (
                  <a
                    key={b.label}
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 py-1.5 pl-2 pr-3.5 text-sm transition-colors hover:border-orange/40 hover:bg-white"
                  >
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-navy text-white transition-colors group-hover:bg-orange">
                      <MapPin className="size-3.5" />
                    </span>
                    <span className="font-semibold text-navy">{b.label}</span>
                    <span className="text-xs text-muted-foreground">{b.note}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
