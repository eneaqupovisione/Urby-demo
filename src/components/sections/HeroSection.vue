<script setup>
import UrbyMark from '@/components/brand/UrbyMark.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { PHOTOS } from '@/content/site.js'
</script>

<template>
  <section id="top" class="scene hero" aria-label="Urby, neighbourhood kitchen and bakery">
    <PhotoBackdrop :src="PHOTOS.hero" color="var(--clay)" />
    <div class="wrap in">
      <h1 class="big" aria-label="Urby">
        <UrbyMark class="mark" clip-id="arch-hero" sun-class="hsun" />
        <span class="word" aria-hidden="true">
          <span class="wm-big"><span v-for="(ch, i) in 'URBY'" :key="ch" :style="{ '--i': i }">{{ ch }}</span></span>
          <span class="wm-sub">Kitchen &amp; Bakery</span>
        </span>
      </h1>
      <div class="row"><a class="btn chili" href="#book">Book a table</a><a class="btn line" href="#kitchen">See the kitchen</a></div>
    </div>
  </section>
</template>

<style>
.hero .big { display: flex; flex-direction: row; align-items: center; gap: clamp(12px, 3vw, 44px); font-weight: 400 }
.hero .mark { width: clamp(70px, 23vw, 200px); flex: 0 0 auto; height: auto; display: block; filter: drop-shadow(0 6px 26px rgba(0, 0, 0, .4)); animation: markin 1.1s cubic-bezier(.2, .8, .2, 1) both .1s }
.hero .mark .hsun { transform-box: fill-box; transform-origin: center; animation: hsun 1.8s cubic-bezier(.2, .8, .2, 1) both .35s }
@keyframes hsun { from { transform: translateY(-70%) } to { transform: none } }
.hero .word { display: flex; flex-direction: column; gap: .35em }
.hero .wm-big { display: flex; overflow: hidden; font-family: var(--serif); font-size: clamp(3.6rem, 18.5vw, 15rem); line-height: .9; letter-spacing: .14em; margin-right: -.14em; text-shadow: 0 4px 30px rgba(0, 0, 0, .4); padding-top: .04em }
.hero .wm-big span { display: inline-block; animation: rise 1s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--i) * 80ms + .3s) }
.hero .wm-sub { display: flex; align-items: center; gap: .9rem; font-family: var(--mono); font-size: clamp(.66rem, 2.4vw, .9rem); letter-spacing: .26em; text-transform: uppercase; color: var(--saffron); animation: markin 1s ease both .9s }
.hero .wm-sub::before, .hero .wm-sub::after { content: ""; height: 1px; width: clamp(14px, 5vw, 56px); background: currentColor; opacity: .7 }
/* the sticky bottom bar already carries Book + Directions below desktop */
@media (max-width: 1099px) { .hero .row { display: none } }
</style>
