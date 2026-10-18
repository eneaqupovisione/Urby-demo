# URBY

Sito di URBY, neighbourhood kitchen & bakery a Thalang, Phuket.
Vue 3 + Vite, pagina singola statica.

```bash
npm install
npm run dev        # sviluppo
npm run check      # lint + test + build
npm run build      # produzione in dist/
```

## Configurazione
Copia `.env.example` in `.env` e imposta `VITE_BOOKING_URL_TEMPLATE` (solo `https`, con `{msg}`)
per attivare il bottone "Send to the booking chat". Senza, il form propone di copiare la richiesta.

## Struttura
Vedi `CLAUDE.md` e `.claude/docs/architecture.md`. Il sito originale è in `legacy/index.html`.

## Lavorare con Claude Code
`.claude/` contiene un orchestratore (Opus) e cinque sub-agenti (Sonnet): design UX/UI, Vue,
sicurezza, test e copy, più i comandi `/feature`, `/review`, `/security-audit`, `/copy-pass`,
`/design-review`.
