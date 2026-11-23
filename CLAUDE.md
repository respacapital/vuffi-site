# Vuffi Site

Shopify theme for getvuffi.com. Vuffi is a premium dog supplement brand under Respa Capital LLC. The launch product is Advanced Hip & Joint Support soft chews (30 count jar), sold one time or as a monthly subscription through Loop. Robin reviews and approves; Claude does all the building. Robin is not a developer, so explain changes in plain language.

This repo replaced respacapital/vuffi-theme (the toothbrush site) on Nov 22, 2026. The old repo stays as an archive.

## Stack
Shopify Horizon 4.5.0. Liquid, vanilla JS, plain CSS.
No React, Tailwind, jQuery, npm packages or CDN libraries. No build step.

## Branches
- `staging` syncs to the unpublished Shopify theme "Vuffi Site Staging". All work happens here.
- `main` syncs to the theme that goes live. Never push to `main`. Code reaches it only through a pull request Robin merges.
- Shopify commits theme editor changes back to the connected branch. Pull before starting work.

## Where things live
Code in this repo. Copy, images and product data in Shopify. Brand rules in `DESIGN.md` (source of truth for color, type, shape, motion and voice; change it before changing the theme). Photo slots in `PLACEHOLDERS.md`. Build progress in `BUILD.md`. Master files in the Vuffi folder on Google Drive.

## Horizon rules
- Never edit Horizon core files. Custom work goes in new files prefixed `vuffi-` in `sections/`, `blocks/`, `snippets/`, `assets/`.
- Colors come from Horizon's theme color palette and each section's background color setting with the `contrast-override` snippet. Fonts come from Horizon's typography settings. Do not build a second palette or font system.
- Site wide Vuffi styles and scripts load once from the `vuffi-site-styles` section in the header group.

## Conventions
- `{% render %}` only. `{% include %}` is banned.
- Every section and block has a `{% schema %}` with settings and a `presets` array.
- Every block wrapper carries `{{ block.shopify_attributes }}`.
- Images: `image_url` with an explicit width, then `image_tag` with `sizes`. Lazy load everything except the first image on screen.
- Anything Robin might change (copy, images, toggles, counts, dates) is a setting. Interface text in vuffi sections is a setting too, so Horizon's locale files stay untouched.
- Repeatable content (FAQ entries, ingredients, reviews, dose chart) lives in blocks, metafields or metaobjects, not long lists of numbered section settings.
- Mobile first. Breakpoints 750px and 990px. Check every change at 390px wide and on desktop before reporting it done.
- Semantic HTML: real headings, buttons and labels. Every animation stops for people who ask their device for less motion.

## Images
Product images come from the supplier and Robin's own content, uploaded to Shopify Files. Never hotlink a supplier or CDN image. Never put the Vuffi logo on the jar. Never use AI dogs as customers, reviews or before and after photos. Every missing asset renders through `snippets/vuffi-placeholder.liquid` as a labeled box at the right aspect ratio, and every slot is logged in `PLACEHOLDERS.md`.

## Brand voice
Established, premium brand. No emojis. No hyphens or dashes in compound words. Strong function claims are fine (supports joints, eases stiffness, helps mobility). No disease claims (treats, cures, prevents arthritis or dysplasia). No delivery time promises on the site; shipping times live in the shipping policy and must match what the supplier actually delivers. Keep the supplement disclaimer in the footer.

## Guardrails
- One section per pull request (staging into main). Show the schema in plain language before moving on.
- Never edit `templates/*.json`, `sections/*-group.json` or `config/settings_data.json` without saying so first.
- Never invent a Liquid filter or object. Check shopify.dev; if still unsure, stop and ask.
- Do not rewrite a whole file for a small change. Check `git diff --stat` before committing.
- Run `shopify theme check` after every change. Zero errors anywhere, zero warnings in `vuffi-` files.
- Performance budget: Lighthouse mobile 85+, LCP under 2.5s, CLS under 0.1.
