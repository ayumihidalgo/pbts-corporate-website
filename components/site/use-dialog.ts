'use client'

/**
 * Shared behaviour for pop-up dialogs (Legal, Certificate):
 *   - locks page scroll while open (restores the previous value after)
 *   - Escape closes
 *   - moves focus into the dialog, and back to the button that opened it
 *
 *   const panelRef = useDialog(open, onClose)
 *   <div ref={panelRef} tabIndex={-1} role="dialog" …>
 */

import { useEffect, useRef } from 'react'

export function useDialog<T extends HTMLElement = HTMLDivElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null)
  // keep the latest onClose without re-running the effect on every render
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // focus after the enter animation has started
    const t = window.setTimeout(() => ref.current?.focus({ preventScroll: true }), 30)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.({ preventScroll: true })
    }
  }, [open])

  return ref
}
