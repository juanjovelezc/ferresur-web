// Configuración central del sitio. Datos del negocio y endpoints.
// Cambia aquí (o en el .env) sin tocar el resto del código.

export const BUSINESS = {
  nombre: 'Ferresur La 48',
  eslogan: 'Todo para tu obra y tu hogar, en la Carrera 48',
  descripcionCorta:
    'Ferretería de barrio en Caldas, Antioquia. Herramientas, materiales de construcción, pinturas, eléctricos y plomería — con atención de verdad y domicilio en la zona.',
  ciudad: 'Caldas, Antioquia',
  direccion: 'Cra. 48 # 131 SUR-74, Caldas, Antioquia',
  telefono: '+57 314 585 1371',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMERO || '573145851371',
  instagram: 'ferresurcaldas',
  instagramUrl: 'https://instagram.com/ferresurcaldas',
  email: 'ferresurla48@gmail.com',
  // Ubicación exacta tomada de Google Business (Plus Code 39R8+66).
  mapaEmbed:
    'https://www.google.com/maps?q=6.0905992,-75.6344114&z=17&output=embed',
  mapaLink: 'https://www.google.com/maps/place/Ferresur+La+48/@6.0905992,-75.6344114,17z'
};

export const HORARIO = [
  { dia: 'Lunes a Sábado', horas: '7:00 a.m. – 7:00 p.m.', abierto: true },
  { dia: 'Domingos', horas: '7:00 a.m. – 12:30 p.m.', abierto: true }
];

// Endpoints de n8n.
export const API = {
  inventarioUrl: import.meta.env.VITE_N8N_INVENTARIO_URL || '',
  cotizacionUrl: import.meta.env.VITE_N8N_COTIZACION_URL || ''
};

// Enlace wa.me de respaldo (si el webhook de cotización fallara).
export function waLink(texto = '') {
  const num = BUSINESS.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(texto)}`;
}
