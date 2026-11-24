/* Vuffi product gallery: one photo at a time. Swipe on phones, arrows on computers,
   and a row of thumbnails to pick any photo. The thumbnail of the photo on show is marked. */
(() => {
  if (customElements.get('vuffi-gallery')) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  class VuffiGallery extends HTMLElement {
    connectedCallback() {
      this.rail = this.querySelector('.vuffi-pdp__media');
      this.thumbs = Array.from(this.querySelectorAll('[data-thumb]'));
      this.thumbList = this.querySelector('.vuffi-pdp__thumbs');
      this.prev = this.querySelector('[data-prev]');
      this.next = this.querySelector('[data-next]');
      if (!this.rail || this.thumbs.length < 2) return;
      this.count = this.thumbs.length;
      this.index = 0;
      this.frame = 0;

      this.thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => this.go(i)));
      if (this.prev) this.prev.addEventListener('click', () => this.go(this.index - 1));
      if (this.next) this.next.addEventListener('click', () => this.go(this.index + 1));
      this.rail.addEventListener(
        'scroll',
        () => {
          if (this.frame) return;
          this.frame = requestAnimationFrame(() => {
            this.frame = 0;
            const i = Math.round(this.rail.scrollLeft / Math.max(1, this.rail.clientWidth));
            if (i !== this.index) this.mark(i);
          });
        },
        { passive: true }
      );
      this.rail.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') this.go(this.index + 1);
        if (event.key === 'ArrowLeft') this.go(this.index - 1);
      });
      this.mark(0);
    }

    go(i) {
      const target = Math.max(0, Math.min(this.count - 1, i));
      this.rail.scrollTo({ left: target * this.rail.clientWidth, behavior: reduced.matches ? 'auto' : 'smooth' });
      this.mark(target);
    }

    mark(i) {
      this.index = i;
      this.thumbs.forEach((thumb, k) => {
        if (k === i) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      });
      if (this.prev) this.prev.disabled = i === 0;
      if (this.next) this.next.disabled = i === this.count - 1;
      /* Keep the marked thumbnail in view without moving the page */
      const thumb = this.thumbs[i];
      const list = this.thumbList;
      if (thumb && list) {
        const item = thumb.parentElement;
        const left = item.offsetLeft - list.offsetLeft;
        if (left < list.scrollLeft || left + item.offsetWidth > list.scrollLeft + list.clientWidth) {
          list.scrollTo({ left: Math.max(0, left - list.clientWidth / 2 + item.offsetWidth / 2), behavior: 'smooth' });
        }
      }
    }
  }

  customElements.define('vuffi-gallery', VuffiGallery);
})();
