'use client'

import { useEffect, useState } from 'react'

// Matches Tailwind's `sm` breakpoint (640px) — treats anything narrower as
// "mobile" for the purpose of showing tap-to-call phone links. This is a
// viewport-width check, not real telephony-capability detection (browsers
// don't expose one) — it's the standard, universal way sites do
// click-to-call, but it means a narrow desktop window could trigger
// "mobile" mode, and a wide tablet in landscape could show the desktop
// version. Defaults to `false` so server-rendered and first client-side
// output always match (no hydration mismatch) — it only flips after
// mount, once we can safely read the real viewport.
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isMobile
}
