<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { BREAKFAST } from '@/content/site.js'
import { stepped } from '@/lib/math.js'
import { scrollProgress } from '@/composables/useScrollProgress.js'
import { prefersReducedMotion } from '@/composables/useReducedMotion.js'

/* Pinned scene: vertical scroll moves the strip sideways. Each slide rests
   aligned, and the position eases toward the scroll target every frame. */
const N = BREAKFAST.length
const section = ref(null)
const pos = ref(0)
const reduce = ref(false)
const INTRO_SCRIM = 'linear-gradient(to top,rgba(27,21,17,.9),rgba(27,21,17,.35) 60%,rgba(27,21,17,.45))'

const counter = computed(() => `${String(Math.min(N, Math.round(pos.value) + 1)).padStart(2, '0')} / ${String(N).padStart(2, '0')}`)
const trackStyle = computed(() => (reduce.value ? null : { transform: `translate3d(${-pos.value * 100}%,0,0)` }))
const lineWidth = computed(() => `${N > 1 ? (pos.value / (N - 1)) * 100 : 0}%`)

let cur = -1
let raf = 0
function frame() {
  raf = 0
  const target = stepped(scrollProgress(section.value), N - 1)
  cur += (target - cur) * (cur < 0 ? 1 : 0.16)
  if (Math.abs(target - cur) < 0.0005) cur = target
  pos.value = cur
  if (cur !== target) raf = requestAnimationFrame(frame)
}
const onScroll = () => { if (!raf && !reduce.value) raf = requestAnimationFrame(frame) }
const onResize = () => { cur = -1; onScroll() }

onMounted(() => {
  reduce.value = prefersReducedMotion()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  onScroll()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <section id="breakfast" ref="section" class="hs" :class="{ rm: reduce }" :style="{ '--n': N }" aria-label="Breakfast, scroll to move sideways">
    <div class="hstick">
      <div class="hui" aria-hidden="true"><span class="count">{{ counter }}</span><span class="line"><i :style="{ width: lineWidth }"></i></span></div>
      <div class="htrack" :style="trackStyle">
        <article v-for="(s, i) in BREAKFAST" :key="i" class="slide">
          <PhotoBackdrop :src="s.photo" :color="s.color" :scrim="s.kind === 'intro' ? INTRO_SCRIM : ''" />
          <template v-if="s.kind === 'intro'">
            <p class="mono" style="color:var(--saffron)">{{ s.eyebrow }}</p>
            <h2 class="dish">{{ s.title }}</h2>
            <p class="lede">{{ s.lede }}</p>
            <span class="hint mono"><span>Keep scrolling</span><b>→</b></span>
          </template>
          <template v-else-if="s.kind === 'dish'">
            <span class="price">{{ s.price }}</span>
            <h3 class="dish">{{ s.title }} <em>{{ s.accent }}</em></h3>
          </template>
          <template v-else>
            <p class="mono" style="color:var(--saffron)">{{ s.eyebrow }}</p>
            <h3 class="dish">{{ s.title }} <em>{{ s.accent }}</em></h3>
            <div class="row"><a class="btn chili" href="#book">Book a table</a><a class="btn line" href="#find">Find us</a></div>
          </template>
        </article>
      </div>
    </div>
  </section>
</template>

<style>
.hs { position: relative; height: calc(var(--n) * 100vh); height: calc(var(--n) * 100svh); background: var(--ink) }
.hstick { position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden }
.htrack { display: flex; height: 100%; width: 100%; will-change: transform }
.slide { position: relative; flex: 0 0 100%; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; gap: 16px; padding: 96px var(--gxr) calc(112px + env(safe-area-inset-bottom, 0px)) var(--gx); isolation: isolate; overflow: hidden; color: var(--flour) }
.slide .price { font-family: var(--mono); font-size: clamp(1.6rem, 6vw, 2.6rem); font-weight: 500; color: var(--saffron) }
.slide .dish { font-size: clamp(3.2rem, 15.5vw, 11rem); line-height: .84; font-weight: 800; font-stretch: 75%; letter-spacing: -.04em; text-transform: uppercase; text-wrap: balance; text-shadow: 0 3px 24px rgba(0, 0, 0, .4) }
.slide .dish em { font-family: var(--serif); font-style: italic; font-weight: 400; text-transform: none; letter-spacing: -.01em; font-stretch: 100%; color: var(--saffron); display: block; font-size: .8em; line-height: .9 }
.hui { position: absolute; z-index: 5; left: var(--gx); right: var(--gxr); top: calc(72px + env(safe-area-inset-top, 0px)); display: flex; align-items: center; gap: 14px; pointer-events: none }
.hui .count { font-family: var(--mono); font-size: .85rem; letter-spacing: .12em; background: var(--ink); padding: .35rem .7rem; border-radius: 999px }
.hui .line { flex: 1; height: 4px; background: rgba(247, 237, 220, .3); border-radius: 4px; overflow: hidden }
.hui .line i { display: block; height: 100%; width: 0; background: var(--saffron) }
.hint { display: inline-flex; align-items: center; gap: .6rem; background: var(--ink); padding: .55rem 1rem; border-radius: 999px; align-self: flex-start }
.hint b { display: inline-block; animation: nudge 1.4s ease-in-out infinite }
@keyframes nudge { 50% { transform: translateX(6px) } }
@media (min-width: 1100px) { .slide { padding-bottom: 84px } }
/* reduced motion: a plain swipeable strip instead of the pinned scene */
.hs.rm { height: auto }
.hs.rm .hstick { position: relative; height: 100svh; overflow-x: auto; scroll-snap-type: x mandatory }
.hs.rm .htrack { width: max-content }
.hs.rm .slide { flex: 0 0 100vw; scroll-snap-align: start }
</style>
