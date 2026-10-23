'use client'

/**
 * The "rendered" version of the building: the finished, sunlit facility that
 * replaces the blueprint behind the render sweep in the scroll story.
 *
 *  - the same steel members as plan.ts, as painted / galvanised steel
 *    (instanced, so hundreds of members cost only a few draw calls)
 *  - corrugated metal cladding and roof (procedural normal map), concrete
 *    dado and slab, an open roller-door bay so the production line shows
 *  - site: asphalt yard with markings, grass, trees, a truck at the dock,
 *    parked cars
 *  - sun with soft shadows, sky light, studio reflections, and a sky dome
 *    that fades from blueprint navy to daylight
 *
 * Every texture is drawn on a <canvas> at load: no image files to ship.
 * Everything is clipped by `clip` (a plane moved by the parent), so it only
 * appears behind the sweep.
 */

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { EAVE, NAVY, RIDGE, X0, Z, buildPlan, frames, type Kind, type V } from './plan'

/* ------------------------------------------------------------------ */
/* procedural textures                                                 */
/* ------------------------------------------------------------------ */

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, color = true) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  draw(c.getContext('2d')!)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.anisotropy = 4
  if (color) tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** noisy flat colour (concrete, asphalt, grass) */
const noise = (base: [number, number, number], amount: number, specks = 0) =>
  canvasTexture(256, 256, (g) => {
    const img = g.createImageData(256, 256)
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (Math.random() - 0.5) * amount
      img.data[i] = base[0] + n
      img.data[i + 1] = base[1] + n
      img.data[i + 2] = base[2] + n
      img.data[i + 3] = 255
    }
    g.putImageData(img, 0, 0)
    for (let k = 0; k < specks; k++) {
      g.fillStyle = `rgba(0,0,0,${0.05 + Math.random() * 0.08})`
      g.beginPath()
      g.arc(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 6, 0, Math.PI * 2)
      g.fill()
    }
  })

/** trapezoidal sheeting profile as a tangent-space normal map: 1 tile = 1 m, 4 ribs */
const corrugatedNormal = () =>
  canvasTexture(
    128,
    4,
    (g) => {
      const img = g.createImageData(128, 4)
      for (let x = 0; x < 128; x++) {
        const ph = ((x / 128) * 4) % 1 // position within one rib
        // flat pan, rising web, flat crown, falling web
        const slope = ph < 0.35 ? 0 : ph < 0.45 ? 0.85 : ph < 0.7 ? 0 : ph < 0.8 ? -0.85 : 0
        const len = Math.hypot(slope, 1)
        for (let y = 0; y < 4; y++) {
          const i = (y * 128 + x) * 4
          img.data[i] = ((slope / len) * 0.5 + 0.5) * 255
          img.data[i + 1] = 128
          img.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255
          img.data[i + 3] = 255
        }
      }
      g.putImageData(img, 0, 0)
    },
    false,
  )

const slats = () =>
  canvasTexture(64, 64, (g) => {
    g.fillStyle = '#cfd4da'
    g.fillRect(0, 0, 64, 64)
    for (let y = 0; y < 64; y += 8) {
      g.fillStyle = '#aeb5bd'
      g.fillRect(0, y, 64, 2)
    }
  })

const signTexture = () =>
  canvasTexture(512, 160, (g) => {
    g.fillStyle = NAVY
    g.fillRect(0, 0, 512, 160)
    g.fillStyle = '#ffffff'
    g.font = 'bold 92px Arial, Helvetica, sans-serif'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillText('PBTS', 256, 72)
    g.fillStyle = '#f47b2a'
    g.fillRect(176, 124, 160, 8)
  })

/* ------------------------------------------------------------------ */
/* geometry helpers                                                    */
/* ------------------------------------------------------------------ */

const UP = new THREE.Vector3(0, 1, 0)

/** convex polygon with explicit UVs (metres) → triangle fan */
function polygon(pts: V[], uvs: [number, number][]) {
  const pos: number[] = []
  const uv: number[] = []
  for (let i = 1; i < pts.length - 1; i++) {
    for (const k of [0, i, i + 1]) {
      pos.push(...pts[k])
      uv.push(...uvs[k])
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
  g.computeVertexNormals()
  return g
}

/** axis-aligned box mesh by min/max corners */
function block(min: V, max: V, mat: THREE.Material) {
  const g = new THREE.BoxGeometry(max[0] - min[0], max[1] - min[1], max[2] - min[2])
  const m = new THREE.Mesh(g, mat)
  m.position.set((min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2)
  m.castShadow = true
  m.receiveShadow = true
  return m
}

/* ------------------------------------------------------------------ */
/* the facility                                                        */
/* ------------------------------------------------------------------ */

function buildFacility() {
  const root = new THREE.Group()
  const disposables: { dispose: () => void }[] = []
  const keep = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x)

  // textures
  const ribs = keep(corrugatedNormal())
  const concreteMap = keep(noise([188, 184, 176], 26, 120))
  const asphaltMap = keep(noise([66, 70, 76], 22, 60))
  const grassMap = keep(noise([104, 132, 78], 30))
  concreteMap.repeat.set(0.25, 0.25)
  asphaltMap.repeat.set(0.12, 0.12)
  grassMap.repeat.set(0.05, 0.05)
  const slatMap = keep(slats())
  const sign = keep(signTexture())
  sign.wrapS = sign.wrapT = THREE.ClampToEdgeWrapping

  // materials
  const M = {
    paint: new THREE.MeshStandardMaterial({ color: '#34507a', roughness: 0.5, metalness: 0.35 }),
    galv: new THREE.MeshStandardMaterial({ color: '#a7b0b9', roughness: 0.38, metalness: 0.8 }),
    rod: new THREE.MeshStandardMaterial({ color: '#59606a', roughness: 0.5, metalness: 0.6 }),
    wall: new THREE.MeshStandardMaterial({ color: '#e8ebef', roughness: 0.42, metalness: 0.35, normalMap: ribs, side: THREE.DoubleSide }),
    roof: new THREE.MeshStandardMaterial({ color: '#cdd3da', roughness: 0.32, metalness: 0.6, normalMap: ribs, side: THREE.DoubleSide }),
    trim: new THREE.MeshStandardMaterial({ color: '#1f3352', roughness: 0.45, metalness: 0.3 }),
    concrete: new THREE.MeshStandardMaterial({ color: '#ffffff', map: concreteMap, roughness: 0.92 }),
    floor: new THREE.MeshStandardMaterial({ color: '#d9d6cf', map: concreteMap, roughness: 0.55 }),
    asphalt: new THREE.MeshStandardMaterial({ color: '#ffffff', map: asphaltMap, roughness: 0.95 }),
    grass: new THREE.MeshStandardMaterial({ color: '#ffffff', map: grassMap, roughness: 1 }),
    paintWhite: new THREE.MeshStandardMaterial({ color: '#f2f2ee', roughness: 0.8 }),
    paintYellow: new THREE.MeshStandardMaterial({ color: '#e8b923', roughness: 0.7 }),
    door: new THREE.MeshStandardMaterial({ color: '#ffffff', map: slatMap, roughness: 0.5, metalness: 0.4 }),
    glass: new THREE.MeshStandardMaterial({ color: '#8fb3d9', roughness: 0.06, metalness: 0.9 }),
    sign: new THREE.MeshStandardMaterial({ map: sign, roughness: 0.5 }),
    cabinet: new THREE.MeshStandardMaterial({ color: '#cfd3d8', roughness: 0.5, metalness: 0.2 }),
    duct: new THREE.MeshStandardMaterial({ color: '#c3cbd3', roughness: 0.3, metalness: 0.85 }),
    fire: new THREE.MeshStandardMaterial({ color: '#c0392b', roughness: 0.5, metalness: 0.2 }),
    belt: new THREE.MeshStandardMaterial({ color: '#4f565e', roughness: 0.7, metalness: 0.3 }),
    machine: new THREE.MeshStandardMaterial({ color: '#eef1f4', roughness: 0.45, metalness: 0.15 }),
    robot: new THREE.MeshStandardMaterial({ color: '#f28c28', roughness: 0.4, metalness: 0.2 }),
    tyre: new THREE.MeshStandardMaterial({ color: '#1d1f22', roughness: 0.9 }),
    trunk: new THREE.MeshStandardMaterial({ color: '#6b4f3a', roughness: 1 }),
    leaf: new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9, flatShading: true }),
    cab: new THREE.MeshStandardMaterial({ color: '#1f3352', roughness: 0.35, metalness: 0.5 }),
    trailer: new THREE.MeshStandardMaterial({ color: '#eef1f4', roughness: 0.5, metalness: 0.3 }),
  }
  Object.values(M).forEach((m) => keep(m))

  /* --- steel, MEP and the production line, instanced by material --- */
  const byKind: Partial<Record<Kind, THREE.MeshStandardMaterial>> = {
    column: M.paint, rafter: M.paint, beam: M.paint,
    purlin: M.galv, girt: M.galv, tray: M.galv, brace: M.rod,
    panel: M.cabinet, ahu: M.cabinet, duct: M.duct, fire: M.fire,
    conveyor: M.belt, station: M.machine, gate: M.robot, robot: M.robot, lane: M.paintYellow,
  }
  const unit = keep(new THREE.BoxGeometry(1, 1, 1))
  const groups = new Map<THREE.Material, THREE.Matrix4[]>()
  const q = new THREE.Quaternion()
  for (const mb of buildPlan().members) {
    const mat = byKind[mb.kind]
    if (!mat) continue // setting-out lines and pads: replaced by the slab
    const a = new THREE.Vector3(...mb.a)
    const b = new THREE.Vector3(...mb.b)
    if (mb.kind === 'lane') a.y = b.y = 0.47 // paint sits on the slab
    const dir = b.clone().sub(a)
    const len = dir.length()
    q.setFromUnitVectors(UP, dir.clone().normalize())
    const thick = mb.kind === 'lane' ? 0.12 : mb.t
    const mtx = new THREE.Matrix4().compose(
      a.clone().add(b).multiplyScalar(0.5),
      q.clone(),
      new THREE.Vector3(thick, len, mb.kind === 'lane' ? 0.02 : thick),
    )
    if (!groups.has(mat)) groups.set(mat, [])
    groups.get(mat)!.push(mtx)
  }
  groups.forEach((mats, mat) => {
    const inst = new THREE.InstancedMesh(unit, mat, mats.length)
    mats.forEach((m, i) => inst.setMatrixAt(i, m))
    inst.castShadow = true
    inst.receiveShadow = true
    root.add(inst)
  })

  /* --- envelope --- */
  const XA = X0 - 0.3
  const XB = -X0 + 0.3
  const ZW = Z + 0.25
  const slopeLen = Math.hypot(Z, RIDGE - EAVE)
  const over = 0.6 // roof overhang
  const lift = 0.42 // sheeting sits on top of rafters + purlins
  const ov = new THREE.Vector2(Z, -(RIDGE - EAVE)).normalize().multiplyScalar(over)
  ;[-1, 1].forEach((side) => {
    const eave: [number, number] = [side * (Z + ov.x), EAVE + ov.y]
    const g = keep(
      polygon(
        [
          [XA - 0.4, eave[1] + lift, eave[0]],
          [XB + 0.4, eave[1] + lift, eave[0]],
          [XB + 0.4, RIDGE + lift, 0],
          [XA - 0.4, RIDGE + lift, 0],
        ],
        [[XA, 0], [XB, 0], [XB, slopeLen + over], [XA, slopeLen + over]],
      ),
    )
    const roof = new THREE.Mesh(g, M.roof)
    roof.castShadow = true
    roof.receiveShadow = true
    root.add(roof)
    // fascia / gutter
    root.add(block([XA - 0.4, eave[1] + lift - 0.5, eave[0] - 0.15], [XB + 0.4, eave[1] + lift + 0.05, eave[0] + 0.15], M.trim))
  })
  root.add(block([XA - 0.4, RIDGE + lift - 0.05, -0.35], [XB + 0.4, RIDGE + lift + 0.15, 0.35], M.galv)) // ridge cap

  // long walls (sheeting above a 1.2 m concrete dado)
  ;[-1, 1].forEach((side) => {
    const z = side * ZW
    const g = keep(
      polygon(
        [[XA, 1.2, z], [XB, 1.2, z], [XB, EAVE, z], [XA, EAVE, z]],
        [[XA, 1.2], [XB, 1.2], [XB, EAVE], [XA, EAVE]],
      ),
    )
    const wall = new THREE.Mesh(g, M.wall)
    wall.castShadow = true
    wall.receiveShadow = true
    root.add(wall)
    root.add(block([XA, 0, z - 0.2], [XB, 1.2, z + 0.2], M.concrete))
    // ribbon windows with mullions
    root.add(block([XA + 1, 6.1, z - 0.06 * -side], [XB - 1, 7.1, z + 0.12 * side], M.glass))
    for (let x = XA + 1; x <= XB - 1 + 0.01; x += 2) root.add(block([x - 0.05, 6.05, z], [x + 0.05, 7.15, z + 0.16 * side], M.trim))
  })

  // gable ends: far end closed; near end (+x) with an open 8 × 6 m door
  const gablePts = (x: number): V[] => [[x, 1.2, -ZW], [x, 1.2, ZW], [x, EAVE + 0.4, ZW], [x, RIDGE + 0.4, 0], [x, EAVE + 0.4, -ZW]]
  {
    const pts = gablePts(XA)
    const g = keep(polygon(pts, pts.map((p) => [p[2], p[1]] as [number, number])))
    const m = new THREE.Mesh(g, M.wall)
    m.castShadow = true
    root.add(m)
    root.add(block([XA - 0.2, 0, -ZW], [XA + 0.2, 1.2, ZW], M.concrete))
  }
  {
    const shape = new THREE.Shape()
    shape.moveTo(-ZW, 0)
    shape.lineTo(ZW, 0)
    shape.lineTo(ZW, EAVE + 0.4)
    shape.lineTo(0, RIDGE + 0.4)
    shape.lineTo(-ZW, EAVE + 0.4)
    shape.closePath()
    const hole = new THREE.Path()
    hole.moveTo(-4, 0)
    hole.lineTo(-4, 6)
    hole.lineTo(4, 6)
    hole.lineTo(4, 0)
    hole.closePath()
    shape.holes.push(hole)
    const g = keep(new THREE.ShapeGeometry(shape))
    const m = new THREE.Mesh(g, M.wall)
    m.rotation.y = -Math.PI / 2 // shape x → world +z
    m.position.x = XB
    m.castShadow = true
    root.add(m)
    root.add(block([XB - 0.2, 6, -4.4], [XB + 0.9, 6.9, 4.4], M.trim)) // rolled-up door drum
    root.add(block([XB, 7.2, -4.2], [XB + 0.12, 8.6, 4.2], M.sign)) // sign panel
  }
  // corner trims
  for (const x of [XA, XB]) for (const z of [-ZW, ZW]) root.add(block([x - 0.18, 0, z - 0.18], [x + 0.18, EAVE, z + 0.18], M.trim))

  // loading docks on the near long wall: 3 roller doors under a canopy
  for (const x of [-9, -3, 3]) {
    root.add(block([x - 2, 0.9, ZW], [x + 2, 5.2, ZW + 0.12], M.door))
    root.add(block([x - 2.2, 0, ZW], [x + 2.2, 0.9, ZW + 1.6], M.concrete)) // dock apron
  }
  root.add(block([-12.5, 5.8, ZW], [6.5, 6.0, ZW + 3.2], M.trim)) // canopy
  root.add(block([12.6, 0.45, ZW], [13.8, 2.6, ZW + 0.1], M.trim)) // personnel door

  /* --- site --- */
  root.add(block([X0 - 1, 0, -Z - 1], [-X0 + 1, 0.45, Z + 1], M.floor)) // slab
  const yard = new THREE.Mesh(keep(new THREE.PlaneGeometry(130, 100)), M.asphalt)
  yard.rotation.x = -Math.PI / 2
  yard.position.set(6, 0.01, 10)
  yard.receiveShadow = true
  root.add(yard)
  const grass = new THREE.Mesh(keep(new THREE.PlaneGeometry(700, 700)), M.grass)
  grass.rotation.x = -Math.PI / 2
  grass.receiveShadow = true
  root.add(grass)
  // truck bay lines and parking stalls
  for (const x of [-12, -6, 0, 6]) root.add(block([x - 0.06, 0.02, ZW + 3], [x + 0.06, 0.04, ZW + 22], M.paintWhite))
  for (let x = 24; x <= 44; x += 2.6) root.add(block([x - 0.06, 0.02, 18], [x + 0.06, 0.04, 23], M.paintWhite))

  // truck backed onto the middle dock
  const truck = new THREE.Group()
  truck.add(block([-1.25, 1.2, 0], [1.25, 4.0, 12.3], M.trailer))
  truck.add(block([-1.25, 0.7, 12.8], [1.25, 3.4, 15.2], M.cab))
  truck.add(block([-1.1, 2.3, 15.2], [1.1, 3.1, 15.25], M.glass))
  const wheel = keep(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 18))
  for (const z of [1.2, 2.4, 13.8]) for (const x of [-1.15, 1.15]) {
    const w = new THREE.Mesh(wheel, M.tyre)
    w.rotation.z = Math.PI / 2
    w.position.set(x, 0.5, z)
    w.castShadow = true
    truck.add(w)
  }
  truck.position.set(-3, 0, ZW + 0.8)
  root.add(truck)

  // parked cars
  const carColors = ['#d9dde2', '#4a5563', '#1f3352', '#e9ecef', '#8a929c']
  carColors.forEach((c, i) => {
    const mat = keep(new THREE.MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.6 }))
    const car = new THREE.Group()
    car.add(block([-0.9, 0.35, -2.2], [0.9, 1.05, 2.2], mat))
    car.add(block([-0.8, 1.05, -1.1], [0.8, 1.6, 1.0], M.glass))
    car.position.set(25.3 + i * 2.6 + (i > 2 ? 2.6 : 0), 0, 20.5)
    root.add(car)
  })

  // trees around the site
  const treeSpots: [number, number, number][] = [
    [-34, -26, 1], [-24, -30, 1.2], [-12, -31, 0.9], [2, -30, 1.1], [16, -31, 1], [30, -27, 1.2], [42, -18, 0.9],
    [-44, -10, 1.1], [-46, 6, 1], [-44, 22, 1.2], [52, 4, 1], [54, 18, 1.1], [-28, 42, 1], [-14, 46, 1.2], [20, 46, 0.9], [36, 40, 1.1],
  ]
  const trunkG = keep(new THREE.CylinderGeometry(0.18, 0.28, 1, 6))
  const leafG = keep(new THREE.IcosahedronGeometry(1, 0))
  const trunks = new THREE.InstancedMesh(trunkG, M.trunk, treeSpots.length)
  const leaves = new THREE.InstancedMesh(leafG, M.leaf, treeSpots.length * 2)
  const greens = ['#4f7a3a', '#5d8a43', '#466e35', '#6a9450'].map((c) => new THREE.Color(c))
  treeSpots.forEach(([x, z, s], i) => {
    trunks.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(x, 1.2 * s, z), new THREE.Quaternion(), new THREE.Vector3(s, 2.4 * s, s)))
    for (let j = 0; j < 2; j++) {
      const k = i * 2 + j
      const r = (2.4 - j * 0.7) * s
      leaves.setMatrixAt(
        k,
        new THREE.Matrix4().compose(
          new THREE.Vector3(x + j * 0.6, (3.6 + j * 1.6) * s, z - j * 0.4),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(0, i * 1.7, 0)),
          new THREE.Vector3(r, r * 1.1, r),
        ),
      )
      leaves.setColorAt(k, greens[(i + j) % greens.length])
    }
  })
  trunks.castShadow = leaves.castShadow = true
  root.add(trunks, leaves)

  // AGV driving its lane inside
  const agv = block([-0.9, 0.45, -0.55], [0.9, 1.0, 0.55], M.robot)
  root.add(agv)

  // every material clips against the sweep plane (shadows too)
  const allMats = new Set<THREE.Material>()
  root.traverse((o) => {
    const m = (o as THREE.Mesh).material
    if (m) (Array.isArray(m) ? m : [m]).forEach((x) => allMats.add(x))
  })
  root.traverse((o) => {
    const mesh = o as THREE.Mesh
    if (mesh.geometry) disposables.push(mesh.geometry)
  })

  return { root, agv, allMats: [...allMats], dispose: () => disposables.forEach((d) => d.dispose()) }
}

/* ------------------------------------------------------------------ */
/* sky dome: blueprint navy → daylight                                 */
/* ------------------------------------------------------------------ */

function makeSky() {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    toneMapped: false,
    uniforms: {
      uMix: { value: 0 },
      uNavy: { value: new THREE.Color(NAVY) },
      uZenith: { value: new THREE.Color('#5e8fd0') },
      uHorizon: { value: new THREE.Color('#e3ebf3') },
      uGround: { value: new THREE.Color('#c9d3cf') },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uMix;
      uniform vec3 uNavy, uZenith, uHorizon, uGround;
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 sky = h > 0.0
          ? mix(uHorizon, uZenith, pow(smoothstep(0.0, 1.0, h), 0.55))
          : mix(uHorizon, uGround, smoothstep(0.0, 0.2, -h));
        gl_FragColor = vec4(mix(uNavy, sky, uMix), 1.0);
        #include <colorspace_fragment>
      }`,
  })
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(600, 32, 16), mat)
  mesh.frustumCulled = false
  mesh.renderOrder = -1
  return mesh
}

/* ------------------------------------------------------------------ */
/* component                                                           */
/* ------------------------------------------------------------------ */

const smooth = (v: number) => v * v * (3 - 2 * v)

export function RealisticFacility({ clip, getR }: { clip: THREE.Plane; getR: () => number }) {
  const { gl, scene } = useThree()
  const sun = useRef<THREE.DirectionalLight>(null)
  const hemi = useRef<THREE.HemisphereLight>(null)

  const { root, agv, allMats, dispose } = useMemo(buildFacility, [])
  const sky = useMemo(makeSky, [])

  // clip everything to the area behind the sweep
  useEffect(() => {
    allMats.forEach((m) => {
      m.clippingPlanes = [clip]
      m.clipShadows = true
    })
  }, [allMats, clip])

  // studio reflections for the metal (no HDR file needed)
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.35
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  useEffect(
    () => () => {
      dispose()
      sky.geometry.dispose()
      ;(sky.material as THREE.Material).dispose()
    },
    [dispose, sky],
  )

  useFrame((state) => {
    const r = getR()
    const on = r > 0
    root.visible = on
    sky.visible = on
    if (!on) return
    const e = smooth(Math.min(1, r * 1.4))
    ;(sky.material as THREE.ShaderMaterial).uniforms.uMix.value = e
    sky.position.copy(state.camera.position)
    if (sun.current) sun.current.intensity = 3.2 * e
    if (hemi.current) hemi.current.intensity = 0.9 * e
    const s = 0.5 - 0.5 * Math.cos(state.clock.elapsedTime * 0.45)
    agv.position.x = -12 + 24 * s
    agv.position.z = 7
  })

  return (
    <>
      <primitive object={sky} />
      <primitive object={root} />
      <hemisphereLight ref={hemi} args={['#d4e6ff', '#7d7563', 0]} />
      <directionalLight
        ref={sun}
        position={[70, 90, 55]}
        intensity={0}
        color="#fff1dc"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
        shadow-camera-left={-75}
        shadow-camera-right={75}
        shadow-camera-top={75}
        shadow-camera-bottom={-75}
        shadow-camera-near={10}
        shadow-camera-far={260}
      />
    </>
  )
}
