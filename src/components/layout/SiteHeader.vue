<script setup>
import { computed } from 'vue'
import UrbyMark from '@/components/brand/UrbyMark.vue'
import { NAV, HOURS } from '@/content/site.js'
import { useBangkokClock } from '@/composables/useBangkokClock.js'

const now = useBangkokClock()
const open = computed(() => !now.value || (now.value.mins >= HOURS.open && now.value.mins < HOURS.close))
const statusText = computed(() => !now.value ? 'Open 07:00 – 23:00' : open.value ? 'Open now · until 23:00' : 'Closed · opens 07:00')
</script>

<template>
  <header class="hdr">
    <a class="logo" href="#top" aria-label="Urby, back to top">
      <UrbyMark clip-id="arch-hdr" sun-class="sun" />
      <span class="wm" aria-hidden="true">URBY</span>
    </a>
    <nav class="nav" aria-label="Main">
      <a v-for="item in NAV" :key="item.href" :href="item.href">{{ item.label }}</a>
      <a class="b" href="#book">Book a table</a>
    </nav>
    <span class="status" :class="{ closed: !open }" role="status"><i></i><span>{{ statusText }}</span></span>
  </header>
</template>

<style>
.hdr { position: fixed; z-index: 30; left: 0; right: 0; top: calc(10px + env(safe-area-inset-top, 0px)); display: flex; justify-content: space-between; align-items: center; gap: 10px; padding-inline: var(--gx) var(--gxr); pointer-events: none }
.hdr > * { pointer-events: auto }
.logo { display: inline-flex; align-items: center; gap: .6rem; background: var(--ink); color: var(--flour); border-radius: 999px; padding: .4rem 1.1rem .4rem .45rem; text-decoration: none; line-height: 1; transition: transform .25s }
.logo:hover { transform: translateY(-1px) }
.logo svg { width: 34px; height: 34px; flex: 0 0 auto; display: block }
.logo .wm { font-family: var(--serif); font-size: 1.55rem; letter-spacing: .2em; margin-right: -.2em; padding-top: .08em }
.logo .sun { transform-origin: 16px 19px; animation: sunset 6s ease-in-out infinite alternate }
@keyframes sunset { from { transform: translateY(0) } to { transform: translateY(3px) } }
.status { display: inline-flex; align-items: center; gap: .5rem; background: var(--ink); color: var(--flour); border-radius: 999px; padding: .55rem .9rem; font-family: var(--mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase }
.status i { width: 8px; height: 8px; border-radius: 50%; background: #6fd36f; display: inline-block }
.status.closed i { background: var(--pin) }
.nav { display: none }
@media (min-width: 1100px) {
  .nav { display: flex; gap: 4px; background: var(--ink); border-radius: 999px; padding: 6px }
  .nav a { text-decoration: none; font-weight: 600; padding: .55rem 1.05rem; border-radius: 999px; font-size: .95rem }
  .nav a:hover { background: var(--flour); color: var(--ink) }
  .nav a.b { background: var(--chili) }
}
</style>
