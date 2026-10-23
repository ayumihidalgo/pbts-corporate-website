'use client'

/**
 * Renders the building from plan.ts at a given point on the build timeline.
 * Must be used inside a React Three Fiber <Canvas>.
 *
 *   <SteelFrame getT={(state) => seconds} />
 *
 * The parent decides where `t` comes from (a clock in the hero, scroll
 * position in the story) and owns the camera. Nothing here allocates per
 * frame: the meshes are built once and only their scale/opacity change.
 */

import { useEffect, useMemo } from 'react'
import { useFrame, type RootState } from '@react-three/fiber'
import * as THREE from 'three'
import { AGV_AT, ORANGE, STEEL, buildPlan } from './plan'

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3)
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const UP = new THREE.Vector3(0, 1, 0)

type Anim =
  | { kind: 'member'; obj: THREE.Mesh; start: number; dur: number }
  | {
      kind: 'sheet'
      fill: THREE.MeshBasicMaterial
      edge: THREE.LineBasicMaterial
      rib: THREE.LineBasicMaterial
      start: number
      dur: number
    }

export function SteelFrame({
  getT,
  clip,
}: {
  getT: (state: RootState) => number
  /** optional: only draw the part in front of this plane (render sweep) */
  clip?: THREE.Plane
}) {
  const { root, anims, agv, allMats, dispose } = useMemo(() => {
    const root = new THREE.Group()
    const anims: Anim[] = []
    const geos: THREE.BufferGeometry[] = []
    const mats = new Map<string, THREE.MeshBasicMaterial>()
    const extraMats: THREE.Material[] = []
    const { members, sheets } = buildPlan()

    // ground grid
    const grid = new THREE.GridHelper(180, 90, STEEL, STEEL)
    const gm = grid.material as THREE.Material
    gm.transparent = true
    gm.opacity = 0.07
    gm.depthWrite = false
    root.add(grid)
    extraMats.push(gm)
    geos.push(grid.geometry)

    for (const mb of members) {
      const a = new THREE.Vector3(...mb.a)
      const b = new THREE.Vector3(...mb.b)
      const dir = b.clone().sub(a)
      const len = dir.length()
      const geo = new THREE.BoxGeometry(mb.t, len, mb.t)
      geo.translate(0, len / 2, 0) // grows from its start point
      geos.push(geo)
      const key = `${mb.color}/${mb.opacity}`
      let mat = mats.get(key)
      if (!mat) {
        mat = new THREE.MeshBasicMaterial({
          color: mb.color,
          transparent: mb.opacity < 1,
          opacity: mb.opacity,
          depthWrite: mb.opacity >= 0.9,
        })
        mats.set(key, mat)
      }
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(a)
      mesh.quaternion.setFromUnitVectors(UP, dir.normalize())
      mesh.scale.set(1, 0.0001, 1)
      mesh.visible = false
      root.add(mesh)
      anims.push({ kind: 'member', obj: mesh, start: mb.start, dur: mb.dur })
    }

    for (const sh of sheets) {
      const pts = sh.pts.map((p) => new THREE.Vector3(...p))
      const pos: number[] = []
      for (let i = 1; i < pts.length - 1; i++) pos.push(...pts[0].toArray(), ...pts[i].toArray(), ...pts[i + 1].toArray())
      const fillGeo = new THREE.BufferGeometry()
      fillGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      const fill = new THREE.MeshBasicMaterial({
        color: STEEL,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      const edgeGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const edge = new THREE.LineBasicMaterial({ color: STEEL, transparent: true, opacity: 0 })
      const ribGeo = new THREE.BufferGeometry().setFromPoints(
        sh.ribs.flatMap(([a, b]) => [new THREE.Vector3(...a), new THREE.Vector3(...b)]),
      )
      const rib = new THREE.LineBasicMaterial({ color: STEEL, transparent: true, opacity: 0 })
      root.add(new THREE.Mesh(fillGeo, fill))
      root.add(new THREE.LineLoop(edgeGeo, edge))
      root.add(new THREE.LineSegments(ribGeo, rib))
      geos.push(fillGeo, edgeGeo, ribGeo)
      extraMats.push(fill, edge, rib)
      anims.push({ kind: 'sheet', fill, edge, rib, start: sh.start, dur: sh.dur })
    }

    // AGV: a small cart that shuttles along its marked lane once the line is in
    const agvGeo = new THREE.BoxGeometry(1.8, 0.6, 1.1)
    const agvMat = new THREE.MeshBasicMaterial({ color: ORANGE })
    const agv = new THREE.Mesh(agvGeo, agvMat)
    agv.position.set(-12, 0.35, 7)
    agv.visible = false
    root.add(agv)
    geos.push(agvGeo)
    extraMats.push(agvMat)

    const allMats: THREE.Material[] = [...mats.values(), ...extraMats]
    const dispose = () => {
      geos.forEach((g) => g.dispose())
      allMats.forEach((m) => m.dispose())
    }
    return { root, anims, agv, allMats, dispose }
  }, [])

  useEffect(() => dispose, [dispose])

  useEffect(() => {
    allMats.forEach((m) => {
      m.clippingPlanes = clip ? [clip] : null
    })
  }, [allMats, clip])

  useFrame((state) => {
    const t = getT(state)
    for (const a of anims) {
      const p = easeOut(clamp01((t - a.start) / a.dur))
      if (a.kind === 'member') {
        a.obj.visible = p > 0
        a.obj.scale.y = Math.max(p, 0.0001)
      } else {
        a.fill.opacity = 0.11 * p
        a.edge.opacity = 0.4 * p
        a.rib.opacity = 0.16 * p
      }
    }
    const on = clamp01((t - AGV_AT) / 0.4)
    agv.visible = on > 0
    agv.scale.setScalar(Math.max(on, 0.0001))
    // drives on its own clock so it keeps moving while the scroll rests
    const s = 0.5 - 0.5 * Math.cos(state.clock.elapsedTime * 0.45)
    agv.position.x = -12 + 24 * s
  })

  return <primitive object={root} />
}
