'use client'

/**
 * The 3D part of the scroll story. Loaded lazily by build-story.tsx when the
 * section gets near the viewport.
 *
 * Scroll progress (0 → 1) is split into 7 equal chapters:
 *   1–5  the blueprint builds (groundwork → production line). In each
 *        chapter the build timeline plays for the first 80%, then holds.
 *   6    Handover: the RENDER SWEEP. An orange scan plane crosses the site;
 *        behind it the blueprint becomes the finished, sunlit facility
 *        (realistic.tsx) and the sky turns from navy to daylight.
 *   7    Support: the rendered facility, slow camera orbit.
 *
 * The camera flies between one keyframe per chapter boundary, orbiting the
 * building (never through it).
 */

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { MotionValue } from 'motion/react'
import * as THREE from 'three'
import { NAVY, T_END } from './steel-frame/plan'
import { SteelFrame } from './steel-frame/scene'
import { RealisticFacility } from './steel-frame/realistic'

/** build-timeline span (seconds) per chapter, see plan.ts */
export const CHAPTER_T: [number, number][] = [
  [0, 1.6], // groundwork
  [1.6, 7.0], // steel frame
  [7.0, 9.2], // enclosure
  [9.2, 12.5], // power & services
  [12.5, 14.2], // production line
  [T_END, T_END], // handover (render sweep)
  [T_END, T_END], // support
]
const RENDER_CHAPTER = 5

/** camera at each chapter boundary: angle around the building (deg), distance, height, look-at */
const KEYS: { ang: number; r: number; h: number; tgt: [number, number, number] }[] = [
  { ang: 52, r: 40, h: 15, tgt: [-2, 0, 0] },
  { ang: 34, r: 48, h: 11, tgt: [0, 2, 0] },
  { ang: 48, r: 70, h: 28, tgt: [0, 4, 0] },
  { ang: -130, r: 68, h: 24, tgt: [0, 4, 0] },
  { ang: 30, r: 40, h: 10, tgt: [-6, 5, -2] },
  { ang: 22, r: 38, h: 8, tgt: [-4, 1.5, 2] },
  { ang: 36, r: 66, h: 13, tgt: [0, 5, 2] }, // hero shot of the rendered facility
  { ang: 68, r: 74, h: 19, tgt: [0, 4, 0] },
]

/** the sweep crosses this x range (covers the trees and parking too) */
const SWEEP = 62

const N = CHAPTER_T.length
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smooth = (v: number) => v * v * (3 - 2 * v)
const lerp = (a: number, b: number, f: number) => a + (b - a) * f
const NAVY_C = new THREE.Color(NAVY)
const HAZE_C = new THREE.Color('#dfe7ef')

function Rig({ progress }: { progress: MotionValue<number> }) {
  const u = useRef(progress.get() * N) // smoothed chapter position
  const tgt = useRef(new THREE.Vector3())
  const sweepMesh = useRef<THREE.Group>(null)

  // blueprint keeps x ≥ s; the rendered facility keeps x ≤ s
  const planes = useMemo(
    () => ({
      blueprint: new THREE.Plane(new THREE.Vector3(1, 0, 0), SWEEP),
      real: new THREE.Plane(new THREE.Vector3(-1, 0, 0), -SWEEP),
    }),
    [],
  )

  const uu = () => Math.min(N - 0.0001, Math.max(0, u.current))

  const timeline = () => {
    const v = uu()
    const i = Math.floor(v)
    const [a, b] = CHAPTER_T[i]
    return lerp(a, b, clamp01((v - i) / 0.8))
  }

  /** 0 = blueprint, 1 = fully rendered */
  const render = () => {
    const v = uu()
    if (v < RENDER_CHAPTER) return 0
    if (v >= RENDER_CHAPTER + 1) return 1
    return smooth(clamp01((v - RENDER_CHAPTER - 0.08) / 0.75))
  }

  useFrame((state, delta) => {
    // ease toward the scroll position so even a fast flick feels like a camera move
    u.current += (progress.get() * N - u.current) * Math.min(1, delta * 4)
    const v = uu()

    /* camera */
    const i = Math.min(N - 1, Math.floor(v))
    const f = smooth(clamp01(v - i))
    const A = KEYS[i]
    const B = KEYS[i + 1]
    const aspect = state.size.width / Math.max(1, state.size.height)
    const k = Math.max(1, 1.3 / aspect) // portrait phones: pull back so it fits
    const ang = THREE.MathUtils.degToRad(lerp(A.ang, B.ang, f))
    const rad = lerp(A.r, B.r, f) * k
    const h = lerp(A.h, B.h, f) * Math.min(k, 1.25)
    const drift = Math.sin(state.clock.elapsedTime * 0.5) * 0.25 // a little "handheld" life
    const cam = state.camera as THREE.PerspectiveCamera
    cam.position.set(Math.cos(ang) * rad, h + drift, Math.sin(ang) * rad)
    tgt.current.set(lerp(A.tgt[0], B.tgt[0], f), lerp(A.tgt[1], B.tgt[1], f), lerp(A.tgt[2], B.tgt[2], f))
    cam.lookAt(tgt.current)
    const w = state.size.width
    const hh = state.size.height
    if (aspect > 1) cam.setViewOffset(w, hh, -w * 0.2, 0, w, hh)
    else cam.setViewOffset(w, hh, 0, hh * 0.16, w, hh)

    /* render sweep */
    const r = render()
    const s = lerp(-SWEEP, SWEEP, r)
    planes.blueprint.constant = -s
    planes.real.constant = s
    if (sweepMesh.current) {
      sweepMesh.current.visible = r > 0 && r < 1
      sweepMesh.current.position.x = s
    }

    /* atmosphere: navy blueprint fog → daylight haze */
    const fog = state.scene.fog
    if (fog instanceof THREE.Fog) {
      const e = smooth(Math.min(1, r * 1.4))
      fog.color.copy(NAVY_C).lerp(HAZE_C, e)
      fog.near = lerp(70 * k, 150, e)
      fog.far = lerp(170 * k, 520, e)
    }
  })

  return (
    <>
      <SteelFrame getT={timeline} clip={planes.blueprint} />
      <RealisticFacility clip={planes.real} getR={render} />
      {/* the scan plane: a soft orange sheet with a bright leading edge */}
      <group ref={sweepMesh} visible={false}>
        <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 12, 0]}>
          <planeGeometry args={[140, 24]} />
          <meshBasicMaterial
            color="#f47b2a"
            transparent
            opacity={0.26}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.18, 0.12, 140]} />
          <meshBasicMaterial color="#ffb37a" toneMapped={false} />
        </mesh>
        <mesh position={[0, 24, 0]}>
          <boxGeometry args={[0.12, 0.12, 140]} />
          <meshBasicMaterial color="#ffb37a" transparent opacity={0.6} toneMapped={false} />
        </mesh>
      </group>
    </>
  )
}

export default function BuildStoryCanvas({
  progress,
  active,
  onReady,
}: {
  progress: MotionValue<number>
  /** false = section off screen; rendering pauses */
  active: boolean
  onReady?: () => void
}) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [30, 15, 30], fov: 34, near: 0.5, far: 1500 }}
      onCreated={({ gl, scene }) => {
        gl.localClippingEnabled = true
        gl.toneMappingExposure = 1.15
        scene.fog = new THREE.Fog(NAVY, 70, 170)
        onReady?.()
      }}
      aria-hidden="true"
    >
      <Rig progress={progress} />
    </Canvas>
  )
}
