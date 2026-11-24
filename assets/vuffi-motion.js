/* Vuffi motion: headline and photo reveals on scroll, count up numbers and sale countdowns.
   Everything respects the reduced motion setting and the theme editor. */
(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isDesign = () => Boolean(window.Shopify && window.Shopify.designMode);

  if (isDesign()) root.classList.add('vuffi-design');

  /* Reveal */
  const revealObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add('is-in');
              revealObserver.unobserve(entry.target);
            });
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
        )
      : null;

  function initReveal(scope) {
    scope.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
      if (!revealObserver || reduced.matches || isDesign()) {
        el.classList.add('is-in');
      } else {
        revealObserver.observe(el);
      }
    });
  }

  const still = () => reduced.matches || isDesign() || root.classList.contains('vuffi-still') || !revealObserver;

  /* Headlines: wrap each word so it can rise out of its own mask. Screen readers get the full line from aria-label. */
  function splitWords(el) {
    if (el.dataset.split) return;
    const label = el.textContent.replace(/\s+/g, ' ').trim();
    if (!label) return;
    let n = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(' '));
              return;
            }
            const outer = document.createElement('span');
            outer.className = 'vuffi-w';
            outer.setAttribute('aria-hidden', 'true');
            const inner = document.createElement('span');
            inner.className = 'vuffi-w__i';
            inner.style.setProperty('--w', n++);
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(el);
    el.setAttribute('aria-label', label);
    el.dataset.split = 'done';
  }

  function initHeadlines(scope) {
    if (still()) return;
    scope
      .querySelectorAll('.vuffi-section .vuffi-h2, .vuffi-section .vuffi-display')
      .forEach((el) => {
        if (el.dataset.split || el.closest('.vuffi-story, .vuffi-pop, .vuffi-pdp')) return;
        splitWords(el);
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', '');
          revealObserver.observe(el);
        }
      });
  }

  /* Photos: wipe in once they reach the screen. The first photo on screen and product photos stay as they are. */
  function initMedia(scope) {
    scope.querySelectorAll('.vuffi-section .vuffi-media').forEach((media) => {
      if (media.dataset.mediaReveal) return;
      if (media.closest('.vuffi-hero, .vuffi-story, .vuffi-pdp, .vuffi-pop, .vuffi-joint__layer')) return;
      if (media.querySelector('img[fetchpriority="high"]')) return;
      media.dataset.mediaReveal = 'true';
      const item = media.closest('li');
      if (item && item.parentElement) {
        media.style.setProperty('--d', Array.from(item.parentElement.children).indexOf(item) % 4);
      }
      if (still()) {
        media.classList.add('is-in');
      } else {
        revealObserver.observe(media);
      }
    });
  }

  /* Count up: <span data-count-to="90" data-count-decimals="0">90</span> */
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);

  function runCount(el) {
    const target = parseFloat(el.dataset.countTo);
    if (Number.isNaN(target)) return;
    const decimals = parseInt(el.dataset.countDecimals || '0', 10);
    const duration = 1600;
    const start = performance.now();
    const format = (n) =>
      n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = format(target * easeOut(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const countObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              runCount(entry.target);
              countObserver.unobserve(entry.target);
            });
          },
          { threshold: 0.6 }
        )
      : null;

  function initCounts(scope) {
    scope.querySelectorAll('[data-count-to]').forEach((el) => {
      if (el.dataset.countReady) return;
      el.dataset.countReady = 'true';
      if (!countObserver || reduced.matches || isDesign()) return;
      el.textContent = '0';
      countObserver.observe(el);
    });
  }

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
        if (el.textContent === text) return;
        el.textContent = text;
        if (!reduced.matches) {
          el.classList.remove('is-tick');
          void el.offsetWidth;
          el.classList.add('is-tick');
        }
      });
      if (left === 0) {
        window.clearInterval(this.timer);
        this.classList.add('is-done');
        const hideTarget = this.closest('[data-hide-when-done]');
        if (hideTarget && !isDesign()) hideTarget.hidden = true;
      }
    }
  }

  if (!customElements.get('vuffi-countdown')) customElements.define('vuffi-countdown', VuffiCountdown);

  function init(scope = document) {
    initHeadlines(scope);
    initMedia(scope);
    initReveal(scope);
    initCounts(scope);
  }

  window.Vuffi = window.Vuffi || {};
  window.Vuffi.init = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
