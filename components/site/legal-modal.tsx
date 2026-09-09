'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { LegalSection } from './legal-content'

const offices = [
  {
    label: 'Main Office (Cavite)',
    address:
      'B2 L5 Annex A, Complex Ave., Peoples Technology Complex, Cabilang Baybay, Carmona, Cavite',
    phones: ['+63-2-8552-5131 to 32', '+63-46-430-2890'],
  },
  {
    label: 'Branch Office (Bataan)',
    address: 'B2 L2 Parkway Drive, Hermosa Ecozone Industrial Park, Palihan, Hermosa, Bataan',
    phones: ['+63-917-179-7377'],
  },
  {
    label: 'Branch Office (Cebu)',
    address: 'Blk 3 Section 11, AcaSys Homes, Kagudoy, Basak Lapu-Lapu City, Cebu, Philippines',
    phones: ['+63-917-535-0179'],
  },
]

export function LegalModal({
  open,
  onClose,
  title,
  lastUpdated,
  sections,
}: {
  open: boolean
  onClose: () => void
  title: string
  lastUpdated: string
  sections: LegalSection[]
}) {
  // Same body-scroll-lock + Escape-to-close pattern navbar.tsx uses for its
  // mobile menu, so this behaves consistently with the rest of the site.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        // close only on backdrop click, not clicks inside the panel
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border p-6 sm:p-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Legal
            </span>
            <h2
              id="legal-modal-title"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl"
            >
              {title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-navy transition-colors hover:bg-secondary"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h3 className="font-display text-base font-bold text-navy sm:text-lg">
                  {s.heading}
                </h3>
                <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {s.list && (
                    <ul className="ml-5 list-disc space-y-1.5">
                      {s.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {s.body2 && s.body2.map((p, i) => <p key={`b2-${i}`}>{p}</p>)}
                  {s.footer && <p>{s.footer}</p>}
                  {s.offices && (
                    <div className="mt-2 space-y-3">
                      {offices.map((o) => (
                        <div
                          key={o.label}
                          className="rounded-2xl border border-border bg-secondary/40 p-4 text-foreground"
                        >
                          <p className="font-semibold text-navy">{o.label}</p>
                          <p>{o.address}</p>
                          <p>{o.phones.join(' \u00b7 ')}</p>
                        </div>
                      ))}
                      <p>
                        Email:{' '}
                        <a href="mailto:sales@pbts-tech.com" className="text-navy hover:text-orange">
                          sales@pbts-tech.com
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
