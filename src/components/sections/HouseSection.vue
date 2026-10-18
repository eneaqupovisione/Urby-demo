<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { HOUSE } from '@/content/site.js'
import { prefersReducedMotion } from '@/composables/useReducedMotion.js'

/* Same height for every photo, each keeps its own proportions. Arrow buttons
   only show for mouse users; touch users swipe. */
const strip = ref(null)
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = strip.value
  if (!el) return
  atStart.value = el.scrollLeft <= 2
  atEnd.value = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2
}
function go(dir) {
  const el = strip.value
  el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
onMounted(() => { update(); window.addEventListener('resize', update) })
onBeforeUnmount(() => window.removeEventListener('resize', update))
</script>

<template>
  <section id="house" class="house" aria-labelledby="house-h">
    <div class="wrap head">
      <div>
        <p class="mono" style="color:var(--saffron);margin-bottom:14px">The house · Thalang</p>
        <h2 id="house-h" class="mega">Come <em>inside.</em></h2>
      </div>
      <div class="arrows">
        <button type="button" aria-label="Previous photos" :disabled="atStart" @click="go(-1)">←</button>
        <button type="button" aria-label="Next photos" :disabled="atEnd" @click="go(1)">→</button>
      </div>
    </div>
    <div ref="strip" class="strip" tabindex="0" aria-label="Photos of the house, scroll sideways" @scroll.passive="update">
      <figure v-for="p in HOUSE" :key="p.caption">
        <img :src="p.src" :width="p.w" :height="p.h" :alt="p.caption" loading="lazy" decoding="async">
        <figcaption class="mono">{{ p.caption }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<style>
.house { background: var(--ink); padding-block: 96px 72px; display: flex; flex-direction: column; gap: 32px }
.house .head { display: flex; flex-direction: row; justify-content: space-between; align-items: flex-end; gap: 20px }
.strip { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 0 var(--gxr) 12px var(--gx); scroll-padding-inline: var(--gx); scrollbar-width: thin; scrollbar-color: var(--chili) transparent; overscroll-behavior-x: contain; -webkit-overflow-scrolling: touch }
.strip figure { flex: 0 0 auto; scroll-snap-align: start; display: flex; flex-direction: column; gap: 10px; max-width: 86vw }
.strip img { display: block; height: min(58svh, 480px); width: auto; max-width: 86vw; object-fit: cover; border-radius: 18px; background: var(--clay) }
.strip figcaption { color: var(--flour-dim); width: 0; min-width: 100% }
.arrows { display: none; gap: 8px; flex: 0 0 auto }
.arrows button { width: 54px; height: 54px; border-radius: 50%; border: 2px solid var(--flour); background: transparent; color: var(--flour); font-size: 1.3rem; cursor: pointer; transition: background .2s, color .2s, opacity .2s }
.arrows button:hover:not(:disabled) { background: var(--flour); color: var(--ink) }
.arrows button:disabled { opacity: .3; cursor: default }
@media (hover: hover) and (pointer: fine) { .arrows { display: flex } }
@media (min-width: 1100px) { .house { padding-block: 130px 90px } }
</style>
