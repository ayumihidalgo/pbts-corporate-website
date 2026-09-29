'use client'

/**
 * Sticky Call / Enquire bar for phones (hidden from 640px up).
 * - appears once the visitor has scrolled past most of the hero
 * - hides while the Contact section or the footer is on screen (it would
 *   just duplicate them, and shouldn't cover the footer links)
 * - sits under the cookie banner (z-90) so it never blocks the consent buttons
 */

import { useEffect, useState } from 'react'
import { MessageSquare, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

// Same main line as contact.tsx / cta-banner.tsx
const MAIN_TEL = '+63285525131'

export function MobileActionBar() {
  const [pastHero, setPastHero] = useState(false)
  const [nearContact, setNearContact] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const targets = [document.getElementById('contact'), document.querySelector('footer')].filter(
      (el): el is HTMLElement => el !== null,
    )
    const visible = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
      }
      setNearContact(visible.size > 0)
    })
    targets.forEach((t) => io.observe(t))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const show = pastHero && !nearContact

  return (
    <div
      aria-hidden={!show}
      className={cn(
        'fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-white/95 px-4 pt-3 shadow-[0_-8px_24px_-12px_rgba(19,32,59,0.35)] backdrop-blur transition-transform duration-300 motion-reduce:transition-none sm:hidden',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
    >
      <div className="flex gap-2.5">
        <a
          href={`tel:${MAIN_TEL}`}
          tabIndex={show ? 0 : -1}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-navy/15 bg-white py-3 text-sm font-semibold text-navy"
        >
          <Phone className="size-4 text-orange" />
          Call
        </a>
        <a
          href="#contact"
          tabIndex={show ? 0 : -1}
          className="inline-flex flex-[1.4] items-center justify-center gap-2 rounded-xl bg-orange py-3 text-sm font-semibold text-orange-foreground"
        >
          <MessageSquare className="size-4" />
          Enquire now
        </a>
      </div>
    </div>
  )
}
