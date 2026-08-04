# SEO-rapport Baristamigo

Dit rapport wordt per fase aangevuld. Status: **Fase 0 afgerond, wacht op akkoord over sitestructuur (fase 4) voor verder te gaan.**

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
