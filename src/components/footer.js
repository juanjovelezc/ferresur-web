import { BUSINESS } from '../config.js';

export function Footer() {
  const year = new Date().getFullYear();
  return `
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="brand__mark">F</span>
        <span>Ferresur <strong>La 48</strong></span>
      </div>
      <nav class="footer__links">
        <a href="#nosotros">Quiénes somos</a>
        <a href="#servicios">Servicios</a>
        <a href="#destacados">Productos</a>
        <a href="#ubicacion">Ubicación</a>
        <a href="#horario">Horario</a>
        <a href="#cotizaciones">Cotizaciones</a>
      </nav>
      <p class="footer__meta">
        ${BUSINESS.direccion} · ${BUSINESS.telefono}<br>
        © ${year} ${BUSINESS.nombre}. Todos los derechos reservados.
      </p>
    </div>
  </footer>

  <a class="wa-float" href="https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}"
     target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">💬</a>`;
}
