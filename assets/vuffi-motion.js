/* Vuffi motion: scroll linked progress (What to expect), the footer logo rising into place and the sale countdowns.
   Text and photos do not animate in; they show as soon as the page loads.
   Everything respects the reduced motion setting. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Scroll linked progress: [data-progress] gets --progress from 0 (its top reaches 85% of the screen)
     to 1 (its bottom reaches 45%). Children with [data-progress-step] get is-reached in turn.
     [data-progress="track"] draws its line from the first [data-progress-dot] center to the last one
     (--line-a and --line-b, in px) and lights each step the moment the fill reaches its circle's center.
     A line running down the screen follows the scroll: its tip sits at 62% of the screen height. */
  const progressItems = new Set();
  let frame = 0;

  const clamp = (n) => Math.min(1, Math.max(0, n));

  function updateProgress(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const steps = el.querySelectorAll('[data-progress-step]');
    const dots = el.dataset.progress === 'track' ? el.querySelectorAll('[data-progress-dot]') : [];

    if (dots.length > 1) {
      const centers = Array.from(dots, (dot) => {
        const d = dot.getBoundingClientRect();
        return { x: d.left + d.width / 2 - r.left, y: d.top + d.height / 2 - r.top };
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      const down = Math.abs(last.y - first.y) > Math.abs(last.x - first.x);
      const a = down ? first.y : first.x;
      const b = down ? last.y : last.x;
      const span = Math.max(1, b - a);
      el.style.setProperty('--line-a', `${a.toFixed(1)}px`);
      el.style.setProperty('--line-b', `${b.toFixed(1)}px`);

      let p;
      if (reduced.matches) p = 1;
      else if (down) p = clamp((vh * 0.62 - (r.top + a)) / span);
      else p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.4));
      el.style.setProperty('--progress', p.toFixed(4));
      steps.forEach((step, i) => {
        const at = ((down ? centers[i].y : centers[i].x) - a) / span;
        step.classList.toggle('is-reached', p > 0 && p >= at - 0.002);
      });
      return;
    }

    const start = vh * 0.85;
    const end = vh * 0.45;
    const p = reduced.matches ? 1 : clamp((start - r.top) / (r.height + start - end));
    el.style.setProperty('--progress', p.toFixed(3));
    steps.forEach((step, i) => {
      const at = steps.length > 1 ? (i / (steps.length - 1)) * 0.96 : 0;
      step.classList.toggle('is-reached', p >= at);
    });
  }

  /* [data-rise] gets is-in once it reaches the screen (the footer logo) */
  const riseItems = new Set();

  function checkRise(el) {
    const r = el.getBoundingClientRect();
    if (reduced.matches || (r.top < window.innerHeight * 0.95 && r.bottom > 0)) {
      el.classList.add('is-in');
      riseItems.delete(el);
    }
  }

  const tick = () => {
    frame = 0;
    progressItems.forEach(updateProgress);
    riseItems.forEach(checkRise);
  };

  const request = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  /* Re-measure when a track changes size (fonts loading, images arriving, the window turning) */
  const resizer = 'ResizeObserver' in window ? new ResizeObserver(() => request()) : null;

  function init(scope = document) {
    scope.querySelectorAll('[data-progress]').forEach((el) => {
      progressItems.add(el);
      updateProgress(el);
      if (resizer) resizer.observe(el);
    });
    scope.querySelectorAll('[data-rise]:not(.is-in)').forEach((el) => {
      riseItems.add(el);
      checkRise(el);
    });
  }

  /* Capture catches scrolls of any container, which some previews use instead of the window */
  document.addEventListener('scroll', request, { passive: true, capture: true });
  window.addEventListener('resize', request, { passive: true });

  /* Countdown: <vuffi-countdown data-end="2026-11-30T23:59:00-05:00"> with [data-unit] children */
  class VuffiCountdown extends HTMLElement {
    connectedCallback() {
      this.end = Date.parse(this.dataset.end || '');
      this.units = {
        d: this.querySelector('[data-unit="d"]'),
        h: this.querySelector('[data-unit="h"]'),
        m: this.querySelector('[data-unit="m"]'),
        s: this.querySelector('[data-unit="s"]'),
      };
      if (Number.isNaN(this.end)) return;
      this.tick();
      this.timer = window.setInterval(() => this.tick(), 1000);
    }

    disconnectedCallback() {
      window.clearInterval(this.timer);
    }

    tick() {
      const left = Math.max(0, this.end - Date.now());
      const parts = {
        d: Math.floor(left / 86400000),
        h: Math.floor((left / 3600000) % 24),
        m: Math.floor((left / 60000) % 60),
        s: Math.floor((left / 1000) % 60),
      };
      Object.entries(parts).forEach(([key, value]) => {
        const el = this.units[key];
        if (!el) return;
        const text = String(value).padStart(2, '0');
        if (el.textContent !== text) el.textContent = text;
      });
      if (left === 0) {
        window.clearInterval(this.timer);
        this.classList.add('is-done');
        const hideTarget = this.closest('[data-hide-when-done]');
        if (hideTarget && !(window.Shopify && window.Shopify.designMode)) hideTarget.hidden = true;
      }
    }
  }

  if (!customElements.get('vuffi-countdown')) customElements.define('vuffi-countdown', VuffiCountdown);

  window.Vuffi = window.Vuffi || {};
  window.Vuffi.init = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
