/**
 * Faint engineering-drawing grid (minor + major lines), faded out at the
 * edges. A quiet construction/blueprint signature used behind the hero,
 * Projects and the CTA banner. Pure CSS: no images, no runtime cost.
 *
 * Place inside a `relative` parent:  <BlueprintGrid className="opacity-60" />
 */

import { cn } from '@/lib/utils'

export function BlueprintGrid({
  tone = 'dark',
  fade = 'radial',
  className,
}: {
  /** dark = white lines for navy sections; light = navy lines for white sections */
  tone?: 'dark' | 'light'
  /** radial = fades toward all edges; right = strongest on the right side */
  fade?: 'radial' | 'right'
  className?: string
}) {
  const minor = tone === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(19,32,59,0.05)'
  const major = tone === 'dark' ? 'rgba(255,255,255,0.09)' : 'rgba(19,32,59,0.08)'
  const mask =
    fade === 'radial'
      ? 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)'
      : 'linear-gradient(to right, transparent 10%, black 70%)'

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage: [
          `linear-gradient(${major} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${major} 1px, transparent 1px)`,
          `linear-gradient(${minor} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${minor} 1px, transparent 1px)`,
        ].join(','),
        backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  )
}
