/**
 * Projects — everything PBTS has delivered: on-site jobs (construction, MEP)
 * and the machines, systems, jigs and fabricated items it has built.
 * Shown in Featured Projects (projects.tsx), filtered by group chips.
 * `featuredOrder` lists the titles shown first; the rest follow in group order.
 * `group` on each item must match its group's `title`.
 * PLACEHOLDER copy: Underground Water Tank, Omron, New Era HRIS.
 */
import { Building2, Cog, Cpu, Factory, MonitorCog, Warehouse, Wrench, Zap, type LucideIcon } from 'lucide-react'
import type { ServiceItem } from './services-data'

export type CatalogGroup = {
  slug: string
  title: string
  icon: LucideIcon
  contactService: string
  items: ServiceItem[]
}

export const featuredOrder = [
  "PBTS Warehouse",
  "Administration Building",
  "X898B AOI Concentricity Enclosure",
  "ED Oven Rehabilitation",
  "Cleanroom Monitoring System",
  "Mantra Sprinkler System Works",
  "X970 WA12.0 Pneumatic Press Machine",
  "Electrical Installation of 75kVA Genset",
  "Ionizer Tester",
  "Replacement of CHW Pipe Rubber Insulation & Cladding",
  "Security and Maintenance Building",
  "Bosch Jig Maker",
]

export const projectGroups: CatalogGroup[] = [
  {
    slug: "warehouses",
    title: "Warehouses",
    icon: Warehouse,
    contactService: "Pre-Engineered Building Structures",
    items: [
      {
        title: "PBTS Warehouse",
        location: "Palihan, Hermosa, Bataan",
        group: "Warehouses",
        desc: "PBTS Warehouse in Bataan is an industrial warehouse facility built to support PBTS's storage, handling, and distribution needs for one of its branch operations. The project was carried out from the ground up, starting with structural steel erection and roof framing, followed by floor decking and exterior cladding installation, through to interior fit-out.",
        more: [
          "The completed facility features a steel-frame structure with metal roofing and wall cladding, multiple truck loading bay entrances, and a wide paved concrete yard for vehicle access and maneuvering. Interior spaces were finished to accommodate both warehouse operations and office use, reflecting PBTS's capability in warehouse design and build from construction through completion.",
        ],
        images: ["/images/services/warehouses/pbts-warehouse-1", "/images/services/warehouses/pbts-warehouse-2", "/images/services/warehouses/pbts-warehouse-3", "/images/services/warehouses/pbts-warehouse-4", "/images/services/warehouses/pbts-warehouse-5"],
      },
      {
        title: "Warehouse Loading Bay",
        location: "Calamba, Laguna",
        group: "Warehouses",
        desc: "This project involved the construction of a warehouse loading bay facility in Calamba, Laguna, designed to support the client's goods handling and distribution operations. The facility features a covered loading dock with multiple dock leveler bays for truck loading and unloading, a steel-frame canopy structure providing weather protection for staging areas, and ample space for pallet storage and forklift operations.",
        more: [
          "This project reflects our capability in warehouse and loading bay construction, delivering practical, well-organized facilities designed for efficient logistics and material handling.",
        ],
        images: ["/images/services/warehouses/warehouse-loading-bay"],
      },
    ],
  },
  {
    slug: "civil-structural",
    title: "Civil/Structural",
    icon: Building2,
    contactService: "Civil, Structural & Architectural",
    items: [
      {
        title: "Administration Building",
        group: "Civil/Structural",
        desc: "This project involved the civil and structural construction of an administration building, from groundwork and foundation works to structural framing, exterior finishing, and interior fit-out. The completed facility features a modern low-rise design with a wide cantilevered roof overhang, rooftop solar panels, and interiors finished with offices, a conference room, and common areas suited for day-to-day administrative operations.",
        more: [
          "This project reflects our capability in civil and structural building construction, delivering a functional and well-executed facility from the ground up.",
        ],
        images: ["/images/services/civil-structural/administration-building-1", "/images/services/civil-structural/administration-building-2", "/images/services/civil-structural/administration-building-3", "/images/services/civil-structural/administration-building-4", "/images/services/civil-structural/administration-building-5", "/images/services/civil-structural/administration-building-6", "/images/services/civil-structural/administration-building-7"],
      },
      {
        title: "Security and Maintenance Building",
        group: "Civil/Structural",
        desc: "This project involved the construction of a security and maintenance building for the client, from structural work to interior fit-out. The completed facility features a modern exterior with a wide cantilevered roof canopy, providing covered space for vehicles and equipment, along with finished interior spaces including offices, restrooms, and common areas.",
        more: [
          "This project reflects our capability in building construction, delivering a functional facility designed to support security and maintenance operations.",
        ],
        images: ["/images/services/civil-structural/security-and-maintenance-building-1", "/images/services/civil-structural/security-and-maintenance-building-2", "/images/services/civil-structural/security-and-maintenance-building-3", "/images/services/civil-structural/security-and-maintenance-building-4", "/images/services/civil-structural/security-and-maintenance-building-5", "/images/services/civil-structural/security-and-maintenance-building-6"],
      },
      {
        title: "Enclave Model House",
        group: "Civil/Structural",
        desc: "This project involved the construction of a residential model house, from structural framing to exterior finishing. Work progressed from column and beam construction, wall framing, and multi-level structural buildup to exterior architectural finishing, showcasing a modern design with clean lines and a mixed material facade.",
        more: [
          "This project reflects our capability in residential building construction, from structural work through to completion, delivering a well-executed and design-forward facility.",
        ],
        images: ["/images/services/civil-structural/enclave-model-house-1", "/images/services/civil-structural/enclave-model-house-2", "/images/services/civil-structural/enclave-model-house-3", "/images/services/civil-structural/enclave-model-house-4"],
      },
      {
        title: "Covered Walkway with Solar Lights",
        group: "Civil/Structural",
        desc: "This project involved the construction of a covered walkway equipped with solar-powered lighting, providing weather protection and illumination for pedestrians. The structure features a steel-frame canopy with metal roofing, supported by steel columns along the walkway, and integrated solar light fixtures for energy-efficient nighttime lighting.",
        more: [
          "This project reflects our capability in structural and infrastructure work, delivering practical facilities designed for safety, accessibility, and sustainable energy use.",
        ],
        images: ["/images/services/civil-structural/covered-walkway-with-solar-lights-1", "/images/services/civil-structural/covered-walkway-with-solar-lights-2"],
      },
      {
        title: "Renovation of Comfort Room",
        group: "Civil/Structural",
        desc: "This project involved the renovation of a comfort room, upgrading it into a modern, well-lit facility. The renovation included a long communal sink counter with multiple faucets and mirrors, upgraded restroom cubicles with individual stalls, polished flooring, and updated ceiling and lighting fixtures throughout.",
        more: [
          "This project reflects our capability in interior renovation work, delivering a clean, functional, and well-finished restroom facility.",
        ],
        images: ["/images/services/civil-structural/renovation-of-comfort-room-1", "/images/services/civil-structural/renovation-of-comfort-room-2"],
      },
      {
        title: "Document Storage",
        group: "Civil/Structural",
        desc: "This project involved the construction of a document storage facility designed to provide a secure and spacious area for records and file storage. The building features a steel-frame structure with metal wall cladding and roofing, a wide-span interior with a high ceiling for storage flexibility, and multiple ventilation openings for air circulation.",
        more: [
          "This project reflects our capability in building construction, delivering a functional and durable facility suited for document and records storage needs.",
        ],
        images: ["/images/services/civil-structural/document-storage-1", "/images/services/civil-structural/document-storage-2"],
      },
      {
        title: "Installation of Racking System",
        group: "Civil/Structural",
        desc: "This project involved the installation of a heavy-duty racking system for warehouse storage, featuring multi-level steel shelving with a mesh flooring walkway for elevated access. The system was designed to maximize vertical storage space and organize inventory efficiently, with labeled bays for easy identification and retrieval.",
        more: [
          "This project reflects our capability in racking and storage system installation, delivering organized, space-efficient solutions for warehouse and inventory management.",
        ],
        images: ["/images/services/civil-structural/installation-of-racking-system"],
      },
      {
        title: "Underground 180cum Water Tank Construction",
        group: "Civil/Structural",
        highlight: "Delivered 2 weeks ahead of schedule",
        desc: "A growing manufacturer needed a new production hall with full electrical and mechanical fit-out.",
        images: ["/images/project-construction.png"],
      },
    ],
  },
  {
    slug: "electrical",
    title: "Electrical",
    icon: Zap,
    contactService: "Mechanical, Electrical, & Plumbing",
    items: [
      {
        title: "Ground Floor SAT Transfer – Electrical Works",
        location: "Calamba, Laguna",
        group: "Electrical",
        desc: "This project highlights PBTS's expertise in comprehensive electrical works, including tapping and verification at the Facilities EE Room, safe removal of outdated electrical panels, installation of reliable power supply systems, and precise testing and calibration to ensure peak performance. With proven capabilities in electrical installations, PBTS is equipped to deliver tailored solutions that meet the highest standards of safety, efficiency, and reliability.",
        images: ["/images/services/electrical/ground-floor-sat-transfer-electrical-works-1", "/images/services/electrical/ground-floor-sat-transfer-electrical-works-2", "/images/services/electrical/ground-floor-sat-transfer-electrical-works-3"],
      },
      {
        title: "Installation of Electrical Distribution Panel and Wire Cabling",
        group: "Electrical",
        desc: "This project involves the installation of an electrical distribution panel along with complete wire cabling works. It ensures the efficient and safe distribution of electrical power throughout the facility, supporting operational reliability and meeting all regulatory and safety standards.",
        images: ["/images/services/electrical/installation-of-electrical-distribution-panel-and-wire-cabli-1", "/images/services/electrical/installation-of-electrical-distribution-panel-and-wire-cabli-2"],
      },
      {
        title: "Electrical Installation of 75kVA Genset",
        location: "Calamba, Laguna",
        group: "Electrical",
        desc: "This project highlights the electrical installation of a generator set (genset), showcasing our capability to deliver safe, efficient, and reliable power solutions. From system integration to final testing, PBTS ensures every detail meets the highest standards of performance and compliance.",
        images: ["/images/services/electrical/electrical-installation-of-75kva-genset-1", "/images/services/electrical/electrical-installation-of-75kva-genset-2"],
      },
    ],
  },
  {
    slug: "mechanical",
    title: "Mechanical",
    icon: Cog,
    contactService: "Mechanical, Electrical, & Plumbing",
    items: [
      {
        title: "Replacement of CHW Pipe Rubber Insulation & Cladding",
        location: "Canlubang, Laguna",
        group: "Mechanical",
        desc: "This project involved the replacement of the rubber insulation and metal cladding on chilled water (CHW) piping at a facility in Canlubang, Laguna. The existing insulation and cladding had deteriorated over time, showing signs of corrosion and rust, and were replaced with new rubber insulation and fresh metal cladding to restore proper thermal protection and extend the piping system's service life.",
        more: [
          "This project reflects our capability in industrial piping insulation and maintenance work, delivering restored, well-protected systems for continued reliable operation.",
        ],
        images: ["/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-1", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-2", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-3", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-4", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-5", "/images/services/mechanical/replacement-of-chw-pipe-rubber-insulation-cladding-6"],
      },
      {
        title: "ASTRA HVAC Works",
        location: "Cebu City",
        group: "Mechanical",
        desc: "This project involved the installation of HVAC ductwork for ASTRA's facility in Cebu City, including the fabrication and installation of insulated air ducts integrated within the building's structural framework for efficient air distribution.",
        more: [
          "We specialize in the installation of HVAC systems for industrial and factory applications. Scope includes system setup, equipment mounting, ducting, and integration aligned with project specifications — designed to support controlled environments, energy efficiency, and consistent system operation. Implementation follows standard safety requirements and installation procedures, ensuring durability and compatibility with operational demands.",
        ],
        images: ["/images/services/mechanical/astra-hvac-works-1", "/images/services/mechanical/astra-hvac-works-2"],
      },
      {
        title: "Mantra Sprinkler System Works",
        location: "Cebu City",
        group: "Mechanical",
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
        group: "Mechanical",
        desc: "This project involved the installation of a fire sprinkler piping system for Master Tower's facility in Cebu City, covering the fabrication and installation of overhead sprinkler mains and branch lines routed throughout the building's structural framework.",
        images: ["/images/services/mechanical/master-tower-sprinkler-system-works-1", "/images/services/mechanical/master-tower-sprinkler-system-works-2", "/images/services/mechanical/master-tower-sprinkler-system-works-3"],
        contactService: "Fire Protection System",
      },
      {
        title: "ED Oven Rehabilitation",
        location: "Sta. Rosa, Laguna",
        group: "Mechanical",
        desc: "This project focuses on the replacement of existing cladding systems, along with the installation of new, high-performance insulation for the ED (electrodeposition) oven system at a facility in Sta. Rosa, Laguna. Delivered as part of our specialized mechanical services, it reflects our commitment to quality, durability, and precision in every aspect of execution.",
        images: ["/images/services/mechanical/ed-oven-rehabilitation-1", "/images/services/mechanical/ed-oven-rehabilitation-2", "/images/services/mechanical/ed-oven-rehabilitation-3", "/images/services/mechanical/ed-oven-rehabilitation-4", "/images/services/mechanical/ed-oven-rehabilitation-5"],
      },
      {
        title: "Ground Floor SAT Transfer",
        group: "Mechanical",
        desc: "This project highlights the precise transfer and installation of industrial machinery, including unhooking, relocation, and reconnection, alongside the integration of advanced ducting systems and Clean Dry Air (CDA). Engineered for optimal performance, every component was delivered and installed with precision. This work reflects our continued commitment to mechanical excellence, operational reliability, and innovative execution in complex environments.",
        images: ["/images/services/mechanical/ground-floor-sat-transfer-1", "/images/services/mechanical/ground-floor-sat-transfer-2", "/images/services/mechanical/ground-floor-sat-transfer-3", "/images/services/mechanical/ground-floor-sat-transfer-4"],
      },
      {
        title: "PTC RDD Equipment Un-hook and Hook-up",
        location: "Sto. Tomas, Batangas",
        group: "Mechanical",
        desc: "This project highlights the precise transfer and installation of industrial machinery, including unhooking, relocation, and reconnection, alongside the integration of advanced ducting systems and Clean Dry Air (CDA). Engineered for optimal performance, every component was delivered and installed with precision. This work reflects our continued commitment to mechanical excellence, operational reliability, and innovative execution in complex environments.",
        images: ["/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-1", "/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-2", "/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-3", "/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-4", "/images/services/mechanical/ptc-rdd-equipment-un-hook-and-hook-up-5"],
      },
      {
        title: "Welding Line Air Shower",
        group: "Mechanical",
        desc: "This project involved the installation of ducting systems for an air shower system along the welding line, designed to maintain a clean and controlled environment within the production area, with insulated ductwork routed through the facility's structural framework to ensure proper air filtration and circulation for the welding process.",
        images: ["/images/services/mechanical/welding-line-air-shower-1", "/images/services/mechanical/welding-line-air-shower-2"],
      },
    ],
  },
  {
    slug: "automation-engineering",
    title: "Automation Machines",
    icon: Cpu,
    contactService: "Automation & Engineering Services",
    items: [
      {
        title: "Automated Guided Vehicle",
        group: "Automation Machines",
        desc: "Automated Guided Vehicles transport materials between designated areas with minimal manual handling. AGVs follow programmed routes and use sensors for navigation and safe movement within the facility.",
        images: ["/images/services/automation-engineering/automated-guided-vehicle"],
      },
      {
        title: "LED Navigation System",
        group: "Automation Machines",
        desc: "This LED Navigation Version3 is the same precision tool used in our previous design Version2. It aids in the Terminal Insertion Process per cavity circuit that can accommodate and program one (1) main LED Navigation plus three (3) sub-fixtures for wire harness assembly. Maximum wire input: 40.",
        images: ["/images/services/automation-engineering/led-navigation-system"],
      },
      {
        title: "LF Sorter c/w Magazine Loader & Unloader",
        group: "Automation Machines",
        desc: "An automated system that sorts and transfers components using magazines, with automatic loading and unloading to support efficient and consistent material handling.",
        images: ["/images/services/automation-engineering/lf-sorter-c-w-magazine-loader-unloader"],
      },
      {
        title: "LF Rinsing Bath System",
        group: "Automation Machines",
        desc: "An automated system designed to rinse and clean components through a controlled bathing process for consistent and efficient processing.",
        images: ["/images/services/automation-engineering/lf-rinsing-bath-system"],
      },
      {
        title: "Magazine Loader & Unloader",
        group: "Automation Machines",
        desc: "An automated system designed to load and unload magazines efficiently, supporting smooth and consistent material transfer between processes.",
        images: ["/images/services/automation-engineering/magazine-loader-unloader"],
      },
      {
        title: "Vapor Inspection Machine",
        group: "Automation Machines",
        desc: "An inspection system designed to check components through a controlled vapor-based process, helping identify defects and ensure consistent product quality.",
        images: ["/images/services/automation-engineering/vapor-inspection-machine"],
      },
      {
        title: "Molding Machine",
        group: "Automation Machines",
        desc: "A machine designed to form and mold components according to specified shapes and dimensions, supporting consistent and efficient production.",
        images: ["/images/services/automation-engineering/molding-machine"],
      },
      {
        title: "Magazine Washer System",
        group: "Automation Machines",
        desc: "An automated system designed to clean and wash magazines, helping maintain cleanliness and support smooth material handling in production.",
        images: ["/images/services/automation-engineering/magazine-washer-system"],
      },
      {
        title: "Loader and Unloader",
        group: "Automation Machines",
        desc: "Our lead frame loaders and unloaders automate the handling and transfer of lead frames in semiconductor manufacturing. They provide accurate positioning and smooth material movement while reducing manual handling and supporting consistent production.",
        images: ["/images/services/automation-engineering/loader-and-unloader"],
      },
      {
        title: "X970A WA 12.3 Lever Press",
        group: "Automation Machines",
        desc: "A mechanical press designed to provide controlled force for activating, adjusting, or securing components. Its durable design supports reliable and consistent operation in industrial applications.",
        images: ["/images/services/automation-engineering/x970a-wa-12-3-lever-press"],
      },
      {
        title: "X898B AOI Concentricity Enclosure",
        group: "Automation Machines",
        desc: "An automated vision inspection system designed to check the concentricity and alignment of the POP valve and UI enclosure. The machine identifies the unit by scanning its serial number, positions the unit for inspection, captures images of the POP valve and UI enclosure, and uses image-processing measurements to determine their concentricity against the specified acceptance criteria.",
        more: [
          "The inspection results, including POP valve concentricity, UI enclosure concentricity, inspection status, error details, date/time, and serial number, are recorded in the machine log for traceability.",
        ],
        images: ["/images/services/automation-engineering/x898b-aoi-concentricity-enclosure"],
      },
      {
        title: "X590F LRB 3.0 Insert Chassis into Large Bristle Cage",
        group: "Automation Machines",
        desc: "Semi-Automated motorized machine designed to combine the process of inserting Cage to Chassis while Screwing the Cool Tip Base.",
        more: [
          "The machine decreased the assembly process time from 40s to 25s equivalent to additional output of 45 units per hour.",
        ],
        images: ["/images/services/automation-engineering/x590f-lrb-3-0-insert-chassis-into-large-bristle-cage"],
      },
      {
        title: "Automatic Coolant Dispenser",
        group: "Automation Machines",
        desc: "An automated system designed to dispense coolant at a controlled rate, helping maintain consistent coolant application during production processes.",
        images: ["/images/services/automation-engineering/automatic-coolant-dispenser"],
      },
      {
        title: "Auto Iron Machine",
        group: "Automation Machines",
        desc: "An automated equipment designed to streamline ironing operations with consistent pressure, temperature, and movement. It helps reduce manual effort and maintain uniform results, making it suitable for production environments that require efficient and repeatable ironing processes.",
        images: ["/images/services/automation-engineering/auto-iron-machine"],
      },
      {
        title: "Wire Looping Machine",
        group: "Automation Machines",
        desc: "An automated machine designed to form and loop wires into specified shapes and dimensions. It helps improve consistency and efficiency in wire processing while reducing manual handling during production.",
        images: ["/images/services/automation-engineering/wire-looping-machine"],
      },
      {
        title: "Degreasing / Rinsing Machine",
        group: "Automation Machines",
        desc: "Designed to remove oil, grease, and other contaminants from components through controlled cleaning and rinsing processes. It helps prepare parts for the next production stage while maintaining consistent and efficient cleaning results.",
        images: ["/images/services/automation-engineering/degreasing-rinsing-machine"],
      },
      {
        title: "Parts Counter Machine",
        group: "Automation Machines",
        desc: "Designed to automatically count and dispense components based on a set quantity. It helps improve counting accuracy, reduce manual handling, and support faster and more consistent parts preparation in production operations.",
        images: ["/images/services/automation-engineering/parts-counter-machine"],
      },
      {
        title: "X590F LRB Insert Bristle into Cage",
        group: "Automation Machines",
        desc: "Semi-Automated motorized machine designed to precisely insert 7 Bristles into Cage.",
        more: [
          "This machine has significantly decreased the assembly process time from 18 minutes to 15 minutes equivalent to additional output of 37 units per hour.",
        ],
        images: ["/images/services/automation-engineering/x590f-lrb-insert-bristle-into-cage"],
      },
      {
        title: "X970 WA12.0 Pneumatic Press Machine",
        group: "Automation Machines",
        desc: "The machine is designed for the press-fit assembly of an Aluminum Outer onto a Wand Cuff with a Thin Inner Tube positioned inside the assembly.",
        more: [
          "It incorporates a vertically pressing mechanism to accurately assemble the upper components, followed by a slide table cylinder mechanism that applies the required force to securely lock the Aluminum Outer Tube and Wand Cuff together.",
          "The machine is equipped with dedicated locating fixtures and guides to ensure proper component alignment, consistent assembly quality, and repeatable operation.",
        ],
        images: ["/images/services/automation-engineering/x970-wa12-0-pneumatic-press-machine"],
      },
      {
        title: "X590 AL3.2 Assemble 3x Spring Plunger into Cool Wall Rim",
        group: "Automation Machines",
        desc: "Designed to install three spring plungers into the designated holes of the Cool Wall Rim. The machine ensures correct component orientation, insertion depth, and secure seating of all three spring plungers through a controlled and repeatable assembly process.",
        images: ["/images/services/automation-engineering/x590-al3-2-assemble-3x-spring-plunger-into-cool-wall-rim"],
      },
      {
        title: "X931A Press Neck Pivot to Neck Head",
        group: "Automation Machines",
        desc: "Designed to accurately and securely assemble the Neck Pivot into the Neck Head by controlled press-fitting — ensuring proper alignment, full seating, and reliable mechanical fit without damaging either component.",
        images: ["/images/services/automation-engineering/x931a-press-neck-pivot-to-neck-head"],
      },
      {
        title: "Omron Industrial Automation",
        group: "Automation Machines",
        highlight: "Synchronized multi-axis motion across the production line",
        desc: "Legacy standalone controllers made it difficult to coordinate timing across multiple machines, causing misalignment and slower changeovers.",
        images: ["/images/project-omron.png"],
      },
    ],
  },
  {
    slug: "business-system-support",
    title: "Systems & Software",
    icon: MonitorCog,
    contactService: "Business Support and System",
    items: [
      {
        title: "Enterprise Resource Planning System (ERP)",
        group: "Systems & Software",
        highlight: "One platform for total control and smarter operations",
        desc: "A web-based platform that brings finance, sales, project monitoring, purchasing, and warehouse management together in one efficient system.",
        more: [
          "Built to support growing organizations, the ERP combines a user-friendly interface with modular features and a scalable architecture. It offers real-time tracking, automated approvals, and customizable workflows across departments, all on a centralized database that keeps data accurate and teams working together.",
          "Compatible with desktop and mobile, it lets teams manage operations efficiently, anytime and anywhere.",
        ],
        lists: [
          {
            title: "Key features",
            items: [
              "Centralized dashboard with real-time insights across departments",
              "Project monitoring with purchase request tracking and automated status updates",
              "Streamlined PR/PO workflows with approval routing, supplier tracking, and order history logs",
              "Warehouse and inventory management with real-time inventory updates",
              "Financial management: budgeting, invoicing, and expense tracking",
              "Bank reconciliation and financial reporting",
              "Customizable reports and dashboards, exportable to Excel and PDF",
              "Responsive interface for desktop, tablet, and mobile",
            ],
          },
          {
            title: "Technical data",
            items: [
              "Architecture: web-based",
              "Platforms: Windows, Android; Chrome, Edge",
              "Core modules: Project Monitoring, Warehouse Management, Finance, Sales, Accounting, Reporting",
              "Data: centralized SQL database",
              "User access: role-based permissions, user groups, secure login sessions",
              "Maintenance & support: system monitoring and regular updates",
            ],
          },
        ],
        images: ["/images/services/business-system-support/erp-system-2", "/images/services/business-system-support/erp-system-3", "/images/services/business-system-support/erp-system-1"],
      },
      {
        title: "Andon & Production Monitoring Board",
        group: "Systems & Software",
        desc: "Production-floor display boards that show each line’s live status at a glance: plan versus actual output, balance, cycle time, run time, stop time, process delay, operation rate, and OEE.",
        more: [
          "Station alarms are highlighted on the board so operators and supervisors can respond to stoppages quickly.",
        ],
        images: ["/images/services/business-system-support/andon-production-monitoring-1", "/images/services/business-system-support/andon-production-monitoring-2"],
      },
      {
        title: "Cleanroom Monitoring System",
        group: "Systems & Software",
        desc: "A web dashboard that monitors cleanroom zones in real time — particle count (small, medium, large), temperature, humidity, and dew point for every zone.",
        more: [
          "Zones turn red when a reading goes outside its limits, with an optional alarm buzzer. Live and historical graphs show each reading against its upper and lower limits, and limits can be configured per zone and sensor.",
        ],
        images: ["/images/services/business-system-support/cleanroom-monitoring-system-1", "/images/services/business-system-support/cleanroom-monitoring-system-2", "/images/services/business-system-support/cleanroom-monitoring-system-3", "/images/services/business-system-support/cleanroom-monitoring-system-4"],
      },
      {
        title: "Noise Level Monitoring System",
        group: "Systems & Software",
        desc: "Real-time noise monitoring: a noise level analyzer feeds a wireless analog input, which sends the readings to a compact PC running the monitoring dashboard.",
        more: [
          "The dashboard shows the current decibel level, a gauge, a live noise-level graph, and a time-stamped log, with export to Excel.",
        ],
        images: ["/images/services/business-system-support/noise-level-monitoring-system"],
      },
      {
        title: "Auto Data Transfer System",
        group: "Systems & Software",
        desc: "A Windows application that collects current and torque readings directly from test instruments over USB and records them into the customer’s Excel files — no manual encoding.",
        more: [
          "Supports Keysight 34450A and ADCMT 7351E meters and Unipulse TM301 torque monitors, recording with-load and without-load results and exporting them to the selected Excel template.",
        ],
        images: ["/images/services/business-system-support/auto-data-transfer-system-1", "/images/services/business-system-support/auto-data-transfer-system-2", "/images/services/business-system-support/auto-data-transfer-system-3", "/images/services/business-system-support/auto-data-transfer-system-4", "/images/services/business-system-support/auto-data-transfer-system-5"],
      },
      {
        title: "Ionizer Tester",
        group: "Systems & Software",
        desc: "An automated test station for ionizers: an air ion counter measures each serial-numbered unit’s ion output against low and high limits.",
        more: [
          "The tester software tracks pass, reject, total, and yield, and includes test, debug, configuration, and report modes with password-protected access.",
        ],
        images: ["/images/services/business-system-support/ionizer-tester-1", "/images/services/business-system-support/ionizer-tester-2"],
      },
      {
        title: "New Era HRIS — Applicant & Employee Management System",
        group: "Systems & Software",
        highlight: "Streamlined applicant intake, status tracking, and visa-petition workflow",
        desc: "HR teams often juggle applicant intake, interview scheduling, visa-petition stages, and employee records across disconnected spreadsheets and email threads — a bottleneck the HRIS is built to eliminate.",
        images: ["/images/project-NewEra.png"],
      },
    ],
  },
  {
    slug: "tooling-metal-fabrication",
    title: "Jigs & Tooling",
    icon: Wrench,
    contactService: "Tooling Fabrication",
    items: [
      {
        title: "AU Wire Collector",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tooling component designed to collect and organize wires during production processes. It helps maintain proper wire positioning and supports efficient, orderly operation.",
        images: ["/images/services/tooling-metal-fabrication/au-wire-collector"],
      },
      {
        title: "Bosch Jig Maker",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tooling fixture used to accurately position, hold, and support components during production. Designed to improve precision, consistency, and efficiency in assembly operations.",
        images: ["/images/services/tooling-metal-fabrication/bosch-jig-maker"],
      },
      {
        title: "Bosch Jig",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tooling fixture designed to securely hold and position components during assembly or production processes. It helps ensure accurate positioning, consistent results, and efficient operation.",
        images: ["/images/services/tooling-metal-fabrication/bosch-jig"],
      },
      {
        title: "Buffing Jig",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tooling fixture designed to securely hold and position workpieces during buffing operations. It helps maintain consistent positioning, improve work efficiency, and support uniform finishing results.",
        images: ["/images/services/tooling-metal-fabrication/buffing-jig"],
      },
      {
        title: "Cadex Offline Battery Charger",
        group: "Jigs & Tooling",
        desc: "A battery charging system designed to safely charge and maintain rechargeable batteries, providing reliable power for testing, maintenance, and equipment operations.",
        images: ["/images/services/tooling-metal-fabrication/cadex-offline-battery-charger"],
      },
      {
        title: "Cavitation Tray",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tray designed to securely hold and organize components during cavitation or cleaning processes. It helps ensure proper positioning, handling, and consistent processing of parts.",
        images: ["/images/services/tooling-metal-fabrication/cavitation-tray"],
      },
      {
        title: "Cleaning Stage",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tray designed to securely hold and position parts during the cleaning stage. It helps ensure proper handling and consistent cleaning of components.",
        images: ["/images/services/tooling-metal-fabrication/cleaning-stage"],
      },
      {
        title: "Coupling",
        group: "Jigs & Tooling",
        desc: "A mechanical component used to connect two shafts and transmit rotational power between them while helping accommodate minor misalignment.",
        images: ["/images/services/tooling-metal-fabrication/coupling"],
      },
      {
        title: "Cover Jig",
        group: "Jigs & Tooling",
        desc: "A custom fixture used to securely hold and position covers during assembly, inspection, or fabrication, ensuring proper alignment and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/cover-jig"],
      },
      {
        title: "Feeler Gauge",
        group: "Jigs & Tooling",
        desc: "A precision measuring tool used to check and measure small gaps or clearances between components. It helps ensure accurate fitting and proper assembly.",
        images: ["/images/services/tooling-metal-fabrication/feeler-gauge"],
      },
      {
        title: "Generic Roller Press Jig",
        group: "Jigs & Tooling",
        desc: "A custom jig designed to securely hold and guide components during roller pressing operations, ensuring proper positioning and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/generic-roller-press-jig"],
      },
      {
        title: "Jigs",
        group: "Jigs & Tooling",
        desc: "A custom jig designed to securely hold and guide components during roller pressing operations, ensuring proper positioning and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/jigs"],
      },
      {
        title: "Location Jig",
        group: "Jigs & Tooling",
        desc: "A custom fixture used to accurately position and hold components in place during assembly, machining, or fabrication processes, ensuring proper alignment and consistent results.",
        images: ["/images/services/tooling-metal-fabrication/location-jig"],
      },
      {
        title: "Magazine Stand",
        group: "Jigs & Tooling",
        desc: "A support structure designed to securely hold and organize magazines or workpieces, providing easy access and proper positioning during production or handling processes.",
        images: ["/images/services/tooling-metal-fabrication/magazine-stand"],
      },
      {
        title: "Main Lens Removing Jig",
        group: "Jigs & Tooling",
        desc: "A custom jig designed to securely hold and position the component while removing the main lens, helping ensure safe, controlled, and consistent removal.",
        images: ["/images/services/tooling-metal-fabrication/main-lens-removing-jig"],
      },
      {
        title: "MB 180 Flex Alignment & Press",
        group: "Jigs & Tooling",
        desc: "A specialized fixture designed to accurately align and press flexible components, ensuring proper positioning and consistent assembly during production.",
        images: ["/images/services/tooling-metal-fabrication/mb-180-flex-alignment-press"],
      },
      {
        title: "Microscope Stand",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated stand designed to securely hold and support microscopes during inspection and assembly operations.",
        images: ["/images/services/tooling-metal-fabrication/microscope-stand"],
      },
      {
        title: "MX Machine Cover",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated cover designed to protect the machine and its components from dust, debris, and other external elements.",
        images: ["/images/services/tooling-metal-fabrication/mx-machine-cover"],
      },
      {
        title: "Outer Guide Plate",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated plate designed to guide and properly position components during machine operation.",
        images: ["/images/services/tooling-metal-fabrication/outer-guide-plate"],
      },
      {
        title: "Plunger",
        group: "Jigs & Tooling",
        desc: "A precision-fabricated component designed to provide controlled pushing, positioning, or movement within a machine or tooling assembly.",
        images: ["/images/services/tooling-metal-fabrication/plunger"],
      },
      {
        title: "Quick Loader",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tooling component designed to support faster and more efficient loading and unloading of parts or materials.",
        images: ["/images/services/tooling-metal-fabrication/quick-loader"],
      },
      {
        title: "Rasco Shim",
        group: "Jigs & Tooling",
        desc: "A precision-fabricated shim used for proper alignment, spacing, and positioning of machine or tooling components.",
        images: ["/images/services/tooling-metal-fabrication/rasco-shim"],
      },
      {
        title: "Reflow Pallet",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated fixture designed to securely hold and position components during the reflow soldering process.",
        images: ["/images/services/tooling-metal-fabrication/reflow-pallet"],
      },
      {
        title: "Roller Tube Tray",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tray designed to securely hold and organize roller tubes during handling and processing.",
        images: ["/images/services/tooling-metal-fabrication/roller-tube-tray"],
      },
      {
        title: "Stone Holder Arm 6301",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated arm designed to securely hold and position a stone or abrasive component during machine operation.",
        images: ["/images/services/tooling-metal-fabrication/stone-holder-arm-6301"],
      },
      {
        title: "Thunder Bolt Tester Jig",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated jig designed to securely hold and position components during testing and inspection.",
        images: ["/images/services/tooling-metal-fabrication/thunder-bolt-tester-jig"],
      },
      {
        title: "TOWA Strip Flattener",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tooling fixture designed to flatten and properly align strips for consistent processing.",
        images: ["/images/services/tooling-metal-fabrication/towa-strip-flattener"],
      },
      {
        title: "TPH LCD Combo Jig",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated jig designed to securely hold and accurately position LCD components during assembly and testing.",
        images: ["/images/services/tooling-metal-fabrication/tph-lcd-combo-jig"],
      },
      {
        title: "Tube Loader and Unloader",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated tooling system designed for efficient loading and unloading of tubes during production and handling processes.",
        images: ["/images/services/tooling-metal-fabrication/tube-loader-and-unloader"],
      },
      {
        title: "X308 Slaveboard",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated board used to support communication, control, or interface functions within a machine or equipment system.",
        images: ["/images/services/tooling-metal-fabrication/x308-slaveboard"],
      },
      {
        title: "X556 Slaveboard",
        group: "Jigs & Tooling",
        desc: "A custom-fabricated board designed to support control, communication, and interface functions within a machine or equipment system.",
        images: ["/images/services/tooling-metal-fabrication/x556-slaveboard"],
      },
    ],
  },
  {
    slug: "fabricated-products",
    title: "Fabricated Products",
    icon: Factory,
    contactService: "Tooling Fabrication",
    items: [
      {
        title: "Agitator Machine",
        group: "Fabricated Products",
        desc: "A fabricated mechanical unit designed to mix, blend, or circulate materials efficiently. Built with durable metal components for reliable operation in industrial processing applications.",
        images: ["/images/services/tooling-metal-fabrication/agitator-machine"],
      },
      {
        title: "Checking Jig",
        group: "Fabricated Products",
        desc: "A precision-fabricated tool used to check the dimensions, position, alignment, and condition of parts to ensure they meet required specifications.",
        images: ["/images/services/tooling-metal-fabrication/checking-jig"],
      },
      {
        title: "Corner Preparation & Sink Table",
        group: "Fabricated Products",
        desc: "A fabricated worktable designed for efficient corner preparation and sink-related assembly or finishing tasks. Built for durability, stability, and convenient workspace use.",
        images: ["/images/services/tooling-metal-fabrication/corner-preparation-sink-table"],
      },
      {
        title: "Ducting",
        group: "Fabricated Products",
        desc: "Fabricated metal components designed to provide a controlled pathway for the distribution, ventilation, or exhaust of air and other gases within industrial and facility systems.",
        images: ["/images/services/tooling-metal-fabrication/ducting"],
      },
      {
        title: "ESD Integrator Box",
        group: "Fabricated Products",
        desc: "A fabricated enclosure designed to house and organize ESD (Electrostatic Discharge) control components, providing protection, proper arrangement, and easy access for maintenance.",
        images: ["/images/services/tooling-metal-fabrication/esd-integrator-box"],
      },
      {
        title: "Food Cart",
        group: "Fabricated Products",
        desc: "A fabricated mobile unit designed for food preparation, storage, and serving. Built with durable materials for practical and efficient use in commercial or industrial settings.",
        images: ["/images/services/tooling-metal-fabrication/food-cart"],
      },
      {
        title: "Gripper Lifter Arm",
        group: "Fabricated Products",
        desc: "A fabricated mechanical arm designed to securely grip, lift, and position components or materials. Built for controlled handling and efficient movement in industrial applications.",
        images: ["/images/services/tooling-metal-fabrication/gripper-lifter-arm"],
      },
      {
        title: "Heater Coil",
        group: "Fabricated Products",
        desc: "A fabricated heating element designed to generate and transfer heat efficiently for industrial heating applications. Built for reliable and consistent thermal performance.",
        images: ["/images/services/tooling-metal-fabrication/heater-coil"],
      },
      {
        title: "Louver",
        group: "Fabricated Products",
        desc: "A fabricated metal component designed to allow controlled airflow while helping protect openings from rain, debris, and other external elements. Commonly used for ventilation and industrial applications.",
        images: ["/images/services/tooling-metal-fabrication/louver"],
      },
      {
        title: "Machine Cover",
        group: "Fabricated Products",
        desc: "A fabricated protective enclosure designed to cover and safeguard machine components from dust, debris, accidental contact, and other external elements.",
        images: ["/images/services/tooling-metal-fabrication/machine-cover"],
      },
      {
        title: "N2 Cabinet",
        group: "Fabricated Products",
        desc: "A fabricated enclosure designed for the safe storage and controlled distribution of nitrogen gas and related components. Built for organized, secure, and accessible industrial use.",
        images: ["/images/services/tooling-metal-fabrication/n2-cabinet"],
      },
      {
        title: "N2 Pushcart",
        group: "Fabricated Products",
        desc: "A fabricated mobile cart designed for the safe and convenient transport of nitrogen gas cylinders. Built for stability, durability, and easy handling in industrial environments.",
        images: ["/images/services/tooling-metal-fabrication/n2-pushcart"],
      },
      {
        title: "Pass Thru Box",
        group: "Fabricated Products",
        desc: "A fabricated enclosure designed for the controlled transfer of materials between two areas while helping maintain cleanliness and separation between spaces. Commonly used in cleanroom and controlled environments.",
        images: ["/images/services/tooling-metal-fabrication/pass-thru-box"],
      },
      {
        title: "Pigeon Hole",
        group: "Fabricated Products",
        desc: "A fabricated storage unit with multiple compartments designed for organized storage of documents, tools, materials, or small items. Built for efficient and accessible organization.",
        images: ["/images/services/tooling-metal-fabrication/pigeon-hole"],
      },
      {
        title: "Pulverizer",
        group: "Fabricated Products",
        desc: "A fabricated machine designed to crush, grind, or reduce materials into smaller particles for easier processing and handling. Built for efficient and consistent material size reduction.",
        images: ["/images/services/tooling-metal-fabrication/pulverizer"],
      },
      {
        title: "Push Cart",
        group: "Fabricated Products",
        desc: "A fabricated mobile cart designed for the convenient transport and handling of materials, tools, or equipment within industrial and work areas. Built for durability and easy maneuverability.",
        images: ["/images/services/tooling-metal-fabrication/push-cart"],
      },
      {
        title: "Reservoir Tank",
        group: "Fabricated Products",
        desc: "A fabricated tank designed to store and supply liquids for industrial processes and equipment. Built for durability, reliable storage, and efficient fluid handling.",
        images: ["/images/services/tooling-metal-fabrication/reservoir-tank"],
      },
      {
        title: "Roof Ventilator",
        group: "Fabricated Products",
        desc: "A fabricated ventilation unit designed to improve airflow and remove heat, moisture, and stale air from indoor spaces. Suitable for industrial and facility applications.",
        images: ["/images/services/tooling-metal-fabrication/roof-ventilator"],
      },
      {
        title: "Step Ladder",
        group: "Fabricated Products",
        desc: "A fabricated access tool designed to provide safe and stable elevation for reaching elevated areas during maintenance, installation, and other work activities.",
        images: ["/images/services/tooling-metal-fabrication/step-ladder"],
      },
      {
        title: "Table Top Rack",
        group: "Fabricated Products",
        desc: "A fabricated storage rack designed to organize and hold tools, materials, or small components on a worktable or workstation. Built for convenient access and efficient use of workspace.",
        images: ["/images/services/tooling-metal-fabrication/table-top-rack"],
      },
      {
        title: "Whip Rack",
        group: "Fabricated Products",
        desc: "A fabricated storage rack designed to organize and securely hold whips, cables, hoses, or similar flexible materials. Built for easy access and efficient workspace organization.",
        images: ["/images/services/tooling-metal-fabrication/whip-rack"],
      },
      {
        title: "XYZ Robot",
        group: "Fabricated Products",
        desc: "A fabricated automated mechanism designed for precise movement and positioning along the X, Y, and Z axes. Suitable for material handling, assembly, dispensing, and other industrial automation applications.",
        images: ["/images/services/tooling-metal-fabrication/xyz-robot"],
      },
    ],
  },
]
