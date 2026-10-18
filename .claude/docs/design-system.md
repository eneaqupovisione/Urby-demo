# Design system URBY

Il design attuale è **il riferimento**: non si cambia senza richiesta esplicita dell'utente.

## Colori (`src/styles/tokens.css`)
| Token | Valore | Uso |
|---|---|---|
| `--ink` | #1b1511 | fondo principale, testo su chiaro |
| `--flour` | #f7eddc | testo su scuro, bottoni secondari |
| `--flour-dim` | #e2d5bf | testo secondario |
| `--saffron` | #f4b731 | corsivi, eyebrow, prezzi, percorsi della mappa |
| `--saffron-d` | #e0a01c | fondo di attesa foto |
| `--chili` | #c43b20 | CTA primaria, sezione Book, "now" |
| `--pin` | #e8452a | pin, stato chiuso |
| `--clay` | #7a2d17 | fondo di attesa foto |

## Tipografia
- **Display** `Bricolage Grotesque` 800, `font-stretch: 75%`, maiuscolo, interlinea .84: titoli `.mega`, `.dish`.
- **Serif** `Instrument Serif` corsivo, color zafferano: la chiusura di ogni titolo (`<em>`), il logo.
- **Mono** `DM Mono` 500, maiuscolo, tracking .14em: eyebrow, etichette, orari (`.mono`).
- Formula del titolo: `PAROLA <em>chiusura.</em>`

## Logo
`UrbyMark.vue`: arco zafferano con sole chili che tramonta su orizzonte ink. Nell'header in pillola
ink con "URBY" serif spaziato; nell'hero grande accanto a "URBY" + "Kitchen & Bakery".

## Layout
- Phone-first, ogni scena è alta uno schermo (`100svh`). Breakpoint: 720px (tablet), 1100px (desktop).
- Gutter `--gx`/`--gxr`: 16 / 36 / 56px, con le aree sicure.
- Header fisso con logo + stato aperto/chiuso; nav pillola solo da 1100px.
- Barra in basso con "Book a table" + "Directions" sotto 1100px: le CTA dell'hero lì sono nascoste.

## Componenti
`.btn` (pillola 50px, varianti `chili`, `line`, `ink`), `.scene` + `PhotoBackdrop` (foto a tutto
schermo con scrim), card orari `.day`, strip foto `.strip` (stessa altezza, proporzioni originali),
form Book su fondo chili, footer a 4 colonne.

## Motion
- Hero: lettere che salgono, sole che tramonta. Marquee delle lingue.
- Colazioni: scena pinnata, lo scroll verticale muove le slide in orizzontale, ogni slide si ferma allineata.
- Mappa: le tratte partono insieme da URBY, la camera si allarga, finale "Relax. / You can go anywhere."
  e card indirizzo in alto a destra della barra.
- Sempre `prefers-reduced-motion`: animazioni azzerate, scene pinnate sostituite da scorrimento semplice.
