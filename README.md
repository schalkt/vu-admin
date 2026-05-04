# VU Admin

**Vue 3 + Bootstrap 5 admin component library** — data table, form, authentication and file upload in a single, config-driven package.

> ⚠️ Under active development — API may change between minor versions.

---

## Features

- **Data table** — sortable columns (multi-column), server-side pagination, per-column filters, column visibility toggle, expandable row details, inline editing, bulk actions, CSV export
- **Form** — modal-based editor with field types: `text`, `number`, `email`, `textarea`, `date`, `datetime-local`, `checkbox`, `select`, `dropdown` (multi-select), `list` (dynamic arrays), `html` (TipTap editor), `image`/`upload` (drag-and-drop with presets), `template` (custom HTML)
- **Authentication** — login, registration, forgot password, activation flow, `/me` session restore, localStorage persistence, **two-factor authentication (email OTP)**, role-based entity access
- **Relations** — automatic join of related entities, displayed inline in table and form
- **Events** — lifecycle hooks: `beforeItemSave`, `afterItemSave`, `beforeItemDelete`, `afterItemDelete`, `afterItemsLoad`, `beforeItemsLoad`, etc.
- **i18n** — built-in Hungarian translations, fully overridable per entity
- **Themes** — Bootstrap `light` / `dark` per entity
- **Mock server** — zero-backend dev environment with seed data, full CRUD, auth, SVG avatars

---

## Tech stack

| Dependency | Version |
|---|---|
| Vue | 3.x |
| Bootstrap | 5.3.x |
| Bootstrap Icons | 1.11.x |
| Vite | 8.x |
| TipTap | 3.x |

---

## Getting started

```bash
git clone https://github.com/schalkt/vu-admin.git
cd vu-admin
npm install
```

### Seed mock data and start dev server

```bash
npm run mock:seed   # populate mock/db/ from mock/seed/
npm run dev         # starts Vite at http://localhost:5173
```

### Other scripts

```bash
npm run mock:reset  # clear all mock/db/ records (empty arrays)
npm run build       # production build → dist/
npm run serve       # preview production build
```

---

## Project structure

```
vu-admin/
├── src/
│   ├── components/
│   │   ├── VuAdmin.vue             # entity host (loads config, mounts table)
│   │   ├── VuAdminTable.vue        # table + pagination + filters + actions
│   │   ├── VuAdminForm.vue         # modal form
│   │   ├── VuAdminFormGroup.vue    # field renderer
│   │   ├── VuAdminFormSelect.vue   # select field
│   │   ├── VuAdminFormList.vue     # dynamic list field
│   │   ├── VuAdminFileUpload.vue   # image / document upload
│   │   ├── VuAdminHtmlEditor.vue   # TipTap rich-text editor
│   │   ├── VuAuth.vue              # auth modal (login / register / …)
│   │   └── VuUserButton.vue        # nav button with role switcher
│   └── index.js
├── mock/
│   ├── middleware.js               # Vite dev middleware (CRUD + auth + SVG)
│   ├── seed/                       # source JSON fixtures
│   └── db/                         # live writable JSON (gitignored)
├── scripts/
│   └── mock-init.js                # seed / reset helper
├── vu-admin-settings.js            # global auth + button config
├── vu-entity-product.js            # example entity config
├── vu-entity-user.js
├── vu-entity-post.js
├── vu-entity-todos.js
└── index.html
```

---

## Usage

### 1. Global settings — `vu-admin-settings.js`

```js
window.VuSettings = {
  theme: 'dark',             // default Bootstrap theme
  auth: {
    api: {
      login:      '/api/auth/login',
      register:   '/api/auth/register',
      profile:    '/api/auth/me',     // called on every page load to restore session
      activation: '/api/auth/activate',
      forgot:     '/api/password/forgot',
      password:   '/api/password/update',
    },
    onSuccess: {
      login: (auth) => {
        auth.user  = auth.response.data;
        auth.user.token = auth.response.data.accessToken;
        auth.user.roles = ['admin'];
        auth.settings = {
          entitiesVariable: 'VuEntities',
          entities: {
            product: '/vu-entity-product.js',
            user:    '/vu-entity-user.js',
          }
        };
      },
      profile: (auth) => {
        // called on page load after /me responds OK
        // merge fresh data into auth.user; settings stay from localStorage
        Object.assign(auth.user, auth.response.data);
      },
    },
  },
};
```

The `profile` callback is optional. If omitted, the `/me` response is merged into `auth.user` automatically.

### 2. Mount components — `index.html`

```html
<main id="app"></main>
<script type="module" src="./vu-admin-settings.js"></script>
<script type="module" src="./index.js"></script>
```

### 3. Entity config — e.g. `vu-entity-product.js`

Each entity is a plain JS file that exports a factory function via `window.VuEntities`:

```js
window.VuEntities = window.VuEntities || {};

window.VuEntities.product = (preset) => ({

  pkey: 'id',           // primary key field
  language: 'en',       // translation key
  debug: false,

  api: {
    url: '/api/products',
    input: {
      items: 'products',  // response.data.products
      total: 'total',     // response.data.total
    },
    output: {
      fields: undefined,  // restrict saved fields; undefined = send all
    },
  },

  events: {
    beforeItemSave:  (item, urlParams, raw) => { delete item.id; },
    afterItemSave:   (data, urlParams, auth) => { /* … */ },
    afterItemsLoad:  (data, response) => { /* … */ },
    beforeItemDelete:(item) => { /* … */ },
  },

  relations: {
    // key is referenced by column.relation.config and form field.relation.config
    owner: {
      entity: 'user',
      local:  'userId',
      foreign:'id',
      api: {
        url: '/api/users',
        input: { items: 'users' },
      },
    },
  },

  table: { /* see Table config */ },
  form:  { /* see Form config  */ },

});
```

---

## Table config

```js
table: {
  title: 'Products',
  class: 'table-hover table-sm',
  pagination: {
    limit: 20,
    size: 5,                        // page buttons visible
    limits: [10, 20, 50, 100],      // null = hide limit selector
  },
  order: {                          // default sort
    title: { dir: 'ASC', idx: 0, fixed: false },
  },
  control: {                        // toolbar above the table
    buttons: [
      { action: 'TABLE_COLUMNS' },
      { action: 'TABLE_RELOAD' },
      { action: 'FORM_CREATE' },
      { action: 'TABLE_EXPORT' },
    ],
  },
  columns: [ /* see Column config */ ],
  details: {                        // expandable row content
    fields: [ /* same as form fields */ ],
    raw: (item) => '<div>…</div>',
  },
  exports: {
    default: {
      type: 'csv',
      fields: [ { name: 'id' }, { name: 'title' } ],
    },
  },
}
```

### Column config

```js
{
  name: 'price',            // maps to item.price (dot-notation for nested: 'meta.updatedAt')
  title: 'Price',
  width: '10%',
  class: 'text-end',
  hidden: false,
  sortable: true,

  // display transformation (in-memory, does not affect saved value)
  template: (value, item) => `<strong>${value}</strong>`,

  // value conversions applied on load (in) and before save (out)
  convert: {
    in:  (value, item, column) => new Date(value).toLocaleDateString(),
    out: (value, item, column) => value,
  },

  // progress bar rendering
  progressbar: {
    class: 'bg-success',
    max: 100,
    value: true,       // show numeric value inside bar
  },

  // filter row
  filter: {
    type: 'text' | 'number' | 'select' | 'date' | 'datetime-local',
    operators: [ { label: '>', value: '>' }, … ],  // or true for built-in set
    default_operator: '>',
    default_value: 4,
    fixed: false,       // always active, user cannot clear
    multiple: false,    // select: allow multi-select
    dropdown: false,    // select: render as dropdown
    options: [ { value: 'beauty', label: 'Beauty' } ],
    onchange: (filter) => someTransform(filter.value),
    buttonx: true,      // show clear (×) button
  },

  // inline table editing
  input: {
    type: 'number' | 'text' | 'textarea' | 'select',
    autosave: true,
    min: 0, max: 1000,
    onchange: (value, column, item) => {},
  },

  // relation: replace raw id with data from a related entity
  relation: {
    config: 'owner',    // key in settings.relations
  },

  // row action buttons
  buttons: [
    { action: 'TABLE_ROW_EDIT' },
    { action: 'TABLE_ROW_DELETE' },
    { action: 'TABLE_ROW_DETAIL' },
    { action: 'TABLE_ROW_SAVE' },
    {
      action: (item, params, self) => { /* custom */ },
      title: 'View', class: 'btn btn-sm btn-primary', icon: 'bi bi-eye',
      disabled: (params) => !params.item.active,
      hidden: true,
    },
  ],
}
```

#### Built-in table actions

| Action | Description |
|---|---|
| `TABLE_RELOAD` | Refetch current page |
| `TABLE_COLUMNS` | Show/hide column picker |
| `TABLE_RESET_FILTERS` | Clear all active filters |
| `TABLE_RESET_ORDERS` | Clear all active sorts |
| `TABLE_EXPORT` | Download CSV |
| `TABLE_CLOSE_DETAILS` | Collapse all expanded rows |
| `TABLE_ROW_EDIT` | Open form modal |
| `TABLE_ROW_DELETE` | Delete with confirmation |
| `TABLE_ROW_DETAIL` | Expand inline details |
| `TABLE_ROW_SAVE` | Save inline changes |
| `TABLE_BULK_DELETE` | Delete selected rows |
| `TABLE_BULK_SAVE` | Save bulk-edited fields |
| `FORM_CREATE` | Open empty form |

---

## Form config

```js
form: {
  title: (item) => item.title || 'New',
  class: 'm-2',
  default: { status: 'active' },   // values pre-filled on FORM_CREATE

  control: {
    buttons: [
      { action: 'FORM_SAVE' },
      { action: 'FORM_SAVE_AND_CLOSE' },
      { action: 'FORM_CLOSE' },
      { action: 'FORM_RELOAD' },
      { action: 'FORM_DELETE' },
      { action: 'FORM_COPY' },
      { action: 'FORM_NEW' },
      {
        title: 'More', icon: 'bi bi-list',
        class: 'btn btn-sm btn-outline-dark',
        dropdowns: [ { action: 'FORM_DELETE', title: 'Delete', … } ],
      },
    ],
  },

  api: {                            // overrides entity-level api for form requests
    url: '/api/products',
    output: {
      flatten: true,                // send { 'meta.updatedAt': '…' } instead of nested
      fields: ['title', 'price'],   // whitelist; undefined = send all
    },
  },

  groups: [
    {
      title: 'Main info',
      class: 'col-md-6 border rounded p-4',
      fields: [ /* see Field types */ ],
    },
  ],
}
```

### Field types

```js
// Text / email / number / date / datetime-local / textarea
{ type: 'text',     name: 'title',    label: 'Title',   required: true }
{ type: 'number',   name: 'price',    label: 'Price',   min: 0, max: 9999, step: 0.01 }
{ type: 'email',    name: 'email',    label: 'E-mail' }
{ type: 'date',     name: 'birthDate',label: 'Birth date' }
{ type: 'textarea', name: 'bio',      label: 'Bio',     rows: 4 }

// Checkbox
{ type: 'checkbox', name: 'active',   label: null, checkbox: 'Active', true: 1, false: 0 }

// Select (single or relation-driven)
{
  type: 'select', name: 'category', label: 'Category',
  options: [ { value: 'beauty', label: 'Beauty' } ],
  // or relation-driven:
  relation: { config: 'owner' },
  options: (item, field, self) => field.relation.items.map(u => ({ value: u.id, label: u.name })),
}

// Dropdown (multi-select stored as array)
{
  type: 'dropdown', name: 'roles', label: 'Roles',
  dropdown: { label: 'Add role', class: 'btn btn-sm btn-outline-secondary' },
  list:     { class: 'badge bg-secondary me-1 cursor-pointer' },
  options: [ { value: 'admin', label: 'Admin' }, … ],
}

// List (repeating rows of sub-fields)
{
  type: 'list', name: 'links', label: 'Links', sortable: true,
  elements: {
    href: { type: 'text',   class: 'col-md-8', prefix: 'URL' },
    name: { type: 'text',   class: 'col-md-4', prefix: 'Label' },
  },
}

// HTML editor (TipTap; field.tiptap: { placeholder, imageSourceFields?: ['images'] })
{ type: 'html',   name: 'body',   label: 'Content' }

// File / image upload
{
  type: 'upload', name: 'images', label: 'Images',
  params: {
    ui: 'card',         // or 'list'
    limit: 10,
    accept: ['png', 'jpg', 'webp'],
    presets: {
      default: { width: 1920, height: 1080, extension: 'webp', quality: 0.9 },
      small:   { width: 400,  height: 320,  extension: 'webp', quality: 0.75, crop: 'contain' },
    },
  },
}

// Custom HTML template
{
  type: 'template', name: 'address', label: null,
  template: ({ field, item }) => `<div>${item.address?.city}</div>`,
}

// All fields support:
{
  prefix: '<i class="bi bi-search"></i>',    // or function
  suffix: (params, settings) => `<a href="…">Link</a>`,
  description: (params, settings) => `<small>Hint text</small>`,
  class: 'col-md-6',
  inputclass: (params) => params.item.active ? 'bg-success' : '',
  readonly: true,
  disabled: true,
}
```

---

## Auth config

```js
window.VuSettings.auth = {
  title:  { login: 'Sign in', registration: 'Register', twofa: 'Two-factor auth', … },
  submit: { login: 'Sign in', registration: 'Register', cancel: 'Cancel', twofa: 'Verify', resend: 'Resend', … },
  api: {
    login:       '/api/auth/login',
    register:    '/api/auth/register',
    profile:     '/api/auth/me',
    activation:  '/api/auth/activate',
    forgot:      '/api/password/forgot',
    password:    '/api/password/update',
    twofa:       '/api/auth/twofa',       // 2FA code verification
    twofaResend: '/api/auth/twofa-resend',// resend email OTP
  },
  captcha: {
    url: '/api/auth/captcha',
    panels: ['login', 'registration', 'forgot'],
    error: 'Please select 1 icon to continue.',
  },
  twofa: {
    panels: ['login'],           // panels where 202 response triggers 2FA flow
    label: 'Verification code',
    placeholder: '6-digit code',
    info: 'Enter the 6-digit code sent to your e-mail. Valid for 5 minutes.',
    error: 'Invalid code, please try again.',
  },
  username: { type: 'text', label: 'Username or e-mail', icon: 'bi bi-envelope' },
  password: { type: 'password', label: 'Password', minlength: 4 },
  inputs: {
    // extra fields shown on specific panels
    twofa: { type: 'select', panels: ['registration'], options: [
      { value: '', label: 'No 2FA' },
      { value: 'email', label: 'E-mail code' },
    ]},
  },
  accepts: [
    { name: 'tos',  label: () => 'I accept the <a href="/tos">Terms</a>', panels: ['registration'], required: true },
  ],
  onSuccess: {
    login: (auth) => {
      auth.user = auth.response.data;
      auth.user.token = auth.response.data.accessToken;
      // Only expose entities if the user has a role assigned
      if (auth.user.role) {
        auth.settings = { entitiesVariable: 'VuEntities', entities: { … } };
      }
    },
    profile: (auth) => {
      Object.assign(auth.user, auth.response.data);
      // Populate entities on page-reload if role is now available
      if (auth.user.role && !auth.settings) {
        auth.settings = { entitiesVariable: 'VuEntities', entities: { … } };
      }
    },
    registration: (auth) => { auth.response.message = 'Check your e-mail to activate.'; },
    activation:   (auth) => { auth.user = auth.response.data; /* same as login */ },
    forgot:       (auth) => { auth.response.message = 'Reset link sent.'; },
    password:     (auth) => { auth.response.message = 'Password updated.'; },
  },
  onError: {
    login: (auth) => { auth.response.message = `Error ${auth.response.code}: ${auth.response.data?.message}`; },
    twofa: (auth) => { auth.response.message = auth.response.data?.message || `Error ${auth.response.code}`; },
  },
};
```

### Role-based entity access

Entities (the admin data views) are only loaded when the logged-in user has a `role` assigned. Users without a role can sign in but see an empty admin shell with a warning in the user dropdown. An admin can assign a role via the user form; on the next page load `/me` will return the new role and entities will load automatically.

### Session restore on page load

If `api.profile` is set, VuAuth calls it on every mount using the stored token header. On success the response is merged into `auth.user` and localStorage is refreshed. If the user now has a role but `auth.settings` was not previously set (e.g. role was assigned after first login), `onSuccess.profile` can populate `auth.settings` at this point. On failure (401, network error) the user is logged out automatically.

---

## Mock server

The dev server includes a fully functional mock backend — no real API needed.

```
mock/
├── middleware.js   # Vite plugin middleware
├── seed/           # read-only fixture files (committed)
│   ├── users.json
│   ├── products.json
│   ├── posts.json
│   └── todos.json
└── db/             # live writable JSON (gitignored)
```

```bash
npm run mock:seed   # copy seed/ → db/  (safe to re-run)
npm run mock:reset  # write empty arrays to all db/ files
```

### Available endpoints (mock)

| Method | Path | Description |
|---|---|---|
| `GET`  | `/api/auth/captcha` | Issue captcha challenge (8 icons + signed token) |
| `POST` | `/api/auth/login` | Verify credentials; returns `200` with token or `202` if 2FA required |
| `POST` | `/api/auth/register` | Create user (no default role); 409 if email exists |
| `GET`  | `/api/auth/me` | Return current user by stored token |
| `POST` | `/api/auth/activate` | Activate account, return token |
| `POST` | `/api/auth/twofa` | Submit 2FA code; returns token on success |
| `POST` | `/api/auth/twofa-resend` | Re-generate and re-send email OTP (5-min TTL) |
| `GET`  | `/api/{entity}` | List with `limit`, `skip`, `filter`, `order` |
| `GET`  | `/api/{entity}/{id}` | Single item |
| `POST` | `/api/{entity}` | Create (auto-increment id) |
| `PUT/PATCH` | `/api/{entity}/{id}` | Update (merge) |
| `DELETE` | `/api/{entity}/{id}` | Remove |
| `GET`  | `/mock/avatar/{initials}` | Colored SVG avatar circle |
| `GET`  | `/mock/thumb/{label}` | Colored SVG thumbnail |

### Filter query format

The table sends filters as a JSON-encoded `filter` parameter:

```
GET /api/products?filter={"rating":{"value":4,"operator":">"}}
                 &filter={"category":{"value":"beauty,fragrances","operator":"IN"}}
```

Supported operators: `=`, `>`, `>=`, `<`, `<=`, `%` (contains), `IN`, `NIN`.  
`IN`/`NIN` accept a comma-separated string or an array. Array-valued fields (e.g. tags) are matched with `.some()`.  
Empty `IN` list is treated as no filter (returns all).

---

## Entity events reference

| Event | Arguments | Description |
|---|---|---|
| `afterSettingsInit` | `(settings)` | Called once after entity config is merged |
| `beforeItemsLoad` | `(urlParams, settings)` | Modify request params before fetch |
| `afterItemsLoad` | `(data, response)` | Transform loaded items |
| `afterItemLoad` | `(data, response)` | Transform single loaded item |
| `beforeItemSave` | `(item, urlParams, rawInput)` | Modify item before PUT/POST |
| `afterItemSave` | `(data, urlParams, auth)` | React to successful save (auth allows updating `auth.user`) |
| `beforeItemDelete` | `(item)` | Hook before DELETE |
| `afterItemDelete` | `(data, response)` | Hook after DELETE |
| `beforeBulkSave` | `(bulkItem)` | Hook before bulk PUT |
| `afterBulkSave` | `(data, response)` | Hook after bulk PUT |
| `beforeItemsExport` | `(items)` | Modify items before CSV generation |

---

## Two-factor authentication (2FA)

VU Admin supports **email OTP** as a second factor — no authenticator app or external service required.

### How it works

1. User submits login (username + password + captcha).
2. If the user record has `twofa: 'email'` the server returns **HTTP 202** with a `twofaSession` token instead of the access token. A 6-digit code is generated server-side (logged to console in mock).
3. The auth modal switches to the `twofa` panel where the user enters the code.
4. The browser posts the code + session token to `/api/auth/twofa`. On success the server returns the normal user + access token response.
5. A **Resend** button calls `/api/auth/twofa-resend` to generate a fresh code (resets the 5-minute TTL).

### Enabling 2FA on a user (mock DB)

Add `"twofa": "email"` to the user record in `mock/db/users.json`:

```json
{
  "id": 1,
  "username": "emilys",
  "twofa": "email",
  …
}
```

Users can also opt in during registration via the `twofa` select field (shown on the registration panel).

### Config

```js
window.VuSettings.auth.twofa = {
  panels:      ['login'],               // panels where 202 triggers the 2FA flow
  label:       'Verification code',
  placeholder: '6-digit code',
  info:        'Enter the code sent to your e-mail. Valid for 5 minutes.',
  error:       'Invalid code, please try again.',
};

window.VuSettings.auth.api.twofa       = '/api/auth/twofa';
window.VuSettings.auth.api.twofaResend = '/api/auth/twofa-resend';
```

### Backend — Node.js reference

```js
// POST /api/auth/twofa
const entry = twoFaStore.get(body.twofaSession);
if (!entry || Date.now() > entry.expires)
  return res.status(401).json({ message: 'Session expired' });
if (entry.code !== String(body.code).trim())
  return res.status(422).json({ message: 'Invalid code' });
twoFaStore.delete(body.twofaSession);
// … return user + accessToken
```

The in-memory store (`twoFaStore`) maps session tokens to `{ userId, code, expires }`. Replace with Redis or a DB table in production.

---

## Captcha (self-hosted, no external service)

VU Admin includes a built-in **click-captcha** and **honeypot** — no Google reCAPTCHA or third-party service needed.

### How it works

1. The browser calls `GET /api/auth/captcha` and receives 8 shuffled Bootstrap Icons + a question + a **signed token**.
2. The user clicks the **1 correct icon** highlighted in the question.
3. On form submit the browser sends `captchaAnswer` (array with 1 icon id) and `captchaToken` (the signed token from step 1).
4. The backend recomputes the HMAC for the submitted id and compares — no session or database required.
5. A hidden **honeypot** field is silently sent alongside; bots that fill it in are rejected server-side.

Time-limited to **5-minute windows** (two consecutive windows accepted to avoid boundary failures).

### Frontend config (`vu-admin-settings.js`)

```js
window.VuSettings.auth.captcha = {
  url:    '/api/auth/captcha',                    // endpoint that issues challenges
  panels: ['login', 'registration', 'forgot'],    // panels where captcha is shown
  error:  'Please select 1 icon to continue.',    // validation message
};
```

Set `captcha: false` (or omit the key) to disable completely.

### Backend — Node.js / mock reference implementation

```js
import crypto from 'crypto';

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET; // keep secret, never expose to client
const BUCKET = 300; // 5-minute window in seconds

function signCaptcha(answers, bucket) {
  // answers is an array — sort so click order doesn't matter
  const key = [...answers].sort().join(',') + ':' + bucket;
  return crypto.createHmac('sha256', CAPTCHA_SECRET).update(key).digest('hex');
}

function verifyCaptcha(answers, token) {
  if (!answers || !token) return false;
  const list = Array.isArray(answers) ? answers : [answers];
  if (list.length !== 1) return false;          // expect exactly 1 icon selected
  const b = Math.floor(Date.now() / 1000 / BUCKET);
  return signCaptcha(list, b) === token || signCaptcha(list, b - 1) === token;
}

// In your login / register handler:
if (body.honeypot) return res.status(401).json({ message: 'Error' });
if (!verifyCaptcha(body.captchaAnswer, body.captchaToken)) {
  return res.status(422).json({ message: 'Invalid captcha' });
}
```

### Backend — PHP

```php
<?php
$secret = getenv('CAPTCHA_SECRET'); // same secret as the Node.js side
$bucket = (int) floor(time() / 300); // 5-minute window

function sign_captcha(array $answers, int $bucket, string $secret): string {
    sort($answers); // sort so click order doesn't matter
    return hash_hmac('sha256', implode(',', $answers) . ':' . $bucket, $secret);
}

function verify_captcha(array $answers, string $token, int $bucket, string $secret): bool {
    if (count($answers) !== 1) return false; // expect exactly 1 icon selected
    $ok1 = hash_equals(sign_captcha($answers, $bucket,     $secret), $token);
    $ok2 = hash_equals(sign_captcha($answers, $bucket - 1, $secret), $token);
    return $ok1 || $ok2;
}

// In your login / register endpoint (JSON body):
$body     = json_decode(file_get_contents('php://input'), true);
$answers  = (array) ($body['captchaAnswer'] ?? []);
$token    = $body['captchaToken'] ?? '';
$honeypot = $body['honeypot']     ?? '';

if ($honeypot !== '') {
    http_response_code(401);
    echo json_encode(['message' => 'Error']);
    exit;
}

if (!verify_captcha($answers, $token, $bucket, $secret)) {
    http_response_code(422);
    echo json_encode(['message' => 'Invalid captcha']);
    exit;
}
```

> **Important:** `hash_equals()` is used instead of `===` to prevent timing attacks.

### Security notes

- `CAPTCHA_SECRET` must be a long random string stored only on the server (env variable). Never send it to the client.
- The token proves the challenge was issued by your server; even if an attacker reads the JS source, they cannot forge a valid token without the secret.
- The honeypot catches primitive bots that fill every visible field.
- For high-security endpoints consider adding rate limiting alongside the captcha.

### Generating a secret

```bash
# Linux / macOS
openssl rand -hex 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# PHP
php -r "echo bin2hex(random_bytes(32));"
```

---

## License

MIT

---

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss major changes.
