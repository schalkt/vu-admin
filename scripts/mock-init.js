/**
 * Mock adatbázis inicializáló
 *
 * Használat:
 *   npm run mock:seed    — törli és újra feltölti seed adatokkal
 *   npm run mock:reset   — csak törli (üres db fájlokat hagy)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedDir = path.join(__dirname, '../mock/seed');
const dbDir = path.join(__dirname, '../mock/db');

const args = process.argv.slice(2);
const withSeed = args.includes('--seed');
const onlyReset = args.includes('--reset');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const seedFiles = fs.readdirSync(seedDir).filter(f => f.endsWith('.json'));

for (const file of seedFiles) {
  const dbFile = path.join(dbDir, file);

  if (onlyReset && !withSeed) {
    fs.writeFileSync(dbFile, '[]', 'utf-8');
    console.log(`[reset] ${file} → üres`);
  } else {
    const seed = fs.readFileSync(path.join(seedDir, file), 'utf-8');
    fs.writeFileSync(dbFile, seed, 'utf-8');
    const count = JSON.parse(seed).length;
    console.log(`[seed]  ${file} → ${count} rekord`);
  }
}

console.log('Kész.');
