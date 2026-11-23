/* Vuffi scroll story: pins a scene while the page scrolls and drives it with --p (0 to 1).
   Lines stack in order, then the lid lifts (--lid) and the chews rise (--c). */
(() => {
  if (customElements.get('vuffi-story')) return;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  class VuffiStory extends HTMLElement {
    connectedCallback() {
      this.section = this.closest('.vuffi-story');
      this.lines = Array.from(this.querySelectorAll('.vuffi-story__line'));
      this.onScroll = () => this.request();
      this.frame = 0;

      if (reduced.matches || (window.Shopify && window.Shopify.designMode)) {
        this.renderStatic();
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
        { rootMargin: '20% 0px 20% 0px' }
      );
      this.observer.observe(this);
      this.update();
    }

    disconnectedCallback() {
      if (this.observer) this.observer.disconnect();
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    }

    renderStatic() {
      this.section.classList.add('is-static');
      this.section.classList.remove('is-live');
      this.apply(1);
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
      const p = travel > 0 ? clamp(-rect.top / travel) : 1;
      this.apply(p);
    }

    apply(p) {
      const count = this.lines.length;
      const linesEnd = 0.56;
      const style = this.section.style;
      style.setProperty('--p', p.toFixed(4));
      style.setProperty('--in', easeOut(clamp(p / 0.12)).toFixed(4));
      style.setProperty('--lid', easeInOut(clamp((p - 0.6) / 0.14)).toFixed(4));
      style.setProperty('--c', easeOut(clamp((p - 0.68) / 0.26)).toFixed(4));

      let current = -1;
      this.lines.forEach((line, i) => {
        const on = p >= 0.04 + (i * (linesEnd - 0.04)) / Math.max(1, count);
        line.classList.toggle('is-on', on);
        if (on) current = i;
      });
      this.lines.forEach((line, i) => line.classList.toggle('is-current', i === current));
      this.section.classList.toggle('is-final', p >= 0.62);
    }
  }

  customElements.define('vuffi-story', VuffiStory);
})();
