import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbDir = path.join(__dirname, 'db');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// --- Captcha ---
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || 'vu-admin-dev-secret-change-in-prod';
const CAPTCHA_BUCKET = 300; // seconds per time window (5 min)
const CAPTCHA_ICONS = [
  { id: 'house',     icon: 'bi-house-fill',      label: 'ház' },
  { id: 'star',      icon: 'bi-star-fill',        label: 'csillag' },
  { id: 'heart',     icon: 'bi-heart-fill',       label: 'szív' },
  { id: 'bell',      icon: 'bi-bell-fill',         label: 'csengő' },
  { id: 'camera',    icon: 'bi-camera-fill',       label: 'kamera' },
  { id: 'cloud',     icon: 'bi-cloud-fill',        label: 'felhő' },
  { id: 'sun',       icon: 'bi-sun-fill',          label: 'nap' },
  { id: 'moon',      icon: 'bi-moon-stars-fill',   label: 'hold' },
  { id: 'tree',      icon: 'bi-tree-fill',         label: 'fa' },
  { id: 'lightning', icon: 'bi-lightning-fill',    label: 'villám' },
  { id: 'flower',    icon: 'bi-flower1',           label: 'virág' },
  { id: 'car',       icon: 'bi-car-front-fill',    label: 'autó' },
];

function captchaBucket() {
  return Math.floor(Date.now() / 1000 / CAPTCHA_BUCKET);
}

function signCaptcha(answers, bucket) {
  const key = [...answers].sort().join(',') + ':' + bucket;
  return crypto.createHmac('sha256', CAPTCHA_SECRET).update(key).digest('hex');
}

function verifyCaptcha(answers, token) {
  if (!answers || !token) return false;
  const list = Array.isArray(answers) ? answers : String(answers).split(',').map(s => s.trim());
  if (list.length !== 1) return false;
  const b = captchaBucket();
  return signCaptcha(list, b) === token || signCaptcha(list, b - 1) === token;
}

// --- 2FA session store (in-memory, TTL 5 min) ---
const twoFaStore = new Map();

function twoFaCreate(userId) {
  const session = crypto.randomBytes(32).toString('hex');
  const code = String(Math.floor(100000 + Math.random() * 900000));
  twoFaStore.set(session, { userId, code, expires: Date.now() + 5 * 60 * 1000 });
  return { session, code };
}

const PALETTE = ['#4e79a7','#f28e2b','#e15759','#76b7b2','#59a14f','#edc948','#b07aa1','#ff9da7','#9c755f','#6b6ecf'];

function pickColor(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = text.charCodeAt(i) + ((h << 5) - h);
  return PALETTE[Math.abs(h) % PALETTE.length];
}

function avatarSvg(initials, size = 128) {
  const bg = pickColor(initials);
  const fs2 = Math.round(size * 0.38);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${bg}"/><text x="${size/2}" y="${size/2}" text-anchor="middle" dy=".35em" font-family="sans-serif" font-size="${fs2}" font-weight="bold" fill="white">${initials.toUpperCase()}</text></svg>`;
}

function thumbSvg(label, size = 200) {
  const bg = pickColor(label);
  const fs2 = Math.round(size * 0.14);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="6" fill="${bg}"/><text x="${size/2}" y="${size/2}" text-anchor="middle" dy=".35em" font-family="sans-serif" font-size="${fs2}" fill="rgba(255,255,255,0.85)">${label}</text></svg>`;
}

function readDb(entity) {
  const file = path.join(dbDir, entity + '.json');
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function writeDb(entity, data) {
  fs.writeFileSync(path.join(dbDir, entity + '.json'), JSON.stringify(data, null, 2), 'utf-8');
}

function nextId(items) {
  return items.length ? Math.max(...items.map(i => i.id || 0)) + 1 : 1;
}

function readBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', c => (body += c));
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

function send(res, data, status = 200, delay = 0) {
  setTimeout(() => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  }, delay);
}

const UPLOAD_MIME = {
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.pdf':  'application/pdf',
};

function parseMultipart(buffer, boundary) {
  const delim = Buffer.from('\r\n--' + boundary);
  const parts = [];
  let pos = buffer.indexOf('--' + boundary);
  if (pos === -1) return parts;
  pos += ('--' + boundary).length + 2; // skip first delimiter + \r\n

  while (pos < buffer.length) {
    const nextDelim = buffer.indexOf(delim, pos);
    const end = nextDelim === -1 ? buffer.length : nextDelim;

    const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), pos);
    if (headerEnd === -1 || headerEnd >= end) break;

    const headerStr = buffer.slice(pos, headerEnd).toString('latin1');
    const body = buffer.slice(headerEnd + 4, end);

    const dispMatch = headerStr.match(/Content-Disposition:[^\r\n]*?\bname="([^"]+)"(?:;\s*filename="([^"]*)")?/i);
    const typeMatch = headerStr.match(/Content-Type:\s*([^\r\n]+)/i);

    if (dispMatch) {
      parts.push({
        name: dispMatch[1],
        filename: dispMatch[2] || null,
        mime: typeMatch ? typeMatch[1].trim() : 'application/octet-stream',
        data: body,
      });
    }

    if (nextDelim === -1) break;
    pos = nextDelim + delim.length + 2;
    // check for closing --
    if (buffer.slice(pos - 2, pos).toString() === '--') break;
  }

  return parts;
}

export function createMockMiddleware(server, { delay = 500 } = {}) {

  if (!fs.existsSync(dbDir)) {
    console.warn('[mock] A mock/db/ mappa nem létezik. Futtasd: npm run mock:init');
  }

  // --- Feltöltött fájlok kiszolgálása: GET /mock/uploads/:filename ---
  server.middlewares.use('/mock/uploads', (req, res, next) => {
    const filename = (req.url || '/').split('?')[0].replace(/^\//, '');
    if (!filename) return next();
    const filepath = path.join(uploadsDir, filename);
    if (!fs.existsSync(filepath)) return next();
    const ext = path.extname(filename).toLowerCase();
    res.setHeader('Content-Type', UPLOAD_MIME[ext] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.end(fs.readFileSync(filepath));
  });

  // --- Fájl feltöltés: POST /api/upload ---
  server.middlewares.use('/api/upload', (req, res, next) => {
    if (req.method !== 'POST') return next();

    const ct = req.headers['content-type'] || '';
    const boundaryMatch = ct.match(/boundary=([^\s;]+)/);

    // multipart/form-data kezelés
    if (boundaryMatch) {
      const boundary = boundaryMatch[1];
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const parts = parseMultipart(buffer, boundary);
        const saved = [];

        for (const part of parts) {
          if (!part.filename) continue;
          const ext = path.extname(part.filename).toLowerCase() || '.bin';
          const unique = Date.now() + '-' + Math.random().toString(36).slice(2);
          const filename = unique + ext;
          fs.writeFileSync(path.join(uploadsDir, filename), part.data);
          saved.push({ name: part.name, filename, url: '/mock/uploads/' + filename, mime: part.mime });
        }

        setTimeout(() => send(res, { files: saved }, 200), delay);
      });
      return;
    }

    // JSON body kezelés (data URL alapú feltöltés fallback)
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const saved = [];

        for (const [fieldName, files] of Object.entries(payload)) {
          if (!Array.isArray(files)) continue;
          for (const file of files) {
            for (const [typeKey, typeData] of Object.entries(file.types || {})) {
              if (!typeData.data || !typeData.data.startsWith('data:')) continue;
              const [header, b64] = typeData.data.split(',');
              const mimeMatch = header.match(/data:([^;]+)/);
              const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
              const ext = '.' + (typeData.extension || 'bin');
              const filename = (typeData.slug || typeKey) + ext;
              const filepath = path.join(uploadsDir, filename);
              fs.writeFileSync(filepath, Buffer.from(b64, 'base64'));
              saved.push({ name: fieldName, type: typeKey, filename, url: '/mock/uploads/' + filename, mime });
            }
          }
        }

        setTimeout(() => send(res, { files: saved }, 200), delay);
      } catch {
        send(res, { message: 'Invalid payload' }, 400);
      }
    });
  });

  // --- Lokális SVG avatar: GET /mock/avatar/:initials ---
  server.middlewares.use('/mock/avatar', (req, res, next) => {
    const initials = (req.url || '/').split('?')[0].replace(/^\//, '') || '?';
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.end(avatarSvg(initials));
  });

  // --- Lokális SVG termék thumbnail: GET /mock/thumb/:label ---
  server.middlewares.use('/mock/thumb', (req, res, next) => {
    const label = decodeURIComponent((req.url || '/').split('?')[0].replace(/^\//, '')) || '?';
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.end(thumbSvg(label));
  });

  // --- Captcha: GET /api/auth/captcha ---
  server.middlewares.use('/api/auth/captcha', (req, res, next) => {
    if (req.method !== 'GET') return next();
    const pool = [...CAPTCHA_ICONS].sort(() => Math.random() - 0.5).slice(0, 8);
    const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 1);
    const items = [...pool].sort(() => Math.random() - 0.5);
    const token = signCaptcha(picked.map(p => p.id), captchaBucket());
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({
      items,
      question: `Kattints a(z) <strong>${picked[0].label}</strong> ikonra!`,
      token,
    }));
  });

  // --- Auth endpoints: /api/auth/* ---
  server.middlewares.use('/api/auth', async (req, res, next) => {
    const action = (req.url || '/').split('?')[0].replace(/^\//, '').split('/')[0];

    if (action === 'login' && req.method === 'POST') {
      const body = await readBody(req);
      if (body.honeypot) return send(res, { message: 'Hibás felhasználónév vagy jelszó' }, 401, delay);
      if (!verifyCaptcha(body.captchaAnswer, body.captchaToken)) return send(res, { message: 'Érvénytelen captcha megoldás' }, 422, delay);
      const users = readDb('users') || [];
      const user = users.find(u => u.username === body.username || u.email === body.username);
      if (!user) return send(res, { message: 'Hibás felhasználónév vagy jelszó' }, 401, delay);
      if (user.twofa) {
        const { session, code } = twoFaCreate(user.id);
        console.log(`[mock 2FA] OTP for ${user.email}: ${code}`);
        return send(res, { twofa: user.twofa, twofaSession: session }, 202, delay);
      }
      const { password: _, ...safeUser } = user;
      return send(res, { ...safeUser, accessToken: 'mock-token-' + user.id }, 200, delay);
    }

    if (action === 'register' && req.method === 'POST') {
      const body = await readBody(req);
      if (body.honeypot) return send(res, { message: 'Regisztráció sikertelen' }, 400, delay);
      if (!verifyCaptcha(body.captchaAnswer, body.captchaToken)) return send(res, { message: 'Érvénytelen captcha megoldás' }, 422, delay);
      const users = readDb('users') || [];
      const exists = users.find(u => u.email === body.username || u.username === body.username);
      if (exists) return send(res, { message: 'Ez az e-mail cím már foglalt' }, 409, delay);
      const inputData = body.input || {};
      if (!inputData.twofa) delete inputData.twofa;
      const newUser = {
        id: nextId(users),
        username: body.username,
        email: body.username,
        image: '/mock/avatar/' + (body.username || 'NU').slice(0, 2).toUpperCase(),
        ...inputData,
      };
      users.push(newUser);
      writeDb('users', users);
      const { password: _, ...safeUser } = newUser;
      return send(res, { ...safeUser, message: 'Sikeres regisztráció! Az aktiváló e-mail el lett küldve.' }, 200, delay);
    }

    if (action === 'me' && req.method === 'GET') {
      const users = readDb('users') || [];
      const { password: _, ...safeUser } = users[0] || {};
      return send(res, safeUser, 200, delay);
    }

    if (action === 'activate' && req.method === 'POST') {
      const users = readDb('users') || [];
      const { password: _, ...safeUser } = users[0] || {};
      return send(res, {
        ...safeUser,
        accessToken: 'mock-token-' + (safeUser.id || 1),
        message: 'Sikeres aktiválás!',
      }, 200, delay);
    }

    if (action === 'twofa' && req.method === 'POST') {
      const body = await readBody(req);
      const entry = twoFaStore.get(body.twofaSession);
      if (!entry || Date.now() > entry.expires) return send(res, { message: 'A munkamenet lejárt, kérjük jelentkezz be újra' }, 401, delay);
      if (entry.code !== String(body.code).trim()) return send(res, { message: 'Érvénytelen kód' }, 422, delay);
      twoFaStore.delete(body.twofaSession);
      const users = readDb('users') || [];
      const user = users.find(u => u.id === entry.userId);
      if (!user) return send(res, { message: 'Felhasználó nem található' }, 404, delay);
      const { password: _, ...safeUser } = user;
      return send(res, { ...safeUser, accessToken: 'mock-token-' + user.id }, 200, delay);
    }

    if (action === 'twofa-resend' && req.method === 'POST') {
      const body = await readBody(req);
      const entry = twoFaStore.get(body.twofaSession);
      if (!entry || Date.now() > entry.expires) return send(res, { message: 'Nem lehet újraküldeni' }, 400, delay);
      entry.code = String(Math.floor(100000 + Math.random() * 900000));
      entry.expires = Date.now() + 5 * 60 * 1000;
      console.log(`[mock 2FA] Resent OTP for userId ${entry.userId}: ${entry.code}`);
      return send(res, { message: 'Kód elküldve' }, 200, delay);
    }

    next();
  });

  // --- Entity CRUD: /api/{entity}[/{id}] ---
  server.middlewares.use('/api', async (req, res, next) => {
    const [pathPart, queryPart] = (req.url || '/').split('?');
    const parts = pathPart.split('/').filter(Boolean);
    const entity = parts[0];

    if (!entity) return next();

    const items = readDb(entity);
    if (items === null) return next(); // nincs db fájl → proxy-ra esik

    const qs = new URLSearchParams(queryPart || '');
    const rawLimit = parseInt(qs.get('limit') || '30');
    const limit = rawLimit === 0 ? Infinity : Math.min(rawLimit, 500);
    const skip = parseInt(qs.get('skip') || '0');

    // GET /api/todos/user/1 — userId szerinti szűrés
    if (req.method === 'GET' && parts[1] === 'user' && parts[2]) {
      const userId = parseInt(parts[2]);
      const filtered = items.filter(i => i.userId === userId);
      const page = limit === Infinity ? filtered.slice(skip) : filtered.slice(skip, skip + limit);
      return send(res, { [entity]: page, total: filtered.length, skip, limit: rawLimit }, 200, delay);
    }

    const rawId = parts[1];
    const id = rawId ? parseInt(rawId) : null;

    if (req.method === 'GET') {
      if (id) {
        const item = items.find(i => i.id === id);
        return item
          ? send(res, item, 200, delay)
          : send(res, { message: 'Not found' }, 404, delay);
      }

      // filter paraméter feldolgozása
      // formátum: {"id":{"type":"array","value":"1,2,3","operator":"IN"}}
      let filtered = items;
      const filterParam = qs.get('filter');
      if (filterParam) {
        try {
          const filters = JSON.parse(filterParam);
          for (const [field, rule] of Object.entries(filters)) {
            const op = (rule.operator || '=').toUpperCase();
            const val = rule.value;
            filtered = filtered.filter(item => {
              const itemVal = item[field];
              if (op === 'IN' || op === 'NIN') {
                const rawIds = Array.isArray(val) ? val : String(val).split(',').map(v => v.trim()).filter(v => v !== '');
                if (rawIds.length === 0) return true;
                const ids = rawIds.map(v => { const n = Number(v); return isNaN(n) ? v : n; });
                const match = Array.isArray(itemVal)
                  ? itemVal.some(v => ids.includes(v))
                  : ids.includes(itemVal);
                return op === 'IN' ? match : !match;
              }
              if (op === '=')  return itemVal == val;
              if (op === '>')  return itemVal >  val;
              if (op === '<')  return itemVal <  val;
              if (op === '>=') return itemVal >= val;
              if (op === '<=') return itemVal <= val;
              if (op === '%')  return String(itemVal).toLowerCase().includes(String(val).toLowerCase());
              return true;
            });
          }
        } catch { /* érvénytelen filter → figyelmen kívül */ }
      }

      const page = limit === Infinity ? filtered.slice(skip) : filtered.slice(skip, skip + limit);
      return send(res, { [entity]: page, total: filtered.length, skip, limit: rawLimit }, 200, delay);
    }

    if (req.method === 'POST') {
      const body = await readBody(req);
      const newItem = { id: nextId(items), ...body };
      items.push(newItem);
      writeDb(entity, items);
      return send(res, newItem, 201, delay);
    }

    if ((req.method === 'PUT' || req.method === 'PATCH') && id) {
      const body = await readBody(req);
      const idx = items.findIndex(i => i.id === id);
      if (idx === -1) return send(res, { message: 'Not found' }, 404, delay);
      items[idx] = { ...items[idx], ...body };
      writeDb(entity, items);
      return send(res, items[idx], 200, delay);
    }

    if (req.method === 'DELETE' && id) {
      const idx = items.findIndex(i => i.id === id);
      if (idx === -1) return send(res, { message: 'Not found' }, 404, delay);
      const [deleted] = items.splice(idx, 1);
      writeDb(entity, items);
      return send(res, { ...deleted, isDeleted: true, deletedOn: new Date().toISOString() }, 200, delay);
    }

    next();
  });
}
