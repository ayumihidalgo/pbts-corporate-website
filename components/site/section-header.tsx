/**
 * The eyebrow + heading + intro block every section opens with.
 * One component instead of the same ~12 lines copied into each section,
 * so spacing and type sizes stay identical site-wide.
 *
 *   <SectionHeader eyebrow="Core Services" title="End-to-end engineering…" intro="…" />
 *   <SectionHeader tone="dark" align="left" … />   // navy sections (Projects)
 *   <SectionHeader size="sm" … />                    // smaller heading (Certifications)
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'light',
  size = 'lg',
  className,
  children,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'center' | 'left'
  tone?: 'light' | 'dark'
  size?: 'lg' | 'sm'
  className?: string
  /** extra content under the intro (buttons, chips…) */
  children?: ReactNode
}) {
  const dark = tone === 'dark'
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
        {/* short rule = drafting/construction-line motif, used site-wide */}
        <span aria-hidden="true" className="h-px w-6 bg-orange/70" />
        {eyebrow}
        {align === 'center' && <span aria-hidden="true" className="h-px w-6 bg-orange/70" />}
      </span>
      <h2
        className={cn(
          'mt-4 font-display font-bold tracking-tight text-balance',
          dark ? 'text-white' : 'text-navy',
          size === 'lg' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-5 text-lg text-pretty',
            dark ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
      {children}
    </Reveal>
  )
}
