import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/softstore-react/', // Имя вашего репозитория на GitHub
});