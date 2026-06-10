// Sección de COTIZACIONES.
// 1) Carga el inventario desde n8n.
// 2) El usuario busca, filtra por grupo y agrega productos.
// 3) El carrito muestra cantidades y total.
// 4) Al enviar, hace POST a n8n -> n8n manda el mensaje al WhatsApp de Ferresur.

import { getInventario } from '../services/api.js';
import * as cart from '../services/cart.js';
import { BUSINESS, waLink } from '../config.js';
import { formatCOP, esc, escAttr } from '../utils/format.js';

let PRODUCTS = [];
let GROUPS = [];
let activeGroup = 'TODOS';
let term = '';

// Máximo de filas que se pintan a la vez (rendimiento con miles de productos).
const MAX_VISIBLE = 200;

export function Quote() {
  return `
  <section class="section section--alt" id="cotizaciones">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Cotizaciones</span>
        <h2 class="section__title">Arma tu cotización en línea</h2>
        <p class="section__lead">
          Busca los productos, agrégalos con “+”, ajusta cantidades y envíanos el detalle por WhatsApp.
          Te respondemos con disponibilidad y forma de entrega.
        </p>
        <p class="quote__disclaimer">
          ⚠️ Los precios son de referencia y están sujetos a cambios sin previo aviso. El valor final se confirma por WhatsApp.
        </p>
      </header>

      <div class="quote">
        <!-- Catálogo -->
        <div class="quote__catalog">
          <div class="quote__tools">
            <input id="qSearch" class="quote__search" type="search"
                   placeholder="Buscar producto…" autocomplete="off" />
            <div id="qGroups" class="quote__groups"></div>
          </div>
          <div id="qList" class="quote__list">
            <div class="quote__status">
              <span class="spinner"></span>
              Cargando inventario…
            </div>
          </div>
        </div>

        <!-- Carrito -->
        <aside class="quote__cart" id="qCart">
          <h3>Tu cotización <span id="qCount" class="pill">0</span></h3>
          <div id="qItems" class="cart__items">
            <p class="cart__empty">Aún no has agregado productos.<br>Pulsa “+” en un producto.</p>
          </div>
          <div class="cart__total">
            <span>Total</span>
            <strong id="qTotal">$ 0</strong>
          </div>

          <form id="qForm" class="cart__form" novalidate>
            <input name="nombre" required placeholder="Tu nombre *" autocomplete="name" />
            <input name="telefono" required placeholder="Tu teléfono / WhatsApp *" inputmode="tel" autocomplete="tel" />
            <textarea name="nota" rows="2" placeholder="Nota (opcional): dirección, domicilio, etc."></textarea>
            <button type="submit" class="btn btn--primary btn--block" id="qSend" disabled>
              Enviar cotización por WhatsApp
            </button>
            <p class="cart__hint">Recibimos tu pedido al instante. El precio final se confirma por WhatsApp.</p>
          </form>
          <div id="qFeedback" class="cart__feedback" role="status"></div>
        </aside>
      </div>
    </div>
  </section>`;
}

/* ---------- render del catálogo ---------- */

function renderGroups() {
  const el = document.getElementById('qGroups');
  if (!el) return;
  const all = ['TODOS', ...GROUPS];
  el.innerHTML = all
    .map(
      (g) =>
        `<button class="chip ${g === activeGroup ? 'is-active' : ''}" data-group="${escAttr(g)}">${esc(g)}</button>`
    )
    .join('');
}

function visibleProducts() {
  const t = term.trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    const okG = activeGroup === 'TODOS' || p.group === activeGroup;
    const okT = !t || p.name.toLowerCase().includes(t);
    return okG && okT;
  });
}

function renderList() {
  const el = document.getElementById('qList');
  if (!el) return;
  const all = visibleProducts();
  if (!all.length) {
    el.innerHTML = `<div class="quote__status">Sin coincidencias para tu búsqueda.</div>`;
    return;
  }
  // Solo se pintan las primeras MAX_VISIBLE filas → fluido con miles de productos.
  const items = all.slice(0, MAX_VISIBLE);
  const note =
    all.length > MAX_VISIBLE
      ? `<div class="quote__note">Mostrando ${items.length} de ${all.length.toLocaleString('es-CO')} productos. Afina con el buscador o elige una categoría.</div>`
      : '';
  // Agrupar por grupo para encabezados.
  const byGroup = {};
  items.forEach((p) => (byGroup[p.group] = byGroup[p.group] || []).push(p));

  el.innerHTML = note + Object.keys(byGroup)
    .sort((a, b) => a.localeCompare(b, 'es'))
    .map((g) => {
      const rows = byGroup[g]
        .sort((a, b) => a.name.localeCompare(b.name, 'es'))
        .map((p) => {
          const price =
            p.price != null
              ? `<span class="prod__price">${formatCOP(p.price)}</span>`
              : `<span class="prod__price prod__price--na">Consultar</span>`;
          const btn =
            p.price != null
              ? `<button class="prod__add" data-id="${escAttr(p.id)}" aria-label="Agregar ${escAttr(p.name)}">+</button>`
              : `<button class="prod__add prod__add--ask" data-id="${escAttr(p.id)}" aria-label="Agregar ${escAttr(p.name)}">+</button>`;
          return `
          <li class="prod">
            <span class="prod__name">${esc(p.name)}</span>
            ${price}
            ${btn}
          </li>`;
        })
        .join('');
      return `
      <div class="prod-group">
        <h4 class="prod-group__title">${esc(g)} <span>${byGroup[g].length}</span></h4>
        <ul class="prod-group__list">${rows}</ul>
      </div>`;
    })
    .join('');
}

/* ---------- render del carrito ---------- */

function renderCart(items) {
  const wrap = document.getElementById('qItems');
  const count = cart.getCount();
  const total = cart.getTotal();
  if (!wrap) return;

  wrap.innerHTML = items.length
    ? items
        .map(
          (it) => `
        <div class="citem">
          <span class="citem__name">${esc(it.name)}</span>
          <span class="citem__qty">
            <button class="qbtn" data-act="dec" data-key="${escAttr(it.key)}">−</button>
            <b>${it.qty}</b>
            <button class="qbtn" data-act="inc" data-key="${escAttr(it.key)}">+</button>
          </span>
          <span class="citem__line">${formatCOP(it.price * it.qty)}</span>
          <button class="citem__rm" data-act="rm" data-key="${escAttr(it.key)}" aria-label="Quitar">×</button>
        </div>`
        )
        .join('')
    : `<p class="cart__empty">Aún no has agregado productos.<br>Pulsa “+” en un producto.</p>`;

  document.getElementById('qCount').textContent = count;
  document.getElementById('qTotal').textContent = formatCOP(total);
  const send = document.getElementById('qSend');
  if (send) send.disabled = count === 0;
}

/* ---------- mensaje de WhatsApp (respaldo wa.me) ---------- */

function buildWhatsappText(cliente) {
  const items = cart.getItems();
  const lineas = items
    .map((it) => `• ${it.name} x${it.qty} — ${formatCOP(it.price * it.qty)}`)
    .join('\n');
  return (
    `*Nueva cotización — ${BUSINESS.nombre}*\n\n` +
    `*Cliente:* ${cliente.nombre}\n` +
    `*Teléfono:* ${cliente.telefono}\n` +
    (cliente.nota ? `*Nota:* ${cliente.nota}\n` : '') +
    `\n${lineas}\n\n` +
    `*TOTAL: ${formatCOP(cart.getTotal())}*`
  );
}

/* ---------- envío ---------- */

function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const fb = document.getElementById('qFeedback');
  const cliente = {
    nombre: form.nombre.value.trim(),
    telefono: form.telefono.value.trim(),
    nota: form.nota.value.trim()
  };

  if (!cliente.nombre || !cliente.telefono) {
    fb.className = 'cart__feedback is-error';
    fb.textContent = 'Por favor completa tu nombre y teléfono.';
    return;
  }
  if (cart.getCount() === 0) return;

  // Abre WhatsApp con la cotización precargada hacia el número de Ferresur.
  const url = waLink(buildWhatsappText(cliente));
  window.open(url, '_blank');

  fb.className = 'cart__feedback is-ok';
  fb.innerHTML =
    '✅ Abrimos WhatsApp con tu cotización. Solo pulsa <strong>enviar</strong> para que nos llegue. ' +
    `Si no se abrió, <a href="${url}" target="_blank" rel="noopener">toca aquí</a>.`;
  cart.clear();
  form.reset();
}

/* ---------- init ---------- */

export async function initQuote() {
  // Eventos del catálogo (delegados).
  const list = document.getElementById('qList');
  list?.addEventListener('click', (e) => {
    const add = e.target.closest('.prod__add');
    if (!add) return;
    const p = PRODUCTS.find((x) => String(x.id) === add.dataset.id);
    if (p) cart.add(p);
  });

  // Chips de grupo.
  document.getElementById('qGroups')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    activeGroup = chip.dataset.group;
    renderGroups();
    renderList();
  });

  // Búsqueda con debounce (no re-renderiza en cada tecla).
  let searchTimer;
  document.getElementById('qSearch')?.addEventListener('input', (e) => {
    term = e.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(renderList, 180);
  });

  // Eventos del carrito.
  document.getElementById('qItems')?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const key = b.dataset.key;
    if (b.dataset.act === 'inc') cart.changeQty(key, 1);
    if (b.dataset.act === 'dec') cart.changeQty(key, -1);
    if (b.dataset.act === 'rm') cart.remove(key);
  });

  document.getElementById('qForm')?.addEventListener('submit', handleSubmit);

  // Suscripción reactiva del carrito.
  cart.subscribe(renderCart);

  // Carga del inventario.
  try {
    PRODUCTS = await getInventario();
    if (!PRODUCTS.length) {
      const el = document.getElementById('qList');
      if (el) {
        el.innerHTML = `
          <div class="quote__status">
            <p>El catálogo en línea está en preparación.</p>
            <p>Escríbenos y te cotizamos de inmediato:</p>
            <a class="btn btn--primary" target="_blank" rel="noopener"
               href="${waLink('Hola Ferresur La 48, quiero una cotización.')}">Cotizar por WhatsApp</a>
          </div>`;
      }
      return;
    }
    GROUPS = [...new Set(PRODUCTS.map((p) => p.group))].sort((a, b) =>
      a.localeCompare(b, 'es')
    );
    renderGroups();
    renderList();
  } catch (err) {
    const el = document.getElementById('qList');
    if (el) {
      el.innerHTML = `
        <div class="quote__status quote__status--error">
          <p><strong>No pudimos cargar el inventario.</strong></p>
          <p>${esc(err.message)}</p>
          <p>Mientras tanto, escríbenos y te cotizamos a la mano:</p>
          <a class="btn btn--primary" target="_blank" rel="noopener"
             href="${waLink('Hola Ferresur La 48, quiero una cotización.')}">Cotizar por WhatsApp</a>
        </div>`;
    }
  }
}
