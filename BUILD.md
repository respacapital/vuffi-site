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

## Design version 9 and product switch (Nov 24, night)
- Product: the DSers import (gid Product/9215799722182) is now the live product, handle hip-and-joint-soft-chews, title, description, SEO, Size option (1 jar, 2 jars), prices $39.99 and $79.98, published to Online Store and Shop. DSers SKUs untouched so orders route to the supplier. The old hand made product (9210731724998) is archived as hip-and-joint-soft-chews-original. Both Black Friday product discounts and the Shop menu links point at the new product. Shopify had moved two theme links (countdown bar, subscribe product) to the old product when its handle changed; both fixed.
- Loop: the new product is not in the Loop plan yet (only Loop can attach products to its plan). Until Robin adds it in Loop, the buy box shows one time only and the subscribe section shows the 15% fallback price.
- Product media: five gallery images built from the real jar cutout (scripts/product_images.py in the work folder: jar on stone, five actives, how much to give, subscribe and save, the chew) mixed with pdp-1 to 5. Supplier images removed from the product (still in Files).
- Judge.me: app embed on (settings_data blocks.judgeme_core), star rating under the product name, new vuffi-reviews section on the product page, @app blocks allowed in the buy box and the reviews section.
- Look: square corners everywhere (radius tokens 0), flush photo rows with words over a green shade, hairline lists (joint, FAQ, perks, prices, ingredient row), split screen subscribe, timeline without boxes, photo page titles, ink header on pages, CTA photo melts into the footer on phones, content width 1440 with Horizon page margins (theme setting page width now narrow).
- Pages: no repeated sections. Product: main, detail, band_pdp, reviews. Ingredients: hero, list, band_ing (with Shop button). About: hero, why, band_about (with Shop button), prevent. FAQ: hero, faq. Contact: hero, contact. Home FAQ trimmed to four questions with a link to the full FAQ.
- Image prompts: one new sheet, "Image Prompts - Vuffi - 2026.11.24.txt", 46 images with a packaging rule, plus Jar Reference 1 to 3.
- Preview copies for screenshots: 157195403462, 157195501766, 157196288198 (safe to delete).

## Design version 10 (Nov 24, 3 am)
- Natural light on every dark band (window light with leaf shadows, film grain), never animated.
- Buy box options and the comparison column are round again (--vuffi-radius-ui 18px, comparison 24px).
- Product page: new sections vuffi-label (The jar, explained: numbered points on the real jar, ink with light) and vuffi-steps (How to give it). Order: main, detail, label, steps, band_pdp, reviews.
- Home: new vuffi-social section (Follow along) between the FAQ and the closing offer. Links and handle are settings; waiting on Robin's links.
- Cart: payment icons and a trust line under the checkout button in the drawer and on the cart page (template in vuffi-site-styles, placed by vuffi-cart.js, tested with jsdom).
- Ingredients page: the small print now sits inside the last row, so there is no white strip before the photo band.
- Checkout (Settings > Checkout > Customize, saved in the admin): ink Vuffi logo, palette green #0E3B2C for accents and buttons, Figtree headings and body. The old sage logo and Fredoka headings are gone.
- Preview copies for screenshots: 157195403462, 157195501766, 157196288198, 157196484806, 157197205702 (safe to delete).

## Design version 11 (Nov 24, morning)
- Light: the window light texture is gone (assets/vuffi-light.jpg deleted). Dark bands are back to the faint warm beam from the top corner. Removed from the scroll story and the footer.
- Closing offer: the photo has no bottom padding and fades into the footer on every screen size; on computers it fills the right half from the top of the section to the footer.
- How to give it (vuffi-steps, renamed "Vuffi how to give it"): a dose chart by weight as a real table (your dog, each day with chew icons, how long one jar lasts, what to order for a full month), a row for dogs over 65 lbs that sends them to their vet, four habits (with a meal, every day, judge it at 90 days, ask your vet first if) and small print. Blocks: Dose row, Habit.
- The jar, explained (vuffi-label): one large photo of the real jar on a stone plinth that melts into the ink background, the five label points as a hairline list beside it. Numbered markers removed.
- Photos: every photo with the jar now shows the real jar (scripts/swap.py, v4 set) and every chew is the real chew brown. Hero rebuilt from the new hero photo with the real jar. New photos from the Nov 24 set used where they were good: why taste, why vet, five ingredients, five life photos, band pdp, page story, band about, story 2, closing offer. Files are vuffi-v4-<slot> (hero desktop is vuffi-v5).
- Product gallery: ten images, five built ones (rebuilt with the real chew color, vuffi-product-v2-*) alternating with five photos with the real jar. Old gallery images detached from the product, still in Files.
- Product title is "Vuffi Advanced Hip & Joint Support".
- Image prompts round 2: "Image Prompts Round 2 - Vuffi - 2026.11.24.txt" (knee pair and the open jar from above), sent with "Real Jar - Vuffi - 2026.11.24.png".

## Design version 12 (Nov 24, 3:30 am)
- Photos: Robin preferred the old photos, so every slot on the site is back on the vuffi-v2 set (hero, rows, scroll story, pages). The v4 set (real jar put into each photo, chews recolored) stays in Files and in the work folder (v4/) if wanted later. Kept: the jar explained photo (vuffi-v4-label-jar.jpg) and the product gallery with the real jar.
- Product photos: "Product Image Prompts - Vuffi - 2026.11.24.txt" (ten gallery photos of the actual jar and chews).
- How to give it is now the weight slider again (vuffi-dose, rebuilt in the current look): drag to your dog's weight, the answer rows show chews a day (with chew icons), how long one jar lasts and what to order for a month; over 65 lbs it says to ask your vet. Three habits on hairlines under the headline. vuffi-steps (the table) is no longer on any page.
- Product gallery: one photo at a time with thumbnails under it (tap to pick a photo), arrows on computers, swipe on phones, counter on phones (vuffi-gallery.js).
- Scroll story: smoother. The chews' depth blur no longer changes every frame, the open jar and chews stay painted at 1 percent opacity so nothing appears with a hitch, the jar layers have their own layer, and every image in the scene is decoded ahead of time.

## Launch (Nov 24, 4 am)
- PR #1 merged into main at Robin's request; vuffi-site/main (157145366726) published as the live theme; store taken out of private mode. The old toothbrush theme (vuffi-theme/main) stays in the library, unpublished.
- Subscriptions: the DSers product (both variants) added to Loop's plan "Vuffi monthly, 15% off" (Loop > Acquire > Selling plans). Tested on the live cart: subscription line on the monthly plan, 25% off everything applied, totals match the page to the cent.
- Black Friday: Robin kept "25% off everything" (25.02% so $39.99 lands on $29.99; Shopify rounds discounts down to the cent). The bar, hero badge, buy box (25% on both, exact 25.02), sticker, closing offer and FAQ all say 25% off everything. The other two Black Friday discounts stay on but never stack with it (no product discount combining).
- Product gallery: Robin's ten new product photos (vuffi-photo-01 to 10) with the built dose, actives and subscribe cards. Variant images: 1 jar = main photo, 2 jars = two jars photo.
- Knee pair and ingredient photos: the Nov 24 set (knee markers measured on the new supported image, card color #091310).
- Shop app: brand assets set in Settings > General > Brand (ink logo, square paw icon, colors #0E3B2C and #C6E35A, cover vuffi-brand-cover.jpg, slogan, short description). Shop eligibility rechecks within 48 hours now that the store is public.
- Redo pack for the old photos: "Photos To Redo - Vuffi - 2026.11.24.zip" (22 photos, references, prompts).
- Left for Robin: home page title and meta description in Online Store > Preferences (still the toothbrush text; the field sits in a frame the agent browser cannot type into), social links, DSers automatic price updates, the empty "Dental Plan" collection.

## Launch round 2 (Nov 24, 5 am)
- Robin's redone photos (v5): detail-jar, detail-hand, detail-label, scroll-jar-open (and the closed jar made from it), subscribe-jar, bf-banner, why-guarantee.
- Black Friday box in Subscribe and save is round; the 25% sticker on the product page and in Subscribe and save is now an ink seal with "25%" in lime and "off everything" in small caps.
- Knee photos fade into the section at the edges (radial mask, no card behind them).
- The jar, explained: Robin's dark jar photo (vuffi-photo-07-dark), the section takes the photo's own shape, fades it into the background, and lists the five label points beside it on computers and under it on phones.
- How to give it: the weight reading and the title are centered, the answer sits on a round card, the tips sit three across on computers.
- Contact page: photo behind the title (band-rest, the spaniel asleep on a sofa).
- Home page title "Vuffi | Hip and Joint Soft Chews for Dogs" and the new meta description saved in Online Store > Preferences (the toothbrush text is gone).
- DSers: no pricing template exists and Automatic Price Update is set to Do Nothing, so DSers never changes the store's prices.
- The nine preview copies (vuffi check 1124a to f) deleted from the theme library.

## Launch round 3 (Nov 24, 5 am)
- Policies: Refund, Shipping, Subscription (cancellation) and Terms in Settings > Policies now match the site's own policy pages (90 day guarantee, keep the jar, monthly plan, 3 to 4 weeks delivery). The Terms page and policy also carry the chew safety lines (dogs over 12 weeks, shellfish, vet first) and 90 days in place of 1 year. Approved by Robin. Set in the admin because the store connection has no legal policies permission.
- Shopify policy pages (/policies/...): styled in vuffi-base.css like the Vuffi policy pages: dark title band in the dark header color with the hero light, text lined up with the logo, 32px headings. The header turns dark on them too.
- Buy box: the picked jar option is bottle green with a soft gradient, white words and a lime check. The three chips are now a stone strip of three proof points, each with a green seal, a title and a short line (new "Short line under the title" setting on each Chip block).
- Email popup: the photo no longer covers the headline on computers (it fills its column instead of sizing it); rounded corners; on phones a short photo strip sits above the form.
- Judge.me: the review widget uses Judge.me's current code (data-auto-install false plus the review data script), the star badge uses Judge.me's badge code, and both stay off the store until the product has a review ("Hide until the first review" setting on Vuffi reviews; the editor still shows the section with a note).
- Socials: on hold, Follow along section kept as is.

## Launch round 4 (Nov 24, 5:30 am)
- Scroll story rebuilt for phones: the script moves each layer (jar, lid, chews, lines) with transform and opacity only, glides toward the scroll position so momentum scrolling stays even, writes only changed values and sleeps off screen. The pinned scene fills the large screen height and the motion is measured on the small one, so a phone toolbar sliding away no longer leaves a band or moves the jar. Chew blur and shadows only on computers; the jar shadow only from tablets up. Images are sized for phones and load after the photos on screen.
- The story's bottom melts into the stone of "One chew. Every joint." as it finishes (new "Blend the bottom into this color" setting, set to #F3F2EE).
- Ingredient card row: rebuilt as vuffi-marquee.js. It drifts, can be swiped or dragged, carries on after a flick and resumes by itself; page scrolling over it works as usual. The old CSS animation froze after a tap on phones (sticky hover).
- Joint switch: the numbers ride on the supported photo and arrive with it (no one by one delay); the switch waits until that photo is loaded and decoded.
- Photos: swipe rows (Why Vuffi, Life with Vuffi, ingredient cards, joint pair) load every photo as the row comes within a screen of view ([data-preload] in vuffi-motion.js); the product gallery loads the photos either side of the one on show.
- Product thumbnails: the picked one has a bottle green ring drawn inside its edge, so the row no longer clips it.
- Start my plan / Add to cart opens the cart drawer as soon as the item is in (cart page when there is no drawer).
- Sale countdown in the cart drawer and on the cart page, above the savings line (Vuffi site styles > Cart countdown; hides itself when the sale ends).
- Header menu font set to Heading (header group, header menu block).

## Launch round 5 (Nov 24, 5:30 am)
- Joint: opens on the supported joint with its numbers in place from the first paint (new "Joint shown first" setting, Supported by default). The worn joint is one tap away; choosing Worn brings back the automatic switch.
- Ingredient row: never stops (no pause on hover, tap or focus); a swipe nudges it and it drifts on straight away. A tap or click on any card opens that ingredient bigger in a window (larger photo, tagline, name, text; vuffi-formula.js). A small + in the photo corner hints at it.
- The jar, explained on phones and tablets: the photo starts at the top of the section and fades in and out, so there is no hard edge across the light; headline and intro centered under it.
- Phones: headlines, intro text, countdowns and buttons centered on every page (page titles, closing offer, Subscribe and save, photo bands, Our story text, ingredient rows with their checklist as one centered block, contact). Long legal text, list rows and the buy box stay left aligned. Computers unchanged.

## No shipping times (Nov 24, 9 am)
- Robin's call: no delivery times anywhere on the site. Removed "Most orders arrive within 3 to 4 weeks" from the Shipping page and the store shipping policy (now a Tracking section), and cleared the old "Ships within 3 business days, then 7 to 15 business days to arrive" description from both checkout shipping rates. The theme itself only points to the shipping policy. The old toothbrush FAQ metaobjects still mention times but are not shown anywhere on the site.
