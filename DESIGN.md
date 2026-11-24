# Vuffi Design System

Version 5, November 23, 2026 (night). Source of truth for color, type, shape, motion, photography and voice on getvuffi.com. Change this file before changing the theme.

Earlier versions are saved on branches: `design/serif-v1` (first serif), `design/rounded-v2` (Nunito, rounded), `design/serif-v3` (serif with the still hero and Robin's first images).

## 1. Feeling

A premium, clinical dog supplement brand that looks like Grüns, Bloom, Pawfy and Apple made something for dogs. Medical confidence without coldness: white space, hairline rules, square corners, specimen style labels, and big, beautifully lit photography of the real jar and real looking dogs. Lots of photos. Nothing cute or bubbly, nothing neon. Buttons are the only round shapes.

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
4. No gradients, glows or saturated color fields. Color comes from photography.

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

## 5. Shape

1. Square everywhere except buttons. Corners are 2px on chips, tags and inputs, 4px on cards and photos.
2. Buttons are round: full pills, 54 to 56px tall, bottle green with white text on light bands, leaf with ink text on dark bands. On hover a second color rises from the bottom and fills the pill, and the arrow slides 4px. Toggles, photo arrows and email fields are round too.
3. Hairline rules (1px) divide everything: lists, specs, cards. No heavy shadows.
4. Layout: 1280px max content width, 20px side padding on phones, 48px on desktop. Section spacing 72px on phones, 120px on desktop. Full width photo bands break the grid on purpose.
5. Icons: drawn in code, 1.5px line, square ends.

## 6. Photography

Photos carry the brand. Every prompt is in "Image Prompts - Vuffi - 2026.11.23.txt".

1. Real photography, never illustration style or CGI look. Natural colors exactly as things look in life: true white plastic, the real bottle green label, warm brown chews, real dog coats, real light.
2. The product is always the same jar, from Robin's reference photo, label unchanged. Never the Vuffi logo on the jar.
3. Light: soft window light, golden hour sun, a single hard sunbeam (god light) through a window or trees, rim light on the jar. Fine haze or dust in the beam is fine; glowing particles and neon are not.
4. Variety: floating product shots, still lifes on stone and wood, hands, kitchen counters, morning routines, walks, stairs, sofas, beaches, fields. Shot like a 2026 campaign: medium format, shallow depth of field, editorial crop.
5. Dogs in photos are lifestyle only. Never shown as customers, reviews or before and after.
6. Medical diagrams are drawn like a veterinary atlas: true anatomical colors (ivory bone, pearly blue white cartilage, pale straw joint fluid, deep red muscle), never neon.

## 7. Motion

Motion only where someone toggles, slides or scrolls, and it should feel expensive.

1. Scroll story: built like the Grüns section. Bottle green fading to moss, big uppercase lines rising one by one, the jar rising from the bottom and running off the screen, the lid popping off in an arc, a chew peeking out, chews drifting and turning around it.
2. Headlines: every word rises out of its own mask, one after another.
3. Photos: wipe up from the bottom while the picture settles from a slow zoom. Full width photos drift slower than the page; page title photos settle as they scroll in. Photos zoom slightly on hover.
4. Buttons: the fill sweeps up on hover, the arrow slides, a small press on click.
5. Toggles and tabs: the joint switch crossfades and the five numbers pop in one by one; the buy box and dose finder ease between choices; accordions open smoothly.
6. Sliders: the ticker strip slides slowly; photo rows scroll sideways with arrows.
7. Numbers count up once. Everything stops for people who ask their device for less motion and in the theme editor.

## 8. Voice

Established brand, plain and confident, with a clinical edge. No emojis. No hyphens or dashes in compound words. Short sentences. Strong function claims (supports hips and joints, eases stiffness, keeps them moving). No disease claims, no delivery promises outside the shipping policy. Slogan: "Every step, supported."
