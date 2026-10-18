<script setup>
import { computed } from 'vue'

/* Full-bleed photo with its scrim. `color` shows while the photo loads. */
const props = defineProps({
  src: { type: String, default: '' },
  color: { type: String, default: 'var(--ink)' },
  scrim: { type: String, default: '' }
})
const bgStyle = computed(() => ({ '--c': props.color, ...(props.src ? { '--img': `url("${props.src}")` } : {}) }))
</script>

<template>
  <div class="bg photo" :style="bgStyle"></div>
  <div class="scrim" :style="scrim ? { background: scrim } : null"></div>
</template>
