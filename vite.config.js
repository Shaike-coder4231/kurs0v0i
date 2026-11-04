import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/kurs0v0i/', // Имя вашего репозитория на GitHub
});
