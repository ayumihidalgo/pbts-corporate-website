'use client'

/**
 * Site-wide Motion settings. Wrap {children} in app/layout.tsx with this once.
 *
 * reducedMotion="user" — visitors who turn on "Reduce motion" in their OS get
 * fades only: no slides, zooms, or scroll-linked movement. Every animated
 * component on the site inherits this, so none of them need their own check.
 */

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  )
}
