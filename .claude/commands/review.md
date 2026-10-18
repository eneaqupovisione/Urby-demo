---
description: Revisione completa delle modifiche correnti da parte di tutti gli specialisti
---

Rivedi le modifiche non ancora committate (`git diff` e `git status`).

Lancia in parallelo, ognuno sul diff:
- `ux-ui-designer`: il design è invariato o migliorato come richiesto? responsive e motion ok?
- `vue-expert`: correttezza, reattività, pulizia di listener e rAF, performance.
- `security-expert`: input, link, CSP, dipendenze, segreti.
- `test-engineer`: copertura dei comportamenti cambiati ed esito di `npm run check`.
- `copywriter`: solo se il diff tocca testi.

Unisci i risultati in un unico elenco ordinato per gravità, senza duplicati, con file:riga.
Non applicare correzioni senza conferma dell'utente.
