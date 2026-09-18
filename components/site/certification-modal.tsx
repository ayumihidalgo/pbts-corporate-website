'use client'

import { useEffect } from 'react'

type Certificate = {
  title: string
  subtitle: string
  logo: string
  pdfUrl: string
}

export function CertificationModal({
  cert,
  onClose,
}: {
  cert: Certificate
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex h-full max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary/50 p-1 ring-1 ring-border">
              <img src={cert.logo} alt={cert.title} className="size-full object-contain" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{cert.title}</p>
              <p className="text-xs text-muted-foreground">{cert.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex size-9 items-center justify-center rounded-full text-navy transition-colors hover:bg-secondary"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-secondary/30">
          <iframe src={cert.pdfUrl} title={cert.title} className="size-full" />
        </div>
      </div>
    </div>
  )
}
