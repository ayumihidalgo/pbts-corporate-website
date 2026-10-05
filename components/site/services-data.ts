/**
 * Services content — edit this file to change what the Services section shows.
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
  // Business System & Support — from BSS_Services.zip (Oct 2026). Descriptions are
  // DRAFT copy written from the screenshots + summary.txt; review before launch.
  {
    icon: LayoutDashboard,
    title: "Business System & Support",
    slug: "business-system-support",
    intro: "Custom software, monitoring systems, and IT installations that keep plant operations running and connected.",
    contactService: "Business Support and System",
    items: [
      {
        title: "Software Development",
        group: "Software",
        desc: "Custom web-based and Windows applications built around how your operation works — from information and database systems to enterprise software such as ERP and CRM.",
        lists: [
          {
            title: "What we build",
            items: [
              "Information software",
              "Database software",
              "Enterprise software (ERP, CRM)",
              "Software support",
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
        // examples of PBTS-built software (also shown in their own cards below)
        images: ["/images/services/business-system-support/auto-data-transfer-system-2", "/images/services/business-system-support/erp-system-2", "/images/services/business-system-support/software-support-2"],
      },
      {
        title: "ERP System",
        group: "Software",
        desc: "A web-based enterprise system covering sales, project monitoring, purchasing, warehouse, accounting, treasury, and asset accounting in one place.",
        more: [
          "Dashboards summarize purchases by business unit and order status, projects are tracked from draft through completion, and purchase requests flow into purchase orders. Built-in purchase, sales, manufacturing, and stock reports keep management informed.",
        ],
        images: ["/images/services/business-system-support/erp-system-1", "/images/services/business-system-support/erp-system-2", "/images/services/business-system-support/erp-system-3"],
      },
      {
        title: "Andon & Production Monitoring Board",
        group: "Monitoring Systems",
        desc: "Production-floor display boards that show each line’s live status at a glance: plan versus actual output, balance, cycle time, run time, stop time, process delay, operation rate, and OEE.",
        more: [
          "Station alarms are highlighted on the board so operators and supervisors can respond to stoppages quickly.",
        ],
        images: ["/images/services/business-system-support/andon-production-monitoring-1", "/images/services/business-system-support/andon-production-monitoring-2"],
      },
      {
        title: "Cleanroom Monitoring System",
        group: "Monitoring Systems",
        desc: "A web dashboard that monitors cleanroom zones in real time — particle count (small, medium, large), temperature, humidity, and dew point for every zone.",
        more: [
          "Zones turn red when a reading goes outside its limits, with an optional alarm buzzer. Live and historical graphs show each reading against its upper and lower limits, and limits can be configured per zone and sensor.",
        ],
        images: ["/images/services/business-system-support/cleanroom-monitoring-system-1", "/images/services/business-system-support/cleanroom-monitoring-system-2", "/images/services/business-system-support/cleanroom-monitoring-system-3", "/images/services/business-system-support/cleanroom-monitoring-system-4"],
      },
      {
        title: "Noise Level Monitoring System",
        group: "Monitoring Systems",
        desc: "Real-time noise monitoring: a noise level analyzer feeds a wireless analog input, which sends the readings to a compact PC running the monitoring dashboard.",
        more: [
          "The dashboard shows the current decibel level, a gauge, a live noise-level graph, and a time-stamped log, with export to Excel.",
        ],
        images: ["/images/services/business-system-support/noise-level-monitoring-system"],
      },
      {
        title: "Auto Data Transfer System",
        group: "Test & Data Systems",
        desc: "A Windows application that collects current and torque readings directly from test instruments over USB and records them into the customer’s Excel files — no manual encoding.",
        more: [
          "Supports Keysight 34450A and ADCMT 7351E meters and Unipulse TM301 torque monitors, recording with-load and without-load results and exporting them to the selected Excel template.",
        ],
        images: ["/images/services/business-system-support/auto-data-transfer-system-1", "/images/services/business-system-support/auto-data-transfer-system-2", "/images/services/business-system-support/auto-data-transfer-system-3", "/images/services/business-system-support/auto-data-transfer-system-4", "/images/services/business-system-support/auto-data-transfer-system-5"],
      },
      {
        title: "Ionizer Tester",
        group: "Test & Data Systems",
        desc: "An automated test station for ionizers: an air ion counter measures each serial-numbered unit’s ion output against low and high limits.",
        more: [
          "The tester software tracks pass, reject, total, and yield, and includes test, debug, configuration, and report modes with password-protected access.",
        ],
        images: ["/images/services/business-system-support/ionizer-tester-1", "/images/services/business-system-support/ionizer-tester-2"],
      },
      {
        title: "Software Support",
        group: "Software",
        desc: "Ongoing support, maintenance, and enhancement of client systems after deployment.",
        more: [
          "Shown: a web-based e-maintenance system for preventive and breakdown maintenance — maintenance requests, approvals, and monitoring dashboards.",
        ],
        images: ["/images/services/business-system-support/software-support-1", "/images/services/business-system-support/software-support-2"],
      },
      {
        title: "CCTV & Biometric Installation",
        group: "Installation",
        desc: "Supply and installation of CCTV and biometric systems, including face-recognition terminals for attendance and access control.",
        images: ["/images/services/business-system-support/cctv-biometric-installation"],
      },
    ],
  },
  {
    icon: Cpu,
    title: "Automation & Engineering Services",
    slug: "automation-engineering",
    intro: "Custom machines, assembly presses, inspection systems, and material-handling automation built for production lines.",
    contactService: "Automation & Engineering Services",
    items: [
      {
        title: "Automated Guided Vehicle",
        desc: "Automated Guided Vehicles transport materials between designated areas with minimal manual handling. AGVs follow programmed routes and use sensors for navigation and safe movement within the facility.",
        images: ["/images/services/automation-engineering/automated-guided-vehicle"],
      },
      {
        title: "LED Navigation System",
        desc: "This LED Navigation Version3 is the same precision tool used in our previous design Version2. It aids in the Terminal Insertion Process per cavity circuit that can accommodate and program one (1) main LED Navigation plus three (3) sub-fixtures for wire harness assembly. Maximum wire input: 40.",
        images: ["/images/services/automation-engineering/led-navigation-system"],
      },
      {
        title: "LF Sorter c/w Magazine Loader & Unloader",
        desc: "An automated system that sorts and transfers components using magazines, with automatic loading and unloading to support efficient and consistent material handling.",
        images: ["/images/services/automation-engineering/lf-sorter-c-w-magazine-loader-unloader"],
      },
      {
        title: "LF Rinsing Bath System",
        desc: "An automated system designed to rinse and clean components through a controlled bathing process for consistent and efficient processing.",
        images: ["/images/services/automation-engineering/lf-rinsing-bath-system"],
      },
      {
        title: "Magazine Loader & Unloader",
        desc: "An automated system designed to load and unload magazines efficiently, supporting smooth and consistent material transfer between processes.",
        images: ["/images/services/automation-engineering/magazine-loader-unloader"],
      },
      {
        title: "Vapor Inspection Machine",
        desc: "An inspection system designed to check components through a controlled vapor-based process, helping identify defects and ensure consistent product quality.",
        images: ["/images/services/automation-engineering/vapor-inspection-machine"],
      },
      {
        title: "Molding Machine",
        desc: "A machine designed to form and mold components according to specified shapes and dimensions, supporting consistent and efficient production.",
        images: ["/images/services/automation-engineering/molding-machine"],
      },
      {
        title: "Magazine Washer System",
        desc: "An automated system designed to clean and wash magazines, helping maintain cleanliness and support smooth material handling in production.",
        images: ["/images/services/automation-engineering/magazine-washer-system"],
      },
      {
        title: "Loader and Unloader",
        desc: "Our lead frame loaders and unloaders automate the handling and transfer of lead frames in semiconductor manufacturing. They provide accurate positioning and smooth material movement while reducing manual handling and supporting consistent production.",
        images: ["/images/services/automation-engineering/loader-and-unloader"],
      },
      {
        title: "X970A WA 12.3 Lever Press",
        desc: "A mechanical press designed to provide controlled force for activating, adjusting, or securing components. Its durable design supports reliable and consistent operation in industrial applications.",
        images: ["/images/services/automation-engineering/x970a-wa-12-3-lever-press"],
      },
      {
        title: "X898B AOI Concentricity Enclosure",
        desc: "An automated vision inspection system designed to check the concentricity and alignment of the POP valve and UI enclosure. The machine identifies the unit by scanning its serial number, positions the unit for inspection, captures images of the POP valve and UI enclosure, and uses image-processing measurements to determine their concentricity against the specified acceptance criteria.",
        more: [
          "The inspection results, including POP valve concentricity, UI enclosure concentricity, inspection status, error details, date/time, and serial number, are recorded in the machine log for traceability.",
        ],
        images: ["/images/services/automation-engineering/x898b-aoi-concentricity-enclosure"],
      },
      {
        title: "X590F LRB 3.0 Insert Chassis into Large Bristle Cage",
        desc: "Semi-Automated motorized machine designed to combine the process of inserting Cage to Chassis while Screwing the Cool Tip Base.",
        more: [
          "The machine decreased the assembly process time from 40s to 25s equivalent to additional output of 45 units per hour.",
        ],
        images: ["/images/services/automation-engineering/x590f-lrb-3-0-insert-chassis-into-large-bristle-cage"],
      },
      {
        title: "Automatic Coolant Dispenser",
        desc: "An automated system designed to dispense coolant at a controlled rate, helping maintain consistent coolant application during production processes.",
        images: ["/images/services/automation-engineering/automatic-coolant-dispenser"],
      },
      {
        title: "Auto Iron Machine",
        desc: "An automated equipment designed to streamline ironing operations with consistent pressure, temperature, and movement. It helps reduce manual effort and maintain uniform results, making it suitable for production environments that require efficient and repeatable ironing processes.",
        images: ["/images/services/automation-engineering/auto-iron-machine"],
      },
      {
        title: "Wire Looping Machine",
        desc: "An automated machine designed to form and loop wires into specified shapes and dimensions. It helps improve consistency and efficiency in wire processing while reducing manual handling during production.",
        images: ["/images/services/automation-engineering/wire-looping-machine"],
      },
      {
        title: "Degreasing / Rinsing Machine",
        desc: "Designed to remove oil, grease, and other contaminants from components through controlled cleaning and rinsing processes. It helps prepare parts for the next production stage while maintaining consistent and efficient cleaning results.",
        images: ["/images/services/automation-engineering/degreasing-rinsing-machine"],
      },
      {
        title: "Parts Counter Machine",
        desc: "Designed to automatically count and dispense components based on a set quantity. It helps improve counting accuracy, reduce manual handling, and support faster and more consistent parts preparation in production operations.",
        images: ["/images/services/automation-engineering/parts-counter-machine"],
      },
      {
        title: "X590F LRB Insert Bristle into Cage",
        desc: "Semi-Automated motorized machine designed to precisely insert 7 Bristles into Cage.",
        more: [
          "This machine has significantly decreased the assembly process time from 18 minutes to 15 minutes equivalent to additional output of 37 units per hour.",
        ],
        images: ["/images/services/automation-engineering/x590f-lrb-insert-bristle-into-cage"],
      },
      {
        title: "X970 WA12.0 Pneumatic Press Machine",
        desc: "The machine is designed for the press-fit assembly of an Aluminum Outer onto a Wand Cuff with a Thin Inner Tube positioned inside the assembly.",
        more: [
          "It incorporates a vertically pressing mechanism to accurately assemble the upper components, followed by a slide table cylinder mechanism that applies the required force to securely lock the Aluminum Outer Tube and Wand Cuff together.",
          "The machine is equipped with dedicated locating fixtures and guides to ensure proper component alignment, consistent assembly quality, and repeatable operation.",
        ],
        images: ["/images/services/automation-engineering/x970-wa12-0-pneumatic-press-machine"],
      },
      {
        title: "X590 AL3.2 Assemble 3x Spring Plunger into Cool Wall Rim",
        desc: "Designed to install three spring plungers into the designated holes of the Cool Wall Rim. The machine ensures correct component orientation, insertion depth, and secure seating of all three spring plungers through a controlled and repeatable assembly process.",
        images: ["/images/services/automation-engineering/x590-al3-2-assemble-3x-spring-plunger-into-cool-wall-rim"],
      },
      {
        title: "X931A Press Neck Pivot to Neck Head",
        desc: "Designed to accurately and securely assemble the Neck Pivot into the Neck Head by controlled press-fitting — ensuring proper alignment, full seating, and reliable mechanical fit without damaging either component.",
        images: ["/images/services/automation-engineering/x931a-press-neck-pivot-to-neck-head"],
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
  {
    icon: Factory,
    title: "Tooling and Metal Sheet Fabrication",
    slug: "tooling-metal-fabrication",
    intro: "Custom jigs, fixtures, and tooling, plus fabricated carts, cabinets, racks, ducting, and machine covers.",
    contactService: "Tooling Fabrication",
    items: [
      {
        title: "AU Wire Collector",
        group: "Tooling",
        desc: "A custom-fabricated tooling component designed to collect and organize wires during production processes. It helps maintain proper wire positioning and supports efficient, orderly operation.",
        images: ["/images/services/tooling-metal-fabrication/au-wire-collector"],
      },
      {
        title: "Bending Machine",
        group: "Tooling",
        desc: "A machine used for accurately bending metal sheets, plates, and other materials to the required shape and angle for tooling and fabrication applications.",
        images: ["/images/services/tooling-metal-fabrication/bending-machine"],
      },
      {
        title: "Bosch Jig Maker",
        group: "Tooling",
        desc: "A custom-fabricated tooling fixture used to accurately position, hold, and support components during production. Designed to improve precision, consistency, and efficiency in assembly operations.",
        images: ["/images/services/tooling-metal-fabrication/bosch-jig-maker"],
      },
      {
        title: "Bosch Jig",
        group: "Tooling",
        desc: "A custom-fabricated tooling fixture designed to securely hold and position components during assembly or production processes. It helps ensure accurate positioning, consistent results, and efficient operation.",
        images: ["/images/services/tooling-metal-fabrication/bosch-jig"],
      },
      {
        title: "Buffing Jig",
        group: "Tooling",
        desc: "A custom-fabricated tooling fixture designed to securely hold and position workpieces during buffing operations. It helps maintain consistent positioning, improve work efficiency, and support uniform finishing results.",
        images: ["/images/services/tooling-metal-fabrication/buffing-jig"],
      },
      {
        title: "Cadex Offline Battery Charger",
        group: "Tooling",
        desc: "A battery charging system designed to safely charge and maintain rechargeable batteries, providing reliable power for testing, maintenance, and equipment operations.",
        images: ["/images/services/tooling-metal-fabrication/cadex-offline-battery-charger"],
      },
      {
        title: "Cavitation Tray",
        group: "Tooling",
        desc: "A custom-fabricated tray designed to securely hold and organize components during cavitation or cleaning processes. It helps ensure proper positioning, handling, and consistent processing of parts.",
        images: ["/images/services/tooling-metal-fabrication/cavitation-tray"],
      },
      {
        title: "Cleaning Stage",
        group: "Tooling",
        desc: "A custom-fabricated tray designed to securely hold and position parts during the cleaning stage. It helps ensure proper handling and consistent cleaning of components.",
        images: ["/images/services/tooling-metal-fabrication/cleaning-stage"],
      },
      {
        title: "Coupling",
        group: "Tooling",
        desc: "A mechanical component used to connect two shafts and transmit rotational power between them while helping accommodate minor misalignment.",
        images: ["/images/services/tooling-metal-fabrication/coupling"],
      },
      {
        title: "Cover Jig",
        group: "Tooling",
        desc: "A custom fixture used to securely hold and position covers during assembly, inspection, or fabrication, ensuring proper alignment and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/cover-jig"],
      },
      {
        title: "Feeler Gauge",
        group: "Tooling",
        desc: "A precision measuring tool used to check and measure small gaps or clearances between components. It helps ensure accurate fitting and proper assembly.",
        images: ["/images/services/tooling-metal-fabrication/feeler-gauge"],
      },
      {
        title: "Generic Roller Press Jig",
        group: "Tooling",
        desc: "A custom jig designed to securely hold and guide components during roller pressing operations, ensuring proper positioning and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/generic-roller-press-jig"],
      },
      {
        title: "Jigs",
        group: "Tooling",
        desc: "A custom jig designed to securely hold and guide components during roller pressing operations, ensuring proper positioning and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/jigs"],
      },
      {
        title: "Lathe Machine",
        group: "Tooling",
        desc: "A machine tool used to rotate a workpiece while cutting, shaping, or finishing it to achieve the required dimensions and form.",
        images: ["/images/services/tooling-metal-fabrication/lathe-machine"],
      },
      {
        title: "Location Jig",
        group: "Tooling",
        desc: "A custom fixture used to accurately position and hold components in place during assembly, machining, or fabrication processes, ensuring proper alignment and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/location-jig"],
      },
      {
        title: "Magazine Stand",
        group: "Tooling",
        desc: "A support structure designed to securely hold and organize magazines or workpieces, providing easy access and proper positioning during production or handling processes.",
        images: ["/images/services/tooling-metal-fabrication/magazine-stand"],
      },
      {
        title: "Main Lens Removing Jig",
        group: "Tooling",
        desc: "A custom jig designed to securely hold and position the component while removing the main lens, helping ensure safe, controlled, and consistent removal.",
        images: ["/images/services/tooling-metal-fabrication/main-lens-removing-jig"],
      },
      {
        title: "MB 180 Flex Alignment & Press",
        group: "Tooling",
        desc: "A specialized fixture designed to accurately align and press flexible components, ensuring proper positioning and consistent assembly during production.",
        images: ["/images/services/tooling-metal-fabrication/mb-180-flex-alignment-press"],
      },
      {
        title: "Microscope Stand",
        group: "Tooling",
        desc: "A custom-fabricated stand designed to securely hold and support microscopes during inspection and assembly operations.",
        images: ["/images/services/tooling-metal-fabrication/microscope-stand"],
      },
      {
        title: "MX Machine Cover",
        group: "Tooling",
        desc: "A custom-fabricated cover designed to protect the machine and its components from dust, debris, and other external elements.",
        images: ["/images/services/tooling-metal-fabrication/mx-machine-cover"],
      },
      {
        title: "Outer Guide Plate",
        group: "Tooling",
        desc: "A custom-fabricated plate designed to guide and properly position components during machine operation.",
        images: ["/images/services/tooling-metal-fabrication/outer-guide-plate"],
      },
      {
        title: "Plunger",
        group: "Tooling",
        desc: "A precision-fabricated component designed to provide controlled pushing, positioning, or movement within a machine or tooling assembly.",
        images: ["/images/services/tooling-metal-fabrication/plunger"],
      },
      {
        title: "Probe Card Modification",
        group: "Tooling",
        desc: "Custom modification of probe cards to meet specific testing, alignment, and equipment requirements.",
        images: ["/images/services/tooling-metal-fabrication/probe-card-modification"],
      },
      {
        title: "Quick Loader",
        group: "Tooling",
        desc: "A custom-fabricated tooling component designed to support faster and more efficient loading and unloading of parts or materials.",
        images: ["/images/services/tooling-metal-fabrication/quick-loader"],
      },
      {
        title: "Rasco Shim",
        group: "Tooling",
        desc: "A precision-fabricated shim used for proper alignment, spacing, and positioning of machine or tooling components.",
        images: ["/images/services/tooling-metal-fabrication/rasco-shim"],
      },
      {
        title: "Reflow Pallet",
        group: "Tooling",
        desc: "A custom-fabricated fixture designed to securely hold and position components during the reflow soldering process.",
        images: ["/images/services/tooling-metal-fabrication/reflow-pallet"],
      },
      {
        title: "Roller Tube Tray",
        group: "Tooling",
        desc: "A custom-fabricated tray designed to securely hold and organize roller tubes during handling and processing.",
        images: ["/images/services/tooling-metal-fabrication/roller-tube-tray"],
      },
      {
        title: "Stone Holder Arm 6301",
        group: "Tooling",
        desc: "A custom-fabricated arm designed to securely hold and position a stone or abrasive component during machine operation.",
        images: ["/images/services/tooling-metal-fabrication/stone-holder-arm-6301"],
      },
      {
        title: "Surface Grinder",
        group: "Tooling",
        desc: "A precision machine used to grind and finish metal surfaces to achieve accurate dimensions and smooth, even finishes.",
        images: ["/images/services/tooling-metal-fabrication/surface-grinder"],
      },
      {
        title: "Thunder Bolt Tester Jig",
        group: "Tooling",
        desc: "A custom-fabricated jig designed to securely hold and position components during testing and inspection.",
        images: ["/images/services/tooling-metal-fabrication/thunder-bolt-tester-jig"],
      },
      {
        title: "TOWA Strip Flattener",
        group: "Tooling",
        desc: "A custom-fabricated tooling fixture designed to flatten and properly align strips for consistent processing.",
        images: ["/images/services/tooling-metal-fabrication/towa-strip-flattener"],
      },
      {
        title: "TPH LCD Combo Jig",
        group: "Tooling",
        desc: "A custom-fabricated jig designed to securely hold and accurately position LCD components during assembly and testing.",
        images: ["/images/services/tooling-metal-fabrication/tph-lcd-combo-jig"],
      },
      {
        title: "Tube Loader and Unloader",
        group: "Tooling",
        desc: "A custom-fabricated tooling system designed for efficient loading and unloading of tubes during production and handling processes.",
        images: ["/images/services/tooling-metal-fabrication/tube-loader-and-unloader"],
      },
      {
        title: "Vertical Milling Machine",
        group: "Tooling",
        desc: "A precision machine used to cut, drill, and shape metal components to achieve accurate dimensions and specifications.",
        images: ["/images/services/tooling-metal-fabrication/vertical-milling-machine"],
      },
      {
        title: "X308 Slaveboard",
        group: "Tooling",
        desc: "A custom-fabricated board used to support communication, control, or interface functions within a machine or equipment system.",
        images: ["/images/services/tooling-metal-fabrication/x308-slaveboard"],
      },
      {
        title: "X556 Slaveboard",
        group: "Tooling",
        desc: "A custom-fabricated board designed to support control, communication, and interface functions within a machine or equipment system.",
        images: ["/images/services/tooling-metal-fabrication/x556-slaveboard"],
      },
      {
        title: "Agitator Machine",
        group: "Metal Fabrication",
        desc: "A fabricated mechanical unit designed to mix, blend, or circulate materials efficiently. Built with durable metal components for reliable operation in industrial processing applications.",
        images: ["/images/services/tooling-metal-fabrication/agitator-machine"],
      },
      {
        title: "Checking Jig",
        group: "Metal Fabrication",
        desc: "A precision-fabricated tool used to check the dimensions, position, alignment, and condition of parts to ensure they meet required specifications.",
        images: ["/images/services/tooling-metal-fabrication/checking-jig"],
      },
      {
        title: "Corner Preparation & Sink Table",
        group: "Metal Fabrication",
        desc: "A fabricated worktable designed for efficient corner preparation and sink-related assembly or finishing tasks. Built for durability, stability, and convenient workspace use.",
        images: ["/images/services/tooling-metal-fabrication/corner-preparation-sink-table"],
      },
      {
        title: "Ducting",
        group: "Metal Fabrication",
        desc: "Fabricated metal components designed to provide a controlled pathway for the distribution, ventilation, or exhaust of air and other gases within industrial and facility systems.",
        images: ["/images/services/tooling-metal-fabrication/ducting"],
      },
      {
        title: "ESD Integrator Box",
        group: "Metal Fabrication",
        desc: "A fabricated enclosure designed to house and organize ESD (Electrostatic Discharge) control components, providing protection, proper arrangement, and easy access for maintenance.",
        images: ["/images/services/tooling-metal-fabrication/esd-integrator-box"],
      },
      {
        title: "Food Cart",
        group: "Metal Fabrication",
        desc: "A fabricated mobile unit designed for food preparation, storage, and serving. Built with durable materials for practical and efficient use in commercial or industrial settings.",
        images: ["/images/services/tooling-metal-fabrication/food-cart"],
      },
      {
        title: "Gripper Lifter Arm",
        group: "Metal Fabrication",
        desc: "A fabricated mechanical arm designed to securely grip, lift, and position components or materials. Built for controlled handling and efficient movement in industrial applications.",
        images: ["/images/services/tooling-metal-fabrication/gripper-lifter-arm"],
      },
      {
        title: "HAAS TM-1P",
        group: "Metal Fabrication",
        desc: "A precision CNC milling machine designed for machining and fabricating metal components. Suitable for drilling, cutting, and milling operations requiring accurate and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/haas-tm-1p"],
      },
      {
        title: "HAAS TM-2P",
        group: "Metal Fabrication",
        desc: "A precision CNC milling machine designed for machining and fabricating metal components. It is suitable for milling, drilling, and other precision machining operations.",
        images: ["/images/services/tooling-metal-fabrication/haas-tm-2p"],
      },
      {
        title: "Heater Coil",
        group: "Metal Fabrication",
        desc: "A fabricated heating element designed to generate and transfer heat efficiently for industrial heating applications. Built for reliable and consistent thermal performance.",
        images: ["/images/services/tooling-metal-fabrication/heater-coil"],
      },
      {
        title: "Hision TC25",
        group: "Metal Fabrication",
        desc: "A precision CNC turning machine designed for accurate machining of metal components. It is suitable for turning, cutting, and other machining operations requiring consistent dimensions and finish.",
        images: ["/images/services/tooling-metal-fabrication/hision-tc25"],
      },
      {
        title: "Louver",
        group: "Metal Fabrication",
        desc: "A fabricated metal component designed to allow controlled airflow while helping protect openings from rain, debris, and other external elements. Commonly used for ventilation and industrial applications.",
        images: ["/images/services/tooling-metal-fabrication/louver"],
      },
      {
        title: "Machine Cover",
        group: "Metal Fabrication",
        desc: "A fabricated protective enclosure designed to cover and safeguard machine components from dust, debris, accidental contact, and other external elements.",
        images: ["/images/services/tooling-metal-fabrication/machine-cover"],
      },
      {
        title: "Mazak VC-EZ 410 IP",
        group: "Metal Fabrication",
        desc: "A CNC vertical machining center designed for precise and efficient machining of metal components. It is suitable for milling, drilling, tapping, and other precision machining operations.",
        images: ["/images/services/tooling-metal-fabrication/mazak-vc-ez-410-ip"],
      },
      {
        title: "N2 Cabinet",
        group: "Metal Fabrication",
        desc: "A fabricated enclosure designed for the safe storage and controlled distribution of nitrogen gas and related components. Built for organized, secure, and accessible industrial use.",
        images: ["/images/services/tooling-metal-fabrication/n2-cabinet"],
      },
      {
        title: "N2 Pushcart",
        group: "Metal Fabrication",
        desc: "A fabricated mobile cart designed for the safe and convenient transport of nitrogen gas cylinders. Built for stability, durability, and easy handling in industrial environments.",
        images: ["/images/services/tooling-metal-fabrication/n2-pushcart"],
      },
      {
        title: "Pass Thru Box",
        group: "Metal Fabrication",
        desc: "A fabricated enclosure designed for the controlled transfer of materials between two areas while helping maintain cleanliness and separation between spaces. Commonly used in cleanroom and controlled environments.",
        images: ["/images/services/tooling-metal-fabrication/pass-thru-box"],
      },
      {
        title: "Pigeon Hole",
        group: "Metal Fabrication",
        desc: "A fabricated storage unit with multiple compartments designed for organized storage of documents, tools, materials, or small items. Built for efficient and accessible organization.",
        images: ["/images/services/tooling-metal-fabrication/pigeon-hole"],
      },
      {
        title: "Pulverizer",
        group: "Metal Fabrication",
        desc: "A fabricated machine designed to crush, grind, or reduce materials into smaller particles for easier processing and handling. Built for efficient and consistent material size reduction.",
        images: ["/images/services/tooling-metal-fabrication/pulverizer"],
      },
      {
        title: "Push Cart",
        group: "Metal Fabrication",
        desc: "A fabricated mobile cart designed for the convenient transport and handling of materials, tools, or equipment within industrial and work areas. Built for durability and easy maneuverability.",
        images: ["/images/services/tooling-metal-fabrication/push-cart"],
      },
      {
        title: "Reservoir Tank",
        group: "Metal Fabrication",
        desc: "A fabricated tank designed to store and supply liquids for industrial processes and equipment. Built for durability, reliable storage, and efficient fluid handling.",
        images: ["/images/services/tooling-metal-fabrication/reservoir-tank"],
      },
      {
        title: "Roof Ventilator",
        group: "Metal Fabrication",
        desc: "A fabricated ventilation unit designed to improve airflow and remove heat, moisture, and stale air from indoor spaces. Suitable for industrial and facility applications.",
        images: ["/images/services/tooling-metal-fabrication/roof-ventilator"],
      },
      {
        title: "Step Ladder",
        group: "Metal Fabrication",
        desc: "A fabricated access tool designed to provide safe and stable elevation for reaching elevated areas during maintenance, installation, and other work activities.",
        images: ["/images/services/tooling-metal-fabrication/step-ladder"],
      },
      {
        title: "Table Top Rack",
        group: "Metal Fabrication",
        desc: "A fabricated storage rack designed to organize and hold tools, materials, or small components on a worktable or workstation. Built for convenient access and efficient use of workspace.",
        images: ["/images/services/tooling-metal-fabrication/table-top-rack"],
      },
      {
        title: "Tsugami VA-3",
        group: "Metal Fabrication",
        desc: "A precision CNC machining machine designed for accurate and efficient machining of metal components. Suitable for milling, drilling, and other precision machining operations.",
        images: ["/images/services/tooling-metal-fabrication/tsugami-va-3"],
      },
      {
        title: "Whip Rack",
        group: "Metal Fabrication",
        desc: "A fabricated storage rack designed to organize and securely hold whips, cables, hoses, or similar flexible materials. Built for easy access and efficient workspace organization.",
        images: ["/images/services/tooling-metal-fabrication/whip-rack"],
      },
      {
        title: "XYZ Robot",
        group: "Metal Fabrication",
        desc: "A fabricated automated mechanism designed for precise movement and positioning along the X, Y, and Z axes. Suitable for material handling, assembly, dispensing, and other industrial automation applications.",
        images: ["/images/services/tooling-metal-fabrication/xyz-robot"],
      },
    ],
  },
  {
    icon: Warehouse,
    title: "Warehouses",
    slug: "warehouses",
    intro: "Warehouse and loading-bay facilities designed and built from the ground up.",
    contactService: "Pre-Engineered Building Structures",
    items: [
      {
        title: "PBTS Warehouse",
        location: "Palihan, Hermosa, Bataan",
        desc: "PBTS Warehouse in Bataan is an industrial warehouse facility built to support PBTS's storage, handling, and distribution needs for one of its branch operations. The project was carried out from the ground up, starting with structural steel erection and roof framing, followed by floor decking and exterior cladding installation, through to interior fit-out.",
        more: [
          "The completed facility features a steel-frame structure with metal roofing and wall cladding, multiple truck loading bay entrances, and a wide paved concrete yard for vehicle access and maneuvering. Interior spaces were finished to accommodate both warehouse operations and office use, reflecting PBTS's capability in warehouse design and build from construction through completion.",
        ],
        images: ["/images/services/warehouses/pbts-warehouse-1", "/images/services/warehouses/pbts-warehouse-2", "/images/services/warehouses/pbts-warehouse-3", "/images/services/warehouses/pbts-warehouse-4", "/images/services/warehouses/pbts-warehouse-5"],
      },
      {
        title: "Warehouse Loading Bay",
        location: "Calamba, Laguna",
        desc: "This project involved the construction of a warehouse loading bay facility in Calamba, Laguna, designed to support the client's goods handling and distribution operations. The facility features a covered loading dock with multiple dock leveler bays for truck loading and unloading, a steel-frame canopy structure providing weather protection for staging areas, and ample space for pallet storage and forklift operations.",
        more: [
          "This project reflects our capability in warehouse and loading bay construction, delivering practical, well-organized facilities designed for efficient logistics and material handling.",
        ],
        images: ["/images/services/warehouses/warehouse-loading-bay"],
      },
    ],
  },
  {
    icon: Building2,
    title: "Civil/Structural",
    slug: "civil-structural",
    intro: "Structural design and civil works that form the backbone of industrial facilities.",
    contactService: "Civil, Structural & Architectural",
    items: [
      {
        title: "Administration Building",
        desc: "This project involved the civil and structural construction of an administration building, from groundwork and foundation works to structural framing, exterior finishing, and interior fit-out. The completed facility features a modern low-rise design with a wide cantilevered roof overhang, rooftop solar panels, and interiors finished with offices, a conference room, and common areas suited for day-to-day administrative operations.",
        more: [
          "This project reflects our capability in civil and structural building construction, delivering a functional and well-executed facility from the ground up.",
        ],
        images: ["/images/services/civil-structural/administration-building-1", "/images/services/civil-structural/administration-building-2", "/images/services/civil-structural/administration-building-3", "/images/services/civil-structural/administration-building-4", "/images/services/civil-structural/administration-building-5", "/images/services/civil-structural/administration-building-6", "/images/services/civil-structural/administration-building-7"],
      },
      {
        title: "Security and Maintenance Building",
        desc: "This project involved the construction of a security and maintenance building for the client, from structural work to interior fit-out. The completed facility features a modern exterior with a wide cantilevered roof canopy, providing covered space for vehicles and equipment, along with finished interior spaces including offices, restrooms, and common areas.",
        more: [
          "This project reflects our capability in building construction, delivering a functional facility designed to support security and maintenance operations.",
        ],
        images: ["/images/services/civil-structural/security-and-maintenance-building-1", "/images/services/civil-structural/security-and-maintenance-building-2", "/images/services/civil-structural/security-and-maintenance-building-3", "/images/services/civil-structural/security-and-maintenance-building-4", "/images/services/civil-structural/security-and-maintenance-building-5", "/images/services/civil-structural/security-and-maintenance-building-6"],
      },
      {
        title: "Enclave Model House",
        desc: "This project involved the construction of a residential model house, from structural framing to exterior finishing. Work progressed from column and beam construction, wall framing, and multi-level structural buildup to exterior architectural finishing, showcasing a modern design with clean lines and a mixed material facade.",
        more: [
          "This project reflects our capability in residential building construction, from structural work through to completion, delivering a well-executed and design-forward facility.",
        ],
        images: ["/images/services/civil-structural/enclave-model-house-1", "/images/services/civil-structural/enclave-model-house-2", "/images/services/civil-structural/enclave-model-house-3", "/images/services/civil-structural/enclave-model-house-4"],
      },
      {
        title: "Covered Walkway with Solar Lights",
        desc: "This project involved the construction of a covered walkway equipped with solar-powered lighting, providing weather protection and illumination for pedestrians. The structure features a steel-frame canopy with metal roofing, supported by steel columns along the walkway, and integrated solar light fixtures for energy-efficient nighttime lighting.",
        more: [
          "This project reflects our capability in structural and infrastructure work, delivering practical facilities designed for safety, accessibility, and sustainable energy use.",
        ],
        images: ["/images/services/civil-structural/covered-walkway-with-solar-lights-1", "/images/services/civil-structural/covered-walkway-with-solar-lights-2"],
      },
      {
        title: "Renovation of Comfort Room",
        desc: "This project involved the renovation of a comfort room, upgrading it into a modern, well-lit facility. The renovation included a long communal sink counter with multiple faucets and mirrors, upgraded restroom cubicles with individual stalls, polished flooring, and updated ceiling and lighting fixtures throughout.",
        more: [
          "This project reflects our capability in interior renovation work, delivering a clean, functional, and well-finished restroom facility.",
        ],
        images: ["/images/services/civil-structural/renovation-of-comfort-room-1", "/images/services/civil-structural/renovation-of-comfort-room-2"],
      },
      {
        title: "Document Storage",
        desc: "This project involved the construction of a document storage facility designed to provide a secure and spacious area for records and file storage. The building features a steel-frame structure with metal wall cladding and roofing, a wide-span interior with a high ceiling for storage flexibility, and multiple ventilation openings for air circulation.",
        more: [
          "This project reflects our capability in building construction, delivering a functional and durable facility suited for document and records storage needs.",
        ],
        images: ["/images/services/civil-structural/document-storage-1", "/images/services/civil-structural/document-storage-2"],
      },
      {
        title: "Installation of Racking System",
        desc: "This project involved the installation of a heavy-duty racking system for warehouse storage, featuring multi-level steel shelving with a mesh flooring walkway for elevated access. The system was designed to maximize vertical storage space and organize inventory efficiently, with labeled bays for easy identification and retrieval.",
        more: [
          "This project reflects our capability in racking and storage system installation, delivering organized, space-efficient solutions for warehouse and inventory management.",
        ],
        images: ["/images/services/civil-structural/installation-of-racking-system"],
      },
    ],
  },
  {
    icon: Zap,
    title: "Electrical",
    slug: "electrical",
    intro: "Power distribution, cabling, genset installation, and electrical works for industrial facilities.",
    contactService: "Mechanical, Electrical, & Plumbing",
    items: [
      {
        title: "Ground Floor SAT Transfer – Electrical Works",
        location: "Calamba, Laguna",
        desc: "This project highlights PBTS's expertise in comprehensive electrical works, including tapping and verification at the Facilities EE Room, safe removal of outdated electrical panels, installation of reliable power supply systems, and precise testing and calibration to ensure peak performance. With proven capabilities in electrical installations, PBTS is equipped to deliver tailored solutions that meet the highest standards of safety, efficiency, and reliability.",
        images: ["/images/services/electrical/ground-floor-sat-transfer-electrical-works-1", "/images/services/electrical/ground-floor-sat-transfer-electrical-works-2", "/images/services/electrical/ground-floor-sat-transfer-electrical-works-3"],
      },
      {
        title: "Installation of Electrical Distribution Panel and Wire Cabling",
        desc: "This project involves the installation of an electrical distribution panel along with complete wire cabling works. It ensures the efficient and safe distribution of electrical power throughout the facility, supporting operational reliability and meeting all regulatory and safety standards.",
        images: ["/images/services/electrical/installation-of-electrical-distribution-panel-and-wire-cabli-1", "/images/services/electrical/installation-of-electrical-distribution-panel-and-wire-cabli-2"],
      },
      {
        title: "Electrical Installation of 75kVA Genset",
        location: "Calamba, Laguna",
        desc: "This project highlights the electrical installation of a generator set (genset), showcasing our capability to deliver safe, efficient, and reliable power solutions. From system integration to final testing, PBTS ensures every detail meets the highest standards of performance and compliance.",
        images: ["/images/services/electrical/electrical-installation-of-75kva-genset-1", "/images/services/electrical/electrical-installation-of-75kva-genset-2"],
      },
    ],
  },
  // PLACEHOLDER — the services doc folds Architecture into Civil/Structural. Stock images; replace or remove before launch.
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
  {
    icon: Cog,
    title: "Mechanical",
    slug: "mechanical",
    intro: "HVAC, piping insulation, fire sprinkler, and equipment relocation works for industrial plants.",
    contactService: "Mechanical, Electrical, & Plumbing",
    items: [
      {
        title: "Replacement of CHW Pipe Rubber Insulation & Cladding",
        location: "Canlubang, Laguna",
        desc: "This project involved the replacement of the rubber insulation and metal cladding on chilled water (CHW) piping at a facility in Canlubang, Laguna. The existing insulation and cladding had deteriorated over time, showing signs of corrosion and rust, and were replaced with new rubber insulation and fresh metal cladding to restore proper thermal protection and extend the piping system's service life.",
        more: [
          "This project reflects our capability in industrial piping insulation and maintenance work, delivering restored, well-protected systems for continued reliable operation.",
        ],
        images: ["/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-1", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-2", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-3", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-4", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-5", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-6"],
      },
      {
        title: "ASTRA HVAC Works",
        location: "Cebu City",
        desc: "This project involved the installation of HVAC ductwork for ASTRA's facility in Cebu City, including the fabrication and installation of insulated air ducts integrated within the building's structural framework for efficient air distribution.",
        more: [
          "We specialize in the installation of HVAC systems for industrial and factory applications. Scope includes system setup, equipment mounting, ducting, and integration aligned with project specifications — designed to support controlled environments, energy efficiency, and consistent system operation. Implementation follows standard safety requirements and installation procedures, ensuring durability and compatibility with operational demands.",
        ],
        images: ["/images/services/mechanical/astra-hvac-works-1", "/images/services/mechanical/astra-hvac-works-2"],
      },
      {
        title: "Mantra Sprinkler System Works",
        location: "Cebu City",
        desc: "This project involved the installation of a fire sprinkler piping system for Mantra's facility in Cebu City, covering the fabrication and installation of overhead sprinkler mains and branch lines routed throughout the building's structural framework.",
        more: [
          "We specialize in the installation of fire sprinkler systems for industrial and factory applications. Our scope includes piping, sprinkler head installation, and system integration in accordance with project specifications and fire protection requirements. These systems are designed to support effective fire suppression, reliable coverage, and compliance with safety standards. All works are carried out following established procedures to ensure durability, system integrity, and compatibility with operational environments.",
        ],
        images: ["/images/services/mechanical/mantra-sprinkler-system-works-1", "/images/services/mechanical/mantra-sprinkler-system-works-2", "/images/services/mechanical/mantra-sprinkler-system-works-3", "/images/services/mechanical/mantra-sprinkler-system-works-4"],
        contactService: "Fire Protection System",
      },
      {
        title: "Master Tower Sprinkler System Works",
        location: "Cebu City",
        desc: "This project involved the installation of a fire sprinkler piping system for Master Tower's facility in Cebu City, covering the fabrication and installation of overhead sprinkler mains and branch lines routed throughout the building's structural framework.",
        images: ["/images/services/mechanical/master-tower-sprinkler-system-works-1", "/images/services/mechanical/master-tower-sprinkler-system-works-2", "/images/services/mechanical/master-tower-sprinkler-system-works-3"],
        contactService: "Fire Protection System",
      },
      {
        title: "ED Oven Rehabilitation",
        location: "Sta. Rosa, Laguna",
        desc: "This project focuses on the replacement of existing cladding systems, along with the installation of new, high-performance insulation for the ED (electrodeposition) oven system at a facility in Sta. Rosa, Laguna. Delivered as part of our specialized mechanical services, it reflects our commitment to quality, durability, and precision in every aspect of execution.",
        images: ["/images/services/mechanical/ed-oven-rehabilitation-1", "/images/services/mechanical/ed-oven-rehabilitation-2", "/images/services/mechanical/ed-oven-rehabilitation-3", "/images/services/mechanical/ed-oven-rehabilitation-4", "/images/services/mechanical/ed-oven-rehabilitation-5"],
      },
      {
        title: "Ground Floor SAT Transfer",
        desc: "This project highlights the precise transfer and installation of industrial machinery, including unhooking, relocation, and reconnection, alongside the integration of advanced ducting systems and Clean Dry Air (CDA). Engineered for optimal performance, every component was delivered and installed with precision. This work reflects our continued commitment to mechanical excellence, operational reliability, and innovative execution in complex environments.",
        images: ["/images/services/mechanical/ground-floor-sat-transfer-1", "/images/services/mechanical/ground-floor-sat-transfer-2", "/images/services/mechanical/ground-floor-sat-transfer-3", "/images/services/mechanical/ground-floor-sat-transfer-4"],
      },
      {
        title: "PTC RDD Equipment Un-hook and Hook-up",
        location: "Sto. Tomas, Batangas",
        desc: "This project highlights the precise transfer and installation of industrial machinery, including unhooking, relocation, and reconnection, alongside the integration of advanced ducting systems and Clean Dry Air (CDA). Engineered for optimal performance, every component was delivered and installed with precision. This work reflects our continued commitment to mechanical excellence, operational reliability, and innovative execution in complex environments.",
        images: ["/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-1", "/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-2", "/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-3", "/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-4", "/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-5"],
      },
      {
        title: "Welding Line Air Shower",
        desc: "This project involved the installation of ducting systems for an air shower system along the welding line, designed to maintain a clean and controlled environment within the production area, with insulated ductwork routed through the facility's structural framework to ensure proper air filtration and circulation for the welding process.",
        images: ["/images/services/mechanical/welding-line-air-shower-1", "/images/services/mechanical/welding-line-air-shower-2"],
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
