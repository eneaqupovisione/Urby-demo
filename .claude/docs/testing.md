# Test

`npm test` (Vitest + jsdom). `npm run check` = lint + test + build, obbligatorio prima di consegnare.

## Cosa si testa
| Livello | Dove | Cosa |
|---|---|---|
| Unit | `tests/unit/` | `lib/math`, `lib/booking`, geometria di `lib/phuketMap`, `useBangkokClock` |
| Componente | `tests/components/` | form Book (validazione, link chat, modifica), header, hero, link esterni |
| Visivo | manuale / Playwright | scene pinnate, mappa, responsive: lo verifica `ux-ui-designer` |

## Convenzioni
- Un `describe` per modulo, nomi dei test che descrivono il comportamento.
- Date esplicite per tutto ciò che dipende dall'ora (fuso Asia/Bangkok).
- Props iniettabili per la configurazione (es. `botTemplate` di `BookSection`) invece di mock dell'env.
- Nessuno snapshot di markup intero.
- Un bug corretto = un test che lo riproduce.

## Verifica visiva (facoltativa)
`npm run build && npx vite preview`, poi screenshot con Playwright usando il Chromium in
`/opt/pw-browsers` a 390×844 e 1440×900.
