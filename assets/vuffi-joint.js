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

      if (reduced.matches || (window.Shopify && window.Shopify.designMode)) {
        this.setState('supported');
        return;
      }

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.observer.disconnect();
          window.setTimeout(() => {
            if (!this.touched) this.setState('supported');
          }, 1400);
        },
        { threshold: 0.45 }
      );
      this.observer.observe(this.querySelector('.vuffi-joint__visual') || this);
    }

    disconnectedCallback() {
      if (this.observer) this.observer.disconnect();
    }

    setState(state) {
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
