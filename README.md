# VU Admin

**Vue 3 + Bootstrap 5 admin component library** — data table, form, authentication and file upload in a single, config-driven package.

> ⚠️ Under active development — API may change between minor versions.

---

## Features

- **Data table** — sortable columns (multi-column), server-side pagination, per-column filters, column visibility toggle, expandable row details, inline editing, bulk actions, CSV export
- **Form** — modal-based editor with field types: `text`, `number`, `email`, `textarea`, `date`, `datetime-local`, `checkbox`, `select`, `dropdown` (multi-select), `list` (dynamic arrays), `html` (TipTap editor), `image`/`upload` (drag-and-drop with presets, inline JSON or separate upload URL per field), `template` (custom HTML)
- **Authentication** — login, registration, forgot password, activation flow, `/me` session restore, localStorage persistence, **two-factor authentication (email OTP)**, role-based entity access
- **Relations** — automatic join of related entities, displayed inline in table and form
- **Events** — lifecycle hooks: `beforeItemSave`, `afterItemSave`, `beforeItemDelete`, `afterItemDelete`, `afterItemsLoad`, `beforeItemsLoad`, etc.
- **i18n** — built-in Hungarian translations, browser language detection, language switch in the user menu (stored in localStorage), overridable per entity
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
│   │   ├── VuAdminFileUpload.vue   # image / document upload UI
│   │   ├── formUploadHelpers.js    # save / upload / persist logic
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
├── index.html
└── demo/                           # UMD build demo on dummyjson.com (see below)
    ├── index.html
    ├── vu-settings.js
    ├── vu-entity-products.js       # feature showcase entity
    ├── vu-entity-demo.js           # carts entity (dark theme, relation)
    └── navs.json                   # static VuAdminNav menu
```

### UMD demo — `demo/`

A static page that loads the built `dist/vu-admin.umd.js` (run `npm run build` first) and uses the public
[dummyjson.com](https://dummyjson.com) API, so it works without the mock server: open `/demo/` on the Vite dev server
(`npm run dev`) or serve the project root with any static server.

- **Products** (`vu-entity-products.js`) shows most table and form features: sorting, all filter types, pagination,
  column toggle / collapse (persisted), inline editing with autosave, row select + bulk edit / delete, row details,
  custom row action, toolbar dropdown, CSV export; form with text, number, select, dropdown, date, checkbox, textarea,
  list, template, HTML editor and inline (JSON) image upload, plus save / copy / new / delete / reload buttons.
- **Carts** (`vu-entity-demo.js`): dark theme, relation (user name + avatar from `/users`), sorting, collapsed column, CSV export.
- **VuAdminNav** reads `demo/navs.json`.

dummyjson limitations: `events.beforeItemsLoad` maps the sort to `?sortBy=&order=` (first sort key only), the *Product*
filter to `/products/search?q=` and the *Category* filter to `/products/category/{slug}`; other filters are visible but
ignored. Writes are simulated (not persisted); create uses `POST /products/add` (switched in `beforeItemSave`);
bulk save / delete endpoints do not exist on dummyjson and return an error message.

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
  // language: 'hu',     // pins this entity to a language (default: user choice / browser language), see Translations
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

### Translations

All built-in UI texts are English keys passed through `translate()`; the library ships a complete Hungarian
dictionary in `src/i18n.js` (table, pagination, messages, file upload, image editor, HTML editor, video embed, user menu).

**UI language** (`getLanguage()` in `src/i18n.js`):

1. the user's choice, stored in `localStorage` under `vu-language`;
2. otherwise the browser language (`navigator.languages`, `hu-HU` → `hu`) if it is available;
3. otherwise the first available language (`en`).

Available languages: `[{ value: 'en', label: 'English' }, { value: 'hu', label: 'Magyar' }]`, override with
`window.VuSettings.languages`. The user menu gets a language switch with the built-in `BUTTON_LANGUAGE` dropdown item:

```js
window.VuSettings.button.login.dropdowns = [
  { action: 'BUTTON_LANGUAGE', class: 'dropdown-item', label: 'Language' },  // optional: languages: [{ value, label, short }]
  …
];
```

Switching stores the choice and updates every vu-admin table / form / user menu on the page immediately
(`vu-language-change` window event). An entity config with its own `language: 'hu'` is pinned to that language.
From code: `setLanguage('hu')`, `getLanguage()` (exported, and on `window.VuAdminHelpers`).

User menu labels are translated when they are dictionary keys (`label: 'Language'`); labels built by functions can use
`window.VuAdminHelpers.translate('Sign out')`.

Add or override texts per entity (merged over the built-in dictionary); `{name}` style placeholders are replaced:

```js
translate: {
  hu: { 'Save and close': 'Mentés + bezár', 'My custom button': 'Saját gomb' },
  de: { Save: 'Speichern', 'Loading file: {name}': 'Datei wird geladen: {name}' },
},
```

Config texts (column titles, button titles, option labels, field names) also go through `translate()`, so they can be
translated by adding them as keys. Table / form messages are translated when the key exists; server messages are shown as they are.
Auth (`VuAuth`) texts come from `window.VuSettings.auth` and are not part of this dictionary.

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

`hidden` and `collapsed` are only defaults: once the user toggles a column, its state is stored in
`localStorage` (key `vu-columns`, shared by all tables: `{ [entity]: { [preset]: { [column]: { hidden, collapsed } } } }`) and takes precedence over the config.
The *Reset* item of the Columns dropdown clears the stored state.

The current sort order, filter values / operators and rows per page are stored the same way under
`vu-tables` on every table load, and restored when the table is opened again. Fixed sort orders and
fixed filters (`fixed: true`) always come from the config. The filter *Reset* button restores the config defaults.

```js
{
  name: 'price',            // maps to item.price (dot-notation for nested: 'meta.updatedAt')
  title: 'Price',
  width: '10%',
  class: 'text-end',
  hidden: false,            // default visibility (Columns dropdown)
  collapsible: false,       // show collapse toggle in header (narrow strip, content hidden)
  collapsed: false,         // collapsed by default (implies collapsible: true)
  sortable: true,

  // display transformation (in-memory, does not affect saved value)
  // returns HTML → every data value must go through escapeHtml() (see Security)
  template: (value, item) => `<strong>${escapeHtml(value)}</strong>`,

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
    {
      title: 'Images',
      class: 'col-md-6 border rounded p-4',
      fields: [
        {
          type: 'upload', name: 'images', label: 'Images',
          url: '/api/upload/products',
          params: {
            ui: 'card',
            limit: 10,
            accept: ['png', 'jpg', 'webp'],
            thumbnail: 'small',
            languages: ['hu', 'en'],   // translatable titles — HU/EN toggle prefix on the title input
            presets: {
              default: { width: 1920, height: 1080, extension: 'webp', quality: 0.9 },
              small:   { width: 400,  height: 320,  extension: 'webp', quality: 0.75, crop: 'contain' },
            },
          },
        },
      ],
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
  dropdown: {
    // string, or function for dynamic button text (receives { field, item })
    label: ({ item, field }) => {
      const n = Array.isArray(item[field.name]) ? item[field.name].length : 0;
      return n > 0 ? `Add role (${n})` : 'Add role';
    },
    class: 'btn btn-sm btn-outline-secondary',
  },
  list: {
    class: 'badge bg-secondary me-1 cursor-pointer',
    // hidden: true,           // hide selected-value chips under the button
    // wrapperClass: 'd-none', // alternative: hide via CSS class
  },
  options: [ { value: 'admin', label: 'Admin' }, … ],
}

// List (repeating rows of sub-fields)
{
  type: 'list', name: 'links', label: 'Links', sortable: true,
  elements: {
    href: { type: 'text',   class: 'col-md-8', prefix: 'URL' },
    name: { type: 'text',   class: 'col-md-4', prefix: 'Label' },
  },
  // optional "add to list" button (defaults shown)
  addButton: {
    class: 'btn btn-sm btn-outline-primary my-1 w-100',
    icon: 'bi bi-plus',   // null → no icon
    wrapperClass: 'col-2', // column of the button (and of the row actions); fields fill the rest
    label: null,          // string (HTML allowed) or (item, settings, self) => string
  },
}

// HTML editor (TipTap; field.tiptap: { placeholder, imageSourceFields?: ['images'] })
{ type: 'html',   name: 'body',   label: 'Content' }

// HTML editor with video embed + project-level extensions
{
  type: 'html', name: 'body', label: 'Content',
  tiptap: {
    placeholder: 'Content…',
    // ▶ toolbar button: YouTube / Vimeo / Facebook page URL or <iframe> embed code → <div class="ratio ratio-16x9"><iframe …></div>
    // aspect ratio: Auto (Shorts/Reel → 9:16, else 16:9), landscape 21:9/16:9/4:3, square 1:1, portrait 4:5/3:4/9:16/9:19.5 (phone), or fixed size;
    // with a ratio, width OR height alone is enough (wrapper gets max-width, the other side follows the ratio)
    // sizes: width px | % | vw | vh, height px | vh | vw; both set → max-width: min(W, H × ratio), e.g. 100% × 85vh ("Fit screen")
    // false → disabled; allowedHosts replaces the default whitelist (only https iframe src on these hosts is kept)
    video: { allowedHosts: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com', 'www.facebook.com'] },
    // extra TipTap extensions: array → appended; function → (defaults, { editor }) => final list
    extensions: [MyExtension],
    // extra toolbar buttons for the extra extensions (label may be HTML)
    toolbarButtons: [
      { label: '<i class="bi bi-star"></i>', title: 'My action', run: (editor) => editor.chain().focus().myCommand().run(), isActive: (editor) => editor.isActive('myNode') },
    ],
  },
}

// File / image upload — see "File upload" section below
{
  type: 'upload', name: 'images', label: 'Images',
  url: '/api/upload',   // separate upload endpoint (optional)
  params: {
    ui: 'card',         // or 'list'
    limit: 10,
    accept: ['png', 'jpg', 'webp'],
    thumbnail: 'small',
    presets: {
      default: { width: 1920, height: 1080, extension: 'webp', quality: 0.9 },
      small:   { width: 400,  height: 320,  extension: 'webp', quality: 0.75, crop: 'contain' },
    },
  },
}

// Custom HTML template
{
  type: 'template', name: 'address', label: null,
  template: ({ field, item }) => `<div>${escapeHtml(item.address?.city)}</div>`,
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

## File upload

`image` and `upload` fields share the same component (`VuAdminFileUpload.vue`).  
Storage mode is configured **per field** — different fields on the same form can use different endpoints or inline JSON.

### Modes

| Mode | Field config | Behaviour |
|---|---|---|
| **Separate upload** (recommended) | `url: '/api/upload'` on the field | Item is saved as JSON first (metadata only, no binary). After a successful save, each generated preset is uploaded via `multipart/form-data` to `field.url`. URLs are written back and persisted with a follow-up `PUT`. |
| **Inline JSON** (default when `url` is omitted) | no `url`; optional `upload: 'dataurl'` | File data is embedded in the JSON request body. `dataurl` keeps base64 `data` URLs and strips `Blob` objects before save. |
| **Inline metadata only** | `upload: 'blob'` | Only file metadata is sent in JSON (`Blob` values are not JSON-serializable). Use separate upload (`url`) when binary storage is required. |

### Separate upload — save flow

```
1. PUT/POST  form.api     →  JSON body (file metadata, no blob/data)
2. POST      field.url    →  multipart per preset (file + json meta), repeated for each size
3. PUT       form.api     →  patch file fields with returned URLs (reload-safe)
```

The main entity save endpoint does **not** need to change — it keeps accepting the same JSON structure.  
Binary content goes only to `field.url`.

### Field config

```js
// Minimal — separate upload
{
  type: 'upload',
  name: 'images',
  label: 'Images',
  url: '/api/upload',
  params: {
    ui: 'card',
    limit: 10,
    accept: ['png', 'jpg', 'webp'],
    thumbnail: 'small',
    presets: {
      default: { width: 1920, height: 1080, extension: 'webp', quality: 0.9 },
      small:   { width: 400,  height: 320,  extension: 'webp', quality: 0.75, crop: 'contain' },
    },
  },
}

// Different endpoints per field on the same form
{ type: 'upload', name: 'images',    url: '/api/upload/images' }
{ type: 'upload', name: 'documents', url: '/api/upload/documents' }

// Inline JSON (no separate request)
{ type: 'upload', name: 'attachments', upload: 'dataurl', params: { … } }
```

### Optional `upload` object (advanced, no `url` here)

When `field.url` is set, fine-tuning goes in an optional `upload` object:

```js
{
  type: 'upload',
  name: 'documents',
  url: '/api/upload',
  upload: {
    fileField: 'file',       // multipart field name for the binary (default: file)
    jsonField: 'json',       // multipart field name for metadata (default: json)
    persist: true,           // PUT file fields after upload (default: true)
    presets: ['default'],    // limit which params.presets keys are uploaded (default: all)
    meta: (base, task, savedItem, settings, auth) => ({
      ...base,
      // base already contains: entity, id, field, fileIndex, typeKey, file, type, item
    }),
    api: { options: { /* extra fetch options for upload POST */ } },
  },
  params: { … },
}
```

Set `upload.persist: false` if your upload endpoint updates the entity record itself.

### Multipart upload request

Each preset variant is uploaded in its own request:

| Part | Default name | Content |
|---|---|---|
| Binary file | `file` | WebP/JPEG/… blob for that preset |
| Metadata | `json` | JSON string: entity id, field name, file index, preset key, file/type metadata, saved item snapshot |

Expected response (any of):

```json
{ "url": "/uploads/abc.webp" }
{ "file": { "url": "/uploads/abc.webp" } }
{ "files": [{ "url": "/uploads/abc.webp" }] }
```

### File object shape (in item JSON)

```js
images: [
  {
    uid: '…',
    slug: 'product-photo',
    title: 'Product photo',
    tags: ['public'],
    uploaded: true,
    types: {
      default: { slug: '…', extension: 'webp', width: 1920, height: 1080, url: '/uploads/…' },
      small:   { slug: '…', extension: 'webp', width: 400,  height: 320,  url: '/uploads/…' },
    },
    original: { name: 'photo.jpg', mime: 'image/jpeg', bytes: 204800, … },
  },
]
```

`title` is a plain string by default. When `params.languages` is set (see below), `title` becomes an object keyed by language: `{ hu: 'Termékfotó', en: 'Product photo' }`.

### `params` reference (UI)

| Key | Description |
|---|---|
| `ui` | `'card'` or `'list'` layout |
| `limit` | Max number of files |
| `accept` | Allowed extensions |
| `thumbnail` | Preset key used for list/card preview |
| `download` | Preset key used for download link (default: `default`) |
| `presets` | Resize/crop/quality variants generated client-side before upload |
| `tags` | Tag checkbox options (`{ value, label }[]`) |
| `editor` | Enable built-in image editor (`true` / `false`) |
| `text` | Drop-zone label |
| `languages` | Language codes for translatable file titles, e.g. `['hu', 'en']` (2+ enables the feature) |

### Multi-language file titles

When `params.languages` has 2 or more entries, the title input is prefixed with a small button showing the
currently active language code (e.g. `HU`). Clicking it cycles through the configured languages, switching
which language's value the title input reads and writes — this keeps a single input per file row regardless
of how many languages are configured. `file.title` is stored as `{ [lang]: string }`; slugs and upload
metadata use the primary (first) language, falling back to the active one.

```js
{
  type: 'upload', name: 'images', label: 'Images',
  url: '/api/upload',
  params: {
    languages: ['hu', 'en'],
    // …
  },
}
```

### Paste from clipboard

Below the drop zone there's a small "To paste from clipboard, click here and press Ctrl+V" hint —
clicking it focuses a dedicated paste target, and pressing <kbd>Ctrl</kbd>+<kbd>V</kbd> (with an image on
the clipboard, e.g. a screenshot) uploads it the same way as picking a file or dragging one in. No extra
config needed; it's always on. Pasting into any other input on the page (e.g. a title field) still pastes
text normally — the paste is only intercepted while that dedicated hint is focused, and only when the
clipboard actually contains image data.

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
  // optional: send the selected role in this header (default: not sent, see Security)
  // roleHeader: 'X-Auth-Role',
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

## Security

### HTML output and XSS

Vu-admin renders some config values as HTML (`v-html`). **Config functions that return HTML must escape every data value**
coming from the API / users, otherwise a stored value like `<img src=x onerror=…>` runs in every admin's browser.

Affected config keys (all return HTML): table column `template`, column `header.title`, button `template`,
`input.prefix` / `input.suffix`, `table.details.raw`, form `title`, form field `label` / `prefix` / `suffix` / `description`,
form field `type: 'template'`, list `elementDef.template`, user button `label` / `dropdowns[].label`, auth `accepts[].label`, `help`.

Helpers (exported from the package and available globally as `window.VuAdminHelpers`, because entity configs are not modules):

```js
const { escapeHtml, safeUrl } = window.VuAdminHelpers;   // or: import { escapeHtml, safeUrl } from 'vu-admin'

escapeHtml('<b>"x"</b>')          // '&lt;b&gt;&quot;x&quot;&lt;/b&gt;'  — null/undefined → ''
safeUrl('javascript:alert(1)')    // ''  — allows http(s), mailto, tel, relative URLs, data:image/* (not SVG)

template: (value, item) =>
  '<a href="' + escapeHtml(safeUrl(item.url)) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(value) + '</a>'
```

Rules: text → `escapeHtml(v)`; `href`/`src` → `escapeHtml(safeUrl(v))`; inline `style` values → whitelist characters
(e.g. `v.replace(/[^a-z0-9#]/gi, '')`); URL parts → `encodeURIComponent(v)`.

Rendered as **plain text** by the library (HTML is not interpreted): table/form messages (incl. server error messages),
`auth.response.message` (newlines are kept, use `\n` instead of `<br>`), `VuAdminNav` item `name`.

### Role header

`X-Auth-Role` is **no longer sent by default.** Set `window.VuSettings.auth.roleHeader = 'X-Auth-Role'` to send the
selected role (`auth.user.role`, changed via the user button role switcher). The backend must never authorize based on
this header alone: it may only select one of the roles that belong to the token's user, and must reject anything else.
A previously stored `X-Auth-Role` is removed from `localStorage` (`vu-header`) on the next page load if `roleHeader` is not set.

### CSV export

Every CSV cell goes through `csvCell()`: values starting with `=`, `+`, `-`, `@`, tab or CR get a `'` prefix
(formula injection; plain numbers like `-12.5` are kept), and cells containing the delimiter, `"`, newlines or
leading/trailing whitespace are quoted (`"` doubled). Objects are exported as JSON.

### VuAdminNav

Nav items come from the API (`/api/navs`). `icon` is a **CSS class string** (`'bi bi-people me-1'`), not HTML —
the legacy `'<i class="…">'` form still works (the class is extracted), any other HTML is dropped. `href` goes
through `safeUrl()`, `target: '_blank'` links get `rel="noopener noreferrer"`.

### Still open (not solvable in the library alone)

- The token (`X-Auth-Token`) is stored in `localStorage` (`vu-user`, `vu-header`) — readable by any XSS. Prefer an
  httpOnly + SameSite cookie session, or short-lived tokens with refresh.
- File upload `accept` is checked client-side only; the backend must validate type/size, and should not serve
  uploaded SVG/HTML inline from the app's origin (`Content-Disposition: attachment` or a separate domain).
- Mock server (`mock/`) is for development only: login does not check the password, secrets have hard-coded fallbacks.
- `captcha.question` from the captcha endpoint is rendered as HTML (trusted own backend).

### Migration notes (for integrators / AI agents updating an app that uses vu-admin)

Changes in this version and what to do in the consuming project:

1. **Entity configs / `vu-admin-settings.js`:** search for every function listed under *HTML output and XSS* above that
   concatenates data into HTML (`+ value +`, `${item.x}`, `.join('</span><span>')`) and wrap each data value in
   `escapeHtml()`; wrap `href`/`src` in `escapeHtml(safeUrl())`. Add at the top of each entity factory:
   `const { escapeHtml, safeUrl } = window.VuAdminHelpers;`. Done in this repo for `vu-entity-*.js`,
   `vu-admin-settings.js`, `demo/vu-entity-demo.js` and `demo/vu-settings.js`. Apps that load the UMD build
   (`dist/vu-admin.umd.js`) need a build that already contains `window.VuAdminHelpers` (also `VuAdmin.escapeHtml`).
2. **Messages:** if the app put HTML into `auth.response.message` or table/form messages (e.g. `<br>`, `<strong>`),
   it is now shown literally — use plain text and `\n` for line breaks. The library's own "Saved" message is now `Saved (id: 5)`.
3. **Role header:** if the backend reads `X-Auth-Role`, either set `roleHeader: 'X-Auth-Role'` in the auth settings
   **and** make the backend validate it against the token's roles, or (preferred) let the backend derive the role from the token.
   Custom `onSuccess.login` handlers that set `auth.header['X-Auth-Role']` themselves should drop it.
4. **Nav API:** return `icon` as a class string (`"bi bi-people me-1"`) instead of HTML.
5. **CSV:** consumers parsing exported CSV must handle quoted cells and the `'` prefix on formula-like values.

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
| `POST` | `/api/upload` | Multipart file upload (`file` + `json` parts); returns `{ url, files, meta }` |
| `GET`  | `/mock/uploads/{filename}` | Serve uploaded mock files |
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
