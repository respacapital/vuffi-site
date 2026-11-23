/* Vuffi buy box: size and purchase type, live prices, add to cart through Horizon's cart drawer,
   sticky phone bar and gallery counter. */
import { CartLinesUpdateEvent } from '@shopify/events';

const formatMoney = (cents, format) => {
  const value = (cents / 100).toFixed(2);
  const withCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (!format) return `$${withCommas}`;
  return format
    .replace(/\{\{\s*amount_no_decimals\s*\}\}/, withCommas.split('.')[0])
    .replace(/\{\{\s*amount\s*\}\}/, withCommas);
};

class VuffiBuy extends HTMLElement {
  connectedCallback() {
    try {
      this.data = JSON.parse(this.querySelector('[data-product-json]').textContent);
    } catch (e) {
      return;
    }
    this.form = this.querySelector('[data-buy-form]');
    this.variantInput = this.querySelector('[data-variant-input]');
    this.planInput = this.querySelector('[data-plan-input]');
    this.submit = this.querySelector('[data-submit]');
    this.error = this.querySelector('[data-error]');
    this.format = this.dataset.moneyFormat;
    this.dealSub = parseFloat(this.dataset.dealSub || '0');
    this.dealOne = parseFloat(this.dataset.dealOne || '0');
    this.dealEnd = Date.parse(this.dataset.dealEnd || '');
    this.section = this.closest('.vuffi-pdp');
    this.sticky = this.section && this.section.querySelector('[data-sticky-bar]');

    this.form.addEventListener('change', (event) => {
      if (event.target.name === 'vuffi-size') this.variantInput.value = event.target.value;
      this.update();
    });
    this.form.addEventListener('submit', (event) => this.onSubmit(event));

    if (this.sticky) {
      const stickyButton = this.sticky.querySelector('[data-sticky-buy]');
      stickyButton.addEventListener('click', () => {
        this.submit.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.submit.focus({ preventScroll: true });
      });
      new IntersectionObserver(([entry]) => {
        const show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        this.sticky.classList.toggle('is-shown', show);
        this.sticky.setAttribute('aria-hidden', String(!show));
        stickyButton.tabIndex = show ? 0 : -1;
      }).observe(this.submit);
    }

    this.initGalleryCounter();
    this.update();
  }

  get mode() {
    const checked = this.form.querySelector('input[name="vuffi-mode"]:checked');
    return checked ? checked.value : 'one';
  }

  get variant() {
    const id = parseInt(this.variantInput.value, 10);
    return this.data.variants.find((v) => v.id === id) || this.data.variants[0];
  }

  dealLive() {
    return this.dataset.dealLive === 'true' && (Number.isNaN(this.dealEnd) || Date.now() < this.dealEnd);
  }

  update() {
    const variant = this.variant;
    const live = this.dealLive();
    const sub = variant.sub;
    const subNow = sub != null && live ? Math.round(sub * (1 - this.dealSub / 100)) : sub;
    const oneNow = live && this.dealOne > 0 ? Math.round(variant.price * (1 - this.dealOne / 100)) : variant.price;

    this.setText('[data-price="sub"]', subNow != null ? formatMoney(subNow, this.format) : '');
    this.setText('[data-was="sub"]', formatMoney(variant.price, this.format));
    this.setText('[data-then]', sub != null ? formatMoney(sub, this.format) : '');
    this.setText('[data-price="one"]', formatMoney(oneNow, this.format));
    this.setText('[data-was="one"]', formatMoney(variant.price, this.format));
    if (!live) this.querySelectorAll('[data-deal-line], [data-was="one"]').forEach((el) => (el.hidden = true));

    const isSub = this.mode === 'sub' && this.data.planId;
    this.planInput.value = isSub ? this.data.planId : '';
    const total = isSub ? subNow : oneNow;
    this.setText('[data-submit-label]', isSub ? this.submit.dataset.labelSub : this.submit.dataset.labelOne);
    this.setText('[data-submit-price]', formatMoney(total, this.format));
    if (this.sticky) {
      const stickyPrice = this.sticky.querySelector('[data-sticky-price]');
      if (stickyPrice) stickyPrice.textContent = formatMoney(total, this.format);
    }
    this.submit.disabled = !variant.available;
  }

  setText(selector, text) {
    this.querySelectorAll(selector).forEach((el) => {
      el.textContent = text;
    });
  }

  async onSubmit(event) {
    event.preventDefault();
    if (this.submit.getAttribute('aria-busy') === 'true') return;
    this.submit.setAttribute('aria-busy', 'true');
    this.error.hidden = true;

    const formData = new FormData(this.form);
    formData.delete('vuffi-size');
    formData.delete('vuffi-mode');
    if (!formData.get('selling_plan')) formData.delete('selling_plan');

    const sectionIds = Array.from(document.querySelectorAll('cart-items-component'))
      .map((el) => el.dataset.sectionId)
      .filter(Boolean);
    if (sectionIds.length) formData.append('sections', sectionIds.join(','));

    const routes = (window.Theme && window.Theme.routes) || {};
    const deferred = CartLinesUpdateEvent.createPromise();
    this.dispatchEvent(
      new CartLinesUpdateEvent({
        action: 'add',
        context: 'product',
        lines: [{ merchandiseId: String(formData.get('id')), quantity: 1 }],
        promise: deferred.promise,
      })
    );

    try {
      const response = await fetch(routes.cart_add_url || '/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: formData,
      });
      const result = await response.json();
      if (result.status) throw new Error(result.description || result.message || 'Could not add to cart');

      const cart = await fetch(`${routes.cart_url || '/cart'}.js`).then((r) => r.json());
      deferred.resolve({
        cart: CartLinesUpdateEvent.createCartFromAjaxResponse(cart),
        detail: {
          items: cart.items,
          source: 'vuffi-buy',
          sourceId: this.id || 'vuffi-buy',
          itemCount: 1,
          sections: result.sections,
          didError: false,
        },
      });

      if (!document.querySelector('cart-drawer-component')) {
        window.location.href = routes.cart_url || '/cart';
      }
    } catch (error) {
      deferred.reject(error);
      this.error.textContent = error.message;
      this.error.hidden = false;
    } finally {
      this.submit.removeAttribute('aria-busy');
    }
  }

  initGalleryCounter() {
    const rail = this.section && this.section.querySelector('.vuffi-pdp__media');
    const index = this.section && this.section.querySelector('[data-slide-index]');
    if (!rail || !index) return;
    rail.addEventListener(
      'scroll',
      () => {
        const slide = Math.round(rail.scrollLeft / Math.max(1, rail.clientWidth));
        index.textContent = String(slide + 1);
      },
      { passive: true }
    );
  }
}

if (!customElements.get('vuffi-buy')) customElements.define('vuffi-buy', VuffiBuy);
