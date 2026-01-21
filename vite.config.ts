import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      base: '/Alvoraz/',
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@app': path.resolve(__dirname, './src/app'),
          '@assets': path.resolve(__dirname, './src/assets'),
          '@constants': path.resolve(__dirname, './src/constants'),
          '@components': path.resolve(__dirname, './src/pages/components'),
          '@screens': path.resolve(__dirname, './src/pages/screens'),
          '@app-types': path.resolve(__dirname, './src/types')
        }
      }
    };
});