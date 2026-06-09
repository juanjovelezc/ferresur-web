import { BUSINESS, waLink } from '../config.js';
import { FAQ } from '../data/content.js';
import { esc } from '../utils/format.js';

export function Contact() {
  const faqs = FAQ.map(
    (f) => `
    <details class="faq">
      <summary>${esc(f.p)}</summary>
      <p>${esc(f.r)}</p>
    </details>`
  ).join('');

  return `
  <section class="section" id="contacto">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Contacto</span>
        <h2 class="section__title">Hablemos</h2>
        <p class="section__lead">La forma más rápida es WhatsApp. También puedes pasar por el local en la Carrera 48.</p>
      </header>

      <div class="contact">
        <div class="contact__cards">
          <a class="contact__card" href="${waLink('Hola Ferresur La 48 👋')}" target="_blank" rel="noopener">
            <span class="contact__ic">💬</span>
            <strong>WhatsApp</strong>
            <span>${BUSINESS.telefono}</span>
          </a>
          <a class="contact__card" href="${BUSINESS.instagramUrl}" target="_blank" rel="noopener">
            <span class="contact__ic">📷</span>
            <strong>Instagram</strong>
            <span>@${BUSINESS.instagram}</span>
          </a>
          <a class="contact__card" href="${BUSINESS.mapaLink}" target="_blank" rel="noopener">
            <span class="contact__ic">📍</span>
            <strong>Local</strong>
            <span>${BUSINESS.direccion}</span>
          </a>
        </div>

        <div class="contact__faq">
          <h3>Preguntas frecuentes</h3>
          ${faqs}
        </div>
      </div>
    </div>
  </section>`;
}
