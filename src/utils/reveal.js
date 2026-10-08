// Animación de aparición al hacer scroll (reveal on scroll).
// Marca los elementos con .reveal y los revela con .is-visible
// cuando entran en el viewport (IntersectionObserver).

const DEFAULT_SELECTORS = [
  '.section__head',
  '.value',
  '.service',
  '.feat',
  '.hours',
  '.location__map',
  '.location__info',
  '.contact__card',
  '.faq'
].join(',');

export function initReveal(selector = DEFAULT_SELECTORS) {
  const els = Array.from(document.querySelectorAll(selector));
  els.forEach((el) => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => io.observe(el));
}
