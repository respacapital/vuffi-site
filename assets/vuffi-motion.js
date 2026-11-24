/* Vuffi motion: headline and photo reveals on scroll, scroll linked progress, count up numbers and sale countdowns.
   Everything respects the reduced motion setting. In the theme editor things move too, and any section you
   select shows straight away so it is easy to edit. */
(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isDesign = () => Boolean(window.Shopify && window.Shopify.designMode);

  if (isDesign()) root.classList.add('vuffi-design');

  /* Reveal. An observer does most of the work; a light scroll check backs it up for setups where the
     observer stays quiet (some desktop previews), so nothing can stay hidden. */
  const pending = new Set();
  let checkFrame = 0;

  const reveal = (el) => {
    el.classList.add('is-in');
    pending.delete(el);
    if (revealObserver) revealObserver.unobserve(el);
  };

  const checkPending = () => {
    checkFrame = 0;
    const limit = window.innerHeight * 0.94;
    pending.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0) reveal(el);
    });
    progressItems.forEach(updateProgress);
  };

  const requestCheck = () => {
    if (!checkFrame) checkFrame = requestAnimationFrame(checkPending);
  };

  const track = (el) => {
    pending.add(el);
    if (revealObserver) revealObserver.observe(el);
    requestCheck();
  };

  const revealObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) reveal(entry.target);
            });
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
        )
      : null;

  function initReveal(scope) {
    scope.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
      if (reduced.matches || root.classList.contains('vuffi-still')) {
        el.classList.add('is-in');
      } else {
        track(el);
      }
    });
  }

  const still = () => reduced.matches || root.classList.contains('vuffi-still');

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
          track(el);
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
        track(media);
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
      if (!countObserver || reduced.matches) return;
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

  /* Scroll linked progress: [data-progress] gets --progress from 0 (its top reaches 85% of the screen)
     to 1 (its bottom reaches 45%). Children with [data-progress-step] get is-reached in turn. */
  const progressItems = new Set();

  function updateProgress(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.85;
    const end = vh * 0.45;
    const p = still() ? 1 : Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
    el.style.setProperty('--progress', p.toFixed(3));
    const steps = el.querySelectorAll('[data-progress-step]');
    steps.forEach((step, i) => {
      const at = steps.length > 1 ? (i / (steps.length - 1)) * 0.96 : 0;
      step.classList.toggle('is-reached', p >= at);
    });
  }

  function initProgress(scope) {
    scope.querySelectorAll('[data-progress]').forEach((el) => {
      progressItems.add(el);
      updateProgress(el);
    });
  }

  function init(scope = document) {
    initHeadlines(scope);
    initMedia(scope);
    initReveal(scope);
    initCounts(scope);
    initProgress(scope);
    requestCheck();
  }

  document.addEventListener('scroll', requestCheck, { passive: true, capture: true });
  window.addEventListener('resize', requestCheck, { passive: true });

  /* Theme editor: whatever you select shows at once */
  const showAll = (event) => {
    const scope = event.target;
    if (!scope || !scope.querySelectorAll) return;
    scope.querySelectorAll('[data-reveal], [data-media-reveal]').forEach(reveal);
  };
  document.addEventListener('shopify:section:select', showAll);
  document.addEventListener('shopify:block:select', (event) => {
    const section = event.target.closest('.shopify-section') || event.target;
    showAll({ target: section });
  });

  window.Vuffi = window.Vuffi || {};
  window.Vuffi.init = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
