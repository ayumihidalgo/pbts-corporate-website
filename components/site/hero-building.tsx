'use client'

/**
 * Hero version of the 3D steel-frame building: assembles the SHELL on a
 * timer (setting out → cladding, ~9 s), then turns slowly and follows the
 * mouse. The full timeline with MEP and the production line plays in the
 * scroll story (build-story.tsx). Both share steel-frame/plan.ts + scene.tsx.
 *
 * Load this ONLY through hero.tsx (dynamic import, desktop only): it's about
 * 250 KB of gzipped JS (three.js + R3F), fetched after the page is already
 * interactive. Phones and reduced-motion visitors never download it.
 */

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HERO_END, HERO_PHASES, NAVY } from './steel-frame/plan'
import { SteelFrame } from './steel-frame/scene'

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3)
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

function Building({
  runId,
  pointer,
  onPhase,
}: {
  runId: number
  pointer: React.RefObject<{ x: number; y: number }>
  onPhase: (i: number, done: boolean) => void
}) {
  const group = useRef<THREE.Group>(null)
  const t0 = useRef<number | null>(null)
  const lastPhase = useRef(-2)
  const look = useRef({ x: 0, y: 0 })

  // replay: restart the clock
  useEffect(() => {
    t0.current = null
    lastPhase.current = -2
  }, [runId])

  // seconds since start, held just past the end of the shell
  const elapsed = (clock: number) => {
    if (t0.current === null) t0.current = clock
    return clock - t0.current
  }

  useFrame((state, delta) => {
    const t = elapsed(state.clock.elapsedTime)

    // phase readout for the HUD (only notifies on change)
    let phase = -1
    HERO_PHASES.forEach((ph, i) => {
      if (t >= ph.at) phase = i
    })
    const done = t >= HERO_END
    const code = done ? 99 : phase
    if (code !== lastPhase.current) {
      lastPhase.current = code
      onPhase(phase, done)
    }

    // slow turn while building, then a gentle idle sway + mouse follow
    const build = easeOut(clamp01(t / HERO_END))
    const p = pointer.current ?? { x: 0, y: 0 }
    look.current.x += (p.x - look.current.x) * Math.min(1, delta * 2.5)
    look.current.y += (p.y - look.current.y) * Math.min(1, delta * 2.5)
    if (group.current) {
      group.current.rotation.y = -0.9 + build * 0.55 + Math.sin(t * 0.12) * 0.08 * build + look.current.x * 0.14
    }

    // keep the whole building in frame on narrower/taller canvases
    const aspect = state.size.width / Math.max(1, state.size.height)
    const k = Math.max(1, 1.4 / aspect)
    const cam = state.camera
    cam.position.set(56 * k, (27 - look.current.y * 4) * k, 64 * k)
    cam.lookAt(5, 3.5, 5)
    // fog moves back with the camera so the model never dims on tall screens
    const fog = state.scene.fog
    if (fog instanceof THREE.Fog) {
      fog.near = 85 * k
      fog.far = 170 * k
    }
  })

  return (
    <group ref={group}>
      {/* the hero only ever shows the shell: clamp before the MEP stage */}
      <SteelFrame getT={(state) => Math.min(elapsed(state.clock.elapsedTime), HERO_END + 0.1)} />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* public component                                                    */
/* ------------------------------------------------------------------ */

export default function HeroBuilding({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)
  const [phase, setPhase] = useState(-1)
  const [done, setDone] = useState(false)
  const [runId, setRunId] = useState(0)

  // pause rendering when the hero is scrolled out of view
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // mouse position across the whole window (the canvas sits behind the text)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={wrap}
      className={className}
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 900ms ease' }}
    >
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [56, 27, 64], fov: 30, near: 1, far: 400 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.Fog(NAVY, 85, 170)
          setReady(true)
        }}
        aria-hidden="true"
      >
        <Building
          runId={runId}
          pointer={pointer}
          onPhase={(i, d) => {
            setPhase(i)
            setDone(d)
          }}
        />
      </Canvas>

      {/* drawing annotations */}
      <div className="pointer-events-none absolute right-6 top-28 hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/40 xl:block">
        <div>Pre-engineered building</div>
        <div>6 bays × 6 m · 24 m clear span</div>
        <div className="text-white/25">Illustrative model</div>
      </div>

      {/* build sequence */}
      <div className="absolute bottom-8 right-6 w-56 font-mono text-[10px] uppercase tracking-[0.18em]">
        <ol className="space-y-1.5">
          {HERO_PHASES.map((ph, i) => {
            const state = done || i < phase ? 'done' : i === phase ? 'now' : 'todo'
            return (
              <li key={ph.label} className="flex items-center gap-2.5">
                <span
                  className={
                    state === 'todo'
                      ? 'size-1.5 rounded-full bg-white/15'
                      : state === 'now'
                        ? 'size-1.5 rounded-full bg-orange shadow-[0_0_0_4px_rgba(244,123,42,0.2)]'
                        : 'size-1.5 rounded-full bg-orange/70'
                  }
                />
                <span className={state === 'todo' ? 'text-white/25' : state === 'now' ? 'text-white' : 'text-white/55'}>
                  {String(i + 1).padStart(2, '0')} {ph.label}
                </span>
              </li>
            )
          })}
        </ol>
        <button
          type="button"
          onClick={() => {
            setDone(false)
            setPhase(-1)
            setRunId((r) => r + 1)
          }}
          className={`mt-3 rounded-full border border-white/15 px-3 py-1 text-white/60 transition-opacity hover:border-orange hover:text-white ${done ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          ↻ Replay build
        </button>
      </div>
    </div>
  )
}
