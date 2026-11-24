/* Vuffi how to give it: maps the weight slider to the dose bands and fills the answer rows. */
(() => {
  if (customElements.get('vuffi-dose')) return;

  class VuffiDose extends HTMLElement {
    connectedCallback() {
      this.range = this.querySelector('input[type="range"]');
      this.weight = this.querySelector('[data-weight]');
      this.rows = this.querySelector('[data-rows]');
      this.overCopy = this.querySelector('[data-over-copy]');
      this.amount = this.querySelector('[data-amount]');
      this.lasts = this.querySelector('[data-lasts]');
      this.order = this.querySelector('[data-order]');
      this.chews = Array.from(this.querySelectorAll('[data-chews] > *'));
      this.answer = this.querySelector('.vuffi-dose__answer');
      if (!this.range) return;
      try {
        this.tiers = JSON.parse(this.querySelector('[data-tiers]').textContent).sort((a, b) => a.upTo - b.upTo);
      } catch (e) {
        this.tiers = [];
      }
      this.overFrom = parseInt(this.dataset.over || '66', 10);
      this.last = null;
      this.range.addEventListener('input', () => this.update());
      this.update();
    }

    update() {
      const min = parseFloat(this.range.min);
      const max = parseFloat(this.range.max);
      const value = parseFloat(this.range.value);
      this.range.style.setProperty('--fill', `${((value - min) / (max - min)) * 100}%`);
      this.weight.textContent = value >= max ? `${max}+` : String(value);
      this.range.setAttribute('aria-valuetext', `${value >= max ? `${max} or more` : value} pounds`);

      const tier = value < this.overFrom ? this.tiers.find((t) => value <= t.upTo) : null;
      if (tier === this.last) return;
      const first = this.last === null;
      this.last = tier;

      if (tier) {
        this.rows.hidden = false;
        this.overCopy.hidden = true;
        this.amount.textContent = tier.amount;
        this.lasts.textContent = tier.lasts;
        this.order.textContent = tier.order;
        this.chews.forEach((chew, i) => {
          chew.hidden = i >= tier.chews;
        });
      } else {
        this.rows.hidden = true;
        this.overCopy.hidden = false;
      }

      if (first) return;
      this.answer.classList.remove('is-swap');
      void this.answer.offsetWidth;
      this.answer.classList.add('is-swap');
    }
  }

  customElements.define('vuffi-dose', VuffiDose);
})();
