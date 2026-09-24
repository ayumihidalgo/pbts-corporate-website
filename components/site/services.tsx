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
  //bss
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
  //automation and engineering
  {
    icon: Cpu,
    title: 'Automation & Engineering Services',
    slug: 'automation-engineering',
    intro:
      'PLC programming, control panels, and robotic cells that lift throughput and consistency.',
    services: [
      {
        icon: Cpu,
        title: 'Automated Guided Vehicle',
        desc: 'Automated Guided Vehicles transport materials between designated areas with minimal manual handling. AGVs follow programmed routes and use sensors for navigation and safe movement within the facility.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'LED Navigation System',
        desc: 'This LED Navigation Version3 is the same precision tool that used in our previous design Version2. It aids in the Terminal Insertion Process per cavity circuit that can accommodate and program One (1) MainLED Navigation plus Three (3) sub-fixture for wire harness assembly. Maximum wire INPUT = 40',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'LF Sorter c/w Magazine Loader & Unloader',
        desc: 'An automated system that sorts and transfers components using magazines, with automatic loading and unloading to support efficient and consistent material handling.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'LF Rinsing Bath System',
        desc: 'An automated system designed to rinse and clean components through a controlled bathing process for consistent and efficient processing.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Magazine Loader & Unloader',
        desc: 'An automated system designed to load and unload magazines efficiently, supporting smooth and consistent material transfer between processes.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Vapor Inspection Machine',
        desc: 'An inspection system designed to check components through a controlled vapor-based process, helping identify defects and ensure consistent product quality.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Molding Machine',
        desc: 'A machine designed to form and mold components according to specified shapes and dimensions, supporting consistent and efficient production.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Magazine Washer System',
        desc: 'An automated system designed to clean and wash magazines, helping maintain cleanliness and support smooth material handling in production.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Loader and Unloader',
        desc: 'Our lead frame loaders and unloaders automate the handling and transfer of lead frames in semiconductor manufacturing. They provide accurate positioning and smooth material movement while reducing manual handling and supporting consistent production.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'X970A WA 12.3 Lever Press',
        desc: 'A mechanical press designed to provide controlled force for activating, adjusting, or securing components. Its durable design supports reliable and consistent operation in industrial applications.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: ScanEye,
        title: 'X898B AOI Concentricity Enclosure',
        desc: `Is an automated vision inspection system designed to check the concentricity and alignment of the POP valve and UI enclosure. The machine identifies the unit by scanning its serial number, positions the unit for inspection, capture images of the POP valve and UI enclosure, and uses image-processing measurements to determine their concentricity against the specified acceptance criteria.
  The inspection results, including POP valve concentricity, UI enclosure concentricity, inspection status, error details, date/time, and serial number, are recorded in the machine log for traceability.`,
        image: 'https://kistler.cdn.celum.cloud/SAPCommerce_CMSGalleryStandard_720x480/automated-vision-inspection-system_52320.webp',
      },
      {
        icon: Cpu,
        title: 'X590F LRB 3.0 Insert Chassis into Large Bristle Cage',
        desc: `Semi-Automated motorized machine designed to combine the process of inserting Cage to Chassis while Screwing the Cool Tip Base.
  The machine decreased the assembly process time from 40s to 25s equivalent to additional output of 45s units per hour.`,
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Automatic Coolant Dispenser',
        desc: 'An automated system designed to dispense coolant at a controlled rate, helping maintain consistent coolant application during production processes.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Auto Iron Machine',
        desc: 'An automated equipment designed to streamline ironing operations with consistent pressure, temperature, and movement. It helps reduce manual effort and maintain uniform results, making it suitable for production environments that require efficient and repeatable ironing processes.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Wire Looping Machine',
        desc: 'An automated machine designed to form and loop wires into specified shapes and dimensions. It helps improve consistency and efficiency in wire processing while reducing manual handling during production.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Degreasing / Rinsing Machine',
        desc: 'Designed to remove oil, grease, and other contaminants from components through controlled cleaning and rinsing processes. It helps prepare parts for the next production stage while maintaining consistent and efficient cleaning results.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'Parts Counter Machine',
        desc: 'is designed to automatically count and dispense components based on a set quantity. It helps improve counting accuracy, reduce manual handling, and support faster and more consistent parts preparation in production operations.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'X590F LRB Insert Bristle into Cage',
        desc: `Semi-Automated motorized machine designed to precisely insert 7 Bristles into Cage.
  This machine has significantly decreased the assembly process time from 18 minutes to 15 minutes equivalent to additional output of 37 units per hour.`,
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'X970 WA12.0 Pneumatic Press Machine',
        desc: `The machine is designed for the press-fit assembly of an Aluminum Outer onto a Wand Cuff with a Thin Inner Tube positioned inside the assembly.
  It incorporates a vertically pressing mechanism to accurately assemble the upper components, followed by a slide table cylinder mechanism that applies the required force to securely lock the Aluminum Outer Tube and Wand Cuff together.
  The machine is equipped with dedicated locating fixtures and guides to ensure proper component alignment consistent assembly quality, and repeatable operation.`,
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'X970A UI05 15.5 Snap Fit Ui Window Assembly on Ui Base Overmould',
        desc: 'Designed to assemble the UI window component onto the UI base overmould using controlled mechanical pressure. The machine ensures that the window is correctly positioned and that all snap-fit features are securely engaged without damaging the components.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'X590 AL3.2 Assemble 3x Spring Plunger into Cool Wall Rim',
        desc: 'It is designed to install three spring plungers into the designated holes of the Cool Wall Rim. The machine ensures correct component orientation, insertion depth, and secure seating of all three spring plungers through a controlled and repeatable assembly process.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        icon: Cpu,
        title: 'X931A Press Neck Pivot to Neck Head',
        desc: 'To accurately and securely assemble the Neck Pivot into the Neck Head by controlled press-fitting — ensuring proper alignment, full seating, and reliable mechanical fit without damaging either component.',
        image: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  //board engineering solution
  {
    icon: CircuitBoard,
    title: 'Board Engineering Solution',
    slug: 'board-engineering',
    intro:
      'Board-level diagnostics and component-level repair for drives, controllers, and industrial electronics.',
    services: [
      {
        icon: CircuitBoard,
        title: 'Inverter Repair',
        desc: 'Focuses on the diagnosis, repair, and testing of industrial inverter boards and related electronic components. It helps address common issues affecting inverter operation and supports the restoration of equipment performance while minimizing unnecessary replacement costs.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Network,
        title: 'Board Assembly',
        desc: 'Involves the assembly of electronic components onto PCBs based on specified designs and requirements. It supports the production and integration of reliable board assemblies for industrial equipment and automation applications.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoMDjSi2RkVfj11Ag39JnXk5tKsCnrcQdni-ABA0FB99WUXR8P2A4I1Bis&s=10',
      },
      {
        icon: Shield,
        title: 'LCD Monitor (Elevator)',
        desc: 'Service covers the inspection, troubleshooting, and repair of LCD monitor boards used in elevator systems. It helps address display-related issues and restore proper monitor operation through appropriate board-level repair and testing.',
        image: 'https://www.pcbway.com/img/images/testing-service/example-pic.webp?v=20260515',
      },
      {
        icon: Search,
        title: 'Parker Servo Drive Units & Allen-Bradley Servo/Inverter Drives',
        desc: 'Repair and troubleshooting of Parker servo drive units and Allen-Bradley servo and inverter drives used in industrial automation systems.',
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Siren,
        title: 'PCB Engineering',
        desc: 'PCB Engineering is open for Printed Circuit Board Assembly and Repair Service contract based on customer’s needs. Rehabilitation of scrap IC test Socket, Test Boards were also offered and Technical Engineering Support. Following are other capabilities that we can offer.',
        image: 'https://www.advancedtech.com/wp-content/uploads/2018/06/Deciding-to-repair-or-replace-your-industrial-parts_1200x628.jpg',
      },
    ],
  },
  //tooling and metal sheet fabrication
  {
    icon: Factory,
    title: 'Tooling and Metal Sheet Fabrication',
    slug: 'tooling-metal-fabrication',
    intro:
      'Precision metal fabrication, machining, and custom tooling built to exacting specifications.',
    services: [
      {
        icon: Factory,
        title: 'AU Wire Collector',
        desc: 'A custom-fabricated tooling component designed to collect and organize wires during production processes. It helps maintain proper wire positioning and supports efficient, orderly operation.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Bending Machine',
        desc: 'A machine used for accurately bending metal sheets, plates, and other materials to the required shape and angle for tooling and fabrication applications.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Bosch Jig Maker',
        desc: 'A custom-fabricated tooling fixture used to accurately position, hold, and support components during production. Designed to improve precision, consistency, and efficiency in assembly operations.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: PenTool,
        title: 'Bosch Jig',
        desc: 'A custom-fabricated tooling fixture designed to securely hold and position components during assembly or production processes. It helps ensure accurate positioning, consistent results, and efficient operation.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: PenTool,
        title: 'Buffing Jig',
        desc: 'A custom-fabricated tooling fixture designed to securely hold and position workpieces during buffing operations. It helps maintain consistent positioning, improve work efficiency, and support uniform finishing results.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Factory,
        title: 'Cadex Offline Battery Charger',
        desc: 'A battery charging system designed to safely charge and maintain rechargeable batteries, providing reliable power for testing, maintenance, and equipment operations.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Cavitation Tray',
        desc: 'A custom-fabricated tray designed to securely hold and organize components during cavitation or cleaning processes. It helps ensure proper positioning, handling, and consistent processing of parts.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Cleaning Stage',
        desc: 'A custom-fabricated tray designed to securely hold and position parts during the cleaning stage. It helps ensure proper handling and consistent cleaning of components.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Cog,
        title: 'Coupling',
        desc: 'A mechanical component used to connect two shafts and transmit rotational power between them while helping accommodate minor misalignment.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Cover Jig',
        desc: 'A custom fixture used to securely hold and position covers during assembly, inspection, or fabrication, ensuring proper alignment and consistent results.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Wrench,
        title: 'Feeler Gauge',
        desc: 'A precision measuring tool used to check and measure small gaps or clearances between components. It helps ensure accurate fitting and proper assembly.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Generic Roller Press Jig',
        desc: 'A custom jig designed to securely hold and guide components during roller pressing operations, ensuring proper positioning and consistent results.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: PenTool,
        title: 'Jigs',
        desc: 'A custom jig designed to securely hold and guide components during roller pressing operations, ensuring proper positioning and consistent results.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Factory,
        title: 'Lathe Machine',
        desc: 'A machine tool used to rotate a workpiece while cutting, shaping, or finishing it to achieve the required dimensions and form.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Location Jig',
        desc: 'A custom fixture used to accurately position and hold components in place during assembly, machining, or fabrication processes, ensuring proper alignment and consistent results.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Factory,
        title: 'Magazine Stand',
        desc: 'A support structure designed to securely hold and organize magazines or workpieces, providing easy access and proper positioning during production or handling processes.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Main Lens Removing Jig',
        desc: 'A custom jig designed to securely hold and position the component while removing the main lens, helping ensure safe, controlled, and consistent removal.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: PenTool,
        title: 'MB 180 Flex Alignment & Press',
        desc: 'A specialized fixture designed to accurately align and press flexible components, ensuring proper positioning and consistent assembly during production.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Factory,
        title: 'Microscope Stand',
        desc: 'A custom-fabricated stand designed to securely hold and support microscopes during inspection and assembly operations.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'MX Machine Cover',
        desc: 'A custom-fabricated cover designed to protect the machine and its components from dust, debris, and other external elements.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Outer Guide Plate',
        desc: 'A custom-fabricated plate designed to guide and properly position components during machine operation.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Cog,
        title: 'Plunger',
        desc: 'A precision-fabricated component designed to provide controlled pushing, positioning, or movement within a machine or tooling assembly.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Wrench,
        title: 'Probe Card Modification',
        desc: 'Custom modification of probe cards to meet specific testing, alignment, and equipment requirements.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Quick Loader',
        desc: 'A custom-fabricated tooling component designed to support faster and more efficient loading and unloading of parts or materials.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Wrench,
        title: 'Rasco Shim',
        desc: 'A precision-fabricated shim used for proper alignment, spacing, and positioning of machine or tooling components.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Reflow Pallet',
        desc: 'A custom-fabricated fixture designed to securely hold and position components during the reflow soldering process.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Factory,
        title: 'Roller Tube Tray',
        desc: 'A custom-fabricated tray designed to securely hold and organize roller tubes during handling and processing.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Stone Holder Arm 6301',
        desc: 'A custom-fabricated arm designed to securely hold and position a stone or abrasive component during machine operation.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Factory,
        title: 'Surface Grinder',
        desc: 'A precision machine used to grind and finish metal surfaces to achieve accurate dimensions and smooth, even finishes.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Thunder Bolt Tester Jig',
        desc: 'A custom-fabricated jig designed to securely hold and position components during testing and inspection.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: PenTool,
        title: 'TOWA Strip Flattener',
        desc: 'A custom-fabricated tooling fixture designed to flatten and properly align strips for consistent processing.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: PenTool,
        title: 'TPH LCD Combo Jig',
        desc: 'A custom-fabricated jig designed to securely hold and accurately position LCD components during assembly and testing.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Factory,
        title: 'Tube Loader and Unloader',
        desc: 'A custom-fabricated tooling system designed for efficient loading and unloading of tubes during production and handling processes.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Vertical Milling Machine',
        desc: 'A precision machine used to cut, drill, and shape metal components to achieve accurate dimensions and specifications.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Cog,
        title: 'X308 Slaveboard',
        desc: 'A custom-fabricated board used to support communication, control, or interface functions within a machine or equipment system.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Cog,
        title: 'X556 Slaveboard',
        desc: 'A custom-fabricated board designed to support control, communication, and interface functions within a machine or equipment system.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Agitator Machine',
        desc: 'A fabricated mechanical unit designed to mix, blend, or circulate materials efficiently. Built with durable metal components for reliable operation in industrial processing applications.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PenTool,
        title: 'Checking Jig',
        desc: 'A precision-fabricated tool used to check the dimensions, position, alignment, and condition of parts to ensure they meet required specifications.',
        image: 'https://www.hlc-metalparts.com/uploads/39640/news/20250523162359d2b22.jpg?size=800x0',
      },
      {
        icon: Factory,
        title: 'Corner Preparation & Sink Table',
        desc: 'A fabricated worktable designed for efficient corner preparation and sink-related assembly or finishing tasks. Built for durability, stability, and convenient workspace use.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Ducting',
        desc: 'Fabricated metal components designed to provide a controlled pathway for the distribution, ventilation, or exhaust of air and other gases within industrial and facility systems.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'ESD Integrator Box',
        desc: 'A fabricated enclosure designed to house and organize ESD (Electrostatic Discharge) control components, providing protection, proper arrangement, and easy access for maintenance.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Food Cart',
        desc: 'A fabricated mobile unit designed for food preparation, storage, and serving. Built with durable materials for practical and efficient use in commercial or industrial settings.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Cog,
        title: 'Gripper Lifter Arm',
        desc: 'A fabricated mechanical arm designed to securely grip, lift, and position components or materials. Built for controlled handling and efficient movement in industrial applications.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'HAAS TM-1P',
        desc: 'A precision CNC milling machine designed for machining and fabricating metal components. Suitable for drilling, cutting, and milling operations requiring accurate and consistent results.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'HAAS TM-2P',
        desc: 'A precision CNC milling machine designed for machining and fabricating metal components. It is suitable for milling, drilling, and other precision machining operations.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Heater Coil',
        desc: 'A fabricated heating element designed to generate and transfer heat efficiently for industrial heating applications. Built for reliable and consistent thermal performance.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Hision TC25',
        desc: 'A precision CNC turning machine designed for accurate machining of metal components. It is suitable for turning, cutting, and other machining operations requiring consistent dimensions and finish.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Louver',
        desc: 'A fabricated metal component designed to allow controlled airflow while helping protect openings from rain, debris, and other external elements. Commonly used for ventilation and industrial applications.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Machine Cover',
        desc: 'A fabricated protective enclosure designed to cover and safeguard machine components from dust, debris, accidental contact, and other external elements.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Mazak VC-EZ 410 IP',
        desc: 'A CNC vertical machining center designed for precise and efficient machining of metal components. It is suitable for milling, drilling, tapping, and other precision machining operations.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'N2 Cabinet',
        desc: 'A fabricated enclosure designed for the safe storage and controlled distribution of nitrogen gas and related components. Built for organized, secure, and accessible industrial use.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'N2 Pushcart',
        desc: 'A fabricated mobile cart designed for the safe and convenient transport of nitrogen gas cylinders. Built for stability, durability, and easy handling in industrial environments.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Pass Thru Box',
        desc: 'A fabricated enclosure designed for the controlled transfer of materials between two areas while helping maintain cleanliness and separation between spaces. Commonly used in cleanroom and controlled environments.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Pigeon Hole',
        desc: 'A fabricated storage unit with multiple compartments designed for organized storage of documents, tools, materials, or small items. Built for efficient and accessible organization.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Pulverizer',
        desc: 'A fabricated machine designed to crush, grind, or reduce materials into smaller particles for easier processing and handling. Built for efficient and consistent material size reduction.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Push Cart',
        desc: 'A fabricated mobile cart designed for the convenient transport and handling of materials, tools, or equipment within industrial and work areas. Built for durability and easy maneuverability.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Reservoir Tank',
        desc: 'A fabricated tank designed to store and supply liquids for industrial processes and equipment. Built for durability, reliable storage, and efficient fluid handling.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Roof Ventilator',
        desc: 'A fabricated ventilation unit designed to improve airflow and remove heat, moisture, and stale air from indoor spaces. Suitable for industrial and facility applications.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Wrench,
        title: 'Step Ladder',
        desc: 'A fabricated access tool designed to provide safe and stable elevation for reaching elevated areas during maintenance, installation, and other work activities.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Table Top Rack',
        desc: 'A fabricated storage rack designed to organize and hold tools, materials, or small components on a worktable or workstation. Built for convenient access and efficient use of workspace.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Tsugami VA-3',
        desc: 'A precision CNC machining machine designed for accurate and efficient machining of metal components. Suitable for milling, drilling, and other precision machining operations.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Factory,
        title: 'Whip Rack',
        desc: 'A fabricated storage rack designed to organize and securely hold whips, cables, hoses, or similar flexible materials. Built for easy access and efficient workspace organization.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Cog,
        title: 'XYZ Robot',
        desc: 'A fabricated automated mechanism designed for precise movement and positioning along the X, Y, and Z axes. Suitable for material handling, assembly, dispensing, and other industrial automation applications.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  //warehouse
  {
    icon: Warehouse,
    title: 'Warehouses',
    slug: 'warehouses',
    intro:
      'Warehouse design, build, and materials handling systems sized to your throughput.',
    services: [
      {
        icon: Warehouse,
        title: 'PBTS Warehouse - Palihan, Hermosa, Bataan',
        desc: 'PBTS Warehouse in Bataan is an industrial warehouse facility built to support PBTS\'s storage, handling, and distribution needs for one of its branch operations. The project was carried out from the ground up, starting with structural steel erection and roof framing, followed by floor decking and exterior cladding installation, through to interior fit-out.\nThe completed facility features a steel-frame structure with metal roofing and wall cladding, multiple truck loading bay entrances, and a wide paved concrete yard for vehicle access and maneuvering. Interior spaces were finished to accommodate both warehouse operations and office use, reflecting PBTS\'s capability in warehouse design and build from construction through completion.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: PackageSearch,
        title: 'Warehouse Loading Bay – Calamba, Laguna',
        desc: 'This project involved the construction of a warehouse loading bay facility in Calamba, Laguna, designed to support the client\'s goods handling and distribution operations. The facility features a covered loading dock with multiple dock leveler bays for truck loading and unloading, a steel-frame canopy structure providing weather protection for staging areas, and ample space for pallet storage and forklift operations.\nThis project reflects our capability in warehouse and loading bay construction, delivering practical, well-organized facilities designed for efficient logistics and material handling.',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  //civil/structural
  {
    icon: Building2,
    title: 'Civil/Structural',
    slug: 'civil-structural',
    intro:
      'Structural design and civil works that form the backbone of industrial facilities.',
    services: [
      {
        icon: Building2,
        title: 'Administration Building',
        desc: 'Groundwork and structural framing to exterior finishing and interior fit-out for a low-rise administrative facility.',
        image: 'https://images.unsplash.com/photo-1541976590-713941681591?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: HardHat,
        title: 'Security and Maintenance Building',
        desc: 'Structural work and interior fit-out delivering a facility to support security and maintenance operations.',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Ruler,
        title: 'Enclave Model House',
        desc: 'Structural framing, multi-level buildup, and exterior architectural finishing for a residential model house.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: ClipboardCheck,
        title: 'Covered Walkway with Solar lights',
        desc: 'Steel-frame canopy with metal roofing and integrated solar-powered lighting for pedestrian weather protection.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Building2,
        title: 'Renovation of Comfort Room',
        desc: 'Upgrading and modernizing restroom facilities with updated stalls, communal sink counters, and lighting fixtures.',
        image: 'https://images.unsplash.com/photo-1541976590-713941681591?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: HardHat,
        title: 'Document Storage',
        desc: 'Steel-frame structure with metal wall cladding and high ceilings designed for secure and spacious records storage.',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Ruler,
        title: 'Installation of Racking System',
        desc: 'Heavy-duty multi-level steel shelving and mesh flooring walkways designed to maximize vertical warehouse space.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  //electrical
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
        image: 'https://www.unicornglobalautomations.com/wp-content/uploads/2023/08/Power-Distribution-Panel-Setup.jpg',
      },
      {
        icon: Gauge,
        title: 'Motor Control Centers',
        desc: 'MCC design, assembly, and commissioning for large motor loads.',
        image: 'https://static.wixstatic.com/media/bf1918_6d1ad9a5cbab4d0eb4e5ef0f0aa3df0d~mv2.webp/v1/fill/w_560,h_318,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.webp',
      },
      {
        icon: ShieldCheck,
        title: 'Electrical Safety Audits',
        desc: 'Compliance inspections and safety audits for electrical systems.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&h=480&fit=crop&auto=format&q=70',
      },
    ],
  },
  //architecture
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
  //mechanical
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
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLQVFkqI9RzKPsqsYETk9pIbsLowz8WaCZLSf_Yvu0-9Ul6eA0LFdyJU&s=10',
      },
      {
        icon: Cog,
        title: 'Motor & Gearbox Repair',
        desc: 'Repair and rebuild services for motors, gearboxes, and rotating equipment.',
        image: 'https://renown-electric.com/wp-content/uploads/2025/10/July-23-2013-157-scaled1.jpg',
      },
      {
        icon: Layers,
        title: 'Piping Systems',
        desc: 'Process piping design, fabrication, and installation.',
        image: 'https://meritusgas.com/wp-content/uploads/2023/05/gas-pipes-at-refinery-plant-1.jpg',
      },
    ],
  },
  //landscaping
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
        image: 'https://images.unsplash.com/photo-1780389098001-e641e50aeebd?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Flower2,
        title: 'Grounds Design',
        desc: 'Grounds and hardscape design for corporate and industrial sites.',
        image: 'https://images.unsplash.com/photo-1743178207584-4a0c1109975e?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Sun,
        title: 'Landscape Maintenance',
        desc: 'Ongoing upkeep to keep facility grounds presentable year-round.',
        image: 'https://images.unsplash.com/photo-1779636489740-6077a4198be6?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: Droplets,
        title: 'Irrigation Systems',
        desc: 'Irrigation design and installation sized to the site and planting.',
        image: 'https://images.unsplash.com/photo-1453539263483-01e088416133?w=640&h=480&fit=crop&auto=format&q=70',
      },
      {
        icon: LayoutGrid,
        title: 'Hardscape Installation',
        desc: 'Paving, walkways, and hardscape installation for facility grounds.',
        image: 'https://images.unsplash.com/photo-1657045898661-1a56bc5a8fd2?w=640&h=480&fit=crop&auto=format&q=70',
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
