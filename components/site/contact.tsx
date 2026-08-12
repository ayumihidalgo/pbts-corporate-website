'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'

const contactCards = [
  { icon: MapPin, title: 'Main Office', lines: ['B2 L5 Annex A, Complex Ave., Peoples Technology Complex, Cabilang Baybay, Carmona, Cavite'] },
  { icon: Phone, title: 'Call Us', lines: ['+63-2-8552-5131 to 32', '+63-46-430-2890', 'Mon–Sat, 8:00–18:00'] },
  { icon: Mail, title: 'Email', lines: ['sales@pbts-tech.com'] },
  { icon: Clock, title: 'Emergency Support', lines: ['24/7 hotline', 'Rapid on-site response'] },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
            Talk to an Engineer
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            Tell us about your challenge and our team will respond within one business day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Info + map */}
          <div className="flex h-full flex-col lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactCards.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                    <c.icon className="size-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-muted-foreground">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
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
                      <option>Industrial PCB Repair</option>
                      <option>Automation Engineering</option>
                      <option>Machine Rehabilitation</option>
                      <option>System Integration</option>
                      <option>Industrial Fabrication</option>
                      <option>Industrial Construction</option>
                      <option>Other / Not sure</option>
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
