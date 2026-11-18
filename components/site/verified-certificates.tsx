'use client'

import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { BadgeCheck, ExternalLink, FileText } from 'lucide-react'
import { Reveal } from './reveal'
import { CertificationModal } from './certification-modal'

type Certificate = {
  title: string
  subtitle: string
  /** short status line, e.g. "Active License" */
  meta?: string
  logo: string
  pdfUrl: string
  /** Optional details. Each one only shows on the card once it has a value. */
  number?: string // license / certificate number
  issuedBy?: string // PCAB, or the ISO certifying body
  scope?: string // e.g. category of the license, or ISO scope statement
  validUntil?: string // e.g. "December 31, 2027"
  /** Optional link to the issuer's public listing, so visitors can verify it. */
  verifyUrl?: string
}

// TODO: fill in the optional fields from the actual license / certificate
// (number, issuedBy, scope, validUntil, verifyUrl). Leave a field out until
// you have the real value: the card simply hides any line that isn't set.
const certificates: Certificate[] = [
  {
    title: 'DTI–CIAP PCAB License',
    subtitle: 'Licensed Contractor',
    meta: 'Active License',
    logo: '/certifications/logos/pcab.png',
    pdfUrl: '/certifications/docs/pcab-license.pdf',
    // number: '',
    // issuedBy: 'Philippine Contractors Accreditation Board (PCAB)',
    // scope: '',
    // validUntil: '',
    // verifyUrl: '',
  },
  {
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management System',
    meta: 'Certified',
    logo: '/certifications/logos/iso-9001.png',
    pdfUrl: '/certifications/docs/iso-9001-certificate.pdf',
    // number: '',
    // issuedBy: '',
    // scope: '',
    // validUntil: '',
    // verifyUrl: '',
  },
]

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex flex-col">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}

export function VerifiedCertificates() {
  const [openCert, setOpenCert] = useState<Certificate | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {certificates.map((cert, i) => {
          const hasDetails = cert.number || cert.issuedBy || cert.scope || cert.validUntil
          return (
            <Reveal key={cert.title} delay={i * 80} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-orange/30 hover:shadow-xl hover:shadow-navy/10">
                {/* accent glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-orange/5 transition-transform duration-500 group-hover:scale-125" />

                <div className="relative flex items-start gap-4">
                  <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary/50 p-2 ring-1 ring-border">
                    <img
                      src={cert.logo}
                      alt={`${cert.title} logo`}
                      loading="lazy"
                      className="size-full object-contain"
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl font-bold leading-snug text-navy">
                        {cert.title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-semibold text-navy">
                        <BadgeCheck className="size-3.5 text-orange" />
                        Verified
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{cert.subtitle}</p>
                    {cert.meta && (
                      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-orange">
                        {cert.meta}
                      </p>
                    )}
                  </div>
                </div>

                {hasDetails && (
                  <dl className="relative mt-4 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border pt-4 sm:grid-cols-2">
                    <Detail label="Number" value={cert.number} />
                    <Detail label="Issued by" value={cert.issuedBy} />
                    <Detail label="Scope" value={cert.scope} />
                    <Detail label="Valid until" value={cert.validUntil} />
                  </dl>
                )}

                <div className="relative mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => setOpenCert(cert)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                  >
                    <FileText className="size-4" />
                    View certificate
                  </button>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-steel transition-colors hover:text-navy sm:ml-2"
                    >
                      Verify with issuer
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <AnimatePresence>
        {openCert && (
          <CertificationModal key={openCert.title} cert={openCert} onClose={() => setOpenCert(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
