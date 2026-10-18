<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import CopyButton from '@/components/ui/CopyButton.vue'
import { CONTACT } from '@/content/site.js'
import { BOOKING_URL_TEMPLATE } from '@/config.js'
import { buildRequest, buildBotUrl, MAX_NAME, MAX_NOTE } from '@/lib/booking.js'
import { bangkokToday } from '@/composables/useBangkokClock.js'

const props = defineProps({
  /* injectable for tests; defaults to the env value */
  botTemplate: { type: String, default: BOOKING_URL_TEMPLATE }
})

const today = bangkokToday()
const form = reactive({ people: '2', time: '19:00', date: today, name: '', note: '' })
const request = ref('')
const nameInput = ref(null)
const resultEl = ref(null)
const requestEl = ref(null)
const botUrl = computed(() => buildBotUrl(props.botTemplate, request.value))

async function submit() {
  const msg = buildRequest(form)
  if (!msg) { nameInput.value?.focus(); return }
  request.value = msg
  await nextTick()
  resultEl.value?.scrollIntoView?.({ block: 'center', behavior: 'smooth' })
}
</script>

<template>
  <section id="book" class="book" aria-labelledby="book-h">
    <div class="wrap inner">
      <div>
        <h2 id="book-h" class="h2" style="font-size:clamp(3.4rem,17vw,11rem);text-transform:uppercase;line-height:.84;font-stretch:75%">Book a <em>table.</em></h2>
        <p class="walk">Counter seats are kept for walk-ins every night.</p>
        <p class="mono" style="margin-top:22px">Dinner from 18:30</p>
      </div>
      <div>
        <form v-if="!request" novalidate @submit.prevent="submit">
          <div class="pair">
            <div class="f">
              <label for="people">People</label>
              <select id="people" v-model="form.people"><option v-for="n in 6" :key="n">{{ n }}</option></select>
            </div>
            <div class="f"><label for="time">Time</label><input id="time" v-model="form.time" type="time" min="07:00" max="22:30"></div>
          </div>
          <div class="f"><label for="date">Date</label><input id="date" v-model="form.date" type="date" :min="today"></div>
          <div class="f"><label for="name">Name</label><input id="name" ref="nameInput" v-model="form.name" type="text" autocomplete="name" placeholder="Your name" :maxlength="MAX_NAME"></div>
          <div class="f"><label for="ask">Anything we should know</label><textarea id="ask" v-model="form.note" placeholder="Allergies, a birthday, a high chair" :maxlength="MAX_NOTE"></textarea></div>
          <button class="btn submit" type="submit">Request the table</button>
        </form>
        <div v-else ref="resultEl" class="result" aria-live="polite">
          <strong>Your request</strong>
          <pre ref="requestEl">{{ request }}</pre>
          <div class="row">
            <a v-if="botUrl" class="btn" :href="botUrl" target="_blank" rel="noopener noreferrer">Send to the booking chat</a>
            <CopyButton class="btn o" :text="request" label="Copy request" :target="requestEl" />
            <button class="btn o" type="button" @click="request = ''">Edit</button>
          </div>
          <span style="font-size:.98rem">
            <template v-if="botUrl">Tap the first button to send this to our booking chat.</template>
            <template v-else>The booking chat is not connected on this page yet. Copy the request and send it to {{ CONTACT.email }} or {{ CONTACT.phone }}.</template>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.book { background: var(--chili); padding-block: 96px 72px }
.book .inner { display: grid; grid-template-columns: minmax(0, 1fr); gap: 36px }
.book .inner > * { min-width: 0 }
.book .h2 em { color: var(--saffron) }
.walk { font-family: var(--serif); font-style: italic; font-size: 1.7rem; line-height: 1.12; max-width: 20ch; margin-top: 14px }
.book form { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; min-width: 0; max-width: 100% }
.f { display: flex; flex-direction: column; gap: 6px; min-width: 0; max-width: 100% }
.f label { font-family: var(--mono); font-size: .74rem; letter-spacing: .14em; text-transform: uppercase }
.f input, .f select, .f textarea { display: block; width: 100%; min-width: 0; max-width: 100%; min-height: 54px; border-radius: 14px; border: 2px solid var(--ink); background-color: var(--flour); color: var(--ink); padding: 0 14px; font-size: 1.05rem; -webkit-appearance: none; appearance: none; text-align: left; margin: 0 }
.f input::-webkit-date-and-time-value { text-align: left; min-width: 0 }
.f input::-webkit-datetime-edit { padding: 0 }
.f select { padding-right: 40px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9'%3E%3Cpath d='M1 1l6 6 6-6' fill='none' stroke='%231b1511' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center }
.f textarea { padding: 12px 14px; min-height: 92px; resize: vertical }
.pair { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; min-width: 0 }
.book .submit { max-width: 100%; min-height: 58px; font-size: 1.1rem; background: var(--ink); border-color: var(--ink); color: var(--flour) }
.result { background: var(--flour); color: var(--ink); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px; border: 2px solid var(--ink); min-width: 0; max-width: 100% }
.result .row > * { min-width: 0; max-width: 100% }
.result pre { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; font-family: var(--mono); font-size: .95rem; line-height: 1.5; background: rgba(27, 21, 17, .08); padding: 12px; border-radius: 12px }
.result .btn { min-height: 46px; font-size: .95rem; background: var(--ink); border-color: var(--ink); color: var(--flour) }
.result .btn.o { background: transparent; color: var(--ink) }
@media (min-width: 720px) { .book .inner { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px; align-items: start } }
@media (min-width: 1100px) {
  .book { padding-block: 140px 110px }
  .book .inner { gap: 110px }
}
</style>
