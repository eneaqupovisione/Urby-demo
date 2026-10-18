import { describe, it, expect } from 'vitest'
import { covered, proj, VB } from '@/lib/phuketMap.js'
import { PLACES, LEGS } from '@/content/phuket.js'

describe('phuket map geometry', () => {
  it('projects every place inside the viewBox', () => {
    Object.values(PLACES).forEach((p) => {
      const [x, y] = proj(p.ll)
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThanOrEqual(VB.w)
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(VB.h)
    })
  })
  it('covers the road from 0 to 1, never going back', () => {
    expect(covered(0)).toBe(0)
    expect(covered(1)).toBeCloseTo(1)
    let prev = 0
    for (let u = 0; u <= 1; u += 0.02) {
      const c = covered(u)
      expect(c).toBeGreaterThanOrEqual(prev - 1e-9)
      prev = c
    }
  })
  it('legs are sorted by distance and every destination exists', () => {
    LEGS.forEach((L, i) => {
      expect(PLACES[L.to]).toBeTruthy()
      if (i) expect(L.km).toBeGreaterThanOrEqual(LEGS[i - 1].km)
    })
  })
})
