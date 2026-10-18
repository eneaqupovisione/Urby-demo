# URBY — sito

Landing page di URBY, neighbourhood kitchen & bakery a Thalang, Phuket. Vue 3 + Vite, sito statico.
Copy del sito in inglese; con l'utente si parla in italiano.

## Comandi
- `npm run dev`: server di sviluppo
- `npm run build` / `npm run preview`: build di produzione in `dist/` e anteprima
- `npm test`: Vitest
- `npm run lint`: ESLint (flat config, eslint-plugin-vue)
- `npm run check`: lint + test + build, **obbligatorio prima di consegnare**

## Squadra di agenti (`.claude/agents/`)
Il thread principale è l'**orchestrator** (Opus 5.5, effort alto, impostato in `.claude/settings.json`):
pianifica e delega. Eseguono i sub-agenti (Sonnet 5.5, effort medio):
`ux-ui-designer`, `vue-expert`, `security-expert`, `test-engineer`, `copywriter`.

Comandi rapidi: `/feature`, `/review`, `/security-audit`, `/copy-pass`, `/design-review`.

## Regole del progetto
1. **Il design attuale non si cambia** senza richiesta esplicita. Riferimento: `.claude/docs/design-system.md`.
2. Contenuti in `src/content/`, logica pura in `src/lib/`, stato in `src/composables/`.
   Vedi `.claude/docs/architecture.md`.
3. Stili di sezione non scoped nello `<style>` del componente, con i nomi di classe esistenti.
4. Mai `v-html`; link esterni con `rel="noopener noreferrer"`. Vedi `.claude/docs/security.md`.
5. Ogni comportamento nuovo ha un test. Vedi `.claude/docs/testing.md`.
6. Sempre `prefers-reduced-motion`.
7. Commit e push solo se l'utente li chiede.
8. Fine lavoro secondo `.claude/docs/definition-of-done.md`.

## Riferimenti
- `legacy/index.html`: il sito originale prima della conversione (contiene la mappa da cui è portata `src/lib/phuketMap.js`).
- `immagini/`: foto usate dal sito. `urby_vero/`: screenshot di riferimento, non usati.
