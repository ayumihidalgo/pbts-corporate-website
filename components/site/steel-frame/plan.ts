/**
 * The building, as data. Shared by the hero (hero-building.tsx) and the
 * scroll story (build-story.tsx). Units are metres; `start`/`dur` are seconds
 * on one build timeline:
 *
 *   0.0  setting out        civil
 *   0.7  foundation pads    civil
 *   1.6  columns            steel
 *   3.0  rafters & beams    steel
 *   4.5  purlins & girts    steel
 *   6.1  bracing            steel
 *   7.0  cladding           enclosure
 *   9.2  electrical         MEP
 *  10.6  HVAC               MEP
 *  11.4  fire sprinklers    MEP
 *  12.5  production line    automation (machines, conveyor, robot, AGV)
 *  14.8  end
 *
 * The hero stops its clock at HERO_END (after cladding), so it only ever
 * shows the building shell; the scroll story plays the whole timeline.
 */

export const NAVY = '#13203b'
export const STEEL = '#e8eef8'
export const SECONDARY = '#93a9ca'
export const CONCRETE = '#c3cfdf'
export const ORANGE = '#f47b2a'
export const DUCT = '#aac3e8'
export const FIRE = '#e5484d'
export const MACHINE = '#d7e2f2'

export const BAYS = 6
export const BAY = 6
export const SPAN = 24
export const EAVE = 8
export const RIDGE = 10.4
export const LEN = BAYS * BAY
export const X0 = -LEN / 2
export const Z = SPAN / 2
export const frames = Array.from({ length: BAYS + 1 }, (_, i) => X0 + i * BAY)

/** hero: shell only */
export const HERO_PHASES = [
  { label: 'Setting out', at: 0 },
  { label: 'Foundations', at: 0.7 },
  { label: 'Columns', at: 1.6 },
  { label: 'Rafters & beams', at: 3.0 },
  { label: 'Purlins & girts', at: 4.5 },
  { label: 'Bracing', at: 6.1 },
  { label: 'Cladding', at: 7.0 },
] as const
export const HERO_END = 9.0

export const T_END = 14.8
/** when the AGV starts driving its lane */
export const AGV_AT = 13.75

export type V = [number, number, number]
/** what a member is — the realistic render (realistic.tsx) picks its material from this */
export type Kind =
  | 'setout' | 'pad' | 'column' | 'rafter' | 'beam' | 'purlin' | 'girt' | 'brace'
  | 'tray' | 'panel' | 'ahu' | 'duct' | 'fire' | 'conveyor' | 'station' | 'gate' | 'robot' | 'lane'
/** a straight member (or block) that "grows" from a to b, square section t */
export type Member = { a: V; b: V; t: number; color: string; opacity: number; start: number; dur: number; kind: Kind }
/** a flat cladding sheet that fades in; ribs = corrugation lines */
export type Sheet = { pts: V[]; ribs: [V, V][]; start: number; dur: number }

export function buildPlan() {
  const m: Member[] = []
  const s: Sheet[] = []
  let kind: Kind = 'setout'
  const add = (a: V, b: V, t: number, color: string, opacity: number, start: number, dur: number) =>
    m.push({ a, b, t, color, opacity, start, dur, kind })

  /* ---------------- shell ---------------- */

  // setting-out lines (grid axes overshooting the footprint)
  frames.forEach((x, i) => add([x, 0.03, -Z - 5], [x, 0.03, Z + 5], 0.06, ORANGE, 0.55, 0.05 * i, 0.7))
  ;[-Z, Z].forEach((z, i) => add([X0 - 5, 0.03, z], [-X0 + 5, 0.03, z], 0.06, ORANGE, 0.55, 0.15 + 0.1 * i, 0.8))

  // foundation pads
  kind = 'pad'
  frames.forEach((x, i) =>
    [-Z, Z].forEach((z, j) => add([x, 0, z], [x, 0.45, z], 1.7, CONCRETE, 0.55, 0.7 + 0.07 * i + 0.03 * j, 0.4)),
  )

  // columns, rising frame by frame
  kind = 'column'
  frames.forEach((x, i) =>
    [-Z, Z].forEach((z, j) => add([x, 0.45, z], [x, EAVE, z], 0.38, STEEL, 0.95, 1.6 + 0.13 * i + 0.05 * j, 0.8)),
  )

  // rafters (eave → ridge), eave beams, ridge
  kind = 'rafter'
  frames.forEach((x, i) =>
    [-Z, Z].forEach((z, j) => add([x, EAVE, z], [x, RIDGE, 0], 0.32, STEEL, 0.95, 3.0 + 0.1 * i + 0.04 * j, 0.6)),
  )
  kind = 'beam'
  for (let i = 0; i < BAYS; i++) {
    ;[-Z, Z].forEach((z) => add([frames[i], EAVE, z], [frames[i + 1], EAVE, z], 0.24, STEEL, 0.9, 3.5 + 0.06 * i, 0.35))
    add([frames[i], RIDGE, 0], [frames[i + 1], RIDGE, 0], 0.24, STEEL, 0.9, 3.7 + 0.06 * i, 0.35)
  }

  // purlins (roof) and girts (walls), swept along the length
  kind = 'purlin'
  const PURLINS = 4
  for (let k = 1; k <= PURLINS; k++) {
    const f = k / (PURLINS + 1)
    const y = EAVE + (RIDGE - EAVE) * f
    ;[-1, 1].forEach((side, j) =>
      add([X0, y, side * Z * (1 - f)], [-X0, y, side * Z * (1 - f)], 0.13, SECONDARY, 0.85, 4.5 + 0.12 * k + 0.05 * j, 0.9),
    )
  }
  kind = 'girt'
  ;[2.6, 5.3].forEach((y, k) => {
    ;[-Z, Z].forEach((z, j) => add([X0, y, z], [-X0, y, z], 0.13, SECONDARY, 0.8, 4.9 + 0.12 * k + 0.05 * j, 0.9))
    ;[X0, -X0].forEach((x, j) => add([x, y, -Z], [x, y, Z], 0.13, SECONDARY, 0.8, 5.1 + 0.12 * k + 0.05 * j, 0.7))
  })

  // X-bracing in the two end bays (roof + long walls)
  kind = 'brace'
  let n = 0
  ;[0, BAYS - 1].forEach((bay) => {
    const xa = frames[bay]
    const xb = frames[bay + 1]
    ;[-Z, Z].forEach((z) => {
      add([xa, EAVE, z], [xb, RIDGE, 0], 0.09, ORANGE, 0.9, 6.1 + 0.05 * n++, 0.4)
      add([xb, EAVE, z], [xa, RIDGE, 0], 0.09, ORANGE, 0.9, 6.1 + 0.05 * n++, 0.4)
      add([xa, 0.45, z], [xb, EAVE, z], 0.09, ORANGE, 0.9, 6.1 + 0.05 * n++, 0.4)
      add([xb, 0.45, z], [xa, EAVE, z], 0.09, ORANGE, 0.9, 6.1 + 0.05 * n++, 0.4)
    })
  })

  // cladding: back wall, far gable, far roof slope fully; near roof slope only
  // over the far bays. The near wall and near end stay open so the camera
  // can look inside later.
  let c = 0
  const sheet = (pts: V[], ribs: [V, V][]) => s.push({ pts, ribs, start: 7.0 + 0.11 * c++, dur: 0.8 })
  const along = (xa: number, xb: number, f: (x: number) => [V, V]) => {
    const out: [V, V][] = []
    for (let x = xa + 1; x < xb - 0.01; x += 1) out.push(f(x))
    return out
  }
  for (let i = 0; i < BAYS; i++) {
    const [xa, xb] = [frames[i], frames[i + 1]]
    sheet(
      [[xa, 0.45, -Z], [xb, 0.45, -Z], [xb, EAVE, -Z], [xa, EAVE, -Z]],
      along(xa, xb, (x) => [[x, 0.45, -Z], [x, EAVE, -Z]]),
    )
  }
  const gableRibs: [V, V][] = []
  for (let z = -Z + 1.5; z < Z - 0.01; z += 1.5) {
    gableRibs.push([[X0, 0.45, z], [X0, EAVE + (RIDGE - EAVE) * (1 - Math.abs(z) / Z), z]])
  }
  sheet([[X0, 0.45, -Z], [X0, 0.45, Z], [X0, EAVE, Z], [X0, RIDGE, 0], [X0, EAVE, -Z]], gableRibs)
  for (let i = 0; i < BAYS; i++) {
    const [xa, xb] = [frames[i], frames[i + 1]]
    sheet(
      [[xa, EAVE, -Z], [xb, EAVE, -Z], [xb, RIDGE, 0], [xa, RIDGE, 0]],
      along(xa, xb, (x) => [[x, EAVE, -Z], [x, RIDGE, 0]]),
    )
  }
  for (let i = 0; i < 3; i++) {
    const [xa, xb] = [frames[i], frames[i + 1]]
    sheet(
      [[xa, EAVE, Z], [xa, RIDGE, 0], [xb, RIDGE, 0], [xb, EAVE, Z]],
      along(xa, xb, (x) => [[x, EAVE, Z], [x, RIDGE, 0]]),
    )
  }

  /* ---------------- MEP ---------------- */

  // electrical: distribution panel, cable trays, drops to the line
  kind = 'panel'
  add([-14, 0, -11.2], [-14, 2.2, -11.2], 1.2, ORANGE, 0.85, 9.2, 0.4)
  kind = 'tray'
  add([-14, 6.2, -11.3], [16, 6.2, -11.3], 0.3, ORANGE, 0.85, 9.4, 1.0)
  add([-14, 2.2, -11.2], [-14, 6.2, -11.3], 0.22, ORANGE, 0.85, 9.35, 0.3)
  add([-14, 6.2, 2], [14, 6.2, 2], 0.28, ORANGE, 0.85, 9.8, 1.0)
  add([-14, 6.2, -11.3], [-14, 6.2, 2], 0.22, ORANGE, 0.85, 9.7, 0.4)
  ;[-10, -3, 4, 11].forEach((x, i) => add([x, 6.2, 2], [x, 2.5, 2], 0.08, ORANGE, 0.85, 10.2 + 0.08 * i, 0.4))

  // HVAC: air-handling unit, riser, main duct, branches
  kind = 'ahu'
  add([-15.5, 0, -5], [-15.5, 3, -5], 2.4, DUCT, 0.75, 10.6, 0.4)
  kind = 'duct'
  add([-15.5, 3, -5], [-15.5, 7, -5], 1.1, DUCT, 0.8, 10.8, 0.3)
  add([-15.5, 7, -5], [16, 7, -5], 1.1, DUCT, 0.8, 10.95, 1.0)
  ;[-10, -2, 6, 14].forEach((x, i) => add([x, 7, -5], [x, 7, 1], 0.6, DUCT, 0.8, 11.3 + 0.1 * i, 0.4))

  // fire sprinklers: riser, header, four mains, droppers
  kind = 'fire'
  add([17.2, 0, -10], [17.2, 7.9, -10], 0.16, FIRE, 0.9, 11.4, 0.4)
  add([17.2, 7.9, -10], [17.2, 7.9, 7], 0.14, FIRE, 0.9, 11.6, 0.4)
  ;[-7, -1.5, 3, 7].forEach((z, i) => add([17.2, 7.9, z], [-17, 7.9, z], 0.12, FIRE, 0.9, 11.8 + 0.08 * i, 0.9))
  ;[-7, -1.5, 3, 7].forEach((z, j) => {
    for (let x = -15; x <= 15; x += 5) add([x, 7.9, z], [x, 7.45, z], 0.1, FIRE, 0.9, 12.3 + 0.02 * j + 0.004 * x, 0.2)
  })

  /* ---------------- production line ---------------- */

  // conveyor, then four stations over it
  kind = 'conveyor'
  add([-14, 0.9, 2], [14, 0.9, 2], 1.2, MACHINE, 0.85, 12.5, 0.8)
  kind = 'station'
  ;[-10, -3, 4, 11].forEach((x, i) => add([x, 0, 2], [x, 2.5, 2], 2.2, MACHINE, 0.7, 12.8 + 0.18 * i, 0.45))
  // vision-inspection gate over the conveyor
  kind = 'gate'
  add([-6.5, 0, 0.7], [-6.5, 2.9, 0.7], 0.2, ORANGE, 0.95, 13.2, 0.3)
  add([-6.5, 0, 3.3], [-6.5, 2.9, 3.3], 0.2, ORANGE, 0.95, 13.25, 0.3)
  add([-6.5, 2.9, 0.7], [-6.5, 2.9, 3.3], 0.2, ORANGE, 0.95, 13.45, 0.25)
  // robot arm beside station 3
  kind = 'robot'
  add([4, 0, 5.4], [4, 1.6, 5.4], 0.7, STEEL, 0.95, 13.3, 0.3)
  add([4, 1.6, 5.4], [5.3, 3.5, 4.5], 0.35, ORANGE, 0.95, 13.5, 0.3)
  add([5.3, 3.5, 4.5], [4.6, 3.0, 3.0], 0.28, ORANGE, 0.95, 13.7, 0.2)
  // control cabinet
  kind = 'panel'
  add([-15.5, 0, 8.5], [-15.5, 2.2, 8.5], 1.0, ORANGE, 0.8, 13.4, 0.35)
  // AGV lane markings
  kind = 'lane'
  ;[6.2, 7.8].forEach((z, i) => add([-13, 0.04, z], [13, 0.04, z], 0.06, ORANGE, 0.7, 13.5 + 0.08 * i, 0.5))

  return { members: m, sheets: s }
}
