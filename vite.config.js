import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        delimiters: ['${', '}'],
        isCustomElement: tag => tag.startsWith('my-'),
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
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
