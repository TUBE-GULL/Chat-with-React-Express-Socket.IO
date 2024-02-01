// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// 
// https://vitejs.dev/config/
// export default defineConfig({
// plugins: [react()],
// server: {
// proxy: {
// Проксируем все запросы на Express сервер
// '/': 'http://localhost:8080',
// },
// },
// });
// 

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Проксируем все запросы на Express сервер
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
