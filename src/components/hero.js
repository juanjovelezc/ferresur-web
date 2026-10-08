import { BUSINESS, waLink } from '../config.js';
import { estaAbiertoAhora } from './hours.js';
import { icon } from '../utils/icons.js';

export function Hero() {
  const abierto = estaAbiertoAhora();
  return `
  <section class="hero" id="inicio">
    <div class="container hero__inner">
      <div class="hero__copy">
        <span class="hero__badge">Ferretería · ${BUSINESS.ciudad}</span>
        <h1 class="hero__title">${BUSINESS.eslogan}</h1>
        <p class="hero__lead">${BUSINESS.descripcionCorta}</p>
        <div class="hero__actions">
          <a href="#cotizaciones" class="btn btn--primary btn--lg">${icon('cart')}Cotizar mis productos</a>
          <a href="${waLink('Hola Ferresur La 48, quiero hacer una consulta.')}"
             target="_blank" rel="noopener" class="btn btn--ghost btn--lg">${icon('whatsapp')}Escribir por WhatsApp</a>
        </div>
        <ul class="hero__points">
          <li>${icon('check', 'ic ic--check')}Domicilios en Caldas y alrededores</li>
          <li>${icon('check', 'ic ic--check')}Atención por WhatsApp</li>
          <li>${icon('check', 'ic ic--check')}Para el hogar y la obra</li>
        </ul>
      </div>

      <div class="hero__media">
        <img src="/img/local-1.webp" alt="Local de Ferresur La 48 en la Carrera 48, Caldas" width="1600" height="1200" fetchpriority="high" />
        <div class="hero__media-overlay" aria-hidden="true"></div>
        <div class="hero__float hero__float--status ${abierto ? 'is-open' : 'is-closed'}">
          <span class="dot" aria-hidden="true"></span>${abierto ? 'Abierto ahora' : 'Cerrado ahora'}
        </div>
        <div class="hero__float hero__float--stat">
          <strong>5.700+</strong>
          <span>productos en catálogo</span>
        </div>
      </div>
    </div>
  </section>`;
}
