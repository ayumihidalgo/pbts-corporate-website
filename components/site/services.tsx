'use client'

/**
 * NOTE ON CONTENT:
 * The three categories flagged below reuse verified copy pulled from the
 * previous version of this file. The remaining seven are DRAFT PLACEHOLDER
 * copy written to make the interaction demoable — swap in real service
 * lists/descriptions before shipping:
 *   - Business System & Support        (placeholder)
 *   - Board Engineering Solution        (reuses old "Industrial PCB Repair")
 *   - Tooling and Metal Sheet Fabrication (reuses old fabrication/rehab items)
 *   - Warehouses                        (placeholder)
 *   - Civil/Structural                  (reuses old "Industrial Construction")
 *   - Electrical                        (placeholder)
 *   - Architecture                      (placeholder)
 *   - Mechanical                        (placeholder)
 *   - Landscaping                       (placeholder)
 *   - Automation & Engineering Services (reuses old automation/SCADA/vision items)
 *
 * Sub-service images are stock placeholders served directly from Unsplash's
 * CDN (images.unsplash.com) — chosen over loremflickr.com/picsum for load
 * speed. Each of the 50 items uses a distinct, verified-working photo (no
 * repeats), hand-picked for a rough topical match rather than an exact one.
 * Swap `image` on each entry in `categories` for real project/site
 * photography before shipping.
 */

import { forwardRef, Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  LayoutDashboard,
  Cpu,
  CircuitBoard,
  Factory,
  Warehouse,
  Building2,
  Zap,
  Compass,
  Cog,
  Trees,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Boxes,
  Code2,
  MonitorCog,
  ScanEye,
  CalendarCheck,
  Lightbulb,
  Database,
  Server,
  Network,
  Truck,
  PackageSearch,
  Layers,
  Ruler,
  PenTool,
  Shield,
  Plug,
  Cable,
  HardHat,
  Sprout,
  Flower2,
  Sun,
  LifeBuoy,
  Search,
  Siren,
  Bot,
  ClipboardList,
  Mountain,
  ClipboardCheck,
  Gauge,
  ShieldCheck,
  Box,
  Sofa,
  Wind,
  Scale,
  Droplets,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from './reveal'
import { cn } from '@/lib/utils'

type SubService = {
  icon: LucideIcon
  title: string
  desc: string
  image: string
}

type Category = {
  icon: LucideIcon
  title: string
  slug: string
  intro: string
  services: SubService[]
}

// Matches the `slug`s the navbar's Services mega-menu dispatches when a
// category link is clicked (see navbar.tsx's `serviceLinks`).
export const SERVICE_CATEGORY_SLUGS = [
  'business-system-support',
  'automation-engineering',
  'board-engineering',
  'tooling-metal-fabrication',
  'warehouses',
  'civil-structural',
  'electrical',
  'architecture',
  'mechanical',
  'landscaping',
] as const

const categories: Category[] = [
  {
    icon: LayoutDashboard,
    title: 'Business System & Support',
    slug: 'business-system-support',
    intro:
      'Software, infrastructure, and IT support that keep plant operations running and connected.',
    services: [
      {
        icon: Code2,
        title: 'Software Development',
        desc: 'Custom industrial and business software built around how your operation actually works.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: MonitorCog,
        title: 'SCADA Systems',
        desc: 'Supervisory control and data acquisition platforms for real-time plant visibility.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Server,
        title: 'IT Infrastructure Support',
        desc: 'Network, server, and systems support so production floors stay online.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Database,
        title: 'Business System Integration',
        desc: 'Connecting ERP, MES, and shop-floor data into one coherent system.',
        image: 'https://www.openbom.com/wp-content/uploads/2024/11/11.7.24-blog-1.jpg',
      },
      {
        icon: LifeBuoy,
        title: 'IT Helpdesk & Support',
        desc: 'Responsive technical support to keep users and systems productive.',
        image: 'https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    icon: Cpu,
    title: 'Automation & Engineering Services',
    slug: 'automation-engineering',
    intro:
      'PLC programming, control panels, and robotic cells that lift throughput and consistency.',
    services: [
      {
        icon: Cpu,
        title: 'Automation Engineering',
        desc: 'PLC programming, control panels, and robotic cells built for uptime.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: ScanEye,
        title: 'Vision Systems',
        desc: 'Machine vision for inspection, sorting, and quality control on the line.',
        image: 'https://kistler.cdn.celum.cloud/SAPCommerce_CMSGalleryStandard_720x480/automated-vision-inspection-system_52320.webp',
      },
      {
        icon: Boxes,
        title: 'System Integration',
        desc: 'End-to-end integration across equipment, controls, and production lines.',
        image: 'https://www.machinemetrics.com/hubfs/integrations-header-devices.svg',
      },
      {
        icon: CalendarCheck,
        title: 'Preventive Maintenance',
        desc: 'Scheduled inspection and upkeep programs that reduce unplanned downtime.',
        image: 'https://s3.fabrico.io/uploads/preventive-maintenance-compliance-pmc.jpg',
      },
      {
        icon: Lightbulb,
        title: 'Engineering Consultancy',
        desc: 'Independent engineering advice for process, layout, and equipment decisions.',
        image: 'https://www.caspeo.net/wp-content/uploads/2019/07/process-optimization-engineers.jpg',
      },
    ],
  },
  {
    icon: CircuitBoard,
    title: 'Board Engineering Solution',
    slug: 'board-engineering',
    intro:
      'Board-level diagnostics and component-level repair for drives, controllers, and industrial electronics.',
    services: [
      {
        icon: CircuitBoard,
        title: 'Industrial PCB Repair',
        desc: 'Component-level diagnostics and repair for drives, controllers, and I/O boards.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Network,
        title: 'Component Sourcing & Reballing',
        desc: 'Hard-to-find part sourcing and precision reballing for obsolete boards.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoMDjSi2RkVfj11Ag39JnXk5tKsCnrcQdni-ABA0FB99WUXR8P2A4I1Bis&s=10',
      },
      {
        icon: Shield,
        title: 'Board Testing & Validation',
        desc: 'Load testing and burn-in validation before boards go back into service.',
        image: 'https://www.pcbway.com/img/images/testing-service/example-pic.webp?v=20260515',
      },
      {
        icon: Search,
        title: 'PCB Reverse Engineering',
        desc: 'Schematic recovery and documentation for undocumented legacy boards.',
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Siren,
        title: 'Emergency Repair Service',
        desc: 'Rapid-turnaround board repair to get critical lines back online fast.',
        image: 'https://www.advancedtech.com/wp-content/uploads/2018/06/Deciding-to-repair-or-replace-your-industrial-parts_1200x628.jpg',
      },
    ],
  },
  {
    icon: Factory,
    title: 'Tooling and Metal Sheet Fabrication',
    slug: 'tooling-metal-fabrication',
    intro:
      'Precision metal fabrication, machining, and custom tooling built to exacting specifications.',
    services: [
      {
        icon: Factory,
        title: 'Industrial Fabrication',
        desc: 'Precision metal fabrication, machining, and assembly to spec.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLDC6JCaj9eh9-OAmbWHkA1K6JhYNyGE2d7VT7Sjvip3tpl1dkLxTTRmCy&s=10',
      },
      {
        icon: PenTool,
        title: 'Custom Tooling & Jigs',
        desc: 'Purpose-built tooling, jigs, and fixtures for repeatable production.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Cog,
        title: 'Motor Repair',
        desc: 'Rewinding, rebuilding, and testing for industrial motors of all sizes.',
        image: 'https://www.dukeelectric.com/app/uploads/2022/05/fixing-electric-motor-1024x683.jpg',
      },
      {
        icon: Wrench,
        title: 'Machine Rehabilitation',
        desc: 'Restoring legacy equipment to full operating condition.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  {
    icon: Warehouse,
    title: 'Warehouses',
    slug: 'warehouses',
    intro:
      'Warehouse design, build, and materials handling systems sized to your throughput.',
    services: [
      {
        icon: Warehouse,
        title: 'Warehouse Design & Build',
        desc: 'Layout planning and construction for storage and distribution facilities.',
        image: 'https://www.netsuite.com/portal/assets/img/business-articles/erp/social-warehouse-layout.jpg',
      },
      {
        icon: PackageSearch,
        title: 'Racking & Storage Systems',
        desc: 'Racking, shelving, and storage systems designed around your inventory flow.',
        image: 'https://mecaluxcom.cdnwm.com/img/pallet-flow-racking/pallet-flow-racking.2.8.jpg',
      },
      {
        icon: ClipboardList,
        title: 'Inventory Management Systems',
        desc: 'Tracking and control systems that keep stock accurate in real time.',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  {
    icon: Building2,
    title: 'Civil/Structural',
    slug: 'civil-structural',
    intro:
      'Structural design and civil works that form the backbone of industrial facilities.',
    services: [
      {
        icon: Building2,
        title: 'Industrial Construction',
        desc: 'Ground-up construction for industrial and production facilities.',
        image: 'https://images.unsplash.com/photo-1541976590-713941681591?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: HardHat,
        title: 'Structural Steel Design',
        desc: 'Structural steel design and detailing for buildings and support structures.',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Ruler,
        title: 'Foundation & Structural Works',
        desc: 'Foundation engineering and structural works built to code.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: ClipboardCheck,
        title: 'Structural Inspection & Assessment',
        desc: 'Condition assessments and inspections for existing structures.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  {
    icon: Zap,
    title: 'Electrical',
    slug: 'electrical',
    intro:
      'Electrical installation and power distribution engineered for industrial loads.',
    services: [
      {
        icon: Plug,
        title: 'Electrical Installation',
        desc: 'Installation and commissioning of industrial electrical systems.',
        image: 'https://innoventeng.com/wp-content/uploads/2025/09/Why-Electrical-Commissioning-Is-Key-to-Project-Success.jpg.webp',
      },
      {
        icon: Zap,
        title: 'Power Distribution',
        desc: 'Power distribution design sized for facility and equipment loads.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI2wbKvBAgdlYdJkSX3N00vWefaRaRYBOfJG_zf0z_yLoizzKEZpDMbIg&s=10',
      },
      {
        icon: Cable,
        title: 'Panel Building',
        desc: 'Custom control and distribution panel fabrication and wiring.',
        image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Gauge,
        title: 'Motor Control Centers',
        desc: 'MCC design, assembly, and commissioning for large motor loads.',
        image: 'https://images.unsplash.com/photo-1581092334437-1e0d8d6a6d17?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: ShieldCheck,
        title: 'Electrical Safety Audits',
        desc: 'Compliance inspections and safety audits for electrical systems.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  {
    icon: Compass,
    title: 'Architecture',
    slug: 'architecture',
    intro:
      'Facility design and planning that balances function, code, and future growth.',
    services: [
      {
        icon: Compass,
        title: 'Facility Design',
        desc: 'Architectural design for industrial and commercial facilities.',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Ruler,
        title: 'Space Planning',
        desc: 'Space planning that fits process flow, storage, and future expansion.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Permitting & Drafting',
        desc: 'Drafting and permit documentation to keep projects on schedule.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Box,
        title: '3D Modeling & Visualization',
        desc: '3D models and renders that make design intent easy to review.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Sofa,
        title: 'Interior Layout Design',
        desc: 'Interior space and layout design for offices and facilities.',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  {
    icon: Cog,
    title: 'Mechanical',
    slug: 'mechanical',
    intro:
      'Mechanical installation and repair for the equipment that keeps production moving.',
    services: [
      {
        icon: Wrench,
        title: 'Mechanical Installation',
        desc: 'Installation and alignment of mechanical equipment and drivetrains.',
        image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Cog,
        title: 'Motor & Gearbox Repair',
        desc: 'Repair and rebuild services for motors, gearboxes, and rotating equipment.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Layers,
        title: 'Piping Systems',
        desc: 'Process piping design, fabrication, and installation.',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Wind,
        title: 'HVAC Systems',
        desc: 'Industrial HVAC and ventilation design, install, and service.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Scale,
        title: 'Equipment Alignment & Balancing',
        desc: 'Precision alignment and balancing to reduce wear and vibration.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  {
    icon: Trees,
    title: 'Landscaping',
    slug: 'landscaping',
    intro:
      'Site development and grounds work that finish a facility inside and out.',
    services: [
      {
        icon: Sprout,
        title: 'Site Development',
        desc: 'Grading, drainage, and site preparation for new facilities.',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Flower2,
        title: 'Grounds Design',
        desc: 'Grounds and hardscape design for corporate and industrial sites.',
        image: 'https://images.unsplash.com/photo-1487875961445-47a00398c267?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Sun,
        title: 'Landscape Maintenance',
        desc: 'Ongoing upkeep to keep facility grounds presentable year-round.',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Droplets,
        title: 'Irrigation Systems',
        desc: 'Irrigation design and installation sized to the site and planting.',
        image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: LayoutGrid,
        title: 'Hardscape Installation',
        desc: 'Paving, walkways, and hardscape installation for facility grounds.',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
]

function CategoryTile({
  category,
  active,
  onClick,
}: {
  category: Category
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={cn(
        'group relative flex h-full w-full flex-col items-center gap-2.5 rounded-2xl border p-3.5 text-center transition-all duration-300 sm:p-4',
        active
          ? 'border-orange bg-navy shadow-lg shadow-navy/20'
          : 'border-border bg-secondary/40 hover:border-steel/30 hover:bg-white',
      )}
    >
      <span
        className={cn(
          'inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors',
          active
            ? 'bg-orange text-orange-foreground'
            : 'bg-navy/5 text-navy group-hover:bg-orange group-hover:text-orange-foreground',
        )}
      >
        <category.icon className="size-5" />
      </span>
      <span
        className={cn(
          'text-xs font-semibold leading-tight transition-colors sm:text-sm',
          active ? 'text-white' : 'text-foreground',
        )}
      >
        {category.title}
      </span>
      <ChevronDown
        className={cn(
          'size-3.5 shrink-0 transition-transform duration-300',
          active ? 'rotate-180 text-orange' : 'text-muted-foreground/50',
        )}
      />
    </button>
  )
}

// 2 cards per carousel page on mobile (single-column layout), 3 on desktop
// (sm:grid-cols-3) — matches the same `sm` breakpoint the page grid itself
// switches columns at, so a "page" always lines up with a full grid.
function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(3)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setItemsPerPage(mq.matches ? 3 : 2)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return itemsPerPage
}

function ServiceCard({ service: s, focusable }: { service: SubService; focusable: boolean }) {
  return (
    <div className="group/card flex flex-col rounded-2xl border border-border bg-secondary/30 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-steel/30 hover:shadow-md hover:shadow-navy/10">
      <div className="relative h-60 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 transition-transform duration-500 group-hover/card:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element -- external
              stock placeholder; swap for next/image once real local
              photography replaces `image` below */}
          <img src={s.image} alt={s.title} className="size-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
        <span className="absolute left-2.5 top-2.5 inline-flex size-8 items-center justify-center rounded-lg bg-white/95 text-navy shadow">
          <s.icon className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-sm font-semibold text-foreground">{s.title}</p>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
        <a
          href="#contact"
          tabIndex={focusable ? 0 : -1}
          className="group/link mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-navy"
        >
          Learn more
          <ArrowRight className="size-3 text-orange transition-transform group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  )
}

const CategoryPanel = forwardRef<
  HTMLDivElement,
  { category: Category; open: boolean; onTransitionEnd?: () => void }
>(function CategoryPanel({ category, open, onTransitionEnd }, ref) {
  const [page, setPage] = useState(0)
  const itemsPerPage = useItemsPerPage()
  const totalPages = Math.ceil(category.services.length / itemsPerPage)
  const isCarousel = totalPages > 1
  // chunk into pages of itemsPerPage; pad the last page with `null`
  // ghost slots so every page always has the same number of columns and
  // cards never stretch to fill an incomplete final page
  const pages = Array.from({ length: totalPages }, (_, p) => {
    const slice = category.services.slice(p * itemsPerPage, p * itemsPerPage + itemsPerPage)
    // fill remaining slots with null so the grid stays at itemsPerPage columns
    while (slice.length < itemsPerPage) slice.push(null as unknown as SubService)
    return slice
  })

  // itemsPerPage changing (mobile <-> desktop resize) can shrink totalPages
  // out from under the current page index — clamp it back in range so the
  // carousel doesn't try to render/translate to a page that no longer exists
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1))
  }, [totalPages])

  // All pages sit side-by-side in one flex row so the slide-transform can
  // animate between them — but that means the row's height defaults to its
  // TALLEST child (flexbox's default align-items: stretch), so a page with
  // only 1-2 real cards (mostly invisible ghost slots) still renders as
  // tall as the fullest page, leaving dead space below its cards. To fix
  // that we measure each page's own natural height and explicitly size the
  // wrapper to match only the currently active page, animating between
  // heights instead of relying on flex sizing.
  const pageRefs = useRef<Array<HTMLDivElement | null>>([])
  const [trackHeight, setTrackHeight] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    const measure = () => {
      const el = pageRefs.current[page]
      if (el) setTrackHeight(el.offsetHeight)
    }
    measure()
    // re-measure on resize since the grid goes from 1 column (mobile) to
    // 3 columns (sm+), which drastically changes each page's height
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [page, category, open, itemsPerPage])

  return (
    <div
      ref={ref}
      className={cn(
        'col-span-full grid scroll-mt-24 transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
      aria-hidden={!open}
      onTransitionEnd={(e) => {
        if (e.propertyName === 'grid-template-rows') onTransitionEnd?.()
      }}
    >
      <div className="-mx-3 overflow-hidden px-3 pb-1">
        <div
          className={cn(
            'mt-1 rounded-3xl border border-border bg-white p-6 shadow-md shadow-navy/10 transition-[opacity,transform] duration-300 ease-out sm:p-8',
            open ? 'translate-y-0 opacity-100 delay-150' : '-translate-y-1 opacity-0',
          )}
        >
          <div className="flex items-start gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
              <category.icon className="size-6" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">
                {category.title}
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {category.intro}
              </p>
            </div>
          </div>

          <div className="relative mt-6">
            {isCarousel && (
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous services"
                className="absolute left-0 top-1/2 z-10 inline-flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-navy shadow-md transition-opacity hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>
            )}

            <div
              className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={trackHeight !== undefined ? { height: trackHeight } : undefined}
            >
              <div
                className="flex items-start transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {pages.map((pageServices, pageIdx) => (
                  <div
                    key={pageIdx}
                    ref={(el) => {
                      pageRefs.current[pageIdx] = el
                    }}
                    className={cn(
                      'grid w-full shrink-0 grid-cols-1 gap-3 self-start sm:grid-cols-3',
                      pageIdx !== page && 'pointer-events-none',
                    )}
                    aria-hidden={pageIdx !== page}
                  >
                    {pageServices.map((s, sIdx) =>
                      s ? (
                        <ServiceCard key={s.title} service={s} focusable={pageIdx === page} />
                      ) : (
                        // ghost slot — invisible but holds the grid column so the
                        // last page's cards keep the same width as a full page.
                        // Hidden entirely on mobile (grid-cols-1): there it would
                        // stack as its own full-height blank row instead of just
                        // padding out a column, stretching the carousel with
                        // empty space when a page has only 1-2 real items.
                        <div key={`ghost-${sIdx}`} className="hidden sm:invisible sm:block" aria-hidden="true" />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>

            {isCarousel && (
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                aria-label="More services"
                className="absolute right-0 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-white text-navy shadow-md transition-opacity hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            )}
          </div>

          {isCarousel && (
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPage(idx)}
                  aria-label={`Go to page ${idx + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    idx === page ? 'w-5 bg-orange' : 'w-1.5 bg-navy/15 hover:bg-navy/30',
                  )}
                />
              ))}
            </div>
          )}

          <a
            href="#contact"
            className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy"
          >
            Discuss a {category.title.toLowerCase()} project
            <ArrowRight className="size-4 text-orange transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  )
})

// We need to track the active column count so the panel is inserted after
// the correct row end on both desktop (5 cols) and mobile (2 cols).
function useGridCols() {
  const [cols, setCols] = useState(5)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)')
    const update = () => setCols(mq.matches ? 2 : 5)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return cols
}

export function Services() {
  // `activeIndex` is the selected category; `renderIndex` is which panel is
  // actually mounted in the DOM. Only ever mounting the active panel keeps
  // this a true 5-column grid — a `col-span-full` item, even collapsed to
  // zero height, forces every other tile onto its own row, which is what
  // was happening when every category rendered a (mostly-hidden) panel.
  // nothing open by default — a manual scroll to this section should land
  // on all ten tiles closed. A category only opens when explicitly
  // requested (via the navbar's Services dropdown, see the event listener
  // below), never just because the section entered view.
  const gridCols = useGridCols()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [renderIndex, setRenderIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  // when switching straight from one open category to another, we collapse
  // the current panel first and stash the target here — the swap to the new
  // panel happens in onPanelCollapsed, once the collapse transition finishes,
  // so there's never an instant jump-cut between two open panels
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  // when a category is opened via the navbar (not by clicking a tile
  // directly), we scroll to the top of that category's ROW (not the panel
  // itself) once it's mounted — landing on the panel directly hides which
  // tile was actually clicked, whereas scrolling to the row keeps the
  // clicked category visible with the panel opening right beneath it
  const tileRowRefs = useRef<Array<HTMLDivElement | null>>([])
  const scrollToPanelRef = useRef(false)

  const openPanel = (i: number) => {
    setActiveIndex(i)
    setRenderIndex(i)
    // mount closed first, then flip to open on the next frame so the
    // grid-template-rows transition actually has something to animate from
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
  }

  const toggle = (i: number) => {
    if (activeIndex === i) {
      // collapse the open panel, then unmount it once the transition ends
      setOpen(false)
      setActiveIndex(null)
      return
    }
    if (activeIndex !== null) {
      // something else is open: collapse it smoothly first, then open the
      // new one once that collapse finishes (see onPanelCollapsed)
      setPendingIndex(i)
      setOpen(false)
      setActiveIndex(null)
      return
    }
    openPanel(i)
  }

  const onPanelCollapsed = (i: number) => {
    // only unmount/advance once the panel that's actually mid-collapse
    // finishes — ignore stray transitionend events from other properties
    if (open || renderIndex !== i) return
    setRenderIndex((cur) => (cur === i ? null : cur))
    if (pendingIndex !== null) {
      const next = pendingIndex
      setPendingIndex(null)
      openPanel(next)
    }
  }

  // opens a category by slug, used when the navbar's Services dropdown
  // dispatches `pbts:open-service-category` (see navbar.tsx) — reuses the
  // same smooth collapse-then-open sequencing as clicking a tile directly
  const scrollToRow = (i: number) => {
    const rowStart = Math.floor(i / gridCols) * gridCols
    tileRowRefs.current[rowStart]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openCategoryBySlug = (slug: string) => {
    const i = categories.findIndex((c) => c.slug === slug)
    if (i === -1) return
    if (activeIndex === i) {
      // already the open category — just bring its row back into view
      scrollToRow(i)
      return
    }
    scrollToPanelRef.current = true
    if (activeIndex !== null) {
      setPendingIndex(i)
      setOpen(false)
      setActiveIndex(null)
      return
    }
    openPanel(i)
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<{ slug: string }>).detail?.slug
      if (slug) openCategoryBySlug(slug)
    }
    window.addEventListener('pbts:open-service-category', handler)
    return () => window.removeEventListener('pbts:open-service-category', handler)
  }, [activeIndex, pendingIndex])

  // once the target panel is actually mounted (renderIndex caught up to
  // activeIndex), scroll it to the top of the viewport — its top edge is
  // stable even while the panel is still animating open, so this doesn't
  // need to wait for the open transition to finish
  useEffect(() => {
    if (!scrollToPanelRef.current || renderIndex === null || renderIndex !== activeIndex) return
    scrollToPanelRef.current = false
    const target = renderIndex
    requestAnimationFrame(() => scrollToRow(target))
  }, [renderIndex, activeIndex])

  return (
    <section id="services" className="scroll-mt-24 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Core Services
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl lg:text-5xl">
            End-to-end engineering, under one roof
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            From a single failed board to a fully built facility, our capabilities cover the
            entire industrial lifecycle. Select a category to explore.
          </p>
        </Reveal>

        {/* Only one panel is ever mounted at a time (renderIndex), so it's
            the sole full-width item in this grid — inserting it right after
            its tile pushes only the rows below it down, without forcing
            every other tile onto its own row (that was the earlier bug).
            It has to be inserted after the LAST tile of the active tile's
            row (not right after the clicked tile itself), otherwise picking
            tile 1-4 splits row 1 apart instead of keeping all 5 together. */}
        <div className="mt-14 grid grid-cols-5 gap-2.5 sm:gap-3 max-[480px]:grid-cols-2">
          {categories.map((category, i) => {
            const rowEndIndex =
              renderIndex === null
                ? -1
                : Math.min(Math.floor(renderIndex / gridCols) * gridCols + gridCols - 1, categories.length - 1)
            return (
              <Fragment key={category.title}>
                <div
                  ref={(el) => {
                    tileRowRefs.current[i] = el
                  }}
                  className="h-full scroll-mt-24"
                >
                  <Reveal className="h-full" delay={(i % 5) * 60}>
                    <CategoryTile
                      category={category}
                      active={activeIndex === i}
                      onClick={() => toggle(i)}
                    />
                  </Reveal>
                </div>
                {i === rowEndIndex && (
                  <CategoryPanel
                    key={categories[renderIndex as number].title}
                    category={categories[renderIndex as number]}
                    open={open && activeIndex === renderIndex}
                    onTransitionEnd={() => onPanelCollapsed(renderIndex as number)}
                  />
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
