/**
 * Services content — the SERVICES PBTS offers, per category.
 * Built machines/systems/jigs and completed jobs live in projects-data.ts;
 * categories link to them through `related`.
 * UI lives in services.tsx; nothing here needs React knowledge.
 *
 * Source: "PBTSWebsite" services doc + images.zip (Sept 2026). Every doc image
 * is matched to its item and converted to WebP under /public/images/services/<slug>/:
 *   <name>-sm.webp  (640px, used on cards)
 *   <name>.webp     (1600px, used in the detail viewer)
 * `images` entries are listed WITHOUT the suffix/extension — services.tsx adds
 * them. A full https:// URL is also accepted (used as-is for both sizes).
 * The first image is the card cover; the rest appear in the detail gallery.
 *
 * Architecture and Landscaping are NOT in the doc yet — they still carry the
 * old placeholder copy and stock images.
 */
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
  type LucideIcon,
} from 'lucide-react'

export type ServiceItem = {
  title: string
  /** shown under the title on project cards, e.g. "Cebu City" */
  location?: string
  /** optional sub-group, shown as filter chips (e.g. Tooling / Metal Fabrication) */
  group?: string
  /** first paragraph — the card preview (clamped); shown in full in the viewer */
  desc: string
  /** extra paragraphs, viewer only */
  more?: string[]
  /** bullet lists, viewer only */
  lists?: { title: string; items: string[] }[]
  images: string[]
  /** short orange line on Project cards */
  highlight?: string
  /** overrides the category's contact-form "Service needed" option */
  contactService?: string
}

export type ServiceCategory = {
  icon: LucideIcon
  title: string
  slug: string
  intro: string
  /** option text in contact.tsx's "Service needed" select ('' = leave it alone) */
  contactService: string
  items: ServiceItem[]
  /** "See N … products/projects" links shown at the bottom of the category panel */
  related?: { section: 'projects'; group: string }[]
  /** in-house machines, shown as an "Our equipment" strip (Tooling) */
  equipment?: ServiceItem[]
}

// Keep in sync with navbar.tsx's `serviceLinks` slugs.
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

export const serviceCategories: ServiceCategory[] = [
  {
    icon: LayoutDashboard,
    title: "Business System & Support",
    slug: "business-system-support",
    intro: "Custom software, monitoring systems, and IT installations that keep plant operations running and connected.",
    contactService: "Business Support and System",
    related: [{ section: "projects", group: "Systems & Software" }],
    items: [
      {
        title: "Software Development",
        desc: "Custom web-based and Windows applications built around how your operation works — from information and database systems to enterprise software such as ERP and CRM.",
        lists: [
          {
            title: "What we build",
            items: [
              "Information software",
              "Database software",
              "Enterprise software (ERP, CRM)",
              "Preventive Maintenance System",
            ],
          },
          {
            title: "Technology",
            items: [
              "Web-based applications: ASP.NET, VB.NET",
              "Windows applications: C#",
              "Database: Microsoft SQL Server",
              "Tools: Visual Studio, SQL Server Management Studio",
            ],
          },
        ],
        images: ["/images/services/business-system-support/auto-data-transfer-system-2", "/images/services/business-system-support/erp-system-2", "/images/services/business-system-support/software-support-2"],
      },
      {
        title: "Monitoring & Test Systems",
        desc: "Custom monitoring dashboards and test stations that connect to sensors and instruments on the production floor.",
        more: [
          "Examples include production andon boards, cleanroom and noise-level monitoring, automatic data collection from test instruments, and automated product testers. See them in Products.",
        ],
        images: ["/images/services/business-system-support/cleanroom-monitoring-system-1", "/images/services/business-system-support/andon-production-monitoring-1", "/images/services/business-system-support/ionizer-tester-1"],
      },
      {
        title: "Preventive Maintenance System",
        desc: "Ongoing support, maintenance, and enhancement of client systems after deployment.",
        more: [
          "Shown: a web-based e-maintenance system for preventive and breakdown maintenance — maintenance requests, approvals, and monitoring dashboards.",
        ],
        images: ["/images/services/business-system-support/software-support-1", "/images/services/business-system-support/software-support-2"],
      },
      {
        title: "CCTV & Biometric Installation",
        desc: "Supply and installation of CCTV and biometric systems, including face-recognition terminals for attendance and access control.",
        images: ["/images/services/business-system-support/cctv-biometric-installation"],
      },
    ],
  },
  // Service list is DRAFT copy written from the products/projects in this category.
  {
    icon: Cpu,
    title: "Automation & Engineering Services",
    slug: "automation-engineering",
    intro: "Custom machines, assembly presses, inspection systems, and material-handling automation built for production lines.",
    contactService: "Automation & Engineering Services",
    related: [{ section: "projects", group: "Automation Machines" }],
    items: [
      {
        title: "Custom Machine Design & Build",
        desc: "Design, fabrication, and commissioning of custom production machines built around your parts and process — from semi-automated assembly stations to fully automated systems.",
        images: ["/images/services/automation-engineering/x590f-lrb-3-0-insert-chassis-into-large-bristle-cage", "/images/services/automation-engineering/x590-al3-2-assemble-3x-spring-plunger-into-cool-wall-rim", "/images/services/automation-engineering/wire-looping-machine", "/images/services/automation-engineering/led-navigation-system"],
      },
      {
        title: "Press-Fit & Assembly Machines",
        desc: "Lever, pneumatic, and press-fit machines that assemble components with controlled force, proper alignment, and repeatable results.",
        images: ["/images/services/automation-engineering/x970-wa12-0-pneumatic-press-machine", "/images/services/automation-engineering/x970a-wa-12-3-lever-press", "/images/services/automation-engineering/x931a-press-neck-pivot-to-neck-head"],
      },
      {
        title: "Automated Inspection Systems",
        desc: "Vision- and process-based inspection systems that check parts against acceptance criteria and record the results for traceability.",
        images: ["/images/services/automation-engineering/x898b-aoi-concentricity-enclosure", "/images/services/automation-engineering/vapor-inspection-machine"],
      },
      {
        title: "Material Handling Automation",
        desc: "Automated guided vehicles, loaders and unloaders, sorters, and parts counters that move and prepare materials with minimal manual handling.",
        images: ["/images/services/automation-engineering/automated-guided-vehicle", "/images/services/automation-engineering/lf-sorter-c-w-magazine-loader-unloader", "/images/services/automation-engineering/magazine-loader-unloader", "/images/services/automation-engineering/loader-and-unloader", "/images/services/automation-engineering/parts-counter-machine"],
      },
      {
        title: "Cleaning & Process Equipment",
        desc: "Rinsing, degreasing, washing, coolant-dispensing, and molding equipment for consistent, repeatable processing.",
        images: ["/images/services/automation-engineering/lf-rinsing-bath-system", "/images/services/automation-engineering/degreasing-rinsing-machine", "/images/services/automation-engineering/magazine-washer-system", "/images/services/automation-engineering/automatic-coolant-dispenser", "/images/services/automation-engineering/molding-machine"],
      },
    ],
  },
  {
    icon: CircuitBoard,
    title: "Board Engineering Solution",
    slug: "board-engineering",
    intro: "Board-level diagnostics and component-level repair for drives, controllers, and industrial electronics.",
    contactService: "Board Engineering Solutions (Board Repair)",
    items: [
      {
        title: "Board Repair",
        desc: "PBTS provides industrial electronic board repair services for various types of equipment and applications. Our services focus on quality workmanship, cost-effective solutions, and practical turnaround times based on project requirements.",
        more: [
          "Specialized in the repair of industrial electronic printed circuit boards.",
        ],
        lists: [
          {
            title: "What we do",
            items: [
              "Perform component level repairs on electronic circuit boards and equipment using state-of-the-art test and measuring equipment.",
              "Do in-circuit/system modification for obsolete products.",
              "Do CPU hardware and operating system upgrade.",
              "Provide onsite technical support to repair PIN/PE CARD, Load Board and Burn-In Board for semiconductor test plant.",
              "Provide onsite technical support to repair assembly equipment for semiconductor assembly and other industrial plants.",
            ],
          },
          {
            title: "Capabilities",
            items: [
              "Motion Controller",
              "CPU/Microcontroller Base",
              "Servo Driver",
              "Semiconductor Manufacturing Boards",
              "Switching Power Supply",
            ],
          },
        ],
        images: ["/images/services/board-engineering/board-repair-1", "/images/services/board-engineering/board-repair-2", "/images/services/board-engineering/board-repair-3"],
      },
      {
        title: "Inverter Repair",
        desc: "Focuses on the diagnosis, repair, and testing of industrial inverter boards and related electronic components. It helps address common issues affecting inverter operation and supports the restoration of equipment performance while minimizing unnecessary replacement costs.",
        images: ["/images/services/board-engineering/inverter-repair"],
      },
      {
        title: "Board Assembly",
        desc: "Involves the assembly of electronic components onto PCBs based on specified designs and requirements. It supports the production and integration of reliable board assemblies for industrial equipment and automation applications.",
        images: ["/images/services/board-engineering/board-assembly"],
      },
      {
        title: "LCD Monitor (Elevator)",
        desc: "Covers the inspection, troubleshooting, and repair of LCD monitor boards used in elevator systems. It helps address display-related issues and restore proper monitor operation through appropriate board-level repair and testing.",
        images: ["/images/services/board-engineering/lcd-monitor-elevator"],
      },
      {
        title: "Parker Servo Drive Units & Allen-Bradley Servo/Inverter Drives",
        desc: "Repair and troubleshooting of Parker servo drive units and Allen-Bradley servo and inverter drives used in industrial automation systems.",
        images: [],
      },
      {
        title: "PCB Engineering",
        desc: "PCB Engineering is open for Printed Circuit Board Assembly and Repair Service contracts based on customer’s needs. Rehabilitation of scrap IC Test Sockets and Test Boards is also offered, along with Technical Engineering Support.",
        lists: [
          {
            title: "Other capabilities",
            items: [
              "PCB Repair/Restoration Capability (Traces & Pads Rehabilitation)",
              "Test IC Socket Rehabilitation",
              "Burn-in board Maintenance (replacement/repair/rework)",
              "PCB Layout Design and Manufacturing",
              "Technical Engineering & Equipment Support On-Site (Assembly to Test)",
            ],
          },
        ],
        images: [],
      },
    ],
  },
  // Service list is DRAFT copy written from the products/projects in this category.
  {
    icon: Factory,
    title: "Tooling and Metal Sheet Fabrication",
    slug: "tooling-metal-fabrication",
    intro: "Custom jigs, fixtures, and tooling, plus fabricated carts, cabinets, racks, ducting, and machine covers.",
    contactService: "Tooling Fabrication",
    related: [{ section: "projects", group: "Jigs & Tooling" }, { section: "projects", group: "Fabricated Products" }],
    items: [
      {
        title: "Jig & Fixture Fabrication",
        desc: "Custom jigs and fixtures that hold, align, and position parts for assembly, testing, inspection, and finishing.",
        images: ["/images/services/tooling-metal-fabrication/bosch-jig-maker", "/images/services/tooling-metal-fabrication/location-jig", "/images/services/tooling-metal-fabrication/tph-lcd-combo-jig", "/images/services/tooling-metal-fabrication/generic-roller-press-jig"],
      },
      {
        title: "Precision Machining",
        desc: "CNC milling, turning, and grinding of precision parts such as plungers, couplings, guide plates, shims, and slave boards.",
        images: ["/images/services/tooling-metal-fabrication/coupling", "/images/services/tooling-metal-fabrication/plunger", "/images/services/tooling-metal-fabrication/outer-guide-plate", "/images/services/tooling-metal-fabrication/rasco-shim"],
      },
      {
        title: "Sheet Metal & Stainless Fabrication",
        desc: "Fabricated carts, cabinets, racks, tables, enclosures, ducting, louvers, and machine covers for industrial and cleanroom use.",
        images: ["/images/services/tooling-metal-fabrication/n2-cabinet", "/images/services/tooling-metal-fabrication/pass-thru-box", "/images/services/tooling-metal-fabrication/corner-preparation-sink-table", "/images/services/tooling-metal-fabrication/push-cart"],
      },
      {
        title: "Probe Card Modification",
        desc: "Custom modification of probe cards to meet specific testing, alignment, and equipment requirements.",
        images: ["/images/services/tooling-metal-fabrication/probe-card-modification"],
      },
    ],
    equipment: [
      {
        title: "Bending Machine",
        desc: "A machine used for accurately bending metal sheets, plates, and other materials to the required shape and angle for tooling and fabrication applications.",
        images: ["/images/services/tooling-metal-fabrication/bending-machine"],
      },
      {
        title: "Lathe Machine",
        desc: "A machine tool used to rotate a workpiece while cutting, shaping, or finishing it to achieve the required dimensions and form.",
        images: ["/images/services/tooling-metal-fabrication/lathe-machine"],
      },
      {
        title: "Surface Grinder",
        desc: "A precision machine used to grind and finish metal surfaces to achieve accurate dimensions and smooth, even finishes.",
        images: ["/images/services/tooling-metal-fabrication/surface-grinder"],
      },
      {
        title: "Vertical Milling Machine",
        desc: "A precision machine used to cut, drill, and shape metal components to achieve accurate dimensions and specifications.",
        images: ["/images/services/tooling-metal-fabrication/vertical-milling-machine"],
      },
      {
        title: "HAAS TM-1P",
        desc: "A precision CNC milling machine designed for machining and fabricating metal components. Suitable for drilling, cutting, and milling operations requiring accurate and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/haas-tm-1p"],
      },
      {
        title: "HAAS TM-2P",
        desc: "A precision CNC milling machine designed for machining and fabricating metal components. It is suitable for milling, drilling, and other precision machining operations.",
        images: ["/images/services/tooling-metal-fabrication/haas-tm-2p"],
      },
      {
        title: "Hision TC25",
        desc: "A precision CNC turning machine designed for accurate machining of metal components. It is suitable for turning, cutting, and other machining operations requiring consistent dimensions and finish.",
        images: ["/images/services/tooling-metal-fabrication/hision-tc25"],
      },
      {
        title: "Mazak VC-EZ 410 IP",
        desc: "A CNC vertical machining center designed for precise and efficient machining of metal components. It is suitable for milling, drilling, tapping, and other precision machining operations.",
        images: ["/images/services/tooling-metal-fabrication/mazak-vc-ez-410-ip"],
      },
      {
        title: "Tsugami VA-3",
        desc: "A precision CNC machining machine designed for accurate and efficient machining of metal components. Suitable for milling, drilling, and other precision machining operations.",
        images: ["/images/services/tooling-metal-fabrication/tsugami-va-3"],
      },
    ],
  },
  // Service list is DRAFT copy written from the products/projects in this category.
  {
    icon: Warehouse,
    title: "Warehouses",
    slug: "warehouses",
    intro: "Warehouse and loading-bay facilities designed and built from the ground up.",
    contactService: "Pre-Engineered Building Structures",
    related: [{ section: "projects", group: "Warehouses" }],
    items: [
      {
        title: "Warehouse Design & Build",
        desc: "Warehouse facilities built from the ground up — structural steel erection, roof framing, floor decking, cladding, and interior fit-out for warehouse and office use.",
        images: ["/images/services/warehouses/pbts-warehouse-1", "/images/services/warehouses/pbts-warehouse-3"],
      },
      {
        title: "Loading Bay Construction",
        desc: "Covered loading docks with dock leveler bays, steel-frame canopies, and space for pallet storage and forklift operations.",
        images: ["/images/services/warehouses/warehouse-loading-bay"],
      },
    ],
  },
  // Service list is DRAFT copy written from the products/projects in this category.
  {
    icon: Building2,
    title: "Civil/Structural",
    slug: "civil-structural",
    intro: "Structural design and civil works that form the backbone of industrial facilities.",
    contactService: "Civil, Structural & Architectural",
    related: [{ section: "projects", group: "Civil/Structural" }],
    items: [
      {
        title: "Building Construction",
        desc: "Civil and structural construction of administration, security, maintenance, and residential buildings — from groundwork and foundations to finishing and fit-out.",
        images: ["/images/services/civil-structural/administration-building-2", "/images/services/civil-structural/security-and-maintenance-building-2", "/images/services/civil-structural/enclave-model-house-3"],
      },
      {
        title: "Steel Structures & Pre-Engineered Buildings",
        desc: "Steel-frame buildings and structures with metal roofing and cladding, such as storage buildings and covered walkways.",
        images: ["/images/services/civil-structural/document-storage-1", "/images/services/civil-structural/covered-walkway-with-solar-lights-1"],
      },
      {
        title: "Renovation & Interior Fit-out",
        desc: "Renovation and fit-out of existing spaces, including restrooms, offices, and common areas.",
        images: ["/images/services/civil-structural/renovation-of-comfort-room-1"],
      },
      {
        title: "Racking System Installation",
        desc: "Heavy-duty, multi-level racking with mesh walkways that makes the most of vertical warehouse space.",
        images: ["/images/services/civil-structural/installation-of-racking-system"],
      },
    ],
  },
  // Service list is DRAFT copy written from the products/projects in this category.
  {
    icon: Zap,
    title: "Electrical",
    slug: "electrical",
    intro: "Power distribution, cabling, genset installation, and electrical works for industrial facilities.",
    contactService: "Mechanical, Electrical, & Plumbing",
    related: [{ section: "projects", group: "Electrical" }],
    items: [
      {
        title: "Power Distribution & Wiring",
        desc: "Installation of electrical distribution panels and complete wire cabling for safe, reliable power throughout the facility.",
        images: ["/images/services/electrical/installation-of-electrical-distribution-panel-and-wire-cabli-1", "/images/services/electrical/installation-of-electrical-distribution-panel-and-wire-cabli-2"],
      },
      {
        title: "Genset Installation",
        desc: "Electrical installation of generator sets, from system integration to final testing.",
        images: ["/images/services/electrical/electrical-installation-of-75kva-genset-1", "/images/services/electrical/electrical-installation-of-75kva-genset-2"],
      },
      {
        title: "Equipment Power Hook-up & Testing",
        desc: "Tapping and verification at facility electrical rooms, safe removal of old panels, new power supply installation, and testing and calibration for relocated equipment.",
        images: ["/images/services/electrical/ground-floor-sat-transfer-electrical-works-1", "/images/services/electrical/ground-floor-sat-transfer-electrical-works-3"],
      },
    ],
  },
  // PLACEHOLDER — not in the services doc yet. Stock images; replace before launch.
  {
    icon: Compass,
    title: "Architecture",
    slug: "architecture",
    intro: "Facility design and planning that balances function, code, and future growth.",
    contactService: "Civil, Structural & Architectural",
    items: [
      {
        title: "Facility Design",
        desc: "Architectural design for industrial and commercial facilities.",
        images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=640&h=480&fit=crop&auto=format&q=70"],
      },
      {
        title: "Space Planning",
        desc: "Space planning that fits process flow, storage, and future expansion.",
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=480&fit=crop&auto=format&q=70"],
      },
      {
        title: "Permitting & Drafting",
        desc: "Drafting and permit documentation to keep projects on schedule.",
        images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&h=480&fit=crop&auto=format&q=70"],
      },
      {
        title: "3D Modeling & Visualization",
        desc: "3D models and renders that make design intent easy to review.",
        images: ["https://images.unsplash.com/photo-1531482615713-2afd69097998?w=640&h=480&fit=crop&auto=format&q=70"],
      },
      {
        title: "Interior Layout Design",
        desc: "Interior space and layout design for offices and facilities.",
        images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=640&h=480&fit=crop&auto=format&q=70"],
      },
    ],
  },
  // Service list is DRAFT copy written from the products/projects in this category.
  {
    icon: Cog,
    title: "Mechanical",
    slug: "mechanical",
    intro: "HVAC, piping insulation, fire sprinkler, and equipment relocation works for industrial plants.",
    contactService: "Mechanical, Electrical, & Plumbing",
    related: [{ section: "projects", group: "Mechanical" }],
    items: [
      {
        title: "HVAC & Ventilation Ducting",
        desc: "Fabrication and installation of insulated HVAC ductwork and ventilation systems, including air showers for production areas.",
        images: ["/images/services/mechanical/astra-hvac-works-1", "/images/services/mechanical/welding-line-air-shower-1"],
      },
      {
        title: "Fire Sprinkler Systems",
        desc: "Fabrication and installation of fire sprinkler mains, branch lines, and sprinkler heads in line with fire protection requirements.",
        images: ["/images/services/mechanical/mantra-sprinkler-system-works-1", "/images/services/mechanical/master-tower-sprinkler-system-works-3"],
        contactService: "Fire Protection System",
      },
      {
        title: "Insulation & Cladding",
        desc: "Replacement and installation of pipe and equipment insulation and metal cladding, including chilled-water piping and industrial ovens.",
        images: ["/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-1", "/images/services/mechanical/ed-oven-rehabilitation-5"],
      },
      {
        title: "Equipment Transfer & Hook-up",
        desc: "Un-hooking, relocation, and reconnection of industrial machinery, including ducting and Clean Dry Air (CDA) connections.",
        images: ["/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-1", "/images/services/mechanical/ground-floor-sat-transfer-1"],
      },
    ],
  },
  // PLACEHOLDER — not in the services doc yet. Stock images; replace before launch.
  {
    icon: Trees,
    title: "Landscaping",
    slug: "landscaping",
    intro: "Site development and grounds work that finish a facility inside and out.",
    contactService: "",
    items: [
      {
        title: "Site Development",
        desc: "Grading, drainage, and site preparation for new facilities.",
        images: ["https://images.unsplash.com/photo-1780389098001-e641e50aeebd?w=640&h=480&fit=crop&auto=format&q=70"],
      },
      {
        title: "Grounds Design",
        desc: "Grounds and hardscape design for corporate and industrial sites.",
        images: ["https://images.unsplash.com/photo-1743178207584-4a0c1109975e?w=640&h=480&fit=crop&auto=format&q=70"],
      },
      {
        title: "Landscape Maintenance",
        desc: "Ongoing upkeep to keep facility grounds presentable year-round.",
        images: ["https://images.unsplash.com/photo-1779636489740-6077a4198be6?w=640&h=480&fit=crop&auto=format&q=70"],
      },
      {
        title: "Irrigation Systems",
        desc: "Irrigation design and installation sized to the site and planting.",
        images: ["https://images.unsplash.com/photo-1453539263483-01e088416133?w=640&h=480&fit=crop&auto=format&q=70"],
      },
      {
        title: "Hardscape Installation",
        desc: "Paving, walkways, and hardscape installation for facility grounds.",
        images: ["https://images.unsplash.com/photo-1657045898661-1a56bc5a8fd2?w=640&h=480&fit=crop&auto=format&q=70"],
      },
    ],
  },
]
