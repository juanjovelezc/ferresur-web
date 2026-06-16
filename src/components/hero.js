import { BUSINESS, waLink } from '../config.js';

export function Hero() {
  return `
  <section class="hero" id="inicio">
    <div class="container hero__inner">
      <div class="hero__copy">
        <span class="hero__badge">Ferretería · ${BUSINESS.ciudad}</span>
        <h1 class="hero__title">${BUSINESS.eslogan}</h1>
        <p class="hero__lead">${BUSINESS.descripcionCorta}</p>
        <div class="hero__actions">
          <a href="#cotizaciones" class="btn btn--primary btn--lg">🧾 Cotizar mis productos</a>
          <a href="${waLink('Hola Ferresur La 48, quiero hacer una consulta.')}"
             target="_blank" rel="noopener" class="btn btn--ghost btn--lg">💬 Escribir por WhatsApp</a>
        </div>
        <ul class="hero__points">
          <li>✓ Domicilios en Caldas y alrededores</li>
          <li>✓ Atención por WhatsApp</li>
          <li>✓ Para el hogar y la obra</li>
        </ul>
      </div>

      <div class="hero__media">
        <img src="/img/local-1.jpg" alt="Local de Ferresur La 48 en la Carrera 48, Caldas" />
      </div>
    </div>
  </section>`;
}
