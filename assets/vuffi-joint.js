/* Vuffi joint diagram: switches between the worn and supported images and lights up the number for the open ingredient. */
(() => {
  if (customElements.get('vuffi-joint')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  class VuffiJoint extends HTMLElement {
    connectedCallback() {
      this.switches = Array.from(this.querySelectorAll('[data-set]'));
      this.ings = Array.from(this.querySelectorAll('.vuffi-joint__ing'));
      this.marks = Array.from(this.querySelectorAll('[data-mark]:not(button)'));
      this.touched = false;

      this.switches.forEach((btn) =>
        btn.addEventListener('click', () => {
          this.touched = true;
          this.setState(btn.dataset.set);
        })
      );
      this.ings.forEach((btn) => btn.addEventListener('click', () => this.select(btn)));

      const first = this.ings.find((b) => b.getAttribute('aria-expanded') === 'true') || this.ings[0];
      if (first) this.select(first, true);

      /* Starting on the supported joint: the numbers are there from the start, nothing to wait for */
      if (reduced.matches || this.dataset.start !== 'worn') {
        this.setState(this.dataset.state || 'supported');
        this.classList.remove('is-switched');
        return;
      }

      /* Once the diagram is well on screen, show the change by itself (unless someone already tapped) */
      this.visual = this.querySelector('.vuffi-joint__visual') || this;
      this.onScroll = () => {
        const r = this.visual.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.2) {
          this.stopWatching();
          /* Switch only once the supported photo is ready, so it and its numbers arrive together */
          const ready = this.supportedReady();
          this.timer = window.setTimeout(() => {
            ready.then(() => {
              if (!this.touched) this.setState('supported');
            });
          }, 700);
        }
      };
      document.addEventListener('scroll', this.onScroll, { passive: true, capture: true });
      this.onScroll();
    }

    supportedReady() {
      const img = this.querySelector('.vuffi-joint__layer--supported img');
      if (!img) return Promise.resolve();
      img.loading = 'eager';
      if (img.complete && img.naturalWidth) return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', () => (img.decode ? img.decode().catch(() => {}).then(resolve) : resolve()), { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }

    stopWatching() {
      document.removeEventListener('scroll', this.onScroll, { capture: true });
    }

    disconnectedCallback() {
      this.stopWatching();
      window.clearTimeout(this.timer);
    }

    setState(state) {
      if (this.dataset.state !== state) this.classList.add('is-switched');
      this.dataset.state = state;
      this.switches.forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.set === state)));
    }

    select(button, silent) {
      this.ings.forEach((btn) => {
        const on = btn === button;
        btn.setAttribute('aria-expanded', String(on));
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      this.marks.forEach((mark) => mark.classList.toggle('is-active', mark.dataset.mark === button.dataset.mark));
      if (!silent) {
        this.touched = true;
        this.setState('supported');
      }
    }
  }

  customElements.define('vuffi-joint', VuffiJoint);
})();
