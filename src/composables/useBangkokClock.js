import { ref, onMounted, onBeforeUnmount } from 'vue'

/** Minutes after midnight and an HH:MM label in Phuket time. */
export function bangkokNow(date = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date)
    let h = 0, m = 0
    parts.forEach((x) => { if (x.type === 'hour') h = +x.value; if (x.type === 'minute') m = +x.value })
    return { mins: h * 60 + m, label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` }
  } catch {
    return null
  }
}

export function bangkokToday(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok' }).format(date)
  } catch {
    return ''
  }
}

/** Reactive Phuket clock, refreshed every minute. */
export function useBangkokClock() {
  const now = ref(bangkokNow())
  let id = 0
  onMounted(() => { id = setInterval(() => { now.value = bangkokNow() }, 60000) })
  onBeforeUnmount(() => clearInterval(id))
  return now
}
