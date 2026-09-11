'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import { openLegalModal } from './legal-events'
import { useIsMobile } from './use-is-mobile'

// Each phone has a `display` string (shown as-is, exactly as PBTS lists
// it) and a `tel` string (the actual dialable number used in tel: links
// on mobile). The Cavite main line lists two extensions ("5131 to 32") —
// since a tel: link can only dial one number, it's wired to the first
// extension (...5131).
const branches: {
  label: string
  address: string
  phones: { display: string; tel: string }[]
  email?: string
}[] = [
    {
      label: 'Main Office (Cavite)',
      address:
        'B2 L5 Annex A, Complex Ave., Peoples Technology Complex, Cabilang Baybay, Carmona, Cavite',
      phones: [
        { display: '+63-2-8552-5131 to 32', tel: '+63285525131' },
        { display: '+63-46-430-2890', tel: '+63464302890' },
      ],
      email: 'sales@pbts-tech.com',
    },
    {
      label: 'Branch Office (Bataan)',
      address: 'B2 L2 Parkway Drive, Hermosa Ecozone Industrial Park, Palihan, Hermosa, Bataan',
      phones: [{ display: '+63-917-179-7377', tel: '+639171797377' }],
    },
    {
      label: 'Branch Office (Cebu)',
      address: 'Blk 3 Section 11, AcaSys Homes, Kagudoy, Basak Lapu-Lapu City, Cebu, Philippines',
      phones: [{ display: '+63-917-535-0179', tel: '+639175350179' }],
    },
  ]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useIsMobile()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call our hotline.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-secondary/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Contact PBTS
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            Have a Project in Mind?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            Tell us about your requirements and our team will get back to you.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Info + map */}
          <div className="flex h-full flex-col lg:col-span-2">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                Corporate Branch Address
              </h3>
              <div className="mt-3 divide-y divide-border">
                {branches.map((b) => (
                  <div key={b.label} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
                      <MapPin className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">{b.label}</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {b.address}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                        {b.phones.map((p) =>
                          isMobile ? (
                            <a
                              key={p.display}
                              href={`tel:${p.tel}`}
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-navy"
                            >
                              <Phone className="size-3 shrink-0 text-orange" />
                              {p.display}
                            </a>
                          ) : (
                            <span
                              key={p.display}
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                            >
                              <Phone className="size-3 shrink-0 text-orange" />
                              {p.display}
                            </span>
                          ),
                        )}
                        {b.email && (
                          <a
                            href={`mailto:${b.email}`}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-navy"
                          >
                            <Mail className="size-3 shrink-0 text-orange" />
                            {b.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 min-h-[260px] flex-1 overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="PBTS office location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.8471334009837!2d121.05153957456803!3d14.320310683878573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d70cf3bad8ed%3A0x7e9c50759b6c49c1!2sPro%20Board%20Technology%20Services%20Corporation!5e0!3m2!1sen!2sph!4v1786416073454!5m2!1sen!2sph"
                width="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-full w-full grayscale-[0.2]"
              />
            </div>
          </div>

          {/* Form */}
          <div className="flex h-full flex-col lg:col-span-3">
            <div className="flex h-full flex-col rounded-3xl border border-border bg-white p-7 shadow-xl shadow-navy/5 lg:p-9">
              {submitted ? (
                <div className="flex min-h-80 flex-col items-center justify-center text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-steel/10 text-steel">
                    <CheckCircle2 className="size-9" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-navy">Message sent</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Thank you for reaching out to PBTS. An engineer will contact you within one
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="Juan dela Cruz" required />
                  <Field label="Company" name="company" placeholder="Company name" required />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                  <Field label="Phone" name="phone" type="tel" placeholder="+63 900 000 0000" />
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="service"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Service needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-steel focus:bg-white focus:ring-4 focus:ring-steel/15"
                    >
                      <optgroup label="For Manufacturing">
                        <option>Automation & Engineering Services</option>
                        <option>Board Engineering Solutions (Board Repair)</option>
                        <option>Business Support and System</option>
                        <option>Tooling Fabrication</option>
                        <option>Trading</option>
                      </optgroup>
                      <optgroup label="For Construction">
                        <option>Pre-Engineered Building Structures</option>
                        <option>Civil, Structural & Architectural</option>
                        <option>Mechanical, Electrical, & Plumbing</option>
                        <option>Fire Protection System</option>
                        <option>Interior Design & Fit Out</option>
                        <option>Repair & Maintenance Services</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe your equipment, challenge, or project scope..."
                      className="w-full resize-none rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-steel focus:bg-white focus:ring-4 focus:ring-steel/15"
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
                      <AlertTriangle className="size-4 shrink-0" />
                      {error}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground sm:col-span-2">
                    <AlertTriangle className="size-4 shrink-0 text-orange" />
                    For production-down emergencies, call our 24/7 hotline for immediate dispatch.
                  </div>
                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-0.5 size-4 shrink-0 rounded border-border text-orange accent-orange outline-none focus:ring-4 focus:ring-steel/15"
                    />
                    <label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground">
                      I agree to the collection and processing of my personal data in accordance with
                      PBTS Technology&apos;s{' '}
                      <button
                        type="button"
                        onClick={() => openLegalModal('privacy')}
                        className="font-semibold text-navy underline underline-offset-2 transition-colors hover:text-orange"
                      >
                        Privacy Policy
                      </button>
                      .
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-4 text-base font-semibold text-orange-foreground shadow-lg shadow-orange/25 transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-steel focus:bg-white focus:ring-4 focus:ring-steel/15"
      />
    </div>
  )
}
