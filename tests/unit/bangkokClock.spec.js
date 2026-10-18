import { describe, it, expect } from 'vitest'
import { bangkokNow, bangkokToday } from '@/composables/useBangkokClock.js'

describe('Phuket clock', () => {
  it('converts UTC to Asia/Bangkok (UTC+7)', () => {
    const d = new Date('2026-10-18T01:30:00Z')
    expect(bangkokNow(d)).toEqual({ mins: 8 * 60 + 30, label: '08:30' })
  })
  it('rolls the date over at local midnight', () => {
    expect(bangkokToday(new Date('2026-10-18T17:30:00Z'))).toBe('2026-10-19')
  })
})
