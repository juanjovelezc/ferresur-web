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
| `VITE_N8N_INVENTARIO_URL` | Webhook GET de n8n que **devuelve** el inventario en JSON. |
| `VITE_N8N_COTIZACION_URL` | Webhook POST de n8n que **recibe** la cotización y la manda a WhatsApp. |
| `VITE_WHATSAPP_NUMERO` | Número de Ferresur (`573145851371`). Se usa como respaldo `wa.me` si el webhook falla. |

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

## Cómo funcionan las cotizaciones
1. La web hace `GET` a `VITE_N8N_INVENTARIO_URL` → n8n lee tu Google Sheet/Drive y responde el inventario.
2. El cliente busca, filtra por grupo y agrega productos al carrito.
3. Llena nombre + teléfono y pulsa **Enviar cotización por WhatsApp**.
4. La web hace `POST` a `VITE_N8N_COTIZACION_URL` con el detalle → n8n arma el mensaje y lo envía al WhatsApp de Ferresur (`+57 314 585 1371`).
5. Si el webhook no responde, la web abre automáticamente `wa.me` con la cotización precargada (respaldo).

## Configurar n8n
Importa los dos workflows de la carpeta `n8n/` en tu instancia.

**1 · Inventario** (`1-ferresur-inventario.workflow.json`)
- Conecta tus credenciales de Google Sheets y pon el ID de tu hoja en el nodo *Leer inventario*. Columnas sugeridas: `nombre`, `precio`, `grupo`.
- Si prefieres usar el CSV de Drive (INVENTARIO2026.csv), reemplaza ese nodo por *Google Drive → Download* + *Extract from File*.
- Copia la **Production URL** del webhook y pégala en `VITE_N8N_INVENTARIO_URL`.

**2 · Cotización** (`2-ferresur-cotizacion.workflow.json`)
- En el nodo *Enviar a WhatsApp* reemplaza `PHONE_NUMBER_ID` y `TU_TOKEN_PERMANENTE_DE_WHATSAPP` por los de tu app de Meta (WhatsApp Cloud API).
- Copia la **Production URL** del webhook y pégala en `VITE_N8N_COTIZACION_URL`.

> **Importante (WhatsApp Cloud API):** enviar un texto libre al número del dueño solo funciona dentro de la ventana de 24h desde que ese número escribió a la línea de negocio. Para notificaciones siempre fiables, crea y aprueba una **plantilla** (template) en Meta y cambia el `type` del mensaje a `template`. Para pruebas rápidas, escribe primero desde el WhatsApp de Ferresur a la línea de la API.

## Despliegue
`npm run build` genera `/dist`. Súbelo a Netlify, Vercel, Cloudflare Pages o cualquier hosting estático. Define las variables `VITE_*` en el panel del hosting antes de construir.

## Personalizar
- Datos del negocio, horario y mapa → `src/config.js`.
- Servicios, valores y FAQ → `src/data/content.js`.
- Colores → variables CSS al inicio de `src/style.css`.
