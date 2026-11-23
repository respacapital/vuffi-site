/* Vuffi particles: soft glowing dots drifting upward on a canvas behind a section.
   <vuffi-particles data-count="60" data-colors="#8FFB09,#FFFFFF"></vuffi-particles>
   Pauses off screen and in background tabs; draws one still frame for reduced motion. */
(() => {
  if (customElements.get('vuffi-particles')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  class VuffiParticles extends HTMLElement {
    connectedCallback() {
      this.canvas = document.createElement('canvas');
      this.canvas.setAttribute('aria-hidden', 'true');
      this.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.colors = (this.dataset.colors || '#8FFB09,#FFFFFF').split(',').map((c) => c.trim());
      this.count = Math.max(0, parseInt(this.dataset.count || '60', 10));
      this.visible = false;
      this.frame = 0;
      this.tick = this.tick.bind(this);

      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this);
      this.io = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        if (this.visible) this.start();
      });
      this.io.observe(this);
      this.onVisibility = () => {
        if (!document.hidden) this.start();
      };
      document.addEventListener('visibilitychange', this.onVisibility);
    }

    disconnectedCallback() {
      cancelAnimationFrame(this.frame);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.io) this.io.disconnect();
      document.removeEventListener('visibilitychange', this.onVisibility);
    }

    resize() {
      const rect = this.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = rect.width;
      this.h = rect.height;
      this.canvas.width = Math.round(rect.width * dpr);
      this.canvas.height = Math.round(rect.height * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = rect.width < 750 ? 0.55 : 1;
      const total = Math.round(this.count * density);
      this.particles = Array.from({ length: total }, () => this.spawn(true));
      this.draw(0);
      if (reduced.matches || (window.Shopify && window.Shopify.designMode)) return;
      this.start();
    }

    spawn(anywhere) {
      const big = Math.random() < 0.14;
      return {
        x: Math.random() * this.w,
        y: anywhere ? Math.random() * this.h : this.h + 20,
        r: big ? 4 + Math.random() * 9 : 0.6 + Math.random() * 1.9,
        vy: -(0.08 + Math.random() * 0.32) * (big ? 0.5 : 1),
        sway: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        a: big ? 0.05 + Math.random() * 0.08 : 0.25 + Math.random() * 0.55,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        big,
      };
    }

    start() {
      if (this.running || !this.visible || document.hidden || reduced.matches) return;
      this.running = true;
      this.last = performance.now();
      this.frame = requestAnimationFrame(this.tick);
    }

    tick(now) {
      if (!this.visible || document.hidden) {
        this.running = false;
        return;
      }
      const dt = Math.min(48, now - this.last) / 16.67;
      this.last = now;
      this.particles.forEach((p, i) => {
        p.y += p.vy * dt;
        p.phase += 0.01 * dt;
        if (p.y < -20) this.particles[i] = this.spawn(false);
      });
      this.draw(now);
      this.frame = requestAnimationFrame(this.tick);
    }

    draw(now) {
      const ctx = this.ctx;
      if (!ctx || !this.particles) return;
      ctx.clearRect(0, 0, this.w, this.h);
      this.particles.forEach((p) => {
        const x = p.x + Math.sin(p.phase) * p.sway * 12;
        const twinkle = p.big ? 1 : 0.65 + 0.35 * Math.sin(p.phase * 3 + (now || 0) / 900);
        ctx.globalAlpha = p.a * twinkle;
        if (p.big) {
          const g = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r);
          g.addColorStop(0, p.color);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = p.color;
        }
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }
  }

  customElements.define('vuffi-particles', VuffiParticles);
})();
