import { defineConfig } from '@playwright/test';

// e2e tests against the mock server: an own Vite dev server on port 5174 with a fresh copy of the seed data
// (temp/e2e-db, the dev data in mock/db stays untouched) and no simulated network delay.
// Runs in the installed Google Chrome (channel: 'chrome'), no browser download needed.
const PORT = 5174;

export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/e2e/global-setup.js',
  // the tests share one mock db: run them one after the other
  workers: 1,
  fullyParallel: false,
  timeout: 30000,
  expect: { timeout: 7000 },
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: 'chrome',
    headless: true,
    viewport: { width: 1600, height: 900 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npx vite --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: false,
    timeout: 60000,
    env: {
      MOCK_DB_DIR: 'temp/e2e-db',
      MOCK_DELAY: '0',
    },
  },
});
