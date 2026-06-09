import { HORARIO } from '../config.js';
import { esc } from '../utils/format.js';

// Devuelve true si el negocio está abierto ahora (hora de Colombia, UTC-5).
function estaAbiertoAhora() {
  const ahora = new Date();
  // Convertir a hora de Colombia sin depender de la zona del navegador.
  const co = new Date(ahora.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  const dia = co.getDay(); // 0 dom ... 6 sab
  const min = co.getHours() * 60 + co.getMinutes();
  if (dia === 0) return false; // domingo
  if (dia === 6) return min >= 450 && min <= 1020; // sáb 7:30–17:00
  return min >= 450 && min <= 1110; // L-V 7:30–18:30
}

export function Hours() {
  const abierto = estaAbiertoAhora();
  const filas = HORARIO.map(
    (h) => `
    <li class="${h.abierto ? '' : 'is-closed'}">
      <span>${esc(h.dia)}</span>
      <span>${esc(h.horas)}</span>
    </li>`
  ).join('');

  return `
  <section class="section section--alt" id="horario">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Horario</span>
        <h2 class="section__title">¿Cuándo abrimos?</h2>
      </header>

      <div class="hours">
        <div class="hours__status ${abierto ? 'is-open' : 'is-closed'}">
          <span class="dot"></span>
          ${abierto ? 'Abierto ahora' : 'Cerrado ahora'}
        </div>
        <ul class="hours__list">${filas}</ul>
        <p class="hours__note">Horario referencial (hora de Colombia). En festivos podemos variar; confírmanos por WhatsApp.</p>
      </div>
    </div>
  </section>`;
}
