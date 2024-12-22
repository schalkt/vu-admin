import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { version } from './package.json'
import crypto from 'crypto';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        // isCustomElement: tag => tag.startsWith('my-'),
        whitespace: 'condense'
      }
    }
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VuAdmin',
      fileName: (format) => `vu-admin.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'crypto'],
      output: {
        globals: {
          vue: 'Vue',
          crypto: 'crypto',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css')
            return 'vu-admin.css';
          return assetInfo.name;
        },
      }
    }
  }
});
