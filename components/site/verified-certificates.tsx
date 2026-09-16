'use client'

import { useState } from 'react'
import { BadgeCheck, FileText } from 'lucide-react'
import { Reveal } from './reveal'
import { CertificationModal } from './certification-modal'

type Certificate = {
  title: string
  subtitle: string
  meta?: string
  logo: string
  pdfUrl: string
}

const certificates: Certificate[] = [
  {
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management System',
    meta: 'Certified',
    logo: '/certifications/logos/iso-9001.png',
    pdfUrl: '/certifications/docs/iso-9001-certificate.pdf',
  },
  {
    title: 'DTI–CIAP PCAB License',
    subtitle: 'Licensed Contractor',
    meta: 'Active License',
    logo: '/certifications/logos/pcab.png',
    pdfUrl: '/certifications/docs/pcab-license.pdf',
  },
]

export function VerifiedCertificates() {
  const [openCert, setOpenCert] = useState<Certificate | null>(null)

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {certificates.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 70}>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10">
              {/* accent glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-orange/5 transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start gap-4">
                <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary/50 p-1.5 ring-1 ring-border">
                  <img src={cert.logo} alt={cert.title} className="size-full object-contain" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold leading-snug text-navy">
                      {cert.title}
                    </h3>
                    <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-semibold text-navy">
                      <BadgeCheck className="size-3.5 text-orange" />
                      Verified
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{cert.subtitle}</p>
                  {cert.meta && (
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-orange">
                      {cert.meta}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setOpenCert(cert)}
                className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
              >
                <FileText className="size-4" />
                View Certificate
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {openCert && <CertificationModal cert={openCert} onClose={() => setOpenCert(null)} />}
    </>
  )
}
