// Configuración central del sitio. Datos del negocio y endpoints.
// Cambia aquí (o en el .env) sin tocar el resto del código.

export const BUSINESS = {
  nombre: 'Ferresur La 48',
  eslogan: 'Todo para tu obra y tu hogar, en la Carrera 48',
  descripcionCorta:
    'Ferretería de barrio en Caldas, Antioquia. Herramientas, materiales de construcción, pinturas, eléctricos y plomería — con atención de verdad y domicilio en la zona.',
  ciudad: 'Caldas, Antioquia',
  direccion: 'Carrera 48, Caldas (Antioquia)',
  telefono: '+57 314 585 1371',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMERO || '573145851371',
  instagram: 'ferresurcaldas',
  instagramUrl: 'https://instagram.com/ferresurcaldas',
  email: 'ferresurla48@gmail.com',
  // Coordenadas aproximadas de Caldas, Antioquia (ajústalas a la ubicación exacta).
  mapaEmbed:
    'https://www.google.com/maps?q=Carrera+48+Caldas+Antioquia&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+48+Caldas+Antioquia'
};

export const HORARIO = [
  { dia: 'Lunes a Viernes', horas: '7:30 a.m. – 6:30 p.m.', abierto: true },
  { dia: 'Sábados', horas: '7:30 a.m. – 5:00 p.m.', abierto: true },
  { dia: 'Domingos y festivos', horas: 'Cerrado', abierto: false }
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
