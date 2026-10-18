# Architettura

Vue 3 (`<script setup>`) + Vite, sito statico a pagina singola. Nessun router, nessuno store:
le sezioni sono scene a schermo intero montate in ordine da `src/App.vue`.

```
index.html                 entry Vite: meta, CSP, font
src/
  main.js                  monta App e importa gli stili globali
  App.vue                  ordine delle sezioni
  config.js                variabili d'ambiente (VITE_*)
  styles/
    tokens.css             colori, font, gutter responsive
    base.css               reset, .mono .mega .h2 .lede .btn .wrap .row, scena foto (.scene .bg .scrim)
  content/
    site.js                testi strutturati, contatti, orari, foto (import da /immagini)
    phuket.js              geografia della mappa: costa, isole, luoghi, tratte
  lib/                     logica pura, testabile senza DOM
    math.js                clamp, smoothstep, stepped (slide che si fermano allineate)
    booking.js             composizione e validazione della richiesta di tavolo
    phuketMap.js           proiezione, percorsi, camera e loop della mappa (DOM SVG imperativo)
  composables/
    useBangkokClock.js     ora di Phuket reattiva + funzioni pure bangkokNow/bangkokToday
    useClipboard.js        copia con fallback alla selezione
    useScrollProgress.js   progresso 0..1 di una sezione pinnata
    useReducedMotion.js
  components/
    brand/UrbyMark.vue     l'arco col sole (clipId unico per istanza)
    ui/                    PhotoBackdrop, CopyButton
    layout/                SiteHeader, QuickBar (barra in basso < 1100px), SiteFooter
    sections/              Hero, Common, Kitchen, Breakfast, Evening, House, FindUs, Book
immagini/                  foto originali (importate con l'alias @photos)
legacy/index.html          il sito originale prima della conversione, solo riferimento
tests/unit, tests/components
```

## Convenzioni
- **Stili**: ogni sezione ha il suo `<style>` **non scoped**, con i nomi di classe del design
  originale. La mappa genera nodi SVG a runtime che lo scoping non raggiungerebbe.
- **Contenuti** in `src/content/`; i componenti li leggono, non li scrivono.
- **Scroll**: le scene pinnate (`BreakfastSection`, `FindUsSection`) calcolano il progresso
  della sezione e lo inseguono con un'interpolazione per fotogramma. Un solo rAF per scena,
  listener `passive`, pulizia in `onBeforeUnmount`.
- **Mappa**: `mountPhuketMap(root, { mcard, reduce })` costruisce l'SVG e restituisce la funzione
  di pulizia. È codice portato 1:1 dal sito originale: i commenti in italiano spiegano le scelte
  di performance (Safari, filtri, non-scaling-stroke). Cambiarla con cautela.
- **Alias**: `@` → `src/`, `@photos` → `immagini/`.
