import { defineConfig } from 'vite';

// Configuración base de Vite.
// `base: './'` deja las rutas relativas para que el sitio funcione
// igual desplegado en la raíz de un dominio o en un subdirectorio.
export default defineConfig({
  base: './',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2018'
  }
});
