# Wegwijzer — Baristamigo website

Dit document beschrijft wat er in deze map staat en waarom, zodat dit snel terug te vinden is in een volgende sessie.

## Wat is dit

Een statische kloon/redesign van **baristamigo.be** (koffiecatering/baristaservice, "Powered by Matubu Coffee Roasters"). Vier losse HTML-pagina's, gedeelde stijl (crème/maroon/oranje, uppercase nav), geen build-stap nodig — gewoon openen in de browser of hosten als statische site.

## Sitepagina's (root van deze map)

| Bestand | Inhoud |
|---|---|
| `index.html` | Home — hero, 3 services, video + jumbo tekst, contact-CTA, "Waarom Baristamigo", "Powered by Matubu", WhatsApp-widget |
| `services.html` | Diensten in detail (baristaservice, koffiecarts, perculators, koffiecocktails) + de echte **Elfsight pricing table** (`services`) |
| `realisaties.html` | De echte **Elfsight portfolio-widget** (`portfolio`) + eigen video-showcase en merkstickers als aanvulling |
| `contact.html` | Contactformulier + WhatsApp-widget |

Alle pagina's delen dezelfde nav, footer, newsletter-blok, het "Offerte aanvragen"-modalvenster (2-staps formulier) én de **Elfsight WhatsApp-chatwidget** (rechtsonder, naast de offerte-knop). Foto's en video's zijn hotlinks naar de echte Shopify CDN van `baristamigo.be` (geen lokale kopie nodig, altijd actueel).

## Proporties homepage — herleid uit de echte broncode

Op verzoek van de gebruiker (screenshots klopten niet met de eerste versie) heb ik de ruwe HTML van `baristamigo.be` opgehaald met `curl` (WebFetch geeft alleen een samengevatte tekstversie, geen bruikbare CSS/HTML) en de exacte waarden overgenomen in `assets/style.css`:

| Element | Echte waarde (uit de HTML) | Wat er is aangepast |
|---|---|---|
| Hero-sectie | `--section-min-height: 100svh` | Klopte al. |
| Hero-logo | `--logo-width: 100%` van de sectie (dus zo goed als edge-to-edge, niet `min(94vw, 1160px)`) | Logo nu `width: 100%`, hero `justify-content: flex-start` i.p.v. `center`. |
| Contact-CTA achtergrond (`Element_1_Baristamigo_4.png`) | class `background-image-fit` (contain, niet cover) | `background-size` van `cover` naar `contain`, positie `left bottom`, `overflow: hidden` op de afgeronde hoek toegevoegd. |
| Contact-CTA formulier | `--size-style-width: 49%` (desktop), `100%` (mobiel), `--vertical-alignment: center` | Formulier nu `width: 49%` i.p.v. vaste `460px`-kaart; de glazen kaart (frosted card) is weg — de losse velden staan rechtstreeks op de achtergrond, net als op de live site; sectie heeft nu `align-items: center`. |
| Video "Waarom Baristamigo" + "Powered by Matubu" | `--video-aspect-ratio: 1.775` (16:9), kolom 50vw | Media-kolom gebruikt nu `aspect-ratio: 1.775` i.p.v. een vaste `min-height: 60svh`. |
| Video bij de jumbo-tekst ("professionele koffiecatering...") | `--video-aspect-ratio: 0.563` (portret, dezelfde video als bij mij: `de775de4...`) | Media-kolom gebruikt nu `aspect-ratio: 0.563` i.p.v. `min-height: 30svh` — dit maakt die sectie merkbaar hoger dan voorheen, maar dat is wat de echte site ook doet. |

Deze waarden staan letterlijk in de HTML van `baristamigo.be` (inline `style="--section-min-height: ..."` en `--video-aspect-ratio: ...` attributen op de Shopify-secties) — dus dit zijn geen schattingen maar overgenomen cijfers. Enige uitzondering: de exacte padding/marges van de "page-width" container kon ik niet uit de HTML halen (die zit in de (niet-opgehaalde) theme-CSS-bundel) — daarvoor gebruik ik nog steeds de 5%-conventie die de rest van de site al hanteert.

## Elfsight-widgets (echte content van baristamigo.be)

De live site gebruikt geen eigen portfolio-/prijzenpagina maar embedt Elfsight-widgets — dat verklaart waarom eerdere fetches van `/pages/services` en `/pages/cases-testimonials` leeg leken: de inhoud wordt door Elfsight's `platform.js` client-side ingeladen, niet in de server-HTML. De widget-snippets zijn door de gebruiker aangeleverd en 1-op-1 overgenomen:

| Widget | App-ID | Gebruikt op |
|---|---|---|
| Portfolio | `d3076baa-3ae4-4648-af5c-c4b6dec6e4cb` | `realisaties.html` |
| Pricing Table | `4ec95a9d-7114-465d-9be2-475d60a9d42e` | `services.html` |
| WhatsApp Chat | `ae0fd06d-759a-407e-ab45-b056ee390d64` | alle 4 pagina's |

`https://elfsightcdn.com/platform.js` wordt per pagina maar **één keer** geladen (met `async`), ook als er meerdere widgets op dezelfde pagina staan. Zo krijgt `services.html` de échte, actuele prijzen te zien in plaats van door mij verzonnen bedragen.

## assets/ — gedeelde CSS/JS

- `assets/style.css` — alle styling voor de 4 pagina's, één bestand (geen 4x dezelfde CSS meer gekopieerd).
- `assets/script.js` — offerte-modal logica + het mobiele hamburgermenu.

**Verbeteringen t.o.v. de eerste versie / t.o.v. de live site:**
- Echte site typt "Mobile coffee carts & esma stands" (waarschijnlijk een typfout) — hier gecorrigeerd naar "espresso stands".
- Live site heeft wel een werkend hamburgermenu op mobiel; de eerste versie hier verstopte de nav-links op mobiel zonder alternatief. Nu opgelost met een echte hamburger-toggle (`.nav-toggle` in `assets/script.js`).
- Account-/winkelwagen-iconen uit de Shopify-header zijn weggelaten: deze statische site heeft geen login/winkelwagen-backend, dus niet-functionele iconen tonen zou misleidend zijn.
- CSS/JS is uit de 4 losse pagina's gehaald naar `assets/`, zodat een wijziging (bv. kleur, lettertype-pad) nog maar op één plek moet gebeuren.
- `services.html` en `realisaties.html` bestaan zo op de live site wel qua URL, maar zijn daar (voor zover met een gewone fetch te zien) nog leeg/placeholder — de inhoud hier is dus nieuw geschreven, geen bestaande tekst overgenomen.

## fonts/

- `TAYLennon.otf` — het titel-lettertype (var `--font-title`), gebruikt voor koppen/logo-tekst.
- `Street-PlainRegular.ttf` — "Street" font van Graham Meade (ffonts.net), gebruikt als body-lettertype (var `--font-body`) voor de urban/streetwear uitstraling. Alleen deze ene "Plain"-stijl wordt gebruikt.

**Belangrijk om te weten:** de originele download uit `Downloads/` had door elkaar gehusselde bestandsnamen/extensies (elk bestand claimde een willekeurige extensie t.o.v. de echte inhoud — bv. een `.svg` bleek een PNG, een `.ttf` bleek HTML). Ik heb elk bestand op basis van de echte magic bytes (`file`-commando + interne font-naamtabellen) opnieuw geïdentificeerd en pas daarna hernoemd. Deze twee fontbestanden zijn op die manier bevestigd (TAYLennon via de interne naam "TAY Lennon Regular", Street-Plain via de interne naam "Street - PlainRegular").

## merk/ — brand assets (niet rechtstreeks gebruikt door de site, want die hotlinkt CDN-afbeeldingen)

- `merk/logos/` — `Baristamigo_Logo_Bruin.png`, `Baristamigo_Logo_Geel.png` (wordmark, twee kleurvarianten), `Baristamigo_Element_Bruin.png` / `_Geel.png` (het "B"-beeldmerk/badge), `Baristamigo_Vorm_Bruin.png` (abstracte golf-/blobvorm, decoratief element).
- `merk/stickers/` — ronde stickers "BARISTAMIGO COFFEE" en "BARISTAMIGO COCKTAILS" elk in bruin en blauw, plus `Sticker_Cocktail_Icoon.png` (los cocktailglas-icoon, gebruikt op `services.html`).
- `merk/guidelines/` — `Baristamigo_Merkgids.pdf` (19 pagina's) en `Baristamigo_Merkgids_v2.pdf` (eveneens 19 pagina's, andere bytes). **Nog niet geverifieerd of dit twee versies zijn of een dubbele download** — `pdftoppm` ontbrak in deze omgeving om de pagina's te bekijken.

Alle bestanden hierboven zijn visueel gecontroleerd (elke PNG is echt geopend en bekeken) na het herstellen van de juiste extensie — dus deze namen kloppen met de inhoud.

**Ontbrekend:** `Kleuren_Baristamigo.ase` bevatte in werkelijkheid geen kleurenpalet maar een Street-lettertype. Het echte Adobe Swatch Exchange-bestand met de merkkleuren is niet teruggevonden in deze set — de kleuren die nu in de CSS staan (`--maroon: #761E0B`, `--orange: #FF4315`, `--dark-brown: #531003`, `--lavender: #E2C8F3`, crème-tinten) komen uit de al bestaande pagina-CSS, niet uit het .ase-bestand.

## bron-ongebruikt/

Alles wat overbleef na het identificeren van de bovenstaande echte bestanden: 16 extra stijlvarianten van het "Street"-lettertype (compressed, expanded, thin, upper, lined, ...), een aantal `.ai`/`.svg`-vectorbestanden die vermoedelijk dezelfde logo's/stickers bevatten maar niet één voor één geopend zijn, en de ffonts.net-leesmij/installatie-instructies. Veilig te verwijderen, bewaard voor het geval een specifieke Street-stijl ooit alsnog nodig is. Bestandsnamen eindigen op `__ORIG.<echte-extensie>` zodat traceerbaar blijft welk oorspronkelijk (foutief genoemd) bestand het was.

## Live referentie

`https://baristamigo.be` — Shopify-thema, JS-gerenderde content dus niet alles is met een simpele fetch te lezen. Nav-structuur (`/pages/services`, `/pages/cases-testimonials`, `/pages/contact`) is bevestigd; exacte teksten op die pagina's laadden niet in de fetch, dus de copy op `services.html`/`realisaties.html` hier is nieuw geschreven (geen bestaande tekst overgenomen, geen klantnamen/cijfers verzonnen).

## Afspraken voor dit project

- **`fixmijnkoffiemachine/`** (zusmap in `06_Website_Design/`) niet aanraken tenzij expliciet gevraagd — apart Git-repo, apart onderwerp.
- Wijzigingen aan deze site worden gecommit en gepusht naar de hoofdrepo (`Claude-Code-Rep`, branch `main`) — geen apart GitHub-repo voor Baristamigo tenzij anders gevraagd.
