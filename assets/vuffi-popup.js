/* Vuffi email popup: opens once after a delay or when leaving at the top of the page,
   stays closed for a set number of days, and shows the code after sign up. */
(() => {
  if (customElements.get('vuffi-popup')) return;
  const KEY = 'vuffi-popup-closed';

  const read = () => {
    try {
      return parseInt(window.localStorage.getItem(KEY) || '0', 10);
    } catch (e) {
      return 0;
    }
  };
  const write = (value) => {
    try {
      window.localStorage.setItem(KEY, String(value));
    } catch (e) {
      /* storage can be unavailable in private modes */
    }
  };

  class VuffiPopup extends HTMLElement {
    connectedCallback() {
      this.dialog = this.querySelector('dialog');
      if (!this.dialog) return;
      this.querySelectorAll('[data-close]').forEach((btn) => btn.addEventListener('click', () => this.close()));
      this.dialog.addEventListener('cancel', () => this.remember());
      this.dialog.addEventListener('click', (event) => {
        if (event.target === this.dialog) this.close();
      });

      const copy = this.querySelector('[data-copy]');
      if (copy) {
        copy.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(copy.dataset.copy);
            const label = copy.querySelector('[data-copy-label]');
            if (label) label.textContent = 'Copied';
          } catch (e) {
            /* clipboard not allowed; the code is visible to type */
          }
        });
      }

      const form = this.querySelector('form');
      if (form) {
        form.addEventListener('submit', () => {
          try {
            window.sessionStorage.setItem('vuffi-popup-sent', '1');
          } catch (e) {
            /* ignore */
          }
        });
      }

      let sent = false;
      try {
        sent = window.sessionStorage.getItem('vuffi-popup-sent') === '1';
      } catch (e) {
        sent = false;
      }
      if (this.querySelector('[data-popup-success]')) {
        if (sent) {
          try {
            window.sessionStorage.removeItem('vuffi-popup-sent');
          } catch (e) {
            /* ignore */
          }
          this.remember();
          this.open();
        }
        return;
      }
      if (sent && this.querySelector('.vuffi-pop__error')) {
        this.open();
        return;
      }
      if (this.hasAttribute('data-design')) return;

      const days = parseInt(this.dataset.days || '14', 10);
      if (Date.now() - read() < days * 86400000) return;
      if (window.location.pathname.indexOf('/checkouts') === 0) return;

      const delay = parseInt(this.dataset.delay || '12', 10) * 1000;
      this.timer = window.setTimeout(() => this.open(), delay);
      this.onLeave = (event) => {
        if (event.clientY <= 0) this.open();
      };
      document.documentElement.addEventListener('mouseleave', this.onLeave);
    }

    disconnectedCallback() {
      window.clearTimeout(this.timer);
      if (this.onLeave) document.documentElement.removeEventListener('mouseleave', this.onLeave);
    }

    open() {
      window.clearTimeout(this.timer);
      if (this.onLeave) document.documentElement.removeEventListener('mouseleave', this.onLeave);
      if (this.dialog.open || document.querySelector('dialog[open]')) return;
      this.dialog.showModal();
    }

    remember() {
      write(Date.now());
    }

    close() {
      this.remember();
      this.dialog.close();
    }
  }

  customElements.define('vuffi-popup', VuffiPopup);
})();
