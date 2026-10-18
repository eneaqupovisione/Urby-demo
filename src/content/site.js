/* All copy, contacts and photo choices live here so design and copy can be
   reviewed without touching components. */
import hero from '@photos/galleria-04.jpg'
import kitchen from '@photos/galleria-07.jpg'
import evening from '@photos/galleria-09.jpg'
import breakfast1 from '@photos/atmosfera-2.jpg'
import breakfast2 from '@photos/piatto-1.jpg'
import breakfast3 from '@photos/piatto-2.jpg'
import breakfast4 from '@photos/galleria-02.jpg'
import breakfast5 from '@photos/atmosfera-6.jpg'
import house01 from '@photos/galleria-05.jpg'
import house02 from '@photos/atmosfera-4.jpg'
import house03 from '@photos/galleria-10.jpg'
import house04 from '@photos/galleria-01.jpg'
import house05 from '@photos/atmosfera-3.jpg'
import house06 from '@photos/galleria-06.jpg'
import house07 from '@photos/atmosfera-5.jpg'
import house08 from '@photos/piatto-5.jpg'
import house09 from '@photos/camera-corner.jpg'
import house10 from '@photos/camera-loft.jpg'
import house11 from '@photos/camera-terrace.jpg'
import house12 from '@photos/atmosfera-1.jpg'

export const PHOTOS = { hero, kitchen, evening }

export const CONTACT = {
  email: 'hello@urby.com',
  phone: '+66 76 000 000',
  instagram: { handle: '@urbyphuket', url: 'https://www.instagram.com/urbyphuket' },
  addressLines: ['Thepkrasatti–Chengtalay,', 'Tambon Thep Krasatti,', 'Thalang District, Phuket 83110'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=8.03,98.30'
}
export const ADDRESS_ONE_LINE = 'Thepkrasatti–Chengtalay, Tambon Thep Krasatti, Thalang District, Phuket 83110'

export const NAV = [
  { href: '#kitchen', label: 'Kitchen' },
  { href: '#breakfast', label: 'Breakfast' },
  { href: '#evening', label: 'Evening' },
  { href: '#house', label: 'The house' },
  { href: '#find', label: 'Find us' }
]

/* opening hours in minutes after midnight, Asia/Bangkok */
export const HOURS = { open: 7 * 60, close: 23 * 60 }

export const DAY = [
  { from: 420, to: 480, time: '07:00', label: 'Bakery opens' },
  { from: 480, to: 720, time: '08 – 11', label: 'Breakfast' },
  { from: 720, to: 1020, time: '12 – 16', label: 'All-day plates' },
  { from: 1020, to: 1110, time: '17:00', label: 'Records & aperitivo' },
  { from: 1110, to: 1380, time: '18:30 – 23', label: 'Dinner in common' },
  { from: 1380, to: 1381, time: '23:00', label: 'Last pour' }
]

export const LANGUAGES = [
  { label: 'English' },
  { label: 'Русский', lang: 'ru' },
  { label: '한국어', lang: 'ko' },
  { label: '日本語', lang: 'ja' },
  { label: '中文', lang: 'zh' }
]

/* kind: intro | dish | outro. `accent` is the serif italic second line. */
export const BREAKFAST = [
  { kind: 'intro', photo: breakfast1, color: 'var(--saffron-d)', eyebrow: '08 — 11 · Bakery open from 07:00', title: 'Break­fast', lede: 'Bread from seven. Coffee, cream and a croissant at the counter.' },
  { kind: 'dish', photo: breakfast2, color: 'var(--chili)', price: '฿180', title: 'Yoghurt cream', accent: 'pistachio' },
  { kind: 'dish', photo: breakfast3, color: 'var(--clay)', price: '฿140', title: 'Sourdough', accent: 'cultured butter' },
  { kind: 'dish', photo: breakfast4, color: '#3a2a1f', price: '฿210', title: 'Iced latte', accent: 'almond croissant' },
  { kind: 'outro', photo: breakfast5, color: 'var(--ink)', eyebrow: 'Prices in baht, service included', title: 'See you at the', accent: 'counter' }
]

export const HOUSE = [
  { src: house01, w: 1490, h: 1350, caption: 'The house from the lane' },
  { src: house02, w: 896, h: 1200, caption: 'Lanterns under the glass roof' },
  { src: house03, w: 1376, h: 768, caption: 'The clay stair' },
  { src: house04, w: 1010, h: 1500, caption: 'Curves in rammed earth' },
  { src: house05, w: 928, h: 1152, caption: 'Rattan and concrete' },
  { src: house06, w: 860, h: 1480, caption: 'A green corner' },
  { src: house07, w: 540, h: 675, caption: 'The window seat' },
  { src: house08, w: 390, h: 490, caption: 'Iced latte' },
  { src: house09, w: 928, h: 1152, caption: 'Upstairs · corner room' },
  { src: house10, w: 928, h: 1152, caption: 'Upstairs · loft' },
  { src: house11, w: 928, h: 1152, caption: 'Upstairs · garden terrace' },
  { src: house12, w: 896, h: 1200, caption: 'Afternoon light' }
]
