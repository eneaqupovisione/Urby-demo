import { ref } from 'vue'

/**
 * Copy text with a temporary label. Falls back to selecting `el` so the user
 * can copy by hand when the clipboard API is blocked.
 */
export function useClipboard(idleLabel) {
  const label = ref(idleLabel)
  let t = 0
  const flash = (text, ms) => {
    label.value = text
    clearTimeout(t)
    t = setTimeout(() => { label.value = idleLabel }, ms)
  }
  const select = (el) => {
    try {
      const r = document.createRange()
      r.selectNodeContents(el)
      const s = getSelection()
      s.removeAllRanges()
      s.addRange(r)
    } catch { /* nothing to select */ }
  }
  async function copy(text, el) {
    try {
      await navigator.clipboard.writeText(text)
      flash('Copied', 1600)
    } catch {
      if (el) select(el)
      flash('Selected', 2200)
    }
  }
  return { label, copy }
}
