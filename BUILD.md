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

## Store setup (Nov 22, 10 pm)
- Product: Advanced Hip & Joint Support, handle hip-and-joint-soft-chews (gid Product/9210731724998). Variants 1 jar $39.99 (VUF-HJ-30), 2 jars $79.98 (VUF-HJ-30x2). Inventory not tracked (dropship). DSers mapping to AliExpress 3256812459223529 still to do.
- Loop selling plan "Subscribe and Save" / "Delivered every month", 15% off, both variants (Loop plan 72492, SellingPlan 15623454918). Loop Free plan.
- Automatic discounts (end 2026-11-30 11:59 PM ET): 25% off first subscription box (recurring cycle limit 1); 10% off one time orders.
- Kaching uninstalled. Themes: vuffi-site/staging 157145202886, vuffi-site/main 157145366726. Preview copies for screenshots: 157145727174, 157146218694 (safe to delete).
- Never run theme_bash or theme_commit on the staging theme: its workspace snapshot goes stale and would overwrite newer files.

## Sections (home order)
Status: todo, built, PR open, merged.
1. vuffi-site-styles (header group, loads CSS and JS): built
2. vuffi-countdown-bar (header group): built
3. Header: Horizon header, logo and menu settings: todo
4. vuffi-hero: built
5. vuffi-ticker: built
6. vuffi-scroll-story: built
7. vuffi-joint (joint diagram, worn to supported): built
8. vuffi-formula (five ingredients): built
9. vuffi-dose (dose by weight tool): built
10. vuffi-compare (Vuffi vs stacking bottles): built
11. vuffi-timeline (what to expect): built
12. vuffi-subscribe (subscribe and save perks): built
13. vuffi-vet (vet recommended): skipped for now; vet claim sits in hero, ticker and chips
14. vuffi-reviews (hidden at launch): todo
15. vuffi-guarantee: built
16. vuffi-faq: built
17. vuffi-cta (closing offer with countdown): built
18. vuffi-footer (footer group): todo
19. vuffi-product (product page buy box, Loop plan, sale prices, sticky bar): built
20. vuffi-popup (10% email): todo
21. Pages: Ingredients, FAQ, Our Story, Contact: todo
