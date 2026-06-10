// Capa de datos del inventario.
// Ahora el inventario es un JSON estático que se genera con:
//    npm run inventario
// (ver scripts/generar-inventario.mjs). Sin servicios externos ni costo.

import inventario from '../data/inventario.json';

function normalizeProduct(raw, idx) {
  const name = raw.name ?? raw.nombre ?? raw.producto ?? raw.descripcion ?? '';
  const priceRaw = raw.price ?? raw.precio ?? raw.precioVenta ?? raw.valor ?? null;
  const price =
    priceRaw == null || priceRaw === ''
      ? null
      : Number(String(priceRaw).replace(/[^\d]/g, '')) || null;
  const group = raw.group ?? raw.grupo ?? raw.categoria ?? raw.seccion ?? 'GENERAL';
  return {
    id: raw.id ?? raw.codigo ?? raw.sku ?? idx,
    name: String(name).trim(),
    price,
    group: String(group).trim().toUpperCase() || 'GENERAL'
  };
}

/**
 * Devuelve el inventario (array de productos normalizados) desde el JSON local.
 */
export async function getInventario() {
  const data = Array.isArray(inventario?.productos) ? inventario.productos : [];
  return data.map(normalizeProduct).filter((p) => p.name);
}
