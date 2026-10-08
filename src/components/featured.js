import { waLink } from '../config.js';
import { esc, escAttr, formatCOP } from '../utils/format.js';

// Productos destacados. La imagen es el flyer del producto y el nombre
// y el precio van como texto (mejor SEO y accesibilidad). Los precios son
// de referencia: el valor final se confirma por WhatsApp.
const DESTACADOS = [
  { img: '/img/prod-pinviacril.webp', nombre: 'Pintura Pinviacril lavable', precio: 211200 },
  { img: '/img/prod-cemento.webp', nombre: 'Cemento gris Argos 25 kg', precio: 22300 },
  { img: '/img/prod-cerradura.webp', nombre: 'Cerradura para reja Gato 865', precio: 57400 },
  { img: '/img/prod-pistola.webp', nombre: 'Pistola de aire Truper', precio: 15800 }
];

export function Featured() {
  const cards = DESTACADOS.map(
    (d) => `
    <article class="feat">
      <div class="feat__img">
        <img src="${d.img}" alt="${escAttr(d.nombre)}" loading="lazy" width="1080" height="1350" />
      </div>
      <div class="feat__body">
        <h3 class="feat__name">${esc(d.nombre)}</h3>
        <span class="feat__price">${formatCOP(d.precio)}</span>
        <a class="btn btn--primary btn--sm btn--block" target="_blank" rel="noopener"
           href="${waLink('Hola Ferresur La 48, me interesa: ' + d.nombre)}">Cotizar por WhatsApp</a>
      </div>
    </article>`
  ).join('');

  return `
  <section class="section" id="destacados">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Productos destacados</span>
        <h2 class="section__title">Algunos de nuestros productos</h2>
        <p class="section__lead">Una muestra de lo que manejamos. Para ver todo el catálogo y armar tu pedido, usa la sección de cotizaciones.</p>
      </header>
      <div class="featured">${cards}</div>
    </div>
  </section>`;
}
