<script setup>
import { LANGUAGES } from '@/content/site.js'

const loop = [...LANGUAGES, ...LANGUAGES]
const ariaLanguages = 'Languages of the house: English, Russian, Korean, Japanese, Chinese'
</script>

<template>
  <section id="common" class="common" aria-labelledby="common-h">
    <div class="wrap copy">
      <div>
        <p class="mono" style="color:var(--saffron);margin-bottom:22px">In common · Est. 2025</p>
        <h2 id="common-h" class="mega">A bakery counter that grew a <em>long table.</em></h2>
      </div>
      <div style="display:flex;flex-direction:column;gap:22px">
        <p class="sub">Bread from seven. Everyday plates, cooked in house. Records and aperitivo when the light goes.</p>
        <p class="table-line">Different letters, one word. Different people, one table.</p>
      </div>
    </div>
    <div>
      <div class="marq" :aria-label="ariaLanguages">
        <div aria-hidden="true"><span v-for="(l, i) in loop" :key="i" :lang="l.lang">{{ l.label }}</span></div>
      </div>
      <div class="wrap est mono"><span>Every corner a blend of cultures</span><span>Living side by side</span></div>
    </div>
  </section>
</template>

<style>
.common { background: var(--ink); padding-block: 96px 40px; min-height: 100vh; min-height: 100svh; display: flex; flex-direction: column; justify-content: space-between; gap: 44px; overflow: clip }
.common .copy { display: flex; flex-direction: column; gap: 26px }
.common .copy > div { min-width: 0 }
.common .sub { color: var(--flour-dim); font-size: 1.2rem; max-width: 30ch }
.table-line { font-family: var(--serif); font-style: italic; font-size: clamp(2.2rem, 8.5vw, 4.6rem); line-height: 1; color: var(--saffron); text-wrap: balance; max-width: 16ch }
.marq { border-block: 2px solid var(--flour); overflow: hidden; white-space: nowrap; padding-block: 14px }
.marq div { display: inline-flex; gap: 2.2rem; animation: marq 26s linear infinite; padding-right: 2.2rem }
.marq span { font-size: clamp(2rem, 8vw, 3.6rem); font-weight: 800; font-stretch: 78%; letter-spacing: -.02em; display: inline-flex; align-items: center; gap: 2.2rem }
.marq span::after { content: ""; width: 14px; height: 14px; border-radius: 50%; background: var(--chili) }
@keyframes marq { to { transform: translateX(-50%) } }
.est { display: flex; justify-content: space-between; gap: 12px; color: var(--saffron); margin-top: 18px }
@media (min-width: 1100px) {
  .common { padding-block: 120px 56px }
  .common .copy { flex-direction: row; justify-content: space-between; align-items: flex-end; gap: 72px }
  .common .copy > div:first-child { flex: 1 1 60% }
  .common .copy > div:last-child { flex: 0 1 34% }
}
@media (prefers-reduced-motion: reduce) { .marq div { animation: none } }
</style>
