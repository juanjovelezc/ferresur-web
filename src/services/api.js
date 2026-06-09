// Capa de datos: habla con los webhooks de n8n.
//  - getInventario(): GET al webhook que devuelve el inventario.
//  - enviarCotizacion(): POST al webhook que manda la cotización al WhatsApp de Ferresur.

import { API } from '../config.js';

/**
 * Normaliza un producto sin importar el formato exacto que devuelva n8n.
 * Acepta llaves comunes (nombre/name, precio/price, grupo/group/categoria).
 */
function normalizeProduct(raw, idx) {
  const name =
    raw.name ?? raw.nombre ?? raw.producto ?? raw.descripcion ?? '';
  const priceRaw =
    raw.price ?? raw.precio ?? raw.precioVenta ?? raw.valor ?? null;
  const price =
    priceRaw == null || priceRaw === ''
      ? null
      : Number(String(priceRaw).replace(/[^\d]/g, '')) || null;
  const group =
    raw.group ?? raw.grupo ?? raw.categoria ?? raw.seccion ?? 'GENERAL';
  return {
    id: raw.id ?? raw.codigo ?? raw.sku ?? idx,
    name: String(name).trim(),
    price,
    group: String(group).trim().toUpperCase() || 'GENERAL'
  };
}

/**
 * Trae el inventario desde n8n. Devuelve un array de productos normalizados.
 * Soporta que el webhook responda con un array directo o con { productos: [...] }.
 */
export async function getInventario() {
  if (!API.inventarioUrl) {
    throw new Error(
      'No hay URL de inventario configurada. Define VITE_N8N_INVENTARIO_URL en el .env.'
    );
  }
  const res = await fetch(API.inventarioUrl, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });
  if (!res.ok) throw new Error('El inventario no respondió (HTTP ' + res.status + ').');

  let data = await res.json();
  if (Array.isArray(data?.productos)) data = data.productos;
  if (Array.isArray(data?.data)) data = data.data;
  if (!Array.isArray(data)) throw new Error('Formato de inventario inesperado.');

  return data
    .map(normalizeProduct)
    .filter((p) => p.name); // descarta filas sin nombre
}

/**
 * Envía la cotización al webhook de n8n.
 * @param {Object} payload { cliente, items, total }
 */
export async function enviarCotizacion(payload) {
  if (!API.cotizacionUrl) {
    throw new Error(
      'No hay URL de cotización configurada. Define VITE_N8N_COTIZACION_URL en el .env.'
    );
  }
  const res = await fetch(API.cotizacionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('El envío falló (HTTP ' + res.status + ').');
  // n8n puede responder vacío; no forzamos JSON.
  try {
    return await res.json();
  } catch {
    return { ok: true };
  }
}
