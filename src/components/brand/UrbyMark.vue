<script setup>
/* The arch with the setting sun. `clipId` must be unique per instance on the page. */
defineProps({
  clipId: { type: String, required: true },
  sunClass: { type: String, default: '' }
})
</script>

<template>
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <defs><clipPath :id="clipId"><path d="M7 28V15a9 9 0 0 1 18 0v13Z" /></clipPath></defs>
    <path d="M7 28V15a9 9 0 0 1 18 0v13Z" fill="#f4b731" />
    <g :clip-path="`url(#${clipId})`">
      <circle :class="sunClass" cx="16" cy="19" r="4.6" fill="#c43b20" />
      <rect x="0" y="21" width="32" height="12" fill="#1b1511" />
      <path d="M9 23.6h5M18 23.6h5M11.5 26h9" stroke="#f4b731" stroke-width="1.1" stroke-linecap="round" opacity=".75" />
    </g>
  </svg>
</template>
