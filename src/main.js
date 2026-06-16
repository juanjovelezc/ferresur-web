import './style.css';

import { Navbar, initNavbar } from './components/navbar.js';
import { Hero } from './components/hero.js';
import { About } from './components/about.js';
import { Services } from './components/services.js';
import { Featured } from './components/featured.js';
import { Location } from './components/location.js';
import { Hours } from './components/hours.js';
import { Quote, initQuote } from './components/quote.js';
import { Contact } from './components/contact.js';
import { Footer } from './components/footer.js';

const app = document.getElementById('app');

app.innerHTML = [
  Navbar(),
  Hero(),
  About(),
  Services(),
  Featured(),
  Location(),
  Hours(),
  Quote(),
  Contact(),
  Footer()
].join('');

// Inicializar comportamiento de cada módulo.
initNavbar();
initQuote();
