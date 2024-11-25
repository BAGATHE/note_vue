import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // Alias pour le dossier source
    },
  },
  server: {
    historyApiFallback: true, // Assure que les routes SPA fonctionnent
  },
  build: {
    rollupOptions: {
      input: './src/main.js', // Point d'entrée explicite
    },
  },
});
