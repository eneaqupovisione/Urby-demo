# Immagini di Urby: prompt per Gemini

Le foto si salvano **in questa cartella** con il nome indicato (`hero.jpg`,
`camera-loft.png`…; vanno bene jpg, png e webp). Il sito le prende da solo.
Dove una foto manca resta il segnaposto colorato, quindi si può riempire un
po' alla volta e ricaricare.

È materiale per la **demo**: sono immagini generate, non foto di Urby. Prima
di una consegna vera, camere e piatti vanno sostituiti con scatti reali.

I prompt sono scritti sulle foto vere del locale in `../urby_vero/`.

## Com'è fatto Urby davvero

Dalle foto, è questo che i prompt devono ripetere:

- **Cemento a vista con l'impronta delle tavole**: grigio chiaro, righe
  orizzontali, angoli **curvi** (muri, panche e fioriere tonde).
- **Finestre a griglia in legno color miele**, grandi, a più riquadri.
- **Pergole in acciaio nero** con tetto trasparente e listelli di legno.
- **Muri in intonaco grezzo ocra-terracotta**: il giardino, la scala curva.
- **Pavimento in cemento lisciato grigio**, con zone in cemento rosso
  terracotta.
- **Sedie in paglia di Vienna** e sedie in legno e canna con le gambe a V;
  **tavoli tondi in teak** su base bianca.
- **Lanterne di tessuto bianco** con costole di bambù e **lampade in rattan**
  intrecciato.
- **Giardino tropicale**: palme areca, alocasie, banani, un vecchio albero
  contorto in una fioriera tonda di cemento.
- **Colazione**: croissant, latte freddo, piatti bianchi, tovagliette azzurre
  intrecciate, taglieri di legno.
- **Luce**: piena luce del giorno tropicale, nitida, ombre nette.

## Come generarle perché sembrino Urby

1. **Una sola chat** per tutte, così Gemini tiene lo stesso sguardo.
2. **Allega 3 foto vere al primo messaggio**: sono il riferimento più forte
   che puoi dargli. Le migliori sono la sala con le lampade di rattan, la
   terrazza con le lanterne bianche e la scala ocra (in `urby_vero/` sono
   gli screenshot delle 14.18.58, 14.18.50 e 14.19.25).
3. Insieme alle foto incolla il **blocco di stile** qui sotto, poi un prompt
   alla volta.
4. Se una viene "troppo AI" (troppo pulita, troppo lucida), rispondi:
   *"more like a real photo taken on site: less perfect, more natural light"*.
5. Persone sì, ma di spalle, mosse o tagliate: facce e mani sono dove le
   immagini generate si tradiscono.
6. Il formato va scritto nel prompt (c'è già). In AI Studio puoi anche
   sceglierlo dal menu.

### Blocco di stile (primo messaggio, con le 3 foto allegate)

```
These are real photos of URBY, a small hotel and all-day café-bakery in
Thalang, Phuket. I'm going to ask you for a series of new photos of the same
place. Keep its architecture, materials and light exactly consistent with
these references:

- Contemporary tropical architecture: light grey board-formed concrete with
  horizontal plank texture and rounded, curved corners; large grid windows
  with honey-coloured teak frames; black steel pergolas with a clear roof and
  timber slat louvres; rough ochre-terracotta textured render walls.
- Floors: smooth grey polished concrete, with zones of terracotta-red concrete.
- Furniture: Vienna straw cane bentwood chairs, teak and cane chairs with
  V-shaped legs, round teak tables on white pedestal bases, curved concrete
  benches with round brown leather cushions.
- Lighting fixtures: white fabric lanterns with bamboo ribs, woven rattan
  pendant lamps.
- Garden: areca palms, alocasia, banana plants, an old twisted tree in a round
  concrete planter, against ochre garden walls.
- Photography: natural tropical daylight, crisp and bright, true-to-life warm
  colours, editorial interior photography, subtle grain, never glossy or CGI.
- No text, no logos, no signs, no watermarks in the image.

Reply "ok" and wait for my first request.
```

---

## Hero: la vista dalla finestra

**Per ora resta il cielo generato del sito**, che piace così. Se un giorno
la si vuole fotografica, questo è il prompt.

Sopra la foto il sito disegna già i montanti della finestra, che per caso
somigliano proprio alle finestre a griglia di Urby. Quindi **la finestra
non va nella foto**: serve solo la vista.

**`hero`**, formato 3:2
```
The view looking out from inside URBY through a large window, window frame
not visible: the tropical garden with tall areca palms and alocasia leaves in
front of the rough ochre render garden wall, a big tree canopy above, a wide
bright sky with soft clouds filling the upper half. Late afternoon light.
Aspect ratio 3:2.
```

## "In common": i sei riquadri che fluttuano

Piccoli e semi-trasparenti: dettagli e materiali, niente scene affollate.

**`atmosfera-1`**, 3:4 (fatta: è in `urby_vero/`, già copiata qui)
```
Close-up of afternoon sunlight and palm leaf shadows moving across a rough
ochre-terracotta render wall. Aspect ratio 3:4.
```
**`atmosfera-2`**, 1:1
```
Top-down view of an iced latte in a glass on a small teak serving board,
next to a white plate with a croissant, on a light blue woven placemat over
a teak table. Aspect ratio 1:1.
```
**`atmosfera-3`**, 4:5
```
Close-up detail of a Vienna straw cane chair seat and its curved honey
bentwood frame, on smooth grey polished concrete, crisp daylight shadow of
the cane weave on the floor. Aspect ratio 4:5.
```
**`atmosfera-4`**, 3:4
```
Looking up at a white fabric lantern with bamboo ribs hanging from a black
steel pergola with a clear roof and timber slat louvres, palm leaves and sky
beyond. Aspect ratio 3:4.
```

**`atmosfera-5`**, 4:5 (per ora è un ritaglio della camera scartata, in
`scarti/`: la finestra con la seduta)
```
A deep curved concrete window seat with round brown leather cushions under a
large honey teak grid window, palms and banana leaves outside, soft daylight.
Aspect ratio 4:5.
```

**`atmosfera-6`**: è una **foto vera** (la colazione con il croissant,
ritagliata dallo screenshot di Instagram). Non serve generarla.

## Rooms: le tre camere

Non abbiamo foto delle camere vere: queste sono **inventate nello stesso
linguaggio** del locale. Formato verticale, soggetto al centro: il sito
taglia un po' i bordi quando la foto scorre.

**`camera-corner`**, 4:5 (32 m², luce del mattino)
```
A bright corner hotel room at URBY with large honey teak grid windows on two
walls, early sun coming in at a low angle, king bed with white linen, a
Vienna cane armchair and a small teak desk, a woven rattan pendant lamp,
tree canopy outside. Aspect ratio 4:5.
```
**`camera-loft`**, 4:5 (44 m², sotto il tetto)
```
A loft hotel room at URBY under a white pitched ceiling with exposed honey
timber rafters and a skylight, a mezzanine with a king bed, a daybed below,
a record player on a teak sideboard, woven rattan pendant lamps, grey
polished concrete floor, soft rainy light. Aspect ratio 4:5.
```
**`camera-terrace`**, 4:5 (58 m², terrazza privata)
```
A private hotel terrace at URBY: a freestanding curved concrete outdoor bath,
a long teak table for six with cane chairs, a hammock, under a black steel
pergola with timber slat louvres, ochre render wall with areca palms and
alocasia, golden hour light. Aspect ratio 4:5.
```

## Kitchen: i cinque piatti

Compaiono al passaggio del mouse sul menu, nello stesso ordine del menu
*Morning*. Nel sito l'anteprima è piccola (circa 300 px), quindi **il cibo
deve riempire l'immagine**: primo piano stretto, bordo del piatto che esce
dall'inquadratura, tutto il resto sfocato. Teak e tovaglietta azzurra restano
solo come colore sullo sfondo.

Prima dei cinque piatti, manda a Gemini questo messaggio una volta:

```
Now a series of food close-ups for the menu. For all of them: tight close-up,
the food fills most of the frame, the plate rim is cropped by the edges,
camera at about 45 degrees and close to the food, shallow depth of field
with the background completely blurred, natural daylight from the side,
appetising texture and detail. Only one dish per photo, no other objects in
focus. Reply "ok".
```

**`piatto-1`**, 4:5
```
Tight close-up of thick house-made yoghurt cream in a white bowl, topped with
crushed pistachio, peanuts and a glossy drizzle of honey, the bowl rim
cropped by the frame, blurred teak and light blue in the background.
Aspect ratio 4:5.
```
**`piatto-2`**, 4:5
```
Tight close-up of a thick slice of dark-crusted sourdough with an open crumb,
spread with cultured butter and flaky sea salt, crumbs around, the slice
filling the frame, blurred teak in the background. Aspect ratio 4:5.
```
**`piatto-3`**, 4:5
```
Tight close-up of braised navy beans in slow tomato sauce on toast with a
poached egg on top, the yolk just broken and running, smoked paprika and
olive oil, the plate rim cropped by the frame, blurred background.
Aspect ratio 4:5.
```
**`piatto-4`**, 4:5
```
Tight close-up, low angle, of a stack of buckwheat pancakes with whipped
ricotta on top and dark burnt honey dripping down the sides, the stack
filling the frame, blurred background. Aspect ratio 4:5.
```
**`piatto-5`**, 4:5
```
Tight close-up of an iced latte in a clear glass, milk swirling into the
coffee, ice cubes and condensation on the glass, a dark wooden straw, the
glass filling the frame, blurred teak and light blue in the background.
Aspect ratio 4:5.
```

Se una esce ancora larga, rispondi: *"much closer: crop in on the food,
fill the frame, blur everything else"*.

## "Look around": la galleria

Dieci foto, tutte 4:5 con il soggetto al centro: il sito le mostra a volte
verticali e a volte quadrate. Le didascalie sono quelle che si leggono già
nel sito.

**`galleria-01`**, *Crafted origins*
```
Hands of a baker shaping croissant dough on a floured teak bench, only hands
and forearms visible, daylight from a big window. Aspect ratio 4:5.
```
**`galleria-02`**, *Morning bake*
```
A tray of golden croissants just out of the oven on a counter in front of a
honey teak grid window, morning light, a little steam. Aspect ratio 4:5.
```
**`galleria-03`**, *Everyday plates*
```
A teak table seen from above at brunch: a croissant with butter and jam,
iced lattes, a small vase with pink roses, sunglasses, light blue woven
placemats, a hand holding a glass at the edge. Aspect ratio 4:5.
```
**`galleria-04`**, *The courtyard*
```
The curved covered terrace at URBY: round teak tables and Vienna cane chairs
on grey polished concrete, white fabric lanterns hanging from a black steel
pergola with a clear roof, tropical plants against the ochre garden wall.
Aspect ratio 4:5.
```
**`galleria-05`**, *Life in motion*
```
A guest seen from behind walking across the grey concrete terrace towards
the garden, slight motion blur, cane chairs and lanterns around, bright
daylight. Aspect ratio 4:5.
```
**`galleria-06`**, *Room 04, late*
```
A hotel room at night lit only by a woven rattan bedside lamp, a book face
down on white linen, a honey teak grid window with dark palm leaves outside.
Aspect ratio 4:5.
```
**`galleria-07`**, *Counter, 19:40*
```
The long teak bar counter along the honey teak grid windows in the evening,
stools, woven rattan pendant lamps glowing warm, wine bottles and a lit
wine fridge, dusk blue outside. Aspect ratio 4:5.
```
**`galleria-08`**, *Sourdough day 3*
```
A glass jar of bubbly sourdough starter on a board-formed concrete shelf,
a rubber band marking its rise, a tape label with no readable text,
daylight. Aspect ratio 4:5.
```
**`galleria-09`**, *The mango tree*
```
An old twisted tree with a gnarled trunk growing out of a round board-formed
concrete planter, its canopy under a black steel pergola, a palm frond in
the foreground, strong tropical sun and shadows. Aspect ratio 4:5.
```
**`galleria-10`**, *Last pour*
```
Two glasses with the last of the wine on a round teak table late at night on
the terrace, empty cane chairs, white fabric lanterns glowing above.
Aspect ratio 4:5.
```

---

## Ritagli: elementi da scontornare

Pezzi singoli da usare come materia sopra il sito (foglie, lanterne,
pane…). Non sono ancora agganciati a niente: prima si fanno, poi si decide
dove metterli.

**Come si scontornano**: clic destro sul file nel Finder → *Azioni rapide* →
*Rimuovi sfondo*. Esce un PNG trasparente accanto all'originale. Salva quello
in `immagini/ritagli/` con il nome indicato.

Perché lo scontorno venga pulito, ogni prompt chiede le stesse tre cose:
**oggetto intero** (niente bordi tagliati), **fondo grigio chiaro uniforme**
(stacca sia il verde sia il bianco), **nessuna ombra portata**. Non
aggiungere il formato: lascia che Gemini scelga quello che contiene
l'oggetto per intero.

Si possono fare nella stessa chat delle altre.

**`foglia-banano`**
```
A single large banana leaf, slightly torn along the edges as they naturally
are in Thailand, whole leaf fully in frame with margin around it, isolated on
a plain seamless light grey background, even soft light, no cast shadow,
photographic, high detail on the veins.
```
**`foglia-alocasia`**
```
A single giant elephant ear (Alocasia) leaf with its stem, whole leaf fully
in frame with margin, isolated on a plain seamless light grey background,
even soft light, no cast shadow, photographic, visible veins.
```
**`fronda-areca`**
```
A single arching areca palm frond with its thin leaflets, whole frond fully
in frame with margin, isolated on a plain seamless light grey background,
even soft light, no cast shadow, photographic.
```
**`ponytail-vaso`**
```
A ponytail palm with long thin curling leaves in a plain terracotta pot on
a saucer, whole plant fully in frame with margin, isolated on a plain
seamless light grey background, even soft light, no cast shadow,
photographic.
```
**`sedia-vienna`**
```
A single Vienna straw cane bentwood armchair in honey wood, three-quarter
view, fully in frame with margin, isolated on a plain seamless light grey
background, even soft light, no cast shadow, photographic.
```
**`croissant`**
```
A single golden flaky croissant, three-quarter view, fully in frame with
margin, isolated on a plain seamless light grey background, even soft light,
no cast shadow, photographic, macro detail on the layers.
```

Se una foglia esce troppo "perfetta", chiedi *"more natural: small tears,
uneven colour, a few insect marks"*.

### Le lampade di Urby

Tre lampade vere, già scontornate dalle foto, in `ritagli/riferimenti/`:

| | riferimento | dov'è nel locale |
|---|---|---|
| **lanterna** | `lanterna-vera-grigio.jpg` | terrazza, sotto la pergola |
| **tamburo** | `tamburo-vera-grigio.jpg` | sala, sopra i tavoli |
| **campana** | `campana-vera-grigio.jpg` | sala, lungo le finestre |

I PNG trasparenti (`*-vera.png`) sono quelli veri, ma sono piccoli (75–215
px): vanno bene solo come decorazione minuscola. Per il sito servono le
versioni generate, grandi.

**Come si fa:** per ogni lampada **allega il suo `-grigio.jpg`** al messaggio
insieme al prompt. Le lampade si generano **spente**: la luce calda
attraverso il tessuto non si scontorna bene, e il bagliore si aggiunge dopo
nel sito. Il filo nero esce dal bordo in alto, così nel sito le lampade
possono "pendere" dal bordo della pagina.

**`lanterna`**
```
Recreate exactly the lamp in the attached reference photo as a new, sharp,
high-resolution product photo: a barrel-shaped lantern of off-white linen
fabric held by an external frame of thin honey-coloured bamboo ribs, wooden
rings at top and bottom, the frame extending below the fabric into a small
open cage, a black metal loop on top and a straight black cord going up out
of the top of the frame. Same proportions and materials as the reference.
Lamp switched off, front view, whole lamp in frame except the cord, isolated
on a plain seamless light grey background, even soft light, no cast shadow.
Aspect ratio 2:3.
```
**`tamburo`**
```
Recreate exactly the lamp in the attached reference photo as a new, sharp,
high-resolution product photo: a three-tier pendant lamp, a small cylinder of
natural woven rattan cane on top, a larger off-white linen drum in the middle
with thin black trim on both edges, and a rattan cane cylinder at the bottom
with black trim, a straight black cord going up out of the top of the frame.
Same proportions and materials as the reference. Lamp switched off, seen
slightly from below, whole lamp in frame except the cord, isolated on a plain
seamless light grey background, even soft light, no cast shadow.
Aspect ratio 4:5.
```
**`campana`**
```
Recreate exactly the lamp in the attached reference photo as a new, sharp,
high-resolution product photo: a bell-shaped pendant lamp of natural honey
rattan in an open hexagonal weave, slightly faceted sides, a small rattan
loop on top and a straight black cord going up out of the top of the frame.
Same proportions and materials as the reference. Lamp switched off, front
view, whole lamp in frame except the cord, isolated on a plain seamless light
grey background, even soft light, no cast shadow. Aspect ratio 3:4.
```
**`lanterne-gruppo`** (opzionale, per una composizione già pronta)
```
Using the attached reference lantern, a group of three of these lanterns
hanging at different heights, one large in front and two smaller behind,
each on its own straight black cord going up out of the top of the frame.
Lamps switched off, isolated on a plain seamless light grey background, even
soft light, no cast shadow. Aspect ratio 3:4.
```

Se Gemini "reinterpreta" troppo (cambia forma o colori), rispondi:
*"closer to the reference: same shape, same frame, same proportions"*.

La campana ha la trama aperta: dopo lo scontorno controlla che i buchi della
trama siano trasparenti. Se lo scontorno di macOS li riempie di grigio,
mandamela e la sistemo io.

---

## Cose da sapere

- **Il simbolino di Gemini nell'angolo**: la versione gratuita mette una
  stellina in basso a destra. Per una demo va bene; se dà fastidio, si taglia
  qualche pixel dal bordo.
- **Risoluzione**: Gemini dà più o meno 1024 px. Va bene per tutto tranne la
  hero, che si allarga a schermo intero e lì può risultare un po' morbida.
- **I piatti sono cinque per tutti i menu**: le cinque foto seguono l'ordine
  del menu *Morning* e restano le stesse per Snacks, Cocktails e Today.
  Quindi passando sul primo cocktail si vede lo yogurt. Se in demo stona, si
  possono fare foto per ogni scheda.
