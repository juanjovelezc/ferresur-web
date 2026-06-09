import { SERVICIOS } from '../data/content.js';
import { esc } from '../utils/format.js';

export function Services() {
  const cards = SERVICIOS.map(
    (s) => `
    <article class="service">
      <div class="service__icon" aria-hidden="true">${s.icono}</div>
      <h3>${esc(s.titulo)}</h3>
      <p>${esc(s.texto)}</p>
    </article>`
  ).join('');

  return `
  <section class="section section--alt" id="servicios">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Servicios</span>
        <h2 class="section__title">Qué encuentras en Ferresur</h2>
        <p class="section__lead">
          Las líneas que más mueve la gente de la zona. Si no lo ves, pregúntanos: muy seguramente lo conseguimos.
        </p>
      </header>
      <div class="services">${cards}</div>
    </div>
  </section>`;
}
