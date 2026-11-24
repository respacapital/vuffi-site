/* Vuffi photo row: previous and next buttons for a sideways scrolling row of photos. */
if (!customElements.get('vuffi-rail')) {
  customElements.define(
    'vuffi-rail',
    class VuffiRail extends HTMLElement {
      connectedCallback() {
        this.track = this.querySelector('[data-rail-track]');
        this.prev = this.querySelector('[data-rail-prev]');
        this.next = this.querySelector('[data-rail-next]');
        if (!this.track) return;
        this.update = this.update.bind(this);
        this.prev?.addEventListener('click', () => this.go(-1));
        this.next?.addEventListener('click', () => this.go(1));
        this.track.addEventListener('scroll', this.update, { passive: true });
        window.addEventListener('resize', this.update);
        this.update();
      }

      disconnectedCallback() {
        window.removeEventListener('resize', this.update);
      }

      go(direction) {
        const item = this.track.querySelector('li');
        const gap = parseFloat(getComputedStyle(this.track).columnGap) || 0;
        const step = item ? item.getBoundingClientRect().width + gap : this.track.clientWidth;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.track.scrollBy({ left: direction * step, behavior: reduce ? 'auto' : 'smooth' });
      }

      update() {
        const max = this.track.scrollWidth - this.track.clientWidth - 2;
        if (this.prev) this.prev.disabled = this.track.scrollLeft <= 2;
        if (this.next) this.next.disabled = this.track.scrollLeft >= max;
      }
    }
  );
}
