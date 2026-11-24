# Vuffi Site Build Log

Working notes for the Nov 2026 launch build. Newest decisions first in each list.

## Decisions (Robin, Nov 22)
- Product: Advanced Hip & Joint Support, 30 soft chews, pork flavor. $39.99 one time, $33.99 subscribed monthly (Loop, Free plan). Options: subscribe 1 or 2 jars, one time 1 or 2 jars.
- Black Friday is the launch sale: 25% off the first subscription box, 10% off one time ($35.99). Launch 2026-11-26, sale ends 2026-11-30 11:59 PM Eastern.
- 90 day money back guarantee; customer keeps the jar.
- Positioning: for all dogs, to support joints and ease joint pain. Label dose: under 35 lbs 1 chew a day, 36 to 65 lbs 2 a day; over 65 lbs "ask your vet".
- "Vet recommended" goes on the site (Robin's call). Strong function claims OK, no disease claims.
- Slogan "Every step, supported." Fonts: serif headings, sans body (show Robin first).
- 10% email popup. No reviews at launch (section built, hidden). No business address in the footer.
- Pages: Home, Product, Ingredients, FAQ, Our Story, Contact, policies. TPLO landing page after launch.
- Big logo lockup with slogan at the bottom of the footer. Countdowns, reveal animations, pinned scroll story (text stacks, jar opens, chews rise).

## Design version 7 (Nov 24, late)
- Robin: low quality and too tall photos on phones, joint switch should use two identical images, better ingredients page, keep the dark and light theme all the way down, What to expect looked weak, animation broken on computers, bigger jar covering the bottom with the lid fully on, a few more good animations, fewer sections.
- Scroll story: listens to every scroll (capture) instead of an intersection check that stayed quiet on desktop previews; jar much bigger; lid seated on a copy of the jar with the top cleared (vuffi-v3-scroll-jar-base.png), swapped for the full jar as the lid lifts.
- Reveals: an observer plus a scroll check backup, and they now run in the theme editor too.
- Rhythm: dark and light bands alternate on home, product and ingredients; page titles are dark. Home lost the daily ritual and the second photo band.
- What to expect rebuilt: dark green, big time labels, track that fills on scroll.
- Joint switch: scan line wipe; plays once on screen. Prompt sheet for an identical worn and supported pair: "Joint Image Prompts - Vuffi - 2026.11.24.txt".
- Ingredients page: new Vuffi ingredient list section (alternating dark and light rows, photos to the edge); formula there shows the cut chew only.
- Phone photo bands follow the screen width (square, 4:3 or 4:5) and load larger files.

## Design version 6 (Nov 24)
- Robin: remove the small labels on the hero and scroll story and the FIG captions, drop the No. numbers, chews should come out of the jar on scroll with the text, fix the phone hero, spin the 90 day seal again, make the cart discount obvious, no sharp edged photos (run them to the edge of the screen), round buttons everywhere.
- Scroll story rebuilt: jar rises, lid pops, chews pop up out of the jar one by one and glide to where they land; each line slides up as its chew clears. Runs in the theme editor too (Robin reviews there).
- Phone hero photo centered with its overflow split evenly; lower fade starts above the buttons.
- Photos: feature photos full width on phones and off the outer side on computers; page title photos full width; product photos edge to edge on phones; formula photo row nearly edge to edge on computers; diagrams have no box (cut chew diagram is now a see through PNG, vuffi-v3-diagram-chew-cross.png).
- Round: chips, tags, badges, inputs, slider handle, joint numbers, accordion signs, stickers. Cards 16px, small boxes 10px. Horizon corner settings changed to match (settings_data.json, Robin told first).
- Cart: vuffi-cart.js adds a lime savings bar above the total in the drawer and cart page (subscription savings plus automatic discounts; text is a setting in Vuffi site styles), discount names show as lime tags, sale prices green.
- New ingredient prompts sent: "Ingredient Image Prompts - Vuffi - 2026.11.24.txt".

## Photo set 2 (Nov 23, late night)
- Robin is keeping the current logo; no new logo file coming.
- All 16 preview themes deleted from Shopify (store back to 4 themes: vuffi-site staging and main, vuffi-theme staging and live).
- Robin sent all 49 photos from the prompt sheet. 47 placed (the two hero shots match the ones already up, so those stay).
- Files are `vuffi-v2-<slot>` in Shopify Files. Product media is now pdp-1 to pdp-5; the first batch photos were removed from the product but stay in Files.
- Joint numbers and formula name tags measured again for the new diagrams. Lid position in the scroll story refitted to the new jar and lid. Photo rows: why and life show 3:4, detail shows 1:1.
- Eight jar shots have redrawn serif label lettering (listed in PLACEHOLDERS.md). Placed, flagged to Robin to regenerate.
- Photo bands: the shade behind the text now holds further up the photo, and the running dog band sits at 85 so the copy reads over the bright beach.

## Design version 5 (Nov 23, night)
- Robin sent the Grüns scroll section as the model for ours, asked for the font on the jar, round buttons, good animations and a one sheet prompt for ChatGPT.
- Jar lettering matched to Figtree (closest in Shopify's library). Buttons are pills with a sweep fill on hover.
- Scroll story rebuilt like Grüns: centered on every screen, gradient from bottle green to moss (two color settings), jar runs off the bottom, lid pops off in an arc.
- New motion: headlines rise word by word, photos wipe in with a slow zoom, full width photos drift (scroll driven CSS, Chrome, Edge and Safari), joint numbers pop in.
- "Image Prompt Sheet - Vuffi - 2026.11.23.txt": one ChatGPT message, 49 images in priority order.

## Design version 4 (Nov 23, evening)
- Robin: look like Grüns, Bloom, Pawfy and Apple but for dogs, Grüns or Wuffes font, lots of photos, medical and premium, no rounded look, keep every section, natural colors, new prompts for every image.
- Fonts checked on their live sites: Grüns uses Work Sans; Wuffes uses a custom condensed (Gravity Condensed) with Barlow Condensed as backup. Theme now: Work Sans headings and body, Barlow Condensed labels and big numbers, IBM Plex Mono clinical labels.
- Palette from the jar: bottle green #0E3B2C, ink #141A17, leaf #C6E35A (softened jar lime), stone #F3F2EE. Corners 2px and 4px.
- New sections: Vuffi photo band and Vuffi photo row. Page titles can show a wide photo. About 30 new photo slots, all in PLACEHOLDERS.md, prompts in "Image Prompts - Vuffi - 2026.11.23.txt".
- Robin's Nov 23 first batch stays in place until the natural color versions arrive.
- Preview 7 (157152411846) had its settings overwritten during a font test; it is safe to delete like the other previews.

## Design version 3 (Nov 23, late)
- Robin: serif headings back (rounded version saved on branch design/rounded-v2), hero is one still image (prompt in the image prompts file), animation only for toggles, sliders and scroll, new logo coming.
- Removed: drifting particles (hero and story), floating jar, glass cards, page title rise, spinning guarantee ring, countdown roll, pulsing badge dot.
- Robin's first image batch is in Shopify Files (vuffi-*.png): scroll story jar, lid and chews; five ingredient photos; joint worn and supported images (with numbers on the empty circles); cut chew diagram (with ingredient names on the lines); dog joints (Our story); product photos (closed jar, open jar, chews, chew, joint comparison). The jar shots also fill the hero (until the hero image), subscribe and closing offer slots.
- The open jar sits under the lid photo, so the lid hides the chews until it pops.
- The temporary branch media-upload on GitHub only held these images for the upload; it can be deleted.

## Design version 2 (Nov 23)
- Robin: fonts should suit the rounded logo (serif version saved on branch design/serif-v1), hero = floating jar on dark gradient with particles, scroll story like Grüns, quieter footer logo, mobile fixes.
- Headings Nunito Black 900; hero rebuilt; story rebuilt (lines slide up, jar rises, lid pops, chew peeks, floating chews); transparent header on home.

## Store setup (Nov 22, 10 pm)
- Product: Advanced Hip & Joint Support, handle hip-and-joint-soft-chews (gid Product/9210731724998). Variants 1 jar $39.99 (VUF-HJ-30), 2 jars $79.98 (VUF-HJ-30x2). Inventory not tracked (dropship). DSers mapping to AliExpress 3256812459223529 still to do.
- Loop selling plan "Subscribe and Save" / "Delivered every month", 15% off, both variants (Loop plan 72492, SellingPlan 15623454918). Loop Free plan.
- Automatic discounts (end 2026-11-30 11:59 PM ET): 25% off first subscription box (recurring cycle limit 1); 10% off one time orders.
- Kaching uninstalled. Themes: vuffi-site/staging 157145202886, vuffi-site/main 157145366726. Preview copies for screenshots (theme_screenshot snapshots a theme the first time it is captured, so make a fresh copy with themeDuplicate to see new changes): 157145727174, 157146218694, 157146579142, 157146644678, 157146742982, 157151133894 (all safe to delete).
- Never run theme_bash or theme_commit on the staging theme: its workspace snapshot goes stale and would overwrite newer files.

## Sections (home order)
Status: todo, built, PR open, merged.
1. vuffi-site-styles (header group, loads CSS and JS): PR #1 open
2. vuffi-countdown-bar (header group): PR #1 open
3. Header: Horizon header with the Vuffi logo, centered menu, no search or country picker: PR #1 open
4. vuffi-hero: PR #1 open
5. vuffi-ticker: PR #1 open
6. vuffi-scroll-story: PR #1 open
7. vuffi-joint (joint diagram, worn to supported): PR #1 open
8. vuffi-formula (five ingredients): PR #1 open
9. vuffi-dose (dose by weight tool): PR #1 open
10. vuffi-compare (Vuffi vs stacking bottles): PR #1 open
11. vuffi-timeline (what to expect): PR #1 open
12. vuffi-subscribe (subscribe and save perks): PR #1 open
13. vuffi-vet (vet recommended): skipped for now; vet claim sits in hero, ticker and chips
14. vuffi-reviews (hidden at launch): todo
15. vuffi-guarantee: PR #1 open
16. vuffi-faq: PR #1 open
17. vuffi-cta (closing offer with countdown): PR #1 open
18. vuffi-footer (footer group): PR #1 open
19. vuffi-product (product page buy box, Loop plan, sale prices, sticky bar): PR #1 open
20. vuffi-popup (10% email, WELCOME10): PR #1 open
21. Pages: Ingredients, FAQ, Our story (about), Contact, policy pages: PR #1 open

## Design version 8 (Nov 24, late)
- Removed every entrance animation on text and photos (headline word rise, photo wipe and zoom, drift, count up, hover lifts). Kept the scroll story, joint switch, timeline fill, ingredient row, seal, ticker and the footer logo rise.
- Scroll story: jar bigger on phones (fills the bottom half), lid flies off and fades out on every screen size.
- How it works (vuffi-joint): ink background with hero light, diagram on a rounded card (card color setting, white for today's images), switch floating on the card, plain crossfade, numbers centered on the circles, ingredient list as cards.
- Formula: centered intro and diagram, green name pills, endless row of green ingredient cards (speed setting).
- Photo rows (vuffi-gallery): centered intro, no arrows, green card captions with bigger text, one row on computers. vuffi-rail.js deleted.
- FAQ: centered column of white question cards, contact line and button underneath.
- Subscribe: one rounded panel, photo fills the left half on computers, perks in two columns, prices as rows.
- Timeline: centered intro, line measured from the first circle center to the last, circles centered over each card on computers, hero light.
- Comparison: Shop Vuffi button is a lime pill that fits the dark column on phones.
- Templates: removed band_run and dose (home) and dose (product); joint set to ink on home, product and ingredients; last eyebrows cleared (home, product, about).
- Preview copies for screenshots: 157195403462, 157195501766 (safe to delete).
