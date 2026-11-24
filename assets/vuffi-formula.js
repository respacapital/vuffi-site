/* Vuffi formula: tapping or clicking an ingredient card in the moving row opens it bigger in a window.
   <vuffi-formula-zoom> holds one <dialog>; each card has a [data-open] button covering it.
   The window shows the card's photo (loaded at a larger size) and its words, and closes with
   the close button, a tap outside it or the Escape key. Focus returns to the card that opened it. */
(() => {
  if (customElements.get('vuffi-formula-zoom')) return;

  class VuffiFormulaZoom extends HTMLElement {
    connectedCallback() {
      this.dialog = this.querySelector('dialog');
      this.media = this.querySelector('[data-zoom-media]');
      this.body = this.querySelector('[data-zoom-body]');
      this.section = this.closest('.vuffi-formula') || this.parentElement;
      if (!this.dialog || !this.section) return;

      this.onClick = (event) => {
        const button = event.target.closest('[data-open]');
        if (!button || !this.section.contains(button)) return;
        const card = button.closest('[data-card]');
        if (card) this.open(card, button);
      };
      this.section.addEventListener('click', this.onClick);

      this.dialog.addEventListener('click', (event) => {
        if (event.target === this.dialog || event.target.closest('[data-close]')) this.dialog.close();
      });
      this.dialog.addEventListener('close', () => {
        if (this.opener && this.opener.isConnected && this.opener.tabIndex >= 0) {
          this.opener.focus({ preventScroll: true });
        }
      });
    }

    disconnectedCallback() {
      if (this.section) this.section.removeEventListener('click', this.onClick);
    }

    open(card, opener) {
      const media = card.querySelector('.vuffi-media, .vuffi-ph');
      const body = card.querySelector('.vuffi-formula__body');
      this.media.replaceChildren();
      this.body.replaceChildren();

      if (media) {
        const copy = media.cloneNode(true);
        const img = copy.querySelector('img');
        if (img) {
          img.loading = 'eager';
          img.sizes = '(min-width: 750px) 560px, calc(100vw - 24px)';
          img.removeAttribute('fetchpriority');
        }
        this.media.append(copy);
      }

      if (body) {
        const copy = body.cloneNode(true);
        this.body.append(...copy.childNodes);
        const title = this.body.querySelector('.vuffi-formula__name');
        if (title && this.body.dataset.titleId) title.id = this.body.dataset.titleId;
      }

      this.opener = opener;
      if (!this.dialog.open) this.dialog.showModal();
    }
  }

  customElements.define('vuffi-formula-zoom', VuffiFormulaZoom);
})();
