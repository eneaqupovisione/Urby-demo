import { describe, it, expect } from 'vitest'
import { buildRequest, buildBotUrl, MAX_NOTE } from '@/lib/booking.js'

const base = { people: '2', date: '2026-10-20', time: '19:00', name: 'Ana', note: '' }

describe('buildRequest', () => {
  it('needs a name', () => {
    expect(buildRequest({ ...base, name: '   ' })).toBeNull()
  })
  it('composes the request', () => {
    expect(buildRequest(base)).toBe('Table for 2 · 2026-10-20 at 19:00\nName: Ana')
    expect(buildRequest({ ...base, note: 'High chair' })).toContain('\nNote: High chair')
  })
  it('strips control characters and caps length', () => {
    const msg = buildRequest({ ...base, name: 'A\u0000na\u0007', note: 'x'.repeat(MAX_NOTE + 50) })
    expect(msg).toContain('Name: Ana')
    expect(msg.split('Note: ')[1].length).toBe(MAX_NOTE)
  })
})

describe('buildBotUrl', () => {
  it('encodes the message into an https template', () => {
    const url = buildBotUrl('https://wa.me/660000?text={msg}', 'Table for 2\nName: A&B')
    expect(url).toBe('https://wa.me/660000?text=Table%20for%202%0AName%3A%20A%26B')
  })
  it('rejects anything that is not https or has no {msg}', () => {
    expect(buildBotUrl('javascript:alert(1)//{msg}', 'x')).toBe('')
    expect(buildBotUrl('http://wa.me/?text={msg}', 'x')).toBe('')
    expect(buildBotUrl('https://wa.me/', 'x')).toBe('')
    expect(buildBotUrl('not a url {msg}', 'x')).toBe('')
    expect(buildBotUrl('', 'x')).toBe('')
  })
})
