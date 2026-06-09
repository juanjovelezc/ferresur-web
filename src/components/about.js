import { VALORES } from '../data/content.js';
import { esc } from '../utils/format.js';

export function About() {
  const cards = VALORES.map(
    (v) => `
    <article class="value">
      <h3>${esc(v.titulo)}</h3>
      <p>${esc(v.texto)}</p>
    </article>`
  ).join('');

  return `
  <section class="section" id="nosotros">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Quiénes somos</span>
        <h2 class="section__title">Una ferretería de barrio, sin vueltas</h2>
        <p class="section__lead">
          Ferresur La 48 está en la Carrera 48, el corredor ferretero de Caldas (Antioquia).
          Surtimos al vecino que arregla algo en casa y al maestro que necesita material para su obra.
          Lo que nos diferencia es simple: respondemos, asesoramos de verdad y entregamos rápido.
        </p>
      </header>
      <div class="values">${cards}</div>
    </div>
  </section>`;
}
