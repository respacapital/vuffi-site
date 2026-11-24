# Vuffi Placeholders and Shot List

Every labeled box on the site is a photo slot. Prompts for every slot are in "Image Prompts - Vuffi - 2026.11.24.txt" (46 images, one message for ChatGPT, numbered as below), sent with three reference images (Jar Reference 1 to 3) so the jar is identical in every photo. Rules: real photography with natural colors, the jar always identical to the reference, never the Vuffi logo on the jar, dogs only as lifestyle (never customers, reviews or before and after), no text inside images.

Status: Filled means a photo is in the slot. Every file in Shopify Files is named `vuffi-v2-<slot>` (.jpg, or .png for the see through scroll story shots), so a replacement only needs the same slot name with a new version number.

Label check: in these jar shots the label lettering was redrawn in a serif font instead of the real jar's lettering. They are the first to regenerate: why-guarantee (12), bf-banner (27), detail-jar (33), detail-open (34), detail-label (37), page-faq (45), story-1 (42).

Words over photos: the Why Vuffi, Life with Vuffi and Up close rows put their words over the bottom of each photo on a green shade, and the page titles put the headline over the bottom left of a full screen photo. Those prompts ask for a calm lower part.

## Home

| # | Slot | Where | Size and ratio | Setting | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | hero-desktop | Top, behind the headline (990px and up) | Wide 16:9 or 3:2 | Vuffi hero > Computer image | Filled |
| 2 | hero-mobile | Top, between the headline and buttons (phones, tablets) | Portrait 2:3 | Vuffi hero > Phone image | Filled |
| 3 to 8 | scroll-jar-open, scroll-lid, scroll-chew-1 to 4 | Scroll story | Transparent PNGs | Vuffi scroll story | Filled. The lid position in the code is fitted to these photos; the closed jar (scroll-jar-base) is made from scroll-jar-open |
| 9 to 12 | why-actives, why-taste, why-vet, why-guarantee | Why Vuffi photo row | 2:3, shown 3:4 | Vuffi photo row (why) > each Photo | Filled (12: label check) |
| 13, 14 | diagram-joint-ingredients, diagram-joint-worn | How it works switch | 1:1 | Vuffi joint diagram | Filled with white background versions. New prompts make them on #0B1411; when they arrive, set "Card behind the joint images" to #0B1411 and measure the five numbers again |
| 15 | diagram-chew-cross | Formula | 1:1, see through PNG | Vuffi formula > Diagram | Filled (vuffi-v3, white made see through). A new image needs the five name tags measured again |
| 16 to 20 | ing-glucosamine, ing-chondroitin, ing-msm, ing-hyaluronic, ing-mussel | Formula moving card row, and the Ingredients page rows | 4:5 | Vuffi formula > each Ingredient; Vuffi ingredient list > each Ingredient | Filled, to be replaced (no seashells, background matches the page) |
| 21 | subscribe-jar | Subscribe and save, left half on computers, wide crop on phones | 2:3 | Vuffi subscribe and save | Filled |
| 22 to 26 | life-walk, life-car, life-couch, life-beach, life-stairs | Life with Vuffi photo row | 2:3, shown 3:4 | Vuffi photo row (life) | Filled |
| 27 | bf-banner | Closing offer; on phones it melts into the footer | 2:3 | Vuffi closing offer | Filled (label check) |
| (none yet) | social-1 to social-6 | Follow along grid above the closing offer | 1:1, 1080 | Vuffi social > each Photo | Filled for now with popup-dog, detail-hand, story-2, pdp-5, band-about and band-pdp. Replace with real posts once the accounts are live |

## Product page

| # | Slot | Where | Size and ratio | Setting | Status |
| --- | --- | --- | --- | --- | --- |
| 28 to 32 | pdp-1 to pdp-5 | Product gallery, between the five built images | 1:1 | Products > Advanced Hip & Joint Support > Media | Filled |
| (built) | vuffi-product-v2-01 to 05 | Product gallery: jar on stone, five actives, how much to give, subscribe, the chew | 1:1, 2048 | Product media | Filled. Built from the real jar cutout by scripts/product_images.py, chews in the real chew brown |
| (prompts) | product photos 1 to 10 | Product gallery, between the built images | 1:1, 2048 | Product media | Prompts in "Product Image Prompts - Vuffi - 2026.11.24.txt", sent with "Real Jar - Vuffi - 2026.11.24.png". Until they arrive the gallery mixes the built images with pdp-1 to 5 carrying the real jar (vuffi-v4-pdp-*) |
| 33 to 37 | detail-jar, detail-open, detail-macro, detail-hand, detail-label | Up close photo row | 1:1 | Vuffi photo row (detail) | Filled (33, 34, 37: label check) |
| (built) | label-jar | The jar, explained, left half on computers, full width on phones | 4:5, 1600 x 2000, background #0B1411 at the edges | Vuffi jar explained > Jar photo | Filled with vuffi-v4-label-jar.jpg: the real jar on a stone plinth, built by scripts/composite.py |
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

Retired slots (no longer on the site): band-run, band-rest, ritual.
