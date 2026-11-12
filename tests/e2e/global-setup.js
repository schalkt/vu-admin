import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// fresh test data before every run: mock/seed → temp/e2e-db (the mock server reads it via MOCK_DB_DIR)
export default function globalSetup() {
  const seedDir = path.join(root, 'mock/seed');
  const dbDir = path.join(root, 'temp/e2e-db');

  fs.rmSync(dbDir, { recursive: true, force: true });
  fs.mkdirSync(dbDir, { recursive: true });

  for (const file of fs.readdirSync(seedDir).filter((name) => name.endsWith('.json'))) {
    fs.copyFileSync(path.join(seedDir, file), path.join(dbDir, file));
  }
}
