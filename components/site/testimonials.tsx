import { Quote, Star } from 'lucide-react'
import { Reveal } from './reveal'

const testimonials = [
  {
    quote:
      'PBTS brought a critical drive back to life within 48 hours. Their board-level expertise saved us from a six-figure production loss.',
    name: 'Plant Manager',
    company: 'Semiconductor Manufacturer',
    initials: 'SM',
    result: '48-hour turnaround',
  },
  {
    quote:
      'The automation upgrade they engineered lifted our throughput significantly while improving quality. A genuinely reliable partner.',
    name: 'Operations Director',
    company: 'Automotive Supplier',
    initials: 'AS',
    result: '+27% throughput',
  },
  {
    quote:
      'From consultation to commissioning, their team was professional, safety-focused, and on schedule. We now use them across all sites.',
    name: 'Engineering Head',
    company: 'Industrial Plant Group',
    initials: 'IP',
    result: 'Multi-site rollout',
  },
]

export function Testimonials() {
  return (
    <section className="bg-secondary/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Client Testimonials
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            Trusted by teams who can&apos;t afford downtime
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.company} delay={i * 120}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-white p-8 shadow-sm">
                <Quote className="size-9 text-orange/30" />
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-orange text-orange" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                  <span className="flex size-12 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                    {t.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-foreground">{t.name}</span>
                    <span className="text-sm text-muted-foreground">{t.company}</span>
                  </span>
                  <span className="ml-auto rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy">
                    {t.result}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
