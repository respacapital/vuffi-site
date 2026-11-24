# Vuffi Placeholders and Shot List

Every labeled box on the site is a photo slot. Prompts for every slot are in "Image Prompts - Vuffi - 2026.11.24.txt" (46 images, one message for ChatGPT, numbered as below), sent with three reference images (Jar Reference 1 to 3) so the jar is identical in every photo. Rules: real photography with natural colors, the jar always identical to the reference, never the Vuffi logo on the jar, dogs only as lifestyle (never customers, reviews or before and after), no text inside images.

Status: Filled means a photo is in the slot. Every file in Shopify Files is named `vuffi-v<version>-<slot>` (.jpg, or .png for the see through scroll story shots), so a replacement only needs the same slot name with a new version number. v2 is the original set, v4 the Nov 24 knee and ingredient photos, v5 Robin's redone photos.

Label check: in these jar shots the label lettering was redrawn in a serif font instead of the real jar's lettering. Redone and placed (v5): why-guarantee (12), bf-banner (27), detail-jar (33), detail-label (37), plus detail-hand (36), scroll-jar-open (3) and subscribe-jar (21). Still to redo with "Photos To Redo - Vuffi - 2026.11.24.zip": detail-open (34), page-faq (45), story-1 (42).

Words over photos: the Why Vuffi, Life with Vuffi and Up close rows put their words over the bottom of each photo on a green shade, and the page titles put the headline over the bottom left of a full screen photo. Those prompts ask for a calm lower part.

## Home

| # | Slot | Where | Size and ratio | Setting | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | hero-desktop | Top, behind the headline (990px and up) | Wide 16:9 or 3:2 | Vuffi hero > Computer image | Filled |
| 2 | hero-mobile | Top, between the headline and buttons (phones, tablets) | Portrait 2:3 | Vuffi hero > Phone image | Filled |
| 3 to 8 | scroll-jar-open, scroll-lid, scroll-chew-1 to 4 | Scroll story | Transparent PNGs | Vuffi scroll story | Filled (scroll-jar-open and scroll-jar-base are v5). The lid position in the code is fitted to these photos; the closed jar (scroll-jar-base) is made from scroll-jar-open |
| 9 to 12 | why-actives, why-taste, why-vet, why-guarantee | Why Vuffi photo row | 2:3, shown 3:4 | Vuffi photo row (why) > each Photo | Filled (12 is v5) |
| 13, 14 | diagram-joint-ingredients, diagram-joint-worn | How it works switch | 1:1 | Vuffi joint diagram | Filled with the v4 pair, card color #0B1411 behind them and the five numbers measured on the new supported image. Both photos fade into the section at the edges |
| 15 | diagram-chew-cross | Formula | 1:1, see through PNG | Vuffi formula > Diagram | Filled (vuffi-v3, white made see through). A new image needs the five name tags measured again |
| 16 to 20 | ing-glucosamine, ing-chondroitin, ing-msm, ing-hyaluronic, ing-mussel | Formula moving card row, and the Ingredients page rows | 4:5 | Vuffi formula > each Ingredient; Vuffi ingredient list > each Ingredient | Filled with the v4 set |
| 21 | subscribe-jar | Subscribe and save, left half on computers, wide crop on phones | 2:3 | Vuffi subscribe and save | Filled (v5) |
| 22 to 26 | life-walk, life-car, life-couch, life-beach, life-stairs | Life with Vuffi photo row | 2:3, shown 3:4 | Vuffi photo row (life) | Filled |
| 27 | bf-banner | Closing offer; on phones it melts into the footer | 2:3 | Vuffi closing offer | Filled (v5) |
| (none yet) | social-1 to social-6 | Follow along grid above the closing offer | 1:1, 1080 | Vuffi social > each Photo | Filled for now with popup-dog, detail-hand, story-2, pdp-5, band-about and band-pdp. Replace with real posts once the accounts are live |

## Product page

| # | Slot | Where | Size and ratio | Setting | Status |
| --- | --- | --- | --- | --- | --- |
| (built) | dose, actives and subscribe cards | Product gallery, between Robin's photos | 1:1, 2048 | Product media | Filled. Built by scripts/product_images.py, chews in the real chew brown |
| (Robin) | vuffi-photo-01 to 10 | Product gallery (photo 07, the dark one, moved to The jar explained) | 1:1, 2048 | Product media | Filled with Robin's photos of the real jar. Variant images: 1 jar = photo 01, 2 jars = photo 05 |
| 33 to 37 | detail-jar, detail-open, detail-macro, detail-hand, detail-label | Up close photo row | 1:1 | Vuffi photo row (detail) | Filled (33, 36, 37 are v5; 34: label check) |
| (built) | label-jar | The jar, explained, left half on computers, full width on phones | 4:5, 1600 x 2000, background #0B1411 at the edges | Vuffi jar explained > Jar photo | Filled with vuffi-photo-07-dark.jpg (Robin's photo of the real jar on dark). The section takes its shape from the photo and fades it into the background |
| 38 | band-pdp | Full width photo after How to give it | 16:9 | Vuffi photo band (band_pdp) | Filled |

## Other pages

| # | Slot | Where | Size and ratio | Setting | Status |
| --- | --- | --- | --- | --- | --- |
| 39 | page-ingredients | Ingredients, full screen behind the title | 16:9 | Vuffi page title > Photo | Filled |
| 40 | band-chew | Ingredients, last photo with the Shop button | 16:9 | Vuffi photo band (band_ing) | Filled |
| 41 | page-story | Our story, full screen behind the title | 16:9 | Vuffi page title > Photo | Filled |
| 42 | story-1 | Our story, Five bottles became one chew | 1:1 | Vuffi photo and story (why) | Filled (label check) |
| 43 | band-about | Our story, full width photo with the Shop button | 16:9 | Vuffi photo band (band_about) | Filled |
| 44 | story-2 | Our story, Support before the limp | 16:9 | Vuffi photo and story (prevent) | Filled |
| 45 | page-faq | FAQ, full screen behind the title | 16:9 | Vuffi page title > Photo | Filled (label check) |
| 46 | popup-dog | Email popup | 2:3 | Footer > Vuffi email popup > Photo | Filled |
| (reused) | page-contact | Contact, full screen behind the title | 16:9 | Vuffi page title > Photo | Filled with vuffi-v2-band-rest.jpg (spaniel asleep on a sofa) |

Retired slots (no longer on the site): band-run, ritual. band-rest now lives on the Contact page.
