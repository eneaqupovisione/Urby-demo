# Sicurezza

Sito statico senza backend: la superficie è piccola ma reale.

## Regole
1. **Nessun `v-html` / `innerHTML` con dati variabili.** La mappa usa `textContent` e `setAttribute`.
2. **Input del form** (`src/lib/booking.js`): `MAX_NAME` 80, `MAX_NOTE` 500, caratteri di controllo
   rimossi, nome obbligatorio. `maxlength` anche nel markup.
3. **Link alla chat**: `buildBotUrl` accetta solo `https:` e template con `{msg}`; il messaggio passa
   da `encodeURIComponent`. Una configurazione sbagliata produce "nessun link", mai un link pericoloso.
4. **Link esterni**: `target="_blank"` sempre con `rel="noopener noreferrer"`, solo `https://`.
5. **CSP** in `index.html`: `default-src 'self'`, script solo `'self'`, font e CSS solo da Google Fonts,
   `form-action 'none'`, `object-src 'none'`. Ogni nuova origine va motivata e approvata.
6. **Segreti**: niente chiavi nel repo. Ogni variabile `VITE_*` è pubblica nel bundle.
   `.env` è in `.gitignore`; il modello è `.env.example`.
7. **Dipendenze**: `npm audit --omit=dev` prima di ogni rilascio; nuove dipendenze solo se necessarie.
8. **Privacy**: nessun tracker, cookie o analytics senza richiesta esplicita.

## In produzione (hosting)
Spostare la CSP negli header HTTP e aggiungere `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` minima e `frame-ancestors 'none'`
(che nel `<meta>` non ha effetto).
