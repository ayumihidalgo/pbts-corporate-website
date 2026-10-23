'use client'

/**
 * Smooth "gliding" page scroll (Lenis), the feel of cinematic scroll sites.
 * Render <SmoothScroll /> once in app/layout.tsx.
 *
 *  - off for visitors with Reduce Motion (they keep native scrolling)
 *  - touch screens keep native scrolling (Lenis only smooths wheel/trackpad)
 *  - pauses automatically while a pop-up locks the page (body overflow hidden),
 *    so modals, the photo viewer and the mobile menu scroll normally
 *  - in-page #anchor links glide too, offset for the fixed navbar
 *
 * Use scrollToY() instead of window.scrollTo when you need to scroll in code.
 */

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

let lenis: Lenis | null = null

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.4 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      anchors: { offset: -80 },
      // anything marked data-lenis-prevent scrolls natively (e.g. inner panels)
      prevent: (node) => !!node.closest?.('[data-lenis-prevent]'),
    })
    lenis = instance

    const sync = () => (document.body.style.overflow === 'hidden' ? instance.stop() : instance.start())
    const mo = new MutationObserver(sync)
    mo.observe(document.body, { attributes: true, attributeFilter: ['style'] })

    return () => {
      mo.disconnect()
      instance.destroy()
      lenis = null
    }
  }, [])

  return null
}
