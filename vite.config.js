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
        const delay = 5000; // 5 másodperc késleltetés

        server.middlewares.use('/password/forgot', (req, res, next) => {
          if (req.method === 'POST') {

            let body = '';

            req.on('data', chunk => (body += chunk));
            req.on('end', () => {

              res.setHeader('Content-Type', 'application/json');

              setTimeout(async () => {
                try {
                  const jsonData = JSON.parse(body);
                  const username = jsonData.username;

                  if (!username) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ email: { sent: false }, message: 'Username is required' }));
                    return;
                  }
                  
                  res.end(JSON.stringify({ email: { sent: true }, message: 'E-mail sent' }));
                } catch (error) {
                  console.log(error);
                  res.statusCode = 400;
                  res.end(JSON.stringify({ email: { sent: false }, message: 'Error' }));
                }
              }, delay);

            });

          } else {
            next();
          }
        });

        server.middlewares.use('/password/update', (req, res, next) => {
          if (req.method === 'POST') {

            let body = '';

            req.on('data', chunk => (body += chunk));
            req.on('end', () => {

              res.setHeader('Content-Type', 'application/json');

              setTimeout(async () => {
                try {
                  const jsonData = JSON.parse(body);
                  const password = jsonData.password;
                  const token = jsonData.token;

                  if (password || !token) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ password: { updated: false }, message: 'Password and token are required' }));
                    return;
                  }
                  
                  res.end(JSON.stringify({ password: { updated: true }, message: 'Password updated' }));
                } catch (error) {
                  console.log(error);
                  res.statusCode = 400;
                  res.end(JSON.stringify({ password: { updated: false }, message: 'Error' }));
                }
              }, delay);

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
