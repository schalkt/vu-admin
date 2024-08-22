import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
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
        isCustomElement: tag => tag.startsWith('my-'),
        whitespace: 'condense'
      }
    }
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VuAdmin',
      fileName: (format) => `vu-admin.${ format }.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
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
