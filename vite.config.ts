import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
      alias: {
          assets: '/src/assets',
          constants: '/src/constants',
          util: '/src/public/util',
          public: '/src/public',
          pages: '/src/pages',
          components: '/src/components',
      },
  },
})
