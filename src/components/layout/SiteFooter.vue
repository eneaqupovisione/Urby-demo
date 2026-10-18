<script setup>
import { ref } from 'vue'
import CopyButton from '@/components/ui/CopyButton.vue'
import { CONTACT } from '@/content/site.js'

const mailEl = ref(null)
const telEl = ref(null)
</script>

<template>
  <footer id="contact" class="foot">
    <div class="wrap">
      <h2 class="mega" style="margin-bottom:40px">See you <em>soon.</em></h2>
      <div class="fgrid">
        <div>
          <h3>The address</h3>
          <address><template v-for="(line, i) in CONTACT.addressLines" :key="i">{{ line }}<br v-if="i < CONTACT.addressLines.length - 1"></template></address>
          <a class="cp" :href="CONTACT.mapsUrl" target="_blank" rel="noopener noreferrer">Directions ↗</a>
        </div>
        <div><h3>Hours</h3><p>Kitchen 07:00 – 23:00<br>Seven days<br>Dinner from 18:30</p></div>
        <div>
          <h3>Write or call</h3>
          <p ref="mailEl">{{ CONTACT.email }}</p>
          <CopyButton class="cp" :text="CONTACT.email" label="Copy email" :target="mailEl" />
          <p ref="telEl" style="margin-top:14px">{{ CONTACT.phone }}</p>
          <CopyButton class="cp" :text="CONTACT.phone" label="Copy number" :target="telEl" />
        </div>
        <div><h3>Follow</h3><p><a :href="CONTACT.instagram.url" target="_blank" rel="noopener noreferrer">{{ CONTACT.instagram.handle }}</a></p></div>
      </div>
      <div class="fine"><span>URBY · Neighbourhood kitchen &amp; bakery · Thalang · Phuket</span><span>© 2026 URBY · Prices in baht, service included</span></div>
    </div>
  </footer>
</template>

<style>
.foot { background: var(--ink); padding-block: 88px calc(130px + env(safe-area-inset-bottom, 0px)) }
.fgrid { display: grid; gap: 28px }
.fgrid h3 { font-family: var(--mono); font-size: .74rem; letter-spacing: .14em; text-transform: uppercase; color: var(--flour-dim); margin-bottom: 8px; font-weight: 500 }
.fgrid p, .fgrid address { font-style: normal; font-size: 1.2rem; line-height: 1.4 }
.cp { display: inline-flex; align-items: center; margin-top: 8px; min-height: 42px; padding: 0 16px; border-radius: 999px; border: 2px solid var(--flour-dim); background: transparent; color: var(--flour); cursor: pointer; font-size: .9rem; font-weight: 600; text-decoration: none }
.cp:hover { background: var(--flour); color: var(--ink) }
.fine { margin-top: 48px; color: var(--flour-dim); font-family: var(--mono); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px }
@media (min-width: 720px) { .fgrid { grid-template-columns: 1fr 1fr } }
@media (min-width: 1100px) {
  .foot { padding-block: 110px 56px }
  .fgrid { grid-template-columns: repeat(4, 1fr); gap: 40px }
}
</style>
