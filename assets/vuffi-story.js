/* Vuffi scroll story: pins a scene while the page scrolls and plays it from the scroll position.
   Order as people scroll: the jar rises, the lid pops off, then chews fly out of the jar one by one
   while each line of text slides up. The finished scene holds for a moment, the bottom blends into
   the next section, and the page moves on.

   Built to stay smooth on phones:
   - every moving layer gets its own transform and opacity written directly (no CSS variables that
     make the whole scene recalculate each frame), so the graphics card moves finished layers;
   - the scene glides toward the scroll position instead of jumping to it, so uneven scroll updates
     (momentum scrolling, low power mode) still look even;
   - only values that changed are written, and nothing runs while the story is off screen. */
(() => {
  if (customElements.get('vuffi-story')) return;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Timeline, as shares of the pinned scroll */
  const JAR_END = 0.18;
  const LID = [0.16, 0.12];
  const OUT_START = 0.26;
  const OUT_END = 0.84;
  const FLIGHT = 0.2;
  const BLEND = [0.82, 0.18];

  /* How quickly the scene catches up with the scroll (seconds to cover most of the gap) */
  const GLIDE = 0.075;

  const set = (el, prop, value) => {
    if (!el) return;
    const key = `_v_${prop}`;
    if (el[key] === value) return;
    el[key] = value;
    el.style[prop] = value;
  };

  class VuffiStory extends HTMLElement {
    connectedCallback() {
      this.section = this.closest('.vuffi-story');
      this.sticky = this.querySelector('.vuffi-story__sticky');
      this.product = this.querySelector('.vuffi-story__product');
      this.jarOpen = this.querySelector('.vuffi-story__jar--open');
      this.jarClosed = this.querySelector('.vuffi-story__jar--closed');
      this.lid = this.querySelector('.vuffi-story__lid');
      this.blend = this.querySelector('.vuffi-story__blend');
      this.lines = Array.from(this.querySelectorAll('[data-line]'));
      this.chews = Array.from(this.querySelectorAll('[data-chew]'));
      this.frame = 0;
      this.current = null;
      this.target = 0;
      this.final = null;

      this.onScroll = () => this.request();
      this.onResize = () => {
        this.measure();
        this.request();
      };

      if (reduced.matches) {
        this.section.classList.add('is-static');
        this.measure();
        this.apply(1);
        return;
      }

      this.section.classList.add('is-live');
      /* Decode every layer of the scene ahead of time, so nothing decodes mid scroll */
      this.querySelectorAll('img').forEach((img) => {
        if (img.decode) img.decode().catch(() => {});
      });
      this.measure();

      /* Capture catches scrolls of any container, which the theme editor and some browsers use instead of the window */
      document.addEventListener('scroll', this.onScroll, { passive: true, capture: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      if ('ResizeObserver' in window) {
        this.resizer = new ResizeObserver(this.onResize);
        this.resizer.observe(this);
      }
      /* Work only while the story is on or near the screen */
      this.near = true;
      if ('IntersectionObserver' in window) {
        this.watch = new IntersectionObserver(
          ([entry]) => {
            this.near = entry.isIntersecting;
            if (this.near) this.request();
          },
          { rootMargin: '50% 0px' }
        );
        this.watch.observe(this);
      }

      this.target = this.progress();
      this.current = this.target;
      this.apply(this.current);
    }

    disconnectedCallback() {
      document.removeEventListener('scroll', this.onScroll, { capture: true });
      window.removeEventListener('resize', this.onResize);
      if (this.resizer) this.resizer.disconnect();
      if (this.watch) this.watch.disconnect();
      if (this.frame) cancelAnimationFrame(this.frame);
    }

    /* Sizes the motion is based on. Uses layout positions, which ignore the moving transforms. */
    measure() {
      if (!this.sticky || !this.product) return;
      const w = this.sticky.clientWidth;
      const h = this.sticky.clientHeight;
      /* The scene is laid out on the small screen height, so the jar sits in the same place
         whether or not a phone's toolbar is showing */
      const small = this.section.querySelector('.vuffi-story__ruler');
      const vh = small ? small.offsetHeight : window.innerHeight;
      const unit = this.product.offsetWidth;
      const restTop = this.product.offsetTop;
      this.stickyH = this.sticky.offsetHeight;
      /* How far the jar starts below its resting place (its top just under the bottom of the screen) */
      this.drop = Math.max(0, vh - restTop - unit * 0.2);
      const mouthX = w / 2;
      const mouthY = restTop + unit * 0.3;
      this.lift = h * 0.1;
      this.drift = h * 0.05;
      this.visible = this.chews.filter((chew) => chew.offsetParent !== null);
      this.visible.forEach((chew, i) => {
        /* Landing spot: the chew is centered on its left and top position */
        const x = chew.offsetLeft;
        const y = chew.offsetTop;
        const spread = ((i % 3) - 1) * unit * 0.1;
        chew.dx = mouthX + spread - x;
        chew.dy = mouthY - y;
        chew.depth = parseFloat(chew.style.getPropertyValue('--depth')) || 1;
        chew.turn = parseFloat(chew.style.getPropertyValue('--r')) || 0;
        chew.fade = 0.6 + chew.depth * 0.36;
      });
    }

    progress() {
      const rect = this.getBoundingClientRect();
      /* The pinned scene is as tall as the large screen height, so the scroll it takes stays the same
         when a phone's toolbar shows or hides */
      const travel = rect.height - (this.stickyH || window.innerHeight);
      return travel > 0 ? clamp(-rect.top / travel) : 1;
    }

    request() {
      if (this.frame || !this.near) return;
      this.last = performance.now();
      this.frame = requestAnimationFrame((now) => this.tick(now));
    }

    tick(now) {
      this.frame = 0;
      this.target = this.progress();
      const dt = Math.min(0.1, Math.max(0.001, (now - this.last) / 1000));
      this.last = now;
      const gap = this.target - this.current;
      /* Big jumps (a link to the next section, the page restoring its place) land at once */
      if (Math.abs(gap) > 0.35 || Math.abs(gap) < 0.0004) {
        this.current = this.target;
      } else {
        this.current += gap * (1 - Math.exp(-dt / GLIDE));
      }
      this.apply(this.current);
      if (this.current !== this.target) {
        this.frame = requestAnimationFrame((t) => this.tick(t));
      }
    }

    apply(p) {
      const jy = 1 - easeOut(clamp(p / JAR_END));
      const lid = easeInOut(clamp((p - LID[0]) / LID[1]));

      /* The jar rises from below and turns upright */
      set(
        this.product,
        'transform',
        `translate3d(-50%, ${(jy * (this.drop || 0)).toFixed(1)}px, 0) rotate(${(jy * -5).toFixed(2)}deg)`
      );

      /* Closed jar until the lid starts to lift, then the jar full of chews.
         The open jar is never fully invisible (0.01), so it stays painted and ready */
      const swap = Math.min(1, lid * 60);
      set(this.jarOpen, 'opacity', Math.max(0.01, swap).toFixed(3));
      set(this.jarClosed, 'opacity', (1 - swap).toFixed(3));

      /* The lid pops up and away in an arc, fading out so it leaves the screen completely */
      set(
        this.lid,
        'transform',
        `translate3d(${(lid * 220).toFixed(1)}%, ${(lid * -120 + lid * lid * 60).toFixed(1)}%, 0) rotate(${(lid * 70).toFixed(1)}deg)`
      );
      set(this.lid, 'opacity', (1 - lid * lid * lid).toFixed(3));

      /* Chews leave the jar one after another across the middle of the scroll.
         Each one pops straight up out of the jar first, then glides to where it lands. */
      const chews = this.visible || [];
      const count = Math.max(1, chews.length);
      const spacing = Math.max(0, OUT_END - OUT_START - FLIGHT) / Math.max(1, count - 1);
      const launch = (i) => OUT_START + i * spacing;
      chews.forEach((chew, i) => {
        const raw = clamp((p - launch(i)) / FLIGHT);
        const across = easeInOut(raw);
        const up = easeOut(raw);
        const arc = Math.sin(Math.PI * Math.min(1, raw * 1.15)) * this.lift;
        const settle = (0.6 - p) * chew.depth * this.drift * across;
        const fx = chew.dx * (1 - across);
        const fy = chew.dy * (1 - up) - arc + settle;
        const turn = chew.turn + (1 - across) * -140 + p * chew.depth * 40;
        const scale = 0.4 + across * 0.6;
        set(
          chew,
          'transform',
          `translate3d(-50%, -50%, 0) translate3d(${fx.toFixed(1)}px, ${fy.toFixed(1)}px, 0) rotate(${turn.toFixed(1)}deg) scale(${scale.toFixed(3)})`
        );
        const shown = raw > 0 ? Math.min(1, raw * 6) : 0;
        set(chew, 'opacity', (Math.max(0.01, shown) * chew.fade).toFixed(3));
      });

      /* Each line slides up as its chew clears the jar */
      const lines = Math.max(1, this.lines.length);
      this.lines.forEach((line, i) => {
        const k = Math.min(count - 1, Math.floor((i * count) / lines));
        const start = launch(k) + FLIGHT * 0.3;
        const r = easeOut(clamp((p - start) / (FLIGHT * 0.7)));
        set(line, 'transform', `translate3d(0, ${((1 - r) * 105).toFixed(1)}%, 0) rotate(${((1 - r) * 4).toFixed(2)}deg)`);
        set(line, 'opacity', r.toFixed(3));
      });

      /* The bottom of the scene melts into the next section as the story finishes */
      set(this.blend, 'opacity', easeInOut(clamp((p - BLEND[0]) / BLEND[1])).toFixed(3));

      const final = p >= OUT_END;
      if (final !== this.final) {
        this.final = final;
        this.section.classList.toggle('is-final', final);
      }
    }
  }

  customElements.define('vuffi-story', VuffiStory);
})();
