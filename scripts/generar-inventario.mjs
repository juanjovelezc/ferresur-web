#!/usr/bin/env node
/*
 * Genera src/data/inventario.json a partir del inventario de Ferresur.
 *
 * Dos modos:
 *   1) Desde el CSV local (sostenible, sin n8n):
 *        npm run inventario
 *      Lee "INVENTARIO2026.csv" en la raíz del proyecto.
 *      (o pasa otra ruta:  node scripts/generar-inventario.mjs ruta/al.csv )
 *
 *   2) Desde una URL que devuelva {productos:[...]} (p. ej. el webhook n8n,
 *      útil solo para la primera vez mientras n8n siga activo):
 *        node scripts/generar-inventario.mjs https://.../webhook/ferresur-inventario
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../src/data/inventario.json');

function round100(n) { return Math.round(n / 100) * 100; }

function cleanPrice(raw) {
  if (!raw) return null;
  const s = String(raw).replace(/\s/g, '').replace(/\$/g, '');
  if (s === '' || s === '-') return null;
  const intDigits = ((s.split(',')[0]).match(/\d+/g) || []).join('');
  if (!intDigits) return null;
  const n = parseInt(intDigits, 10);
  if (!n) return null;
  return round100(n);
}

function cleanGroup(g) {
  return (g || '').replace(/^\s*\d+\s*-\s*/, '').trim().toUpperCase() || 'SIN GRUPO';
}

// Parsea el export contable separado por ';' (cada producto inicia con "P-Producto;").
function parseCsv(text) {
  const parts = text.split('P-Producto;');
  const productos = [];
  let idc = 0;
  for (const chunk of parts) {
    if (!chunk || chunk.indexOf(';') === -1) continue;
    const f = chunk.split(';');
    const grpRaw = (f[0] || '').trim();
    if (!/^\d+\s*-/.test(grpRaw)) continue; // descarta el encabezado
    const nombre = (f[2] || '').trim();
    if (!nombre) continue;
    productos.push({
      id: (f[1] || idc).toString().trim(),
      nombre,
      precio: cleanPrice(f[34]), // campo PRECIO DE VENTA
      grupo: cleanGroup(grpRaw)
    });
    idc++;
  }
  return productos;
}

async function main() {
  const arg = process.argv[2] || 'INVENTARIO2026.csv';
  let productos;

  if (/^https?:\/\//.test(arg)) {
    console.log('Descargando inventario desde:', arg);
    const res = await fetch(arg);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    productos = Array.isArray(data?.productos)
      ? data.productos
      : (Array.isArray(data) ? data : []);
  } else {
    const ruta = resolve(process.cwd(), arg);
    console.log('Leyendo CSV:', ruta);
    const text = await readFile(ruta, 'utf8');
    productos = parseCsv(text);
  }

  const out = {
    actualizado: new Date().toISOString(),
    total: productos.length,
    productos
  };
  await writeFile(OUT, JSON.stringify(out, null, 2), 'utf8');
  console.log(`OK: ${productos.length} productos -> src/data/inventario.json`);
}

main().catch((e) => {
  console.error('Error:', e.message);
  process.exit(1);
});
