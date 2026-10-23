import { ShieldCheck, Award, Cog, Users, Trophy } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeader } from './section-header'
import { VerifiedCertificates } from './verified-certificates'

const certs = [
  { icon: ShieldCheck, title: 'Safety Compliance', desc: 'OSH-aligned safety protocols on every site' },
  { icon: Award, title: 'Quality Management', desc: 'ISO-aligned quality assurance processes' },
  { icon: Cog, title: 'Engineering Standards', desc: 'Certified engineering methodologies' },
  { icon: Users, title: 'Industry Memberships', desc: 'Active in national engineering bodies' },
  { icon: Trophy, title: 'Awards & Recognition', desc: 'Recognized for service excellence' },
]

export function Certifications() {
  return (
    <section id="certifications" className="bg-background pb-10 pt-20 lg:pb-10 lg:pt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader size="sm" eyebrow="Certifications & Standards" title="Held to the highest standards" />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={(i % 5) * 70}>
              <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-secondary/40 p-6 text-center transition-colors duration-300 hover:border-orange/30 hover:bg-white">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-orange group-hover:text-orange-foreground">
                  <c.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <VerifiedCertificates />
      </div>
    </section>
  )
}
