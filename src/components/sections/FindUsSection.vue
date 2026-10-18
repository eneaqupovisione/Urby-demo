<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CopyButton from '@/components/ui/CopyButton.vue'
import { CONTACT, ADDRESS_ONE_LINE } from '@/content/site.js'
import { mountPhuketMap } from '@/lib/phuketMap.js'
import { prefersReducedMotion } from '@/composables/useReducedMotion.js'

/* Pinned map of Phuket: every trip leaves Urby together, the list (desktop)
   marks the arrivals, then the map fades behind "Relax. You can go anywhere."
   and the address card appears. Phone hides the list: labels carry the minutes. */
const section = ref(null)
const mcard = ref(null)
const addr = ref(null)
let unmount = () => {}

onMounted(() => { unmount = mountPhuketMap(section.value, { mcard: mcard.value, reduce: prefersReducedMotion() }) })
onBeforeUnmount(() => unmount())
</script>

<template>
  <section id="find" ref="section" class="map-track" aria-label="Find us, scroll to travel the map">
    <div class="map-stage">
      <div class="map-card">
        <span class="eyebrow">Find us · from Urby</span>
        <div id="dests"></div>
      </div>
      <div class="map-wrap">
        <svg id="map" viewBox="0 0 560 940" fill="none" aria-label="Map of Phuket">
          <g id="gView"><g id="gLand"></g><g id="gGrid"></g><g id="gLegs"></g></g>
          <g id="gTrav"></g>
          <g id="gPts"></g>
        </svg>
      </div>
      <div id="finale" class="finale">
        <p class="a">Relax.</p>
        <p class="b">You can go anywhere.</p>
      </div>
      <div class="hud">
        <span id="hudA" class="mono">URBY</span>
        <div class="hbar"><i id="hudBar"></i></div>
        <span id="hudB" class="mono">Everywhere</span>
      </div>
      <div ref="mcard" class="mcard">
        <strong>URBY, Thalang</strong>
        <address ref="addr">{{ ADDRESS_ONE_LINE }}</address>
        <div class="mrow">
          <a class="sm" :href="CONTACT.mapsUrl" target="_blank" rel="noopener noreferrer">Maps ↗</a>
          <CopyButton class="sm o" :text="ADDRESS_ONE_LINE" label="Copy" :target="addr" />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* ---- find us: the original Phuket map, scroll drives the trips ---- */
.map-track{--sans:var(--display);--gut:var(--gx);--ease:cubic-bezier(.22,.61,.36,1);--slow:cubic-bezier(.16,1,.3,1);
  --sea:#1b1511;--land:#4a2c1d;--coast:rgba(247,237,220,.55);--arc:#f4b731;--pin:#e8452a;--halo:rgba(27,21,17,.55);
  --panel:rgba(27,21,17,.92);--line:rgba(247,237,220,.22);--text:#f7eddc;--faint:rgba(247,237,220,.62);color:var(--text)}
.map-card .eyebrow{font-family:var(--mono);font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:var(--saffron)}
.map-card{border-radius:20px}
.map-stage{padding-top:calc(88px + env(safe-area-inset-top,0px))}
@media(max-width:900px){.map-stage{padding-top:calc(72px + env(safe-area-inset-top,0px));padding-bottom:calc(84px + env(safe-area-inset-bottom,0px))}
  .map-track .hud{bottom:calc(88px + env(safe-area-inset-bottom,0px))}
  /* phone: the list of trips takes too much room, the map labels already carry the minutes */
  .map-track .map-card{display:none}
  .map-track .map-stage{grid-template-rows:minmax(0,1fr)}
  .map-track .mcard{right:max(10px,env(safe-area-inset-right,0px));bottom:calc(130px + env(safe-area-inset-bottom,0px))}}
/* ══════════ MAPPA — 05 Find us ══════════ */
/* ══════════ la mappa ══════════ */
.map-track{height:310vh;position:relative}
.map-stage{position:sticky;top:0;height:100svh;overflow:hidden;background:var(--sea);
  display:grid;grid-template-columns:minmax(290px,32%) 1fr;align-items:center;
  gap:clamp(20px,4vw,60px);padding:0 var(--gut)}
@media(max-width:900px){
  .map-stage{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);
    padding-top:clamp(56px,8vh,84px);gap:12px}
}

/* scheda: tutte le mete insieme, ciascuna con la propria barra */
/* niente backdrop-filter: Safari lo ricalcola a ogni fotogramma perché sotto
   la mappa si muove. Compenso con un fondo piu opaco. */
.map-card{background:var(--panel);border:1px solid var(--line);
  padding:clamp(20px,2.4vw,30px);position:relative;z-index:3}
.map-card>.eyebrow{display:block;padding-bottom:16px;border-bottom:1px solid var(--line)}
.dest{padding:clamp(14px,2.1vh,20px) 0;border-bottom:1px solid var(--line);
  opacity:.34;transition:opacity .8s var(--ease)}
.dest:last-child{border-bottom:0;padding-bottom:0}
.dest.moving{opacity:.72}
.dest.there{opacity:1}
.dest .top{display:flex;justify-content:space-between;align-items:baseline;gap:14px}
.dest .nm{font-weight:300;font-size:clamp(16px,1.7vw,21px);letter-spacing:-.01em}
.dest .tm{font-weight:200;font-size:clamp(19px,2.2vw,28px);letter-spacing:-.03em;
  white-space:nowrap;font-variant-numeric:tabular-nums;display:inline-block}
.dest.there .tm{animation:tmpop .7s var(--slow)}
@keyframes tmpop{0%{transform:scale(1)}34%{transform:scale(1.16)}100%{transform:scale(1)}}
.dest .km{font-family:var(--mono);font-size:10px;letter-spacing:.14em;color:var(--faint);
  margin-top:5px;display:block}
/* la barretta è il tragitto di quella meta, coerente con l'arco sulla mappa */
.dest .prog{height:1px;background:var(--line);margin-top:11px;position:relative;overflow:hidden}
.dest .prog i{position:absolute;inset:0;background:var(--arc);transform-origin:0 50%;transform:scaleX(0)}
.dest.there .prog i{background:var(--text)}
@media(max-width:900px){
  .map-card{padding:12px 16px}
  .map-card>.eyebrow{padding-bottom:9px}
  .dest{padding:9px 0}
  .dest .km,.dest .prog{display:none}
  .dest .nm{font-size:14px}.dest .tm{font-size:16px}
}

/* La cella va stirata (con align-items:center non lo sarebbe), e l'SVG viene
   posizionato in assoluto sui quattro lati: così ha un riquadro definito senza
   dipendere da altezze in percentuale, che qui non si risolvono e lo facevano
   ricadere sul proprio rapporto d'aspetto sfondando la cella. */
.map-wrap{position:relative;align-self:stretch;min-height:0}
/* width/height in percentuale esplicita: su un elemento rimpiazzato posizionato
   in assoluto, `auto` coi lati vincolati ricade sulle dimensioni intrinseche e
   l'SVG sfonda la cella. Il respiro attorno all'isola sta nel viewBox (VB.pad),
   non nel CSS, così preserveAspectRatio centra da solo. */
/* overflow:hidden ora è necessario: con la camera ravvicinata l'isola
   deborda dal viewBox e senza taglio invaderebbe il resto della sezione */
#map{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:hidden}
/* i tratti non devono ingrassare quando la camera stringe */
/* solo tratti continui: quelli tratteggiati si correggono nel loop */
/* Solo due elementi con non-scaling-stroke. Le 177 righe del reticolo l'avevano
   anch'esse, e a ogni fotogramma Safari ne ricalcolava la geometria una per una:
   ora lo spessore glielo passo dal gruppo, diviso per la scala della camera. */
#coast,.isle{vector-effect:non-scaling-stroke}

#coast{fill:var(--land);stroke:var(--coast);stroke-width:1.1;stroke-linejoin:round}
.isle{fill:var(--land);stroke:var(--coast);stroke-width:.8}

/* il percorso c'è tutto fin dall'inizio, ma appena accennato: intero e continuo,
   non tratteggiato — era il tratteggio a farlo sembrare percorso a metà.
   Questi tre NON usano non-scaling-stroke: su un tracciato animato col
   dasharray quella proprietà fa calcolare il passo in pixel di schermo, e a
   forte zoom la linea si spezza in frammenti. Lo spessore lo correggo nel
   loop dividendo per la scala della camera. */
.leg-base{fill:none;stroke:var(--arc);opacity:.16}
.leg-glow{fill:none;stroke:var(--arc);opacity:.22;stroke-linecap:round}
.leg-line{fill:none;stroke:var(--arc);stroke-linecap:round}
/* reticolo: dà terreno sotto i piedi quando la camera è addosso a URBY */
#gGrid{opacity:0;stroke:var(--coast);stroke-opacity:.3}
#gGrid line{stroke:inherit}

/* la meta si vede quasi subito, ma in sordina: si accende quando ci si arriva */
.pt{opacity:0;transition:opacity .9s var(--ease)}
.pt.on{opacity:.4}
.pt.reached{opacity:1}
.pt .dot{fill:var(--arc)}
.pt .ring{fill:none;stroke:var(--arc);stroke-width:1;opacity:.45}
.pt .ring2{fill:none;stroke:var(--arc);stroke-width:1;opacity:0;
  transition:opacity .9s var(--ease)}
.pt.reached .ring2{opacity:.4}
/* l'arrivo: un anello che esplode una volta sola, e il punto che sussulta.
   scala via transform (non via r) perché è supportata ovunque, Safari incluso */
.pt .burst,.pt .dot{transform-box:fill-box;transform-origin:center}
.pt .burst{fill:none;stroke:var(--arc);stroke-width:1.6;opacity:0}
.pt.reached .burst{animation:burst 1.15s var(--slow)}
@keyframes burst{0%{transform:scale(.3);opacity:.9}100%{transform:scale(3.4);opacity:0}}
.pt.reached .dot{animation:pop .65s var(--slow)}
@keyframes pop{0%{transform:scale(1)}38%{transform:scale(2)}100%{transform:scale(1)}}
/* i minuti compaiono sul posto, all'arrivo */
.pt text.tm{font-family:var(--mono);font-size:26px;letter-spacing:.01em;fill:var(--pin);
  opacity:0;transform:translateY(4px);transform-box:fill-box;
  transition:opacity .55s var(--ease) .12s,transform .7s var(--slow) .12s}
.pt text.tm .u{font-size:.55em;letter-spacing:.1em}    /* "min" piccolo e attaccato */
.pt.reached text.tm{opacity:1;transform:none}

/* URBY: all'inizio è il marchio, poi collassa nel pallino.
   Le quattro lettere hanno quattro caratteri diversi, come nel sito. */
.mwm{transform-box:fill-box;transform-origin:center}
/* `.pt text` vale 0-1-1: senza il selettore altrettanto specifico il marchio
   eredita gli 11px delle etichette invece dei suoi */
.pt text.wmt{font-family:var(--serif);font-size:72px;fill:var(--text);letter-spacing:.18em;text-transform:none}
/* .lbl resta fuori: la scala gliela dà l'attributo SVG, che parte dall'origine
   del segnaposto, così anche la distanza dal pallino cresce insieme al testo */
.core{transform-box:fill-box;transform-origin:center}
.pt.home .dot{fill:var(--pin)}
.pt.home .ring{stroke:var(--pin)}
/* L'alone è dipinto sotto le lettere, non è un filtro.
   Con due drop-shadow su cinque gruppi erano dieci filtri ricalcolati a ogni
   fotogramma, perché le etichette si spostano di continuo: su Safari è la voce
   di costo più cara di tutte. Il paint-order fa parte del disegno del testo e
   non costa niente; per non sembrare un contorno netto sta al 46%. */
.pt text{font-family:var(--sans);font-weight:400;font-size:24px;letter-spacing:.07em;
  text-transform:uppercase;fill:var(--text);
  paint-order:stroke fill;stroke:var(--halo);stroke-width:5.5px;stroke-linejoin:round}
.pt text.sub{font-family:var(--serif);font-style:italic;font-weight:400;font-size:19px;
  letter-spacing:0;text-transform:none;fill:var(--faint)}
@keyframes ping{0%{r:11;opacity:.5}70%,100%{r:36;opacity:0}}
.pt.home .ping{fill:none;stroke:var(--pin);stroke-width:1;animation:ping 3s var(--ease) infinite}

.trav{opacity:0;transition:opacity .3s}
.trav.on{opacity:1}
.trav .core{fill:var(--paper)}
.trav .halo{fill:none;stroke:var(--arc);stroke-width:1;opacity:.5}

/* il finale: la mappa si vela e resta la frase */
.finale{position:absolute;inset:0;z-index:7;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;
  pointer-events:none;padding:0 var(--gut);
  /* finché si vede solo "Relax." la seconda riga occupa comunque il suo spazio:
     senza questo scarto la prima riga resterebbe nella metà alta */
  transform:translateY(var(--half,0px));
  transition:transform 1.2s var(--slow)}
.finale.s2{transform:none}
/* bordo sfocato del colore del fondo: le prime due copie, strette e ripetute,
   fanno da stacco pieno; le altre sfumano, così il sotto non disturba il sopra */
.finale p{opacity:0;max-width:18ch;
  text-shadow:0 0 7px var(--sea),0 0 7px var(--sea),0 0 14px var(--sea),
              0 0 28px var(--sea),0 0 56px var(--sea),0 0 96px var(--sea);
  transition:opacity 1.2s var(--ease),transform 1.4s var(--slow)}
.finale .a,.finale .b{transform:translateY(30px)}
.finale .a{font-family:var(--serif);font-style:italic;font-weight:400;
  font-size:clamp(38px,7vw,96px);letter-spacing:-.01em;color:var(--faint);line-height:1}
.finale .b{font-weight:200;font-size:clamp(30px,5.6vw,76px);letter-spacing:-.035em;
  line-height:1.04;margin-top:.1em;color:var(--text)}
.finale.s1 .a{opacity:1;transform:none}
.finale.s2 .b{opacity:1;transform:none}

.hud{position:absolute;left:var(--gut);right:var(--gut);bottom:clamp(16px,3vh,28px);
  z-index:4;display:flex;align-items:center;gap:14px;pointer-events:none}
.hud .hbar{flex:1;height:1px;background:var(--line);position:relative;overflow:hidden}
.hud .hbar i{position:absolute;inset:0;background:var(--text);transform-origin:0 50%;transform:scaleX(0)}
.hud .mono{font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--faint);transition:color .9s var(--ease)}
.hud .mono.lit{color:var(--text)}
.mcard{position:absolute;z-index:6;right:var(--gxr);bottom:calc(88px + env(safe-area-inset-bottom,0px));width:240px;background:var(--flour);color:var(--ink);border:2px solid var(--ink);border-radius:14px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;opacity:0;transform:translateY(10px);transition:opacity .4s,transform .4s;pointer-events:none}
.mcard.on{opacity:1;transform:none;pointer-events:auto}
.mcard strong{font-size:.95rem;line-height:1.15}
.mcard address{font-style:normal;font-size:.8rem;line-height:1.3;color:#4a3c30}
.mcard .mrow{display:flex;gap:6px}
.mcard .sm{flex:1;min-height:40px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;border:2px solid var(--ink);background:var(--ink);color:var(--flour);font-size:.8rem;font-weight:700;text-decoration:none;cursor:pointer;padding:0 8px}
.mcard .sm.o{background:transparent;color:var(--ink)}
.map-track .mcard{z-index:8}

@media (min-width:1100px){.mcard{bottom:56px}}
</style>
