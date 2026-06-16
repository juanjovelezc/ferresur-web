import { waLink } from '../config.js';
import { esc, escAttr } from '../utils/format.js';

// Flyers de producto (imágenes en /public/img). El precio y el detalle
// ya vienen dentro de cada imagen.
const DESTACADOS = [
  { img: '/img/prod-pinviacril.png', nombre: 'Pintura Pinviacril lavable' },
  { img: '/img/prod-cemento.png', nombre: 'Cemento gris Argos 25 kg' },
  { img: '/img/prod-cerradura.png', nombre: 'Cerradura para reja Gato 865' },
  { img: '/img/prod-pistola.png', nombre: 'Pistola de aire Truper' }
];

export function Featured() {
  const cards = DESTACADOS.map(
    (d) => `
    <article class="feat">
      <div class="feat__img">
        <img src="${d.img}" alt="${escAttr(d.nombre)}" loading="lazy" />
      </div>
      <div class="feat__foot">
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
