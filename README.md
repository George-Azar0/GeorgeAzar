# GeorgeAzar.github.io
# Portfoliosite — George Azar

Statische basis van mijn portfoliosite voor WPFW, opdracht 1. Drie pagina's:
`index.html` (whoami), `projects.html` (projecten), `blog.html` (blog),
gestyled met één stylesheet in `css/style.css`.

# Request/response-cyclus

Dit is nu nog een statische site: er is geen backend die data verwerkt.
De cyclus die deze site op dit moment bedient:

    1. GET /index.html; browser --> server  
    2. 200 OK + HTML;  server --> browser    
    3. GET /css/style.css;  bowser --> server
    4. 200 OK + CSS ; server --> browser
    5. Browser rendert de pagina
    6. Klik op "projects" in de nav GET /projects.html;  browser --> server
    7. 200 OK + HTML;    server --> browser


Bij elke paginawissel begint er eigenlijk een nieuwe request/response-cyclus. De browser vraagt opnieuw een HTML-bestand op bij de server, waarna de server dit terugstuurt als HTML/CSS. Op dit moment gebeurt er aan de serverkant nog geen echte logica.
Later dit semester, wanneer we een backend-framework en een ORM toevoegen, zal dit veranderen. De server kan dan bijvoorbeeld gegevens uit de database ophalen en op basis daarvan dynamisch een response opbouwen.


# Onderbouwing van ontwerpkeuzes

**Gebruikersscenario 1  medestudent/recruiter bekijkt de site onderweg op mobiel**

Een medestudent of recruiter checkt mijn portfolio tussen twee dingen door,
op zijn telefoon  bijvoorbeeld in de trein of tussen colleges. Die persoon
heeft weinig tijd, geen rustige werkplek, en wil snel en zonder moeite
kunnen lezen wie ik ben en wat ik kan. Een druk of fel kleurenpalet, kleine
tekst, of een layout die pas op desktop goed werkt, zorgt voor afhakers.

Twee ontwerpkeuzes die dit ondersteunen:

1. Mobile-first met drie breekpunten (<=480px, ~768px, =>1024px). De site
   is eerst ontworpen voor het kleine scherm en breidt daarna uit, in
   plaats van andersom — zodat de mobiele ervaring niet een "ingekrompen
   desktop-versie" is maar het uitgangspunt. Dit voorkomt horizontaal
   scrollen en te kleine tekst op een telefoon.
   Bron: [MDN — Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

2. Een rustig, gedempt kleurenpalet in plaats van felle/verzadigde
   kleuren. Ik gebruik bewust bijna-monochrome tinten 
    met één ingetogen accentkleur, in plaats van felle of
   contrasterende kleurvlakken. Dit is niet alleen visueel rustiger en
   professioneler, maar voorkomt ook overprikkeling bij bezoekers die
   gevoelig zijn voor felle kleuren. 
   Bron: [web.dev — Kleur en contrast](https://web.dev/articles/color-and-contrast-accessibility)

<!-- Idee voor later (nog niet toegepast, want dit onderdeel is puur
     HTML/CSS zonder JavaScript): een prefers-reduced-motion media query,
     zodat bezoekers die gevoelig zijn voor beweging/flikkering minder
     animatie krijgen. Dat komt waarschijnlijk terug zodra we JS gaan
     toepassen in het project. -->

**Gebruikersscenario 2 — bezoeker scant snel door inhoud, wil geen lange lappen tekst**

Of iemand nu door mijn projecten scrolt of een blogpost begint te lezen: de
meeste bezoekers lezen niet woord voor woord, ze scannen eerst. Lange,
ononderbroken tekstblokken zorgen ervoor dat iemand afhaakt of het
belangrijkste punt mist. De inhoud moet dus in kleine, herkenbare stukken
staan.

Twee ontwerpkeuzes die dit ondersteunen:

3. Korte tekstblokken met duidelijke koppen, in plaats van lange
   paragrafen. Elke sectie op `index.html` heeft een eigen `<h2>` (Over
   mij, Wat ik leer, Contact) met daaronder maximaal een paar zinnen, geen
   aaneengesloten cv-verhaal. Zo kan iemand op de kop scannen en alleen de
   sectie lezen die hem interesseert.
   Bron: [MDN — Headings and paragraphs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs)

4. Consistente, herhaalde structuur per item. In `projects.html` volgt
   elk `<article class="project">` exact dezelfde opbouw: `<h2>` (titel),
   `<img>`, `<p>`, `<p class="meta">`.
    Doordat die volgorde overal hetzelfde is, hoeft een
   bezoeker niet steeds opnieuw uit te zoeken waar hij moet kijken; hij
   herkent het patroon en kan sneller vergelijken tussen items.



# Bronnen

- MDN Web Docs  [Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- web.dev  [Kleur en contrast](https://web.dev/articles/color-and-contrast-accessibility)
- MDN Web Docs  [Headings and paragraphs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs)
-   BroCode free youtube course (https://www.youtube.com/watch?v=HGTJBPNC-Gw&t=4s)

# AI-gebruik

AI (Claude) is gebruikt op AIAS-niveau 2 voor:

- Het maken van een HTML/CSS-voorbeeld website 
- Het uitleggen van de request/response-cyclus in begrijpelijke stappen,
  en het controleren van mijn eigen begrip daarvan via een quiz.
- design keuzen van mij gecontroleerd en geholpen met een specefieke kleur,
 de background-color van de hele website.
- typefouten en foute hoofdletters in code en in README aangewezen.


Daarnaast is mijn HTML/CSS-basiskennis opgebouwd via de gratis
["HTML & CSS Full Course for free 🌎"](https://www.youtube.com/watch?v=HGTJBPNC-Gw&t=4s/) van BroCode
op YouTube.
