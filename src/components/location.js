import { BUSINESS } from '../config.js';

export function Location() {
  return `
  <section class="section" id="ubicacion">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Ubicación</span>
        <h2 class="section__title">Estamos en la Carrera 48</h2>
        <p class="section__lead">En pleno corredor ferretero de Caldas, Antioquia. Fácil de llegar.</p>
      </header>

      <div class="location">
        <div class="location__map">
          <iframe
            title="Ubicación de Ferresur La 48"
            src="${BUSINESS.mapaEmbed}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen></iframe>
        </div>
        <aside class="location__info">
          <div class="info-row">
            <span class="info-row__ic">📍</span>
            <div>
              <strong>Dirección</strong>
              <p>${BUSINESS.direccion}</p>
            </div>
          </div>
          <div class="info-row">
            <span class="info-row__ic">📞</span>
            <div>
              <strong>Teléfono / WhatsApp</strong>
              <p>${BUSINESS.telefono}</p>
            </div>
          </div>
          <div class="info-row">
            <span class="info-row__ic">📷</span>
            <div>
              <strong>Instagram</strong>
              <p><a href="${BUSINESS.instagramUrl}" target="_blank" rel="noopener">@${BUSINESS.instagram}</a></p>
            </div>
          </div>
          <a href="${BUSINESS.mapaLink}" target="_blank" rel="noopener" class="btn btn--primary btn--block">
            Cómo llegar →
          </a>
        </aside>
      </div>
    </div>
  </section>`;
}
