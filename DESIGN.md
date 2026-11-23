# Vuffi Design System

Version 3, November 23, 2026. Source of truth for color, type, shape, motion and voice on getvuffi.com. Change this file before changing the theme.

## 1. Feeling

A premium dog supplement brand at the level of AG1, Apple and PetLab Co. Clinical confidence, not cute. Crisp edges, big type, generous white space, real product photography, and motion that feels engineered. Nothing childish, nothing pastel, nothing dull.

## 2. Color

All colors live in Horizon's theme palette (Theme settings > Colors), so they change everywhere from one place.

| Name | Hex | Palette slot | Use |
| --- | --- | --- | --- |
| White | #FFFFFF | Background | Page, cards, most of the screen |
| Ink | #0B1410 | Foreground | Text, dark bands, the countdown bar, the footer |
| Green | #00843F | Color 1 | Buttons, links, accent words, icons on white |
| Lime | #8FFB09 | Color 2 | Accents on Ink only: countdown digits, tags, the paw |
| Paper | #F4F6F5 | Color 3 | Quiet alternate band, image wells |
| Hairline | Ink at 10 to 14 percent | (derived) | Card edges, dividers, inputs |

Rules:
1. The logo green is #009A49. Buttons and small text use the deeper #00843F so white text on a green button passes contrast (4.8 to 1). Large graphics can use either.
2. Lime never sits on white. It belongs on Ink.
3. One accent color per section. Green on light bands, lime on dark bands.
4. No gradients except a single soft glow behind the jar on dark bands.

## 3. Logo

From the Logo Kit (Nov 22): main logo is ink letters with the green paw (header, anything light). The dark logo is white letters with the lime paw (footer, dark bands, ads). The icon is the lime paw on Ink (favicon, social). One color versions: all ink, all white.

## 4. Type

Version 3 (Nov 23): back to the serif headings, to go with the new logo. The rounded version (Nunito Black headings, uppercase story lines) is saved on the branch `design/rounded-v2`.

| Role | Font | Notes |
| --- | --- | --- |
| Headings | Instrument Serif (Theme settings > Typography > Heading) | Large, tight, light. One word per headline can be italic and lime or green: type it in italics in the editor |
| Story lines | Instrument Serif, sentence case | Big stacked lines in the scroll story; the last line italic and lime |
| Body, buttons, labels | Inter (Body, Subheading, Accent) | 16 to 18px body, 600 weight buttons |
| Eyebrows | Inter 600, 12px, letter spaced, uppercase | Always paired with a small green or lime mark |
| Numbers | Tabular figures | Prices, countdowns, stats |

## 5. Shape

1. Cards and photos: 20px corners, 1px hairline, no heavy shadows.
2. Buttons: full pill, 54px tall on mobile, 56px on desktop, an arrow that slides 3px on hover.
3. Chips and badges: full pill, 12px uppercase.
4. Layout: 1280px max content width, 20px side padding on phones, 48px on desktop. Section spacing 72px on phones, 120px on desktop.
5. Icons: drawn in code (SVG line icons, 1.5px stroke), ink with one green detail, or white with one lime detail on dark.

## 6. Motion

Motion only where someone toggles, slides or scrolls. Nothing moves on its own: no floating, spinning, pulsing or drifting particles. The hero is one still image.

1. Toggles and tabs: the joint switch crossfades between the worn and supported images, the buy box and dose finder ease between choices, accordions open smoothly.
2. Sliders: the ticker strip slides slowly and pauses on hover; card rows scroll sideways on phones.
3. Scroll: content rises 24px and fades in once as it enters the screen (700ms, cubic-bezier(.16, 1, .3, 1), staggered 80ms); numbers count up once; the scroll story pins like Grüns (lines slide up one by one, the jar rises, the lid pops, a chew peeks out, chews drift at different depths as you scroll).
4. Countdown digits simply change, no roll.
5. Everything stops for people who ask their device for less motion.

## 7. Voice

Established brand, plain and confident. No emojis. No hyphens or dashes in compound words. Short sentences. Strong function claims (supports hips and joints, eases stiffness, keeps them moving). No disease claims, no delivery promises outside the shipping policy. Slogan: "Every step, supported."
