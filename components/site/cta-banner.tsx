import { ArrowRight, Phone } from 'lucide-react'
import { Reveal } from './reveal'

export function CtaBanner() {
  return (
    <section className="bg-background pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-16 text-center sm:px-12 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(234,88,12,0.25) 0, transparent 45%)',
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
                Ready to improve your business operations?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/70 text-pretty">
                Let&apos;s build your next engineering solution. Talk to a PBTS engineer today.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-4 text-base font-semibold text-orange-foreground shadow-xl shadow-orange/25 transition-all hover:brightness-105"
                >
                  Book a Consultation
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+6320000000"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <Phone className="size-4 text-orange" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
