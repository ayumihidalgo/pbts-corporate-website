'use client'

import { ArrowRight, Phone, MessageSquare } from 'lucide-react'
import { Reveal } from './reveal'
import { useIsMobile } from './use-is-mobile'

export function CtaBanner() {
  const isMobile = useIsMobile()

  return (
    <section className="bg-background pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center shadow-xl shadow-navy/20 ring-1 ring-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-navy/30 hover:ring-white/20 sm:px-12 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(234,88,12,0.25) 0, transparent 45%)',
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 text-orange ring-1 ring-white/15 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange group-hover:text-orange-foreground group-hover:ring-orange/40">
                <MessageSquare className="size-5" />
              </span>

              <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-white text-balance transition-all duration-500 group-hover:tracking-normal sm:text-4xl lg:text-5xl">
                Ready to improve your business operations?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/70 text-pretty transition-colors duration-500 group-hover:text-white/90">
                Let&apos;s build your next engineering solution. Talk to a PBTS engineer today.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-4 text-base font-semibold text-orange-foreground shadow-xl shadow-orange/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-orange/40 hover:brightness-105"
                >
                  Book a Consultation
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
                {/* Only rendered on mobile — not just visually hidden, so
                    there's no dead tel: link sitting in the DOM on desktop
                    where there's no telephony to hand off to. */}
                {isMobile && (
                  <a
                    href="tel:+63285525131"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                  >
                    <Phone className="size-4 text-orange transition-transform duration-300 group-hover/btn:rotate-12" />
                    Call Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
