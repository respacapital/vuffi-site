/* Vuffi scroll story: pins a scene while the page scrolls and drives it with CSS variables.
   --p    overall progress 0 to 1 (floating chews drift with it)
   --r    per line reveal, lines slide up out of a mask one by one
   --jy   jar position, 1 hidden low, 0 risen
   --lid  lid pops off near the end
   --peek a chew peeks out of the jar */
(() => {
  if (customElements.get('vuffi-story')) return;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  class VuffiStory extends HTMLElement {
    connectedCallback() {
      this.section = this.closest('.vuffi-story');
      this.lines = Array.from(this.querySelectorAll('[data-line]'));
      this.onScroll = () => this.request();
      this.frame = 0;

      if (reduced.matches || (window.Shopify && window.Shopify.designMode)) {
        this.section.classList.add('is-static');
        this.apply(1);
        return;
      }

      this.section.classList.add('is-live');
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', this.onScroll, { passive: true });
            window.addEventListener('resize', this.onScroll, { passive: true });
            this.request();
          } else {
            window.removeEventListener('scroll', this.onScroll);
            window.removeEventListener('resize', this.onScroll);
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
      window.removeEventListener('resize', this.onScroll);
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
      const count = Math.max(1, this.lines.length);
      const span = 0.56 / count;
      this.lines.forEach((line, i) => {
        const r = easeOut(clamp((p - 0.03 - i * span) / (span * 1.1)));
        line.style.setProperty('--r', r.toFixed(3));
      });
      style.setProperty('--p', p.toFixed(4));
      style.setProperty('--jy', (1 - easeOut(clamp((p - 0.04) / 0.7))).toFixed(4));
      style.setProperty('--lid', easeInOut(clamp((p - 0.74) / 0.12)).toFixed(4));
      style.setProperty('--peek', easeOut(clamp((p - 0.8) / 0.14)).toFixed(4));
      this.section.classList.toggle('is-final', p >= 0.86);
    }
  }

  customElements.define('vuffi-story', VuffiStory);
})();
