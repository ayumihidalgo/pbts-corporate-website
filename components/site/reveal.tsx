'use client'

/**
 * Scroll-in animation used by every section. Same props as before
 * (className, delay in ms, as) so existing <Reveal> usages keep working.
 *
 * Now powered by Motion instead of the `.reveal` / `.in-view` CSS classes:
 * the element fades and rises into place once, the first time it enters the
 * viewport. Reduced-motion visitors get a plain fade (see motion-provider.tsx).
 *
 * Motion resets the transform to `none` when the animation ends, so the
 * WebKit rounded-clip workaround on cards inside a Reveal still holds.
 */

import type { ReactNode } from 'react'
import { motion } from 'motion/react'

const tags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  span: motion.span,
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  y = 24,
}: {
  children: ReactNode
  className?: string
  /** milliseconds, same as before */
  delay?: number
  as?: keyof typeof tags
  /** how far (px) it rises from — 0 for a pure fade */
  y?: number
}) {
  // all four share the same props for what we use here
  const Comp = tags[as] as typeof motion.div

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </Comp>
  )
}
