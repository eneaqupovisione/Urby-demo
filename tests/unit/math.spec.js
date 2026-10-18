import { describe, it, expect } from 'vitest'
import { clamp, sstep, stepped } from '@/lib/math.js'

describe('math', () => {
  it('clamps', () => {
    expect(clamp(-1, 0, 1)).toBe(0)
    expect(clamp(2, 0, 1)).toBe(1)
    expect(clamp(0.4, 0, 1)).toBe(0.4)
  })
  it('smoothstep keeps the ends', () => {
    expect(sstep(0)).toBe(0)
    expect(sstep(1)).toBe(1)
    expect(sstep(0.5)).toBe(0.5)
  })
  it('stepped rests each slide aligned, then glides', () => {
    expect(stepped(0, 4)).toBe(0)
    expect(stepped(1, 4)).toBe(4)
    // inside the hold window at the start of a step the slide does not move
    expect(stepped(0.04, 4)).toBe(0)
    // and it lands exactly on slide 1 within the hold window at the end
    expect(stepped(0.24, 4)).toBe(1)
  })
  it('stepped is monotonic', () => {
    let prev = -1
    for (let p = 0; p <= 1; p += 0.01) {
      const v = stepped(p, 4)
      expect(v).toBeGreaterThanOrEqual(prev)
      prev = v
    }
  })
})
