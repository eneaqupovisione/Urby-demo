export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

/** smoothstep */
export const sstep = (p) => p * p * (3 - 2 * p)
export const ease = sstep

/**
 * Maps 0..1 scroll progress onto 0..n slide positions where each slide rests
 * fully aligned for a while (`hold` of every step), then glides to the next.
 */
export function stepped(p, n, hold = 0.4) {
  if (n < 1) return 0
  const x = p * n
  const i = Math.min(n - 1, Math.floor(x))
  const t = x - i
  return i + ease(clamp((t - hold / 2) / (1 - hold), 0, 1))
}
