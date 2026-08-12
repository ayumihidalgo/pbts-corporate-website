'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Globe, Share2, Rss, Mail, ArrowRight, MapPin, Phone } from 'lucide-react'

const columns = [
  {
    title: 'Services',
    links: [
      'Industrial PCB Repair',
      'Automation Engineering',
      'Machine Rehabilitation',
      'System Integration',
      'Industrial Fabrication',
    ],
  },
  {
    title: 'Industries',
    links: ['Semiconductor', 'Manufacturing', 'Automotive', 'Medical', 'Energy'],
  },
  {
    title: 'Company',
    links: ['About PBTS', 'Projects', 'Careers', 'News', 'Contact'],
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="bg-charcoal text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-12 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
                <Image
                  src="/pbts-logo.png"
                  alt="PBTS Technology"
                  width={96}
                  height={96}
                  className="size-12 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold text-white">PBTS</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                  Technology
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Pro Board Technology Services Corporation — engineering innovation that powers modern
              manufacturing since 2006.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-orange" /> Laguna Technopark, Biñan, Laguna
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 text-orange" /> +63 (2) 000 0000
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSubscribed(true)
              }}
              className="mt-6"
            >
              <label htmlFor="newsletter" className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Newsletter
              </label>
              {subscribed ? (
                <p className="mt-2 text-sm text-steel">Thanks for subscribing.</p>
              ) : (
                <div className="mt-2 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
                  <input
                    id="newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex items-center justify-center bg-orange px-4 text-orange-foreground"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-orange">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Follow
            </h3>
            <div className="mt-4 flex gap-3">
              {[Globe, Share2, Rss, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-orange hover:bg-orange hover:text-orange-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} PBTS Technology. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
