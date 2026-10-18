<script setup>
import { useClipboard } from '@/composables/useClipboard.js'

const props = defineProps({
  text: { type: String, required: true },
  label: { type: String, default: 'Copy' },
  /* element to select when the clipboard API is blocked */
  target: { type: Object, default: null }
})
const { label: current, copy } = useClipboard(props.label)
</script>

<template>
  <button type="button" @click="copy(props.text, props.target)">{{ current }}</button>
</template>
