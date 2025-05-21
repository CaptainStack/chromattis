import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  const base = isProduction ? '/chromattis/' : '/';

  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'build',
    },
    server: {
      host: true,
      port: 3000,
    },
  };
});
