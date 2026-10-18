<script setup>
import { CONTACT } from '@/content/site.js'
</script>

<template>
  <div class="bar" role="navigation" aria-label="Quick actions">
    <a class="btn chili" href="#book">Book a table</a>
    <a class="btn" :href="CONTACT.mapsUrl" target="_blank" rel="noopener noreferrer">Directions</a>
  </div>
</template>

<style>
/* sticky bottom bar on phone and tablet */
.bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; display: flex; gap: 10px; padding: 10px var(--gxr) calc(10px + env(safe-area-inset-bottom, 0px)) var(--gx); justify-content: center }
.bar .btn { flex: 1; max-width: 260px; min-height: 52px; box-shadow: 0 6px 24px rgba(0, 0, 0, .35) }
@media (min-width: 1100px) { .bar { display: none } }
</style>
