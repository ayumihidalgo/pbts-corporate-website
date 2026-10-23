'use client'

import { motion } from 'motion/react'
import { X, Download } from 'lucide-react'
import { useDialog } from './use-dialog'

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
  // mounted only while open; the parent wraps it in <AnimatePresence> for the exit
  const panelRef = useDialog(true, onClose)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${cert.title} certificate`}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
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
            <a
              href={cert.pdfUrl}
              download
              className="inline-flex size-9 items-center justify-center rounded-full text-navy transition-colors hover:bg-secondary"
              aria-label="Download certificate"
            >
              <Download className="size-4" />
            </a>
            <button
              type="button"
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
      </motion.div>
    </motion.div>
  )
}
