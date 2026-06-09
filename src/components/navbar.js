import { BUSINESS } from '../config.js';

export function Navbar() {
  return `
  <header class="nav" id="nav">
    <div class="container nav__inner">
      <a href="#inicio" class="brand" aria-label="${BUSINESS.nombre}">
        <span class="brand__mark">F</span>
        <span class="brand__txt">Ferresur <strong>La 48</strong></span>
      </a>

      <button class="nav__toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

      <nav class="nav__links" id="navLinks">
        <a href="#nosotros">Quiénes somos</a>
        <a href="#servicios">Servicios</a>
        <a href="#ubicacion">Ubicación</a>
        <a href="#horario">Horario</a>
        <a href="#contacto">Contacto</a>
        <a href="#cotizaciones" class="btn btn--sm btn--primary">Cotizar</a>
      </nav>
    </div>
  </header>`;
}

export function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const nav = document.getElementById('nav');

  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Cierra el menú al pulsar un enlace (móvil).
  links?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  // Sombra al hacer scroll.
  const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
