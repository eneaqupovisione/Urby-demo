import { clamp } from '@/lib/math.js'

/** 0 when `el` reaches the top of the viewport, 1 when its end does. */
export function scrollProgress(el) {
  const r = el.getBoundingClientRect()
  const total = el.offsetHeight - window.innerHeight
  return total > 0 ? clamp(-r.top / total, 0, 1) : 0
}
