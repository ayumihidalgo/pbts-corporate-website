import { ShieldCheck, Award, Cog, Users, Trophy } from 'lucide-react'
import { Reveal } from './reveal'

const certs = [
  { icon: ShieldCheck, title: 'Safety Compliance', desc: 'OSH-aligned safety protocols on every site' },
  { icon: Award, title: 'Quality Management', desc: 'ISO-aligned quality assurance processes' },
  { icon: Cog, title: 'Engineering Standards', desc: 'Certified engineering methodologies' },
  { icon: Users, title: 'Industry Memberships', desc: 'Active in national engineering bodies' },
  { icon: Trophy, title: 'Awards & Recognition', desc: 'Recognized for service excellence' },
]

export function Certifications() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Certifications & Standards
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy text-balance sm:text-3xl lg:text-4xl">
            Held to the highest standards
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={(i % 5) * 70}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-secondary/40 p-6 text-center">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy text-white">
                  <c.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
