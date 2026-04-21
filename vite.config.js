import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { version } from './package.json'
import { createMockMiddleware } from './mock/middleware.js';

const useMock = process.env.VITE_MOCK !== 'false';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  server: {},
  plugins: [
    {
      name: 'custom-api',
      configureServer(server) {

        const delay = 500;

        if (useMock) {
          createMockMiddleware(server, { delay });
        }

        server.middlewares.use('/password/forgot', (req, res, next) => {
          if (req.method !== 'POST') return next();

          let body = '';
          req.on('data', chunk => (body += chunk));
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            setTimeout(() => {
              try {
                const { username } = JSON.parse(body);
                if (!username) {
                  res.statusCode = 400;
                  return res.end(JSON.stringify({ email: { sent: false }, message: 'Username is required' }));
                }
                res.end(JSON.stringify({ email: { sent: true }, message: 'E-mail sent' }));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ email: { sent: false }, message: 'Error' }));
              }
            }, delay);
          });
        });

        server.middlewares.use('/password/update', (req, res, next) => {
          if (req.method !== 'POST') return next();

          let body = '';
          req.on('data', chunk => (body += chunk));
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            setTimeout(() => {
              try {
                const { password, token } = JSON.parse(body);
                if (!password || !token) {
                  res.statusCode = 400;
                  return res.end(JSON.stringify({ password: { updated: false }, message: 'Password and token are required' }));
                }
                res.end(JSON.stringify({ password: { updated: true }, message: 'Password updated' }));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ password: { updated: false }, message: 'Error' }));
              }
            }, delay);
          });
        });
      }
    },
    vue({
      template: {
        compilerOptions: {
          whitespace: 'condense'
        }
      }
    })
  ],
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
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? assetInfo.names?.[0];
          if (name === 'style.css') return 'vu-admin.css';
          return name ?? '[name].[ext]';
        },
      }
    }
  }
});
