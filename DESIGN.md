# Vuffi Design System

Version 9, November 24, 2026. Source of truth for color, type, shape, motion, photography and voice on getvuffi.com. Change this file before changing the theme.

Earlier versions are saved on branches: `design/serif-v1` (first serif), `design/rounded-v2` (Nunito, rounded), `design/serif-v3` (serif with the still hero and Robin's first images).

## 1. Feeling

A premium, clinical dog supplement brand that looks like Grüns, Bloom, Pawfy and Apple made something for dogs. Medical confidence without coldness: white space, hairline rules, round controls, and big, beautifully lit photography of the real jar and real looking dogs that runs to the edge of the screen. Lots of photos. Nothing cute or bubbly, nothing neon. No small print labels on photos or above the big moments: the hero and the scroll story speak through the headline alone.

## 2. Color

All colors live in Horizon's theme palette (Theme settings > Colors), so they change everywhere from one place. Every color is natural and taken from the jar itself, so the site and the product read as one thing.

| Name | Hex | Palette slot | Use |
| --- | --- | --- | --- |
| White | #FFFFFF | Background | Page, cards, most of the screen |
| Ink | #141A17 | Foreground | Text, the countdown bar, the footer |
| Bottle green | #0E3B2C | Color 1 | Buttons, links, accent words, dark bands (the jar label green) |
| Leaf | #C6E35A | Color 2 | Small accents on bottle green or ink only: tags, countdown digits, the paw |
| Stone | #F3F2EE | Color 3 | Quiet alternate band, image wells, cards |
| Hairline | Ink at 10 to 14 percent | (derived) | Card edges, rules, inputs |

Rules:
1. Bottle green is the jar label green. White text on it passes contrast easily.
2. Leaf is the jar's lime, softened so it reads natural on screen. It never sits on white and never fills large areas.
3. Dark bands are bottle green or ink, never bright green.
4. No saturated color fields or neon. The one glow allowed is the hero light: on ink and bottle green bands (How it works, What to expect, the closing offer) a soft warm beam falls from the top left with a gentle lift in the middle and a slightly darker floor, like the light in the hero photo. Each of those sections has a switch for it.

## 3. Logo

From the Logo Kit (Nov 22): ink letters with the green paw on light, white letters with the lime paw on dark. A new logo is coming from Robin; this section changes when it arrives.

## 4. Type

One family, the one printed on the jar: Figtree (a close match to the label lettering), plus a mono for clinical details.

| Role | Font (Theme settings > Typography) | Notes |
| --- | --- | --- |
| Headings | Figtree Bold 700 (Heading) | Tight tracking (about minus 3 percent), sentence case. One word can be bottle green or leaf: type it in italics in the editor and it changes color, not slant |
| Body, buttons | Figtree Regular 400 (Body) | 16 to 18px body, buttons 16px Bold |
| Labels, big numbers, story lines | Figtree ExtraBold 800 (Subheading), uppercase | Eyebrows, stats, dose numbers, the scroll story lines, like the Grüns section |
| Clinical details | IBM Plex Mono 400 (Accent) | Specimen labels like "Nº 01", captions like "Fig. 01" |
| Numbers | Tabular figures | Prices, countdowns, stats |

## 4b. Rhythm

Pages alternate dark and light bands so the energy of the hero carries all the way down. Dark: ink (#0B1411) and bottle green (#0E3B2C, also the scroll story gradient). Light: white and stone (#F3F2EE). Never two of the same next to each other when it can be helped. Home: hero ink, ticker ink, scroll story green, why stone, How it works ink, formula stone, comparison white, what to expect green, subscribe stone, guarantee ink, life white, FAQ stone, closing offer green. On dark bands accents are leaf green; on light bands bottle green.

Every section appears once on the whole site. The home page carries the main points (how it works, formula, comparison, what to expect, subscribe, guarantee, FAQ). Other pages only hold their own content: product (buy box, close ups, photo band, reviews), ingredients (each ingredient in depth), our story, FAQ (every question), contact.

## 5. Shape

Luxury and clinical: no rounded tiles anywhere.
1. Photos, panels, cards and lists have square corners. Photo rows sit flush, edge to edge, split only by a 2px hairline, with the words laid over the bottom of each photo on a deep green shade. Page titles fill the screen with a photo and put the headline at the bottom left.
2. Information sits on hairlines (1px rules) instead of in boxes: the joint ingredient list, perks, prices, questions, the ingredient index row. Generous space around everything.
3. Only things you press stay round: buttons (full pills, 54 to 56px tall, bottle green with white text on light bands, leaf with ink text on dark bands), switches, chips, inputs, accordion signs, the numbered joint markers and the 90 day seal.
4. On hover a second color rises from the bottom and fills a button, and the arrow slides 4px.
5. Layout: content width 1440px with 16px side margins on phones and 40px from 750px up, matching Horizon's narrow page width so every section lines up with the logo and the cart icon. Section spacing about 72px on phones and 120px on desktop.
6. Pages that open on a page title get an ink header with the white logo, so the header runs straight into the dark title like the home page.
7. Icons: drawn in code, 1.5px line, round ends.

## 6. Photography

Photos carry the brand. Every prompt is in "Image Prompts - Vuffi - 2026.11.23.txt".

1. Real photography, never illustration style or CGI look. Natural colors exactly as things look in life: true white plastic, the real bottle green label, warm brown chews, real dog coats, real light.
2. The product is always the same jar, from Robin's reference photo, label unchanged. Never the Vuffi logo on the jar.
3. Light: soft window light, golden hour sun, a single hard sunbeam (god light) through a window or trees, rim light on the jar. Fine haze or dust in the beam is fine; glowing particles and neon are not.
4. Variety: floating product shots, still lifes on stone and wood, hands, kitchen counters, morning routines, walks, stairs, sofas, beaches, fields. Shot like a 2026 campaign: medium format, shallow depth of field, editorial crop.
5. Dogs in photos are lifestyle only. Never shown as customers, reviews or before and after.
6. Medical diagrams are drawn like a veterinary atlas: true anatomical colors (ivory bone, pearly blue white cartilage, pale straw joint fluid, deep red muscle), never neon.

## 7. Motion

Motion only where someone scrolls, taps or toggles. Text and photos never animate in: they are simply there when the page loads.

1. Scroll story: built like the Grüns section. Bottle green fading to moss. A big closed jar rises (on phones it fills the bottom half of the screen), the lid pops off in an arc and leaves the screen completely, then chews fly out of the jar one by one, turning as they go, while each big uppercase line slides up with them.
2. How it works: the worn joint crossfades into the supported one once the diagram is on screen, and the five numbers fade in on their circles. Visitors can flip between the two and tap each ingredient.
3. What to expect: the track runs from the first circle to the last, fills as the section scrolls past, and each circle lights up the moment the fill reaches its center.
4. Ingredient cards: an endless row that slides slowly to the left and stops while someone hovers or touches it.
5. Buttons: the fill sweeps up on hover, the arrow slides, a small press on click.
6. Toggles and accordions: the buy box eases between choices; questions open smoothly.
7. The ticker strip slides slowly. The 90 day seal turns slowly. The footer logo rises into place once.
8. Everything stops for people who ask their device for less motion: the ingredient row becomes a swipe row.

## 8. Voice

Established brand, plain and confident, with a clinical edge. No emojis. No hyphens or dashes in compound words. Short sentences. Strong function claims (supports hips and joints, eases stiffness, keeps them moving). No disease claims, no delivery promises outside the shipping policy. Slogan: "Every step, supported."
