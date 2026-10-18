<script setup>
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { PHOTOS } from '@/content/site.js'
</script>

<template>
  <section id="evening" class="scene evening" aria-labelledby="evening-h">
    <PhotoBackdrop :src="PHOTOS.evening" color="var(--clay)" />
    <div class="wrap in">
      <p class="mono" style="color:var(--saffron)">17:00 Records &amp; aperitivo · 18:30 – 23:00 Dinner</p>
      <h2 id="evening-h" class="mega">Dinner <em>in common.</em></h2>
      <p class="lede">Dinner under the lanterns. One long table, a shared word, the last pour at eleven.</p>
      <div class="row"><a class="btn chili" href="#book">Book a table</a></div>
    </div>
  </section>
</template>
