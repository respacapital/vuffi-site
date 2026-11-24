/* Vuffi scroll story: pins a scene while the page scrolls and drives it with CSS variables.
   Order as people scroll: the jar rises, the lid pops off, then chews fly out of the jar one by one
   while each line of text slides up. The finished scene holds for a moment before the page moves on.
   --p    overall progress 0 to 1
   --jy   jar position, 1 low, 0 risen
   --lid  lid pops off
   --r    per line reveal
   --t, --fx, --fy, --o  per chew: flight progress, offset from its landing spot, opacity */
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

  class VuffiStory extends HTMLElement {
    connectedCallback() {
      this.section = this.closest('.vuffi-story');
      this.sticky = this.querySelector('.vuffi-story__sticky');
      this.product = this.querySelector('.vuffi-story__product');
      this.lines = Array.from(this.querySelectorAll('[data-line]'));
      this.chews = Array.from(this.querySelectorAll('[data-chew]'));
      this.onScroll = () => this.request();
      this.onResize = () => {
        this.measure();
        this.request();
      };
      this.frame = 0;

      if (reduced.matches) {
        this.section.classList.add('is-static');
        this.measure();
        this.apply(1);
        return;
      }

      this.section.classList.add('is-live');
      this.measure();
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', this.onScroll, { passive: true });
            window.addEventListener('resize', this.onResize, { passive: true });
            this.onResize();
          } else {
            window.removeEventListener('scroll', this.onScroll);
            window.removeEventListener('resize', this.onResize);
          }
        },
        { rootMargin: '25% 0px 25% 0px' }
      );
      this.observer.observe(this);
      this.update();
    }

    disconnectedCallback() {
      if (this.observer) this.observer.disconnect();
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    }

    /* Where the jar mouth is, and how far each chew travels from it to its landing spot.
       Uses layout positions, which ignore the moving transforms. */
    measure() {
      if (!this.sticky || !this.product) return;
      const w = this.sticky.clientWidth;
      const h = this.sticky.clientHeight;
      const unit = this.product.offsetWidth;
      const mouthX = w / 2;
      const mouthY = this.product.offsetTop + unit * 0.24;
      this.lift = h * 0.16;
      this.drift = h * 0.05;
      this.visible = this.chews.filter((chew) => chew.offsetParent !== null);
      this.visible.forEach((chew, i) => {
        const x = (parseFloat(chew.style.getPropertyValue('--x')) / 100) * w;
        const y = (parseFloat(chew.style.getPropertyValue('--y')) / 100) * h;
        const spread = ((i % 3) - 1) * unit * 0.12;
        chew.dx = mouthX + spread - x;
        chew.dy = mouthY - y;
        chew.depth = parseFloat(chew.style.getPropertyValue('--depth')) || 1;
      });
      this.chews.forEach((chew) => {
        if (!this.visible.includes(chew)) chew.dx = chew.dy = 0;
      });
    }

    request() {
      if (this.frame) return;
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        this.update();
      });
    }

    update() {
      const rect = this.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      this.apply(travel > 0 ? clamp(-rect.top / travel) : 1);
    }

    apply(p) {
      const style = this.section.style;
      style.setProperty('--p', p.toFixed(4));
      style.setProperty('--jy', (1 - easeOut(clamp(p / JAR_END))).toFixed(4));
      style.setProperty('--lid', easeInOut(clamp((p - LID[0]) / LID[1])).toFixed(4));

      /* Chews leave the jar one after another across the middle of the scroll */
      const chews = this.visible || [];
      const count = Math.max(1, chews.length);
      const gap = Math.max(0, OUT_END - OUT_START - FLIGHT) / Math.max(1, count - 1);
      chews.forEach((chew, i) => {
        const raw = clamp((p - OUT_START - i * gap) / FLIGHT);
        const t = easeInOut(raw);
        const arc = Math.sin(Math.PI * t) * this.lift;
        const settle = (0.6 - p) * chew.depth * this.drift * t;
        const fx = chew.dx * (1 - t);
        const fy = chew.dy * (1 - t) - arc + settle;
        chew.style.setProperty('--t', t.toFixed(4));
        chew.style.setProperty('--fx', `${fx.toFixed(1)}px`);
        chew.style.setProperty('--fy', `${fy.toFixed(1)}px`);
        chew.style.setProperty('--o', raw > 0 ? Math.min(1, raw * 8).toFixed(3) : '0');
      });

      /* Each line slides up as its chews come out */
      const lines = Math.max(1, this.lines.length);
      const span = (OUT_END - OUT_START) / lines;
      this.lines.forEach((line, i) => {
        const r = easeOut(clamp((p - OUT_START - i * span + 0.04) / (span * 0.9)));
        line.style.setProperty('--r', r.toFixed(3));
      });

      this.section.classList.toggle('is-final', p >= OUT_END);
    }
  }

  customElements.define('vuffi-story', VuffiStory);
})();
