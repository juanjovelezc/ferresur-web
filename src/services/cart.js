// Estado del carrito de cotización. Pequeño store con suscripción
// para que la UI se actualice sola cuando cambia el carrito.

const listeners = new Set();
let items = {}; // { key: { id, name, price, group, qty } }

function keyFor(p) {
  return (p.id != null ? String(p.id) : p.name) + '|' + (p.price || 0);
}

function emit() {
  const snapshot = getItems();
  listeners.forEach((fn) => fn(snapshot));
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(getItems());
  return () => listeners.delete(fn);
}

export function add(product) {
  const k = keyFor(product);
  if (!items[k]) {
    items[k] = {
      id: product.id ?? null,
      name: product.name,
      price: Number(product.price) || 0,
      group: product.group || '',
      qty: 0
    };
  }
  items[k].qty += 1;
  emit();
}

export function setQty(key, qty) {
  if (!items[key]) return;
  items[key].qty = qty;
  if (items[key].qty <= 0) delete items[key];
  emit();
}

export function changeQty(key, delta) {
  if (!items[key]) return;
  setQty(key, items[key].qty + delta);
}

export function remove(key) {
  delete items[key];
  emit();
}

export function clear() {
  items = {};
  emit();
}

export function getItems() {
  return Object.entries(items).map(([key, it]) => ({ key, ...it }));
}

export function getCount() {
  return getItems().reduce((s, it) => s + it.qty, 0);
}

export function getTotal() {
  return getItems().reduce((s, it) => s + it.qty * it.price, 0);
}
