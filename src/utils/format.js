// Utilidades de formato y escape.

export function formatCOP(n) {
  return '$ ' + (Number(n) || 0).toLocaleString('es-CO');
}

export function esc(t) {
  return String(t == null ? '' : t).replace(/[&<>]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])
  );
}

export function escAttr(t) {
  return String(t == null ? '' : t).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

// Redondea hacia los $100 más cercanos (igual que el catálogo interno).
export function round100(n) {
  return Math.round(n / 100) * 100;
}
