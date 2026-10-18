<script setup>
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { PHOTOS, DAY } from '@/content/site.js'
import { useBangkokClock } from '@/composables/useBangkokClock.js'

const now = useBangkokClock()
const isNow = (slot) => !!now.value && now.value.mins >= slot.from && now.value.mins < slot.to
</script>

<template>
  <section id="kitchen" class="scene kitchen" aria-labelledby="kitchen-h">
    <PhotoBackdrop :src="PHOTOS.kitchen" color="var(--ink)" />
    <div class="wrap kit">
      <div class="in">
        <p class="mono" style="color:var(--saffron)">Kitchen · 07:00 – 23:00 · seven days</p>
        <h2 id="kitchen-h" class="mega">Cooked <em>in house.</em></h2>
        <p class="lede">Everyday plates, made from scratch. Counter seats are kept for walk-ins every night.</p>
      </div>
      <div>
        <span class="mono clock">{{ now ? `${now.label} in Phuket` : '' }}</span>
        <ul class="day">
          <li v-for="slot in DAY" :key="slot.from" :class="{ now: isNow(slot) }">
            <span class="t">{{ slot.time }}</span><span>{{ slot.label }}</span><span class="n">Now</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
.kit { display: flex; flex-direction: column; gap: 28px }
.kit > * { min-width: 0 }
.day { list-style: none; margin: 0; padding: 8px; background: rgba(27, 21, 17, .82); border-radius: 20px; backdrop-filter: blur(8px) }
.day li { display: grid; grid-template-columns: 5.6rem 1fr auto; align-items: baseline; gap: 10px; padding: 13px 12px; font-size: 1.2rem; font-weight: 700; border-radius: 12px }
.day li + li { border-top: 1px solid rgba(247, 237, 220, .18) }
.day li .t { font-family: var(--mono); font-size: .9rem; font-weight: 500; color: var(--saffron) }
.day li .n { font-family: var(--mono); font-size: .65rem; letter-spacing: .14em; text-transform: uppercase; opacity: 0 }
.day li.now { background: var(--chili); border-top-color: transparent }
.day li.now .t { color: var(--flour) }
.day li.now .n { opacity: 1 }
.day li.now + li { border-top-color: transparent }
.clock { display: block; color: var(--flour-dim); margin-bottom: 8px; padding-left: 8px }
@media (min-width: 720px) { .kit { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 40px; align-items: end } }
</style>
