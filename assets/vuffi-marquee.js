/* Vuffi moving row: an endless row of cards that is always drifting and can be nudged by a swipe.
   <vuffi-marquee data-seconds="45" data-copies="3"> holds a [data-track] with the cards repeated
   data-copies times. The row moves by one copy every data-seconds, then starts over without a jump.

   - It never stops: hovering, tapping and focus do not pause it.
   - A sideways swipe or drag moves the row and it drifts on straight after; scrolling the page up
     and down over the row works as usual.
   - A tap or click on a card is left to the card (the ingredient opens bigger); a drag never counts as a click.
   - Less motion: the row stands still but can still be dragged.
   - Nothing runs while the row is off screen. */
(() => {
  if (customElements.get('vuffi-marquee')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const RESUME_AFTER = 0;

  class VuffiMarquee extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('[data-track]');
      if (!this.track) return;
      this.seconds = parseFloat(this.dataset.seconds) || 45;
      this.copies = Math.max(2, parseInt(this.dataset.copies || '3', 10));
      this.x = 0;
      this.velocity = 0;
      this.drag = null;
      this.holdUntil = 0;
      this.hover = false;
      this.focused = false;
      this.visible = false;
      this.frame = 0;

      this.measure();
      if ('ResizeObserver' in window) {
        this.resizer = new ResizeObserver(() => this.measure());
        this.resizer.observe(this.track);
      }
      if ('IntersectionObserver' in window) {
        this.watch = new IntersectionObserver(
          ([entry]) => {
            this.visible = entry.isIntersecting;
            if (this.visible) this.start();
          },
          { rootMargin: '120px 0px' }
        );
        this.watch.observe(this);
      } else {
        this.visible = true;
        this.start();
      }

      this.addEventListener('pointerdown', (e) => this.onDown(e));
      this.addEventListener('pointermove', (e) => this.onMove(e));
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((type) =>
        this.addEventListener(type, (e) => this.onUp(e))
      );
      /* A drag that moved the row is not a click on the card under it */
      this.addEventListener(
        'click',
        (e) => {
          if (!this.dragged) return;
          this.dragged = false;
          e.preventDefault();
          e.stopPropagation();
        },
        true
      );
      /* Pictures inside never start a native image drag */
      this.addEventListener('dragstart', (e) => e.preventDefault());
    }

    disconnectedCallback() {
      if (this.resizer) this.resizer.disconnect();
      if (this.watch) this.watch.disconnect();
      if (this.frame) cancelAnimationFrame(this.frame);
      this.frame = 0;
    }

    measure() {
      this.copyWidth = this.track.scrollWidth / this.copies;
      this.speed = this.copyWidth / this.seconds;
      this.wrap();
      this.paint();
    }

    wrap() {
      const w = this.copyWidth;
      if (!w) return;
      while (this.x <= -w) this.x += w;
      while (this.x > 0) this.x -= w;
    }

    paint() {
      const value = `translate3d(${this.x.toFixed(2)}px, 0, 0)`;
      if (this.painted === value) return;
      this.painted = value;
      this.track.style.transform = value;
    }

    start() {
      if (this.frame || !this.visible) return;
      this.last = performance.now();
      this.frame = requestAnimationFrame((now) => this.tick(now));
    }

    tick(now) {
      this.frame = 0;
      const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      let moving = false;

      if (!this.drag) {
        if (Math.abs(this.velocity) > 8) {
          /* Carry on after a swipe, slowing down */
          this.x += this.velocity * dt;
          this.velocity *= Math.exp(-dt * 4.5);
          moving = true;
        } else {
          this.velocity = 0;
          const paused = this.hover || this.focused || reduced.matches || now < this.holdUntil;
          if (!paused) {
            this.x -= this.speed * dt;
            moving = true;
          } else if (now < this.holdUntil) {
            moving = true;
          }
        }
        this.wrap();
        this.paint();
      }

      if (this.visible && (moving || this.drag)) {
        this.frame = requestAnimationFrame((t) => this.tick(t));
      }
    }

    onDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const now = performance.now();
      this.drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, from: this.x, lastX: e.clientX, lastT: now, locked: false };
      this.velocity = 0;
    }

    onMove(e) {
      const drag = this.drag;
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0;
      const dy = e.clientY - drag.y0;
      if (!drag.locked) {
        if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
          drag.locked = true;
          this.classList.add('is-dragging');
          try {
            this.setPointerCapture(e.pointerId);
          } catch (err) {
            /* capture is optional */
          }
        } else if (Math.abs(dy) > 8) {
          /* An up and down scroll: leave it to the page */
          this.drag = null;
          return;
        } else {
          return;
        }
      }
      const now = performance.now();
      const step = Math.max(1, now - drag.lastT);
      const v = ((e.clientX - drag.lastX) / step) * 1000;
      this.velocity = this.velocity * 0.6 + v * 0.4;
      drag.lastX = e.clientX;
      drag.lastT = now;
      this.x = drag.from + dx;
      this.wrap();
      /* Keep the drag's start point in step with the wrap, so the row never jumps under the finger */
      drag.from = this.x - dx;
      this.paint();
    }

    onUp(e) {
      const drag = this.drag;
      if (!drag || (e.pointerId !== undefined && e.pointerId !== drag.id)) return;
      if (!drag.locked) this.velocity = 0;
      if (performance.now() - drag.lastT > 80) this.velocity = 0;
      this.velocity = Math.max(-2400, Math.min(2400, this.velocity));
      this.dragged = drag.locked;
      this.drag = null;
      this.classList.remove('is-dragging');
      this.holdUntil = performance.now() + RESUME_AFTER;
      this.start();
    }
  }

  customElements.define('vuffi-marquee', VuffiMarquee);
})();
