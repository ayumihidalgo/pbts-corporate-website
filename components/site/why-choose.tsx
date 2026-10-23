import { HardHat, LifeBuoy, MapPin, Settings2, type LucideIcon } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeader } from './section-header'
import { photoUrls, servicePhoto } from './service-lookup'

// Each card shows a real PBTS photo — either a direct image path or looked up
// from projects-data.ts / services-data.ts by (group slug, item title, photo index).
// Direct paths are listed WITHOUT extension: <name>-sm.webp (640px) is used on cards.
// `focus` sets which part of the photo stays visible when cropped — these 3:2
// images only crop left/right in the 4:3 card, so the X value is what matters.
const reasons: {
  icon: LucideIcon
  title: string
  desc: string
  photo: string | [slug: string, title: string, n?: number]
  focus?: string
}[] = [
  {
    icon: Settings2,
    title: 'Customized Solutions',
    desc: 'Solutions designed around your process, equipment, space, and requirements.',
    photo: '/images/services/whychoose/customized-solutions',
  },
  {
    icon: MapPin,
    title: 'On-site Support',
    desc: 'On-site technical support for plants and facilities, based on project requirements and location.',
    photo: '/images/services/whychoose/onsite-support',
  },
  {
    icon: LifeBuoy,
    title: 'After-Sales Support',
    desc: 'Maintenance, spare parts, and technical assistance after project completion.',
    photo: '/images/services/whychoose/after-sales-support',
  },
  {
    icon: HardHat,
    title: 'Safety First',
    desc: 'Safety practices incorporated throughout project and service activities.',
    photo: '/images/services/whychoose/safety-first',
    focus: '85% center', // keeps the "SAFETY FIRST" sign in frame
  },
]

export function WhyChoose() {
  return (
    <section className="bg-secondary/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Why Choose PBTS"
          title="Built on Engineering. Driven by Solutions."
          intro="We combine practical expertise, responsive support, and reliable solutions to help keep your projects and operations running efficiently."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const src =
              typeof r.photo === 'string'
                ? r.photo
                : servicePhoto(r.photo[0], r.photo[1], r.photo[2] ?? 0)
            return (
              <Reveal key={r.title} delay={(i % 4) * 90} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-steel/30 hover:shadow-md">
                  {/* photo — zoom lives on the inner wrapper (WebKit rounded-clip workaround) */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    {src && (
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none">
                        {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised WebP */}
                        <img
                          src={photoUrls(src).sm}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover"
                          style={{ objectPosition: r.focus ?? 'center' }}
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
                    {/* icon badge overlapping the photo edge */}
                    <span className="absolute bottom-3 left-4 inline-flex size-11 items-center justify-center rounded-xl bg-white text-navy shadow-md transition-colors group-hover:bg-orange group-hover:text-orange-foreground">
                      <r.icon className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
