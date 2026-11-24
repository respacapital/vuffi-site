/* Vuffi cart savings: adds a bar above the total in the cart drawer and on the cart page
   with everything the shopper saves (subscription price plus automatic discounts).
   Horizon re-renders the cart after every change, so a watcher puts the bar back and refreshes it. */
(() => {
  const config = document.getElementById('VuffiCartSavings');
  if (!config || window.vuffiCartSavings) return;
  window.vuffiCartSavings = true;

  const template = config.dataset.text || 'You save [amount].';
  const format = config.dataset.money;

  const formatMoney = (cents) => {
    const value = (cents / 100).toFixed(2);
    const withCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (!format) return `$${withCommas}`;
    return format
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/, withCommas.split('.')[0])
      .replace(/\{\{\s*amount\s*\}\}/, withCommas);
  };

  const savingsFrom = (cart) => {
    let total = cart.total_discount || 0;
    (cart.items || []).forEach((item) => {
      const plan = item.selling_plan_allocation;
      if (plan && plan.compare_at_price > plan.price) {
        total += (plan.compare_at_price - plan.price) * item.quantity;
      }
    });
    return total;
  };

  let saved = 0;
  let timer = 0;
  let busy = false;

  const paint = () => {
    document.querySelectorAll('.cart-totals').forEach((totals) => {
      let bar = totals.querySelector(':scope > .vuffi-cart-save');
      if (saved <= 0) {
        if (bar) bar.remove();
        return;
      }
      const text = template.replace('[amount]', formatMoney(saved));
      if (!bar) {
        bar = document.createElement('p');
        bar.className = 'vuffi-cart-save';
        bar.setAttribute('role', 'status');
        totals.prepend(bar);
      }
      if (bar.textContent !== text) bar.textContent = text;
    });
  };

  const refresh = async () => {
    if (busy) return;
    busy = true;
    try {
      const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`, {
        headers: { Accept: 'application/json' },
      });
      if (response.ok) saved = savingsFrom(await response.json());
    } catch (error) {
      /* Leave the cart as it is if the request fails */
    }
    busy = false;
    paint();
  };

  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(refresh, 160);
  };

  /* Watch for Horizon re-rendering the cart (drawer or page) and for the bar going missing */
  const watcher = new MutationObserver((records) => {
    const touchesCart = records.some((record) => {
      const target = record.target;
      if (!(target instanceof Element)) return false;
      if (target.closest('.vuffi-cart-save')) return false;
      return Boolean(target.closest('cart-items-component, .cart-totals, cart-drawer-component, .cart-drawer__content'));
    });
    if (touchesCart) schedule();
  });

  const start = () => {
    watcher.observe(document.body, { childList: true, subtree: true, characterData: true });
    if (document.querySelector('.cart-totals')) refresh();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
