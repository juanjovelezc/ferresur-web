# Ferresur La 48 — Sitio web

Sitio web de la ferretería **Ferresur La 48** (Caldas, Antioquia). Hecho con **Vite + JavaScript vanilla**, full responsive y modular. Incluye una sección de **cotizaciones** que carga el inventario desde **n8n** y envía el pedido al **WhatsApp de Ferresur** mediante una automatización n8n + WhatsApp Cloud API.

## Secciones
Inicio (hero), Quiénes somos, Servicios, Ubicación (mapa), Horario, Cotizaciones, Contacto.

## Requisitos
- Node.js 18 o superior.

## Puesta en marcha
```bash
npm install
cp .env.example .env   # y edita las URLs
npm run dev            # entorno de desarrollo
npm run build          # genera /dist para producción
npm run preview        # previsualiza el build
```

## Variables de entorno (.env)
| Variable | Para qué sirve |
|---|---|
| `VITE_WHATSAPP_NUMERO` | Número de Ferresur (`573145851371`). Se usa para abrir WhatsApp con la cotización precargada. |

> El inventario ya **no** depende de n8n: es un JSON estático (`src/data/inventario.json`). Puedes ignorar/borrar `VITE_N8N_*`.

## Estructura
```
src/
  config.js            Datos del negocio y endpoints
  main.js              Monta la app
  style.css            Estilos (branding naranja/negro, responsive)
  data/content.js      Servicios, valores y FAQ (texto editable)
  services/
    api.js             Llamadas a los webhooks de n8n
    cart.js            Estado del carrito de cotización
  components/          Una sección por archivo (navbar, hero, about, services,
                       location, hours, quote, contact, footer)
  utils/format.js      Formato de moneda y escape
n8n/                   Workflows importables (inventario y cotización)
```

## Inventario (JSON estático, sin costo)
El catálogo se sirve desde `src/data/inventario.json`. Para generarlo o actualizarlo:

```bash
# Opción A (sostenible): desde el CSV exportado de tu software contable.
#   Coloca INVENTARIO2026.csv en la raíz del proyecto y corre:
npm run inventario

# Opción B (otra ruta de CSV):
node scripts/generar-inventario.mjs ruta/a/tu.csv

# Opción C (solo la primera vez, si aún tienes el webhook n8n activo):
node scripts/generar-inventario.mjs https://TU-N8N/webhook/ferresur-inventario
```

El script toma solo `nombre`, `precio` y `grupo` (no expone costos ni márgenes), escribe el JSON y luego haces `git push` para publicarlo. Los productos sin precio aparecen como **"Consultar"**.

## Cómo funcionan las cotizaciones
1. El cliente busca, filtra por grupo y agrega productos al carrito (datos del JSON local).
2. Llena nombre + teléfono y pulsa **Enviar cotización por WhatsApp**.
3. Se abre WhatsApp con la cotización precargada hacia el número de Ferresur (`+57 314 585 1371`); el cliente solo pulsa enviar.

Sin servidores ni servicios externos: todo es estático + `wa.me`.

## Despliegue
`npm run build` genera `/dist`. Súbelo a Netlify, Vercel, Cloudflare Pages o cualquier hosting estático. Define las variables `VITE_*` en el panel del hosting antes de construir.

## Personalizar
- Datos del negocio, horario y mapa → `src/config.js`.
- Servicios, valores y FAQ → `src/data/content.js`.
- Colores → variables CSS al inicio de `src/style.css`.
