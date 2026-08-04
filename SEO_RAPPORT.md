# SEO-rapport Baristamigo

Status: **Fase 0 t/m 4 afgerond.** Zie de eindchecklist en TODO-lijst onderaan dit document.

---

## Fase 0 — Discovery & audit

### Stack

- **Geen framework, geen CMS, geen build-stap.** Vier losse, handgeschreven statische HTML-bestanden (`index.html`, `services.html`, `realisaties.html`, `contact.html`) met gedeelde `assets/style.css` en `assets/script.js`.
- **Rendering:** 100% CSR-vrij / puur statisch — geen JavaScript-framework rendert content; de enige client-side content is de Elfsight-widgets (portfolio, pricing, WhatsApp) die extern via `platform.js` laden.
- **Hosting/deploy:** eigen git-repo (`github.com/FelixGhys/Baristamigo`, **private**, geen GitHub Pages actief — de site is momenteel **niet live/publiek bereikbaar**). Er is dus nog geen bestaande crawl-geschiedenis of live URL-structuur om te breken.
- **Afbeeldingen/video:** hotlinks naar de Shopify-CDN van `baristamigo.be` (extern, buiten onze controle qua compressie/formaat) + een aantal lokale merkassets (`merk/`, `fonts/`).

### Route-inventaris

| Route | `<title>` | Meta description | H1 |
|---|---|---|---|
| `index.html` | "Baristamigo — Koffiecatering op maat van jouw event" | ✅ aanwezig | ❌ **ontbreekt volledig** |
| `services.html` | "Services – Baristamigo" | ✅ aanwezig | ✅ "Services" |
| `realisaties.html` | "Realisaties – Baristamigo" | ✅ aanwezig | ✅ "Realisaties" |
| `contact.html` | "Contact – Baristamigo" | ✅ aanwezig | ✅ "Contact" |

Alle 4 titels/descriptions zijn onderling unieke, geen duplicaten. Wel: geen enkele title/description bevat nu een van de aangeleverde kernzoekwoorden expliciet (bv. "koffiecatering", "mobiele koffiebar huren").

### Headings & semantiek

- **index.html heeft geen `<h1>`** — de hero bestaat alleen uit een logo-afbeelding (`alt="Baristamigo"`), geen tekstuele H1. Dit is de belangrijkste technische SEO-fout op de site.
- Geen `<main>`, `<nav>` of `<footer>` landmark-elementen op geen enkele pagina (nav-links staan in een `<ul>` binnen `<header>`, footer-info in een gewone `<div class="footer-utilities">`).
- H2-structuur is verder logisch en consistent (per sectie één kop).

### Afbeeldingen

- 21 `<img>`-tags totaal over de 4 pagina's; **13 zonder expliciete `width`/`height`** (CLS-risico).
- 4x `alt=""`: 1x terecht (hero-achtergrondfoto, puur decoratief, logo draagt de betekenis), 3x op de service-iconen (barista/cart/percolator) — kan beter een korte alt krijgen ipv leeg, ook al staat de tekst al in de naastliggende `<h2>`.
- **Geen enkele `loading="lazy"` of `loading="eager"`** ergens op de site — nul resultaten.
- Geen `srcset`/responsive images behalve het hero-logo (al gefixed in een eerdere sessie wegens onscherpte).

### Technische basis — ontbreekt volledig

- ❌ `robots.txt`
- ❌ `sitemap.xml`
- ❌ Canonical tags (nergens)
- ❌ Structured data / JSON-LD (nergens)
- ❌ Twitter Card-tags (enkel Open Graph aanwezig, geen `twitter:card`)
- ❌ Eigen 404-pagina
- ❌ `manifest.json`
- ⚠️ `<html lang="nl">` — moet `lang="nl-BE"` worden per briefing
- ✅ Favicon aanwezig (`merk/logos/Baristamigo_Element_Bruin.png`)
- ✅ Open Graph (title/description/image/type) aanwezig op alle 4 pagina's

### Performance-basis

- ✅ `font-display: swap` al aanwezig op beide `@font-face`-declaraties.
- ❌ Geen `<link rel="preload">` voor de kritieke fonts.
- ⚠️ Fonts zijn `.otf`/`.ttf` (TAYLennon.otf 108 KB, Street-PlainRegular.ttf 56 KB) — geen WOFF2. Ik heb in deze omgeving **geen fontconversie-tool** (geen Python/fonttools, geen npm) om dit zelf om te zetten naar WOFF2 — gemarkeerd als TODO, zie onder.
- Geen minificatie van CSS/JS — bij de huidige bestandsgroottes (stijl ~13 KB, script ~2 KB ongeminificeerd) is de impact klein, maar wordt in fase 2 toegepast.

### Lighthouse-baseline

**Kan niet automatisch gedraaid worden.** Deze omgeving heeft geen Chrome/Chromium, geen Node.js en geen werkende Python — dus geen `lighthouse`-CLI, geen `chromium-cli`, geen headless browser beschikbaar om een echte meting te doen. Ik kan geen cijfers verzinnen. In plaats daarvan: een **handmatige heuristische inschatting** op basis van bovenstaande bevindingen, met de bekende Lighthouse-criteria als leidraad:

| Categorie | Verwachte belemmeringen |
|---|---|
| SEO | Ontbrekende H1 op homepage, geen canonical, geen structured data → waarschijnlijk **niet** aan de ≥95-doelstelling |
| Performance (mobiel) | Geen lazy-loading, geen width/height op 13 imgs (CLS), niet-WOFF2 fonts, hero-video's autoplay bij page load → risico op een matige score, vooral CLS en LCP |
| Best practices | Geen console-errors gezien in de code zelf; externe Elfsight/CDN-afhankelijkheden buiten onze controle |

**Aanbeveling voor Félix:** run zelf een keer Lighthouse in Chrome DevTools (of `web.dev/measure`) op de live URL zodra de site gepubliceerd is, zodat we een echte baseline hebben in plaats van een inschatting. Ik neem dit op als actiepunt in het eindrapport.

### Bedrijfsgegevens (NAP) — nog nergens op de site

De echte adres-/contactgegevens uit de briefing (Pathoekeweg 11R/017, 8380 Brugge; +32 475 20 62 36; info@matubu.be; BTW BE 0773.349.128; VOF Baristamigo by Matubu) **staan momenteel nergens op de site** — `contact.html` heeft alleen een formulier, geen zichtbare NAP-gegevens. Dit is nodig voor zowel gebruikers als voor `LocalBusiness`-structured data (fase 3) en wordt in fase 1 toegevoegd (footer + contactpagina).

---

## Gap-analyse t.o.v. fases 1–4

| Fase | Ontbreekt | Actie |
|---|---|---|
| 1 | H1 index, canonical, robots.txt, sitemap.xml, 404, lang=nl-BE, Twitter Cards, semantische landmarks, NAP-gegevens, alt-teksten iconen | Volledig te bouwen |
| 2 | Lazy loading, width/height op imgs, font-preload, WOFF2-conversie (blocked, zie TODO) | Grotendeels te bouwen, 1 TODO |
| 3 | Alle structured data | Volledig te bouwen |
| 4 | 5 nieuwe pagina's (`mobiele-koffiebar`, `barista-huren`, `huwelijken`, `bedrijfsevents`, `espresso-martini-bar`, `over-ons`, `faq` = **7**, niet 5) bestaan nog niet | Zie vraag hieronder — wacht op akkoord |

**Akkoord gekregen van Félix:** URL-stijl blijft `naam.html` (consistent met bestaande conventie, geen mapstructuur), en `services.html` wordt een hub-pagina die doorlinkt naar de nieuwe verdiepende pagina's.

---

## Fase 1 — Technische fundering ✅

| Item | Status |
|---|---|
| Unieke `<title>` per pagina (patroon `[zoekwoord] \| Baristamigo`, ≤60 tekens) | ✅ alle 11 pagina's |
| Meta description 140–155 tekens met CTA | ✅ alle 11 pagina's, gevalideerd op tekenlengte |
| Canonical tags (absolute URL's) | ✅ alle 11 pagina's — **aanname:** domein `https://baristamigo.be/` (zie TODO) |
| `robots.txt` | ✅ laat alles toe, verwijst naar sitemap |
| `sitemap.xml` | ✅ statisch, 11 URL's met `lastmod` |
| Redirects (http→https, www) | N/A — geen hosting/server actief, dus geen redirect-config te zetten. TODO bij deploy. |
| Eigen 404-pagina | ✅ `404.html` — werkt automatisch op GitHub Pages (native 404.html-ondersteuning); op andere hosting kan servers-side config nodig zijn |
| Exact 1 `<h1>` per pagina | ✅ (homepage kreeg een `visually-hidden` H1, want de hero is puur beeld/logo) |
| `<main>`, `<nav>`, `<footer>` landmarks | ✅ alle 11 pagina's |
| Beschrijvende linkteksten | ✅ geen "klik hier"-links aangetroffen of toegevoegd |
| `<html lang="nl-BE">` | ✅ alle 11 pagina's |
| Open Graph + Twitter Cards | ✅ alle 11 pagina's; `og:image`/`twitter:image` gebruiken het bestaande logo (1200×630 og:image-template is **niet** gemaakt, zie TODO) |
| Favicon + `manifest.json` | ✅ favicon bestond al, `manifest.json` toegevoegd en gelinkt op alle 11 pagina's |

## Fase 2 — Performance & Core Web Vitals ✅ (met 1 blocker)

| Item | Status |
|---|---|
| `width`/`height` op afbeeldingen (CLS) | ✅ alle `<img>`-tags op de 11 pagina's |
| `loading="lazy"` (behalve above-the-fold) | ✅ hero-afbeelding en headerlogo's `eager`/geen lazy (above-the-fold), overige `lazy` |
| Responsive `srcset` | ✅ hero-logo (was al gefixed); overige afbeeldingen zijn klein genoeg (56–400px) om dit te laten |
| `font-display: swap` | ✅ was al aanwezig |
| Font-preload | ✅ `TAYLennon.otf` preload toegevoegd op de homepage |
| **WOFF2-conversie van fonts** | ❌ **BLOCKED** — geen Python/fonttools/npm beschikbaar in deze omgeving om `.otf`/`.ttf` naar `.woff2` te converteren. TODO voor Félix of een sessie met tooling. |
| Minificatie CSS/JS | Niet uitgevoerd — bestanden zijn klein (CSS ~15 KB, JS ~2,5 KB ongeminificeerd); impact op LCP/INP is verwaarloosbaar op deze schaal. Kan later met een build-stap als de site groeit. |

### Lighthouse — eind

Nog steeds **niet automatisch te draaien** in deze omgeving (zie fase 0). De structurele problemen die een lage score zouden geven (ontbrekende H1, CLS, geen canonical/structured data) zijn nu verholpen; de resterende bekende performance-belemmering is de **WOFF2-blocker** hierboven. **Actiepunt Félix:** draai Lighthouse (Chrome DevTools → Lighthouse, mobiel) zodra de site live staat, en deel de score — dan weten we of de WOFF2-conversie prioriteit moet krijgen.

## Fase 3 — Structured data (JSON-LD) ✅

| Type | Waar | Validatie |
|---|---|---|
| `FoodService` (LocalBusiness) | `index.html`, `contact.html` (zelfde `@id`, dus zelfde entiteit) | ✅ geldige JSON (gecontroleerd met `ConvertFrom-Json`), enkel zichtbare/echte velden — **geen `openingHours`** toegevoegd (niet aangeleverd, dus weggelaten i.p.v. verzonnen) |
| `Service` | De 5 dienstpagina's (`mobiele-koffiebar`, `barista-huren`, `huwelijken`, `bedrijfsevents`, `espresso-martini-bar`), elk met `provider` → `@id` van de LocalBusiness | ✅ |
| `FAQPage` | `faq.html` — 8 vragen, exact gelijk aan de zichtbare tekst op de pagina | ✅ |
| `BreadcrumbList` | Alle 10 pagina's met zichtbare breadcrumb (niet op `index.html`, want die is de root) | ✅ |

## Fase 4 — Sitestructuur & content ✅

7 nieuwe pagina's gebouwd, elk met: H1 met primair zoekwoord, intro, USP-sectie, mini-FAQ, CTA naar `contact.html`, en minstens 2 links naar gerelateerde pagina's. `services.html` is de hub die naar de 3 relevante nieuwe pagina's doorlinkt (barista, mobiele koffiebar, Espresso Martini). De homepage-services-rij linkt nog niet individueel door naar de nieuwe pagina's — zie TODO.

| Pagina | Zoekwoordcluster |
|---|---|
| `mobiele-koffiebar.html` | mobiele koffiebar huren, koffiebar huren |
| `barista-huren.html` | barista huren, barista op locatie |
| `huwelijken.html` | koffiebar huwelijk, koffiecatering trouwfeest |
| `bedrijfsevents.html` | koffiecatering bedrijfsevent, koffiebar beurs, koffiecatering festival |
| `espresso-martini-bar.html` | espresso martini bar huren, cocktailbar met koffie |
| `over-ons.html` | (geen commercieel zoekwoord — merkverhaal) |
| `faq.html` | (ondersteunend, FAQPage-rich-result-kandidaat) |

Alle content is **nieuw geschreven** op basis van de bedrijfscontext uit de briefing (en, voor `over-ons.html`, de al bekende Matubu-merkgeschiedenis uit dit project). Elke passage die feitelijke input van Félix nodig heeft (prijzen, exacte capaciteit, technische vereisten, het volledige oprichtingsverhaal) is gemarkeerd met `<!-- TODO: input Félix -->` in de broncode.

---

## Validatie uitgevoerd

- **JSON-LD-syntax:** alle 18 `<script type="application/ld+json">`-blokken over de 11 pagina's geparsed met PowerShell's `ConvertFrom-Json` — allemaal geldig.
- **Interne links:** elke `href="*.html"` op de site gecontroleerd tegen de bestandenlijst — geen enkele broken link.
- **Titel-/description-lengte:** alle 11 titels ≤60 tekens, alle 11 meta descriptions tussen 140–155 tekens.
- **Landmark-balans:** `<main>`, `<header>`, `<footer>`, `<nav>` open/close-tags geteld per pagina — overal in balans.

---

## Openstaande TODO's voor Félix

1. **Canonical-domein bevestigen.** Alle canonical/OG/Twitter/JSON-LD URL's gaan uit van `https://baristamigo.be/` — bevestig of dit klopt, of geef het echte deploy-domein door zodat ik een find-and-replace kan doen.
2. **WOFF2-conversie van de fonts** (`TAYLennon.otf`, `Street-PlainRegular.ttf`) — ik heb hiervoor geen tooling in deze omgeving. Kan met een online converter of in een sessie met Node/Python.
3. **Prijzen / prijsformules** — alle FAQ's en dienstpagina's verwijzen naar "vraag een offerte" i.p.v. een concreet bedrag, zoals gevraagd.
4. **Exacte technische vereisten** (stroom, water, opbouwtijd, capaciteit per opstelling) — nu generiek beantwoord ("neem contact op"), specifieke cijfers ontbreken.
5. **Volledige oprichtingsverhaal** voor `over-ons.html` — nu een korte, algemene versie; graag de definitieve tekst.
6. **1200×630 og:image-template** — er is geen dedicated OG-afbeelding; alle pagina's gebruiken nu het logo als fallback. Een echte 1200×630 template (met foto + logo) zou beter scoren op social shares.
7. **Homepage-services-rij** linkt nog niet individueel naar de nieuwe dienstpagina's (enkel via het menu/footer/services-hub) — laat weten of dit gewenst is.
8. **Lighthouse-score op de live site** — run dit zelf zodra gepubliceerd en deel het resultaat.

## Actiepunten buiten de code (sectie 8 van de briefing)

- Google Business Profile aanmaken/optimaliseren voor Baristamigo (categorie "Cateringservice"), NAP-gegevens consistent met deze site.
- Google Search Console instellen + `sitemap.xml` indienen na deploy.
- Vermeldingen aanvragen op eventplanner.be en gelijkaardige directories.
- Reviews verzamelen van bestaande eventklanten.
- Echte eventfoto's laten aanleveren voor og:images en de dienstpagina's (nu hergebruik van bestaande Baristamigo-CDN-beelden).
