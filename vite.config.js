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
      }
    }
  },
  plugins: [
    {
      name: 'custom-api',
      configureServer(server) {
        server.middlewares.use('/password/forgot', (req, res, next) => {
          if (req.method === 'POST') {
            
            let body = '';

            req.on('data', chunk => (body += chunk));
            req.on('end', () => {
                try {
                    const jsonData = JSON.parse(body);
                    const username = jsonData.username; // Itt kapod meg az emailt
                    
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Vite POST sikeres', username }));
                } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
            
          } else {
            next();
          }
        });
      }
    },
    vue({
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
