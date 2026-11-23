/* Vuffi dose finder: maps the weight slider to the daily dose bands. */
(() => {
  if (customElements.get('vuffi-dose')) return;

  class VuffiDose extends HTMLElement {
    connectedCallback() {
      this.range = this.querySelector('input[type="range"]');
      this.weight = this.querySelector('[data-weight]');
      this.result = this.querySelector('[data-result]');
      this.detail = this.querySelector('[data-detail]');
      this.box = this.querySelector('.vuffi-dose__result');
      try {
        this.tiers = JSON.parse(this.querySelector('[data-tiers]').textContent).sort((a, b) => a.upTo - b.upTo);
        this.over = JSON.parse(this.querySelector('[data-over-copy]').textContent);
      } catch (e) {
        return;
      }
      this.overFrom = parseInt(this.dataset.over || '66', 10);
      this.last = '';
      this.range.addEventListener('input', () => this.update());
      this.update();
    }

    update() {
      const min = parseFloat(this.range.min);
      const max = parseFloat(this.range.max);
      const value = parseFloat(this.range.value);
      this.range.style.setProperty('--fill', `${((value - min) / (max - min)) * 100}%`);
      this.weight.textContent = value >= max ? `${max}+` : String(value);
      this.range.setAttribute('aria-valuetext', `${value} pounds`);

      let copy = this.over;
      if (value < this.overFrom) copy = this.tiers.find((t) => value <= t.upTo) || this.over;
      if (copy.result === this.last) return;
      this.last = copy.result;
      this.result.textContent = copy.result;
      this.detail.textContent = copy.detail;
      this.box.classList.remove('is-swap');
      void this.box.offsetWidth;
      this.box.classList.add('is-swap');
    }
  }

  customElements.define('vuffi-dose', VuffiDose);
})();
