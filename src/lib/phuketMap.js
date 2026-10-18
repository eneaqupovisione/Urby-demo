/* The Find us map: Phuket drawn in SVG, every trip leaves Urby at once and
   the scroll position of `root` drives camera, routes, arrivals and finale.
   Ported as-is from the original site; DOM is built imperatively because the
   loop touches hundreds of SVG nodes per frame and must stay cheap. */
import { COAST, ISLES, PLACES as P, LEGS } from '../content/phuket.js'
import { clamp, sstep } from './math.js'

const KMAX=Math.max(...LEGS.map(L=>L.km));

/* ── andatura ──
   Di base tutti viaggiano insieme alla stessa velocità. Ma quando restano in
   pochi lo scroll non deve consumarsi a guardare un solo cursore: ogni tratta
   fra un arrivo e il successivo riceve una fetta di scroll pesata anche su
   quanti percorsi sono ancora in movimento. Chi resta ultimo accelera. */
const ARR=LEGS.map(L=>L.km/KMAX);                  /* a che frazione arriva ciascuno */
const UB=(()=>{
  let prev=0;const w=ARR.map((a,i)=>{
    const d=a-prev;prev=a;return d*Math.pow(LEGS.length-i,.8);});
  const s=w.reduce((x,y)=>x+y,0);let acc=0;
  return w.map(x=>(acc+=x/s));                     /* punti di scroll degli arrivi */
})();
export function covered(u){                               /* scroll → frazione di strada */
  let pu=0,pa=0;
  for(let i=0;i<UB.length;i++){
    if(u<=UB[i]||i===UB.length-1)
      return pa+clamp((u-pu)/Math.max(1e-6,UB[i]-pu),0,1)*(ARR[i]-pa);
    pu=UB[i];pa=ARR[i];
  }
  return 1;
}

/* ══════════ proiezione ══════════ */
/* più larga dell'isola di proposito: il margine laterale serve alle etichette,
   che escono dai punti e verrebbero tagliate dall'overflow del riquadro */
export const VB={w:560,h:940,pad:54};
const all=COAST.concat(...ISLES,Object.values(P).map(p=>p.ll));
const k=Math.cos(8.0*Math.PI/180);
const xs=all.map(c=>c[0]*k),ys=all.map(c=>c[1]);
const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
const S=Math.min((VB.w-VB.pad*2)/(x1-x0),(VB.h-VB.pad*2)/(y1-y0));
const ox=(VB.w-(x1-x0)*S)/2, oy=(VB.h-(y1-y0)*S)/2;
export const proj=([lon,lat])=>[ox+(lon*k-x0)*S, oy+(y1-lat)*S];

/* t = tensione: più alto, meno la curva si allontana dai punti. Sulla costa,
   che ora ha punti fitti, serve alta o le insenature si arrotondano via. */
export function smooth(pts,close,t){
  t=t||6;
  const q=pts.map(proj);
  const at=i=>q[(i%q.length+q.length)%q.length];
  let d=`M${at(0)[0].toFixed(1)},${at(0)[1].toFixed(1)}`;
  const last=close?q.length:q.length-1;
  for(let i=0;i<last;i++){
    const p0=close?at(i-1):at(Math.max(0,i-1)),p1=at(i),p2=at(i+1),
          p3=close?at(i+2):at(Math.min(q.length-1,i+2));
    d+=`C${(p1[0]+(p2[0]-p0[0])/t).toFixed(1)},${(p1[1]+(p2[1]-p0[1])/t).toFixed(1)}`+
       ` ${(p2[0]-(p3[0]-p1[0])/t).toFixed(1)},${(p2[1]-(p3[1]-p1[1])/t).toFixed(1)}`+
       ` ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d+(close?"Z":"");
}


/**
 * Builds the map inside `root` (the .map-track section) and starts its loop.
 * @returns {() => void} cleanup
 */
export function mountPhuketMap(root, { mcard = null, reduce = false } = {}) {
  const $ = (q) => root.querySelector(q)
  const REDUCE = reduce
  let mapP = -1
  const NS="http://www.w3.org/2000/svg";
  const el=(t,a)=>{const n=document.createElementNS(NS,t);
    for(const key in a)n.setAttribute(key,a[key]);return n;};

  const gLand=$("#gLand");
  gLand.appendChild(el("path",{id:"coast",d:smooth(COAST,1,10)}));   /* costa: poco addolcita */
  ISLES.forEach(i=>gLand.appendChild(el("path",{class:"isle",d:smooth(i,1)})));

  /* tutti gli archi nascono da URBY */
  function arc(to,bow){
    const A=proj(P.urby.ll),B=proj(P[to].ll);
    const dx=B[0]-A[0],dy=B[1]-A[1],len=Math.hypot(dx,dy);
    const cx=(A[0]+B[0])/2+(-dy/len)*len*bow;
    const cy=(A[1]+B[1])/2+( dx/len)*len*bow;
    return `M${A[0].toFixed(1)},${A[1].toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${B[0].toFixed(1)},${B[1].toFixed(1)}`;
  }

  /* reticolo di supporto ogni 0,005° ≈ 550 m: alla massima chiusura lo schermo è
     tutto terra, e senza questo sarebbe una campitura vuota. Passo fine perché a
     12x il campo visivo è largo appena 2,7 km. */
  const gGrid=$("#gGrid");
  const GS=.005;
  for(let lat=7.70;lat<=8.27;lat+=GS){
    const a=proj([98.19,lat]),b=proj([98.51,lat]);
    gGrid.appendChild(el("line",{x1:a[0].toFixed(1),y1:a[1].toFixed(1),x2:b[0].toFixed(1),y2:b[1].toFixed(1)}));
  }
  for(let lon=98.20;lon<=98.51;lon+=GS){
    const a=proj([lon,7.69]),b=proj([lon,8.27]);
    gGrid.appendChild(el("line",{x1:a[0].toFixed(1),y1:a[1].toFixed(1),x2:b[0].toFixed(1),y2:b[1].toFixed(1)}));
  }

  const gLegs=$("#gLegs"),gPts=$("#gPts"),gTrav=$("#gTrav"),dests=$("#dests");
  const R=LEGS.map(L=>{
    const d=arc(L.to,L.bow);
    const base=el("path",{class:"leg-base",d});           /* il tragitto per intero, tenue */
    const glow=el("path",{class:"leg-glow",d});           /* alone, al posto del filtro */
    const p=el("path",{class:"leg-line",d});
    gLegs.appendChild(base);gLegs.appendChild(glow);gLegs.appendChild(p);
    const len=p.getTotalLength();
    [glow,p].forEach(q=>{q.style.strokeDasharray=`${len} ${len}`;q.style.strokeDashoffset=len;});

    const t=el("g",{class:"trav"});
    t.appendChild(el("circle",{class:"halo",r:11}));
    t.appendChild(el("circle",{class:"core",r:3.5}));
    gTrav.appendChild(t);

    const row=document.createElement("div");
    row.className="dest";
    row.innerHTML=`<div class="top"><span class="nm">${L.card||P[L.to].name.join(" ")}</span>`+
                  `<span class="tm">${L.time}</span></div>`+
                  `<span class="km">${String(L.km).replace(".",",")} km / ${L.mi}</span>`+
                  `<div class="prog"><i></i></div>`;
    dests.appendChild(row);

    return {L,p,base,glow,len,trav:t,row,bar:row.querySelector(".prog i"),
            tmCard:row.querySelector(".tm")};
  });

  const timeOf={};LEGS.forEach(L=>timeOf[L.to]=L.time);   /* "9 min", diviso poi in due */

  const pins={},pinXY={};
  Object.keys(P).forEach(key=>{
    const pt=P[key],[x,y]=proj(pt.ll);
    pinXY[key]=[x,y];                      /* posizione sulla mappa, prima della camera */
    const g=el("g",{class:"pt"+(pt.home?" home":"")});

    /* segnaposto cresciuti in proporzione alle etichette */
    const core=el("g",{class:"core"});
    if(pt.home)core.appendChild(el("circle",{class:"ping",r:11}));
    core.appendChild(el("circle",{class:"burst",r:14}));
    core.appendChild(el("circle",{class:"ring2",r:20}));
    core.appendChild(el("circle",{class:"ring",r:pt.home?14:9}));
    core.appendChild(el("circle",{class:"dot",r:pt.home?7:4.5}));

    /* nome per primo su una o più righe, categoria sotto, minuti in fondo */
    const lbl=el("g",{class:"lbl"});
    const end=pt.anchor==="end", tx=end?-24:24, ta=end?"end":"start";
    const LH=27;                                   /* interlinea del nome */
    let ly=-((pt.name.length-1)*LH)/2-2, base=ly;
    const nameEls=[];
    pt.name.forEach(riga=>{
      const t=el("text",{x:tx,y:ly.toFixed(0),"text-anchor":ta});
      t.textContent=riga;lbl.appendChild(t);nameEls.push(t);base=ly;ly+=LH;
    });
    if(pt.sub){                            /* solo URBY tiene un sottotitolo */
      base+=22;
      const t1=el("text",{class:"sub",x:tx,y:base,"text-anchor":ta});
      t1.textContent=pt.sub;lbl.appendChild(t1);g.sub=t1;nameEls.push(t1);
    }
    if(timeOf[key]){                       /* i minuti, che sbucano all'arrivo */
      const t3=el("text",{class:"tm",x:tx,y:base+32,"text-anchor":ta});
      const [n,u]=timeOf[key].split(" ");
      const sn=el("tspan");sn.textContent=n;
      const su=el("tspan",{class:"u",dx:"3"});su.textContent=u.toUpperCase();
      t3.appendChild(sn);t3.appendChild(su);
      lbl.appendChild(t3);
      g.tmNum=sn;g.tmEl=t3;                /* servono al conto alla rovescia del finale */
    }

    g.appendChild(core);g.appendChild(lbl);

    if(pt.home){                           /* il marchio, che poi collassa nel pallino */
      const wm=el("g",{class:"mwm"});
      const t=el("text",{class:"wmt",x:0,y:0,"text-anchor":"middle","dominant-baseline":"central"});
      [["U","l1"],["R","l2"],["B","l3"],["Y","l4"]].forEach(([ch,cl])=>{
        const s=el("tspan",{class:cl});s.textContent=ch;t.appendChild(s);
      });
      wm.appendChild(t);g.appendChild(wm);
      g.wm=wm;
    }
    g.core=core;g.lbl=lbl;g.nameEls=nameEls;

    gPts.appendChild(g);
    pins[key]=g;
  });
  pins.urby.classList.add("on","reached");   /* casa è sempre accesa */

  /* ══════════ lo scroll fa partire tutti insieme ══════════ */
  const track=root,hudBar=$("#hudBar"),hudA=$("#hudA"),hudB=$("#hudB"),gView=$("#gView");
  const finale=$("#finale"),hudEl=$(".hud"),cardEl=$(".map-card");
  /* metà altezza della seconda riga: è lo scarto che tiene "Relax." al centro
     finché è sola. Rimisurata quando i caratteri arrivano e a ogni resize. */
  function misuraFrase(){
    finale.style.setProperty("--half",
      (finale.querySelector(".b").getBoundingClientRect().height/2).toFixed(1)+"px");
  }
  misuraFrase();
  window.addEventListener("resize",misuraFrase);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(misuraFrase);
  let sfoc=-1,sfocP=-1;              /* ultimi valori di sfocatura scritti */
  hudEl.style.transition=cardEl.style.transition="opacity .5s var(--ease)";
  const RUN=.64;    /* si viaggia fino al 64%, il resto e' il finale */
  const VIA=.12;    /* prima di questo punto solo apertura: marchio e camera stretta */
  let introT0=0;

  /* ── la camera ──
     Parte addosso a URBY e si allarga tenendo dentro la strada già percorsa:
     non è uno zoom a tempo, è la mappa che si apre quanto serve. */
  const UPK=S/111.32;            /* unità di viewBox per chilometro di latitudine */
  const K0=6;                   /* così stretta che la costa resta ben fuori campo:
                                    si vede solo terreno, come un piano infinito */
  const MARGINE=1;               /* km di respiro oltre il punto più lontano raggiunto */
  const INTRO=2000;              /* durata dell'apertura, marchio → pallino */
  const HOME=proj(P.urby.ll);
  function camera(done){
    const need=(done+MARGINE)*UPK;
    const k=clamp(Math.min(VB.w*.42,VB.h*.42)/need,1,K0);
    const wide=clamp((K0-k)/(K0-1),0,1);          /* 0 = stretta su URBY, 1 = isola intera */
    const cx=HOME[0]+(VB.w/2-HOME[0])*wide, cy=HOME[1]+(VB.h/2-HOME[1])*wide;
    return {k,tx:VB.w/2-cx*k,ty:VB.h/2-cy*k};
  }

  function mapTick(){
    const r=track.getBoundingClientRect(),H=innerHeight;
    if(r.bottom<0||r.top>H||H<200){mapP=-1;R.forEach(o=>o.trav.classList.remove("on"));return;}

    const PT=clamp(-r.top/Math.max(1,r.height-H),0,1);
    mapP = mapP<0||REDUCE ? PT : mapP+(PT-mapP)*.14;   /* smoothed, so the camera glides */
    const P0=mapP;
    hudBar.style.transform=`scaleX(${P0})`;

    /* ── apertura: il marchio si posa, poi collassa nel pallino ──
       Va a tempo (2s) perché la prima parte deve respirare, ma se si scorre
       di corsa la chiude lo scroll, così non resta mai indietro. */
    if(!introT0&&r.top<=0)introT0=performance.now();
    const intro=Math.max(introT0?clamp((performance.now()-introT0)/INTRO,0,1):0,
                         clamp(P0/VIA,0,1));
    const home=pins.urby;
    const collasso=sstep(clamp((intro-.45)/.4,0,1));    /* fermo per quasi metà, poi cede */
    home.wm.style.opacity=(1-collasso).toFixed(3);
    home.wm.style.transform=`scale(${(1-.6*collasso).toFixed(3)})`;
    const nato=sstep(clamp((intro-.6)/.4,0,1));
    home.core.style.opacity=nato.toFixed(3);
    home.core.style.transform=`scale(${(.3+.7*nato).toFixed(3)})`;
    home.lbl.style.opacity=sstep(clamp((intro-.72)/.28,0,1)).toFixed(3);

    /* I percorsi partono dopo l'apertura: il primo 10% dello scroll è tutto
       per il marchio e per la camera che resta addosso. Poi stessa andatura
       per tutti, quindi il tempo d'arrivo è proporzionale ai chilometri. */
    const done=covered(sstep(clamp((P0-VIA)/(RUN-VIA),0,1)))*KMAX;

    /* ── FINALE ──
       I numeri restano quelli che sono. L'isola arretra appena — resta grande e
       riconoscibile — e a portarla sullo sfondo è l'opacità, non la distanza. */
    const fin=clamp((P0-RUN)/(1-RUN),0,1);
    const ritira=sstep(clamp(fin/.58,0,1));

    /* la camera si allarga con la strada percorsa, poi arretra di poco */
    let C=camera(done);
    if(fin>0){
      const k2=1-.08*ritira;                       /* da 1x a 0,92x: appena un respiro */
      C={k:k2,tx:VB.w/2*(1-k2),ty:VB.h/2*(1-k2)};
    }
    /* il reticolo: spessore compensato una volta sola sul gruppo, e fuori dal DOM
       quando è invisibile — altrimenti resta comunque dentro l'input della
       sfocatura del finale, che dovrebbe filtrare 177 righe per niente */
    const gop=clamp((C.k-2)/4,0,1)*.26;
    gGrid.style.display=gop<.004?"none":"";
    if(gop>=.004){
      gGrid.style.opacity=gop.toFixed(3);
      gGrid.style.strokeWidth=(.6/C.k).toFixed(3);
    }
    gView.setAttribute("transform",
      `translate(${C.tx.toFixed(2)},${C.ty.toFixed(2)}) scale(${C.k.toFixed(4)})`);
    /* i punti seguono la camera nella posizione ma non nella scala */
    for(const key in pinXY)pins[key].setAttribute("transform",
      `translate(${(pinXY[key][0]*C.k+C.tx).toFixed(1)},${(pinXY[key][1]*C.k+C.ty).toFixed(1)})`);
    /* le scritte invece crescono a camera stretta: quando c'è solo URBY è grande,
       e torna alla misura normale quando l'isola è tutta in campo */
    const LS=(1+1.1*clamp((C.k-1)/(K0-1),0,1)).toFixed(3);
    for(const key in pins)pins[key].lbl.setAttribute("transform",`scale(${LS})`);
    /* "Thalang" serve solo finché siamo addosso: appena la camera si allarga
       svanisce e lascia il campo al solo nome */
    if(home.sub)home.sub.style.opacity=sstep(clamp((C.k-3)/(K0-3),0,1)).toFixed(3);

    let arrivi=0;
    R.forEach(o=>{
      const f=clamp(done/o.L.km,0,1);
      /* spessori divisi per la scala: costanti a schermo, e il dasharray resta
         nelle unità della mappa, quindi niente linea spezzata */
      o.base.style.strokeWidth=(1/C.k).toFixed(3);
      o.glow.style.strokeWidth=(6/C.k).toFixed(3);
      o.p.style.strokeWidth=(1.6/C.k).toFixed(3);
      const off=o.len*(1-f);
      o.p.style.strokeDashoffset=off;o.glow.style.strokeDashoffset=off;
      const vis=f<=.0005?0:1;              /* a zero nemmeno il puntino del capolinea */
      o.p.style.opacity=vis;o.glow.style.opacity=vis?.22:0;
      o.bar.style.transform=`scaleX(${f})`;
      if(f>=1)arrivi++;

      if(f>.001&&f<.999){
        const pt=o.p.getPointAtLength(o.len*f);
        o.trav.setAttribute("transform",
          `translate(${(pt.x*C.k+C.tx).toFixed(1)},${(pt.y*C.k+C.ty).toFixed(1)})`);
        o.trav.classList.add("on");
      }else o.trav.classList.remove("on");

      o.row.classList.toggle("moving",f>.001&&f<1);
      o.row.classList.toggle("there",f>=1);
      /* appena la tratta si muove la meta compare, anche se è la più lontana:
         partendo tutti insieme lo scarto fra la prima e l'ultima è di pochi punti */
      pins[o.L.to].classList.toggle("on",f>.02);
      pins[o.L.to].classList.toggle("reached",f>=1);
    });

    /* "URBY —— Everywhere": la meta si accende quando ci si è arrivati ovunque */
    hudA.classList.toggle("lit",P0>.02);
    hudB.classList.toggle("lit",arrivi===R.length);

    /* Nel finale restano solo i tempi: i nomi si spengono presto, le cifre
       tengono duro fino a un attimo prima della frase — e non cambiano mai. */
    /* Nomi, tempi e segnaposti restano nitidi: il finale non toglie informazione.
       Il fondo invece si ritira davvero — scende di opacità e va fuori fuoco,
       come una messa a fuoco che si sposta dalla carta al dato. */
    const sfondo=sstep(clamp((fin-.24)/.36,0,1));
    gView.style.opacity=fin>0?(1-.86*sfondo).toFixed(3):"";
    /* anche etichette e segnaposti si ritirano, ma meno: restano leggibili
       accanto alla frase invece di contenderle il primo piano */
    gPts.style.opacity=fin>0?(1-.58*sfondo).toFixed(3):"";
    /* la sfocatura a scatti di mezzo pixel: rifare il blur di 300 elementi a
       ogni fotogramma sarebbe carissimo, così i passi distinti sono pochi.
       Anche le etichette si ammorbidiscono, ma molto meno del fondo: restano
       davanti, solo non più a fuoco come prima. */
    const bl=Math.round(4*sfondo*2)/2;
    if(bl!==sfoc){sfoc=bl;gView.style.filter=bl?`blur(${bl}px)`:"";}
    const bp=Math.round(1.4*sfondo*2)/2;
    if(bp!==sfocP){sfocP=bp;gPts.style.filter=bp?`blur(${bp}px)`:"";}
    finale.classList.toggle("s1",fin>.54);
    finale.classList.toggle("s2",fin>.7);
    const spegni=(1-sstep(clamp((fin-.2)/.28,0,1))).toFixed(3);
    hudEl.style.opacity=spegni;cardEl.style.opacity=spegni;

    if(mcard)mcard.classList.toggle("on",fin>.62);
  }

  let raf = 0
  const loop = () => { mapTick(); raf = requestAnimationFrame(loop) }
  loop()
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', misuraFrase)
  }
}
