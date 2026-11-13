import { test, expect } from '@playwright/test';
import {
  signIn, openDashboard, dashboard, widget, view, rows, range, visibleColumns, counters, userMenuButton,
} from './helpers.js';

test.beforeEach(async ({ page }) => {
  await signIn(page);
});

test.describe('session and page', () => {
  test('restores the stored session with a loading indicator, then shows the dashboard', async ({ page }) => {
    // hold the profile request so the loading state can be seen
    let release;
    const held = new Promise((resolve) => { release = resolve; });
    await page.route('**/api/auth/me', async (route) => { await held; await route.continue(); });

    await page.goto('/#');
    await expect(page.locator('.vu-admin-app-loading')).toBeVisible();
    await expect(dashboard(page)).toHaveCount(0);

    release();
    await expect(page.locator('.vu-admin-app-loading')).toHaveCount(0);
    await expect(dashboard(page)).toBeVisible();
    await expect(page.locator('.vua-user-button .dropdown-toggle')).toContainText('Emily Johnson');
    await expect(page).toHaveTitle('VU Admin');
  });

  test('brand from VuSettings.app', async ({ page }) => {
    await openDashboard(page);
    await expect(page.locator('.navbar-brand')).toContainText('VU Admin');
    await expect(page.locator('.navbar-brand img')).toHaveCount(1);
  });
});

test.describe('hash navigation', () => {
  test('nav items switch the views without a page reload, tables load lazily', async ({ page }) => {
    await openDashboard(page);
    await page.evaluate(() => { window.__noReload = true; });

    // nothing but the dashboard is created yet
    await expect(view(page, 'user').locator('.vu-admin')).toHaveCount(0);
    await expect(view(page, 'todos').locator('.vu-admin')).toHaveCount(0);

    await page.locator('.navbar-nav > li > a', { hasText: 'Users' }).click();
    await expect(page).toHaveURL(/#user$/);
    await expect(rows(view(page, 'user')).first()).toBeVisible();
    await expect(dashboard(page)).toBeHidden();
    await expect(view(page, 'todos').locator('.vu-admin')).toHaveCount(0);
    await expect(page.locator('.navbar-nav .active')).toHaveText(['Users']);
    await expect(page).toHaveTitle('Users | VU Admin');

    // dropdown item
    await page.locator('.navbar-nav .dropdown-toggle', { hasText: 'Content' }).click();
    await page.locator('.navbar-nav .dropdown-item', { hasText: 'Todos' }).click();
    await expect(page).toHaveURL(/#todos$/);
    await expect(rows(view(page, 'todos')).first()).toBeVisible();
    await expect(view(page, 'user')).toBeHidden();
    // the already created users view is kept (hidden), not destroyed
    await expect(view(page, 'user').locator('.vu-admin')).toHaveCount(1);

    expect(await page.evaluate(() => window.__noReload)).toBe(true);
  });

  test('filtered view links set and clear the filters', async ({ page }) => {
    await page.goto('/#todos?userId=1');
    const todos = view(page, 'todos');
    await expect(range(todos)).toHaveText('1-3 / 3');
    // the user filter (select of user names) shows the user of the link
    const userFilter = todos.locator('tr.vua-table-filter select').filter({ has: page.locator('option', { hasText: 'Emily Johnson' }) });
    await expect(userFilter).toHaveValue('1');

    await page.evaluate(() => { window.location.hash = '#todos?completed=false'; });
    await expect(range(todos)).toHaveText('1-10 / 13');

    await page.evaluate(() => { window.location.hash = '#todos'; });
    await expect(range(todos)).toHaveText('1-10 / 20');
  });

  test('the "Todos" button of a user row opens the filtered todos view', async ({ page }) => {
    await page.goto('/#user');
    const row = rows(view(page, 'user')).filter({ hasText: 'Emily Johnson' });
    await row.locator('button', { hasText: 'Todos' }).click();
    await expect(page).toHaveURL(/#todos\?userId=1$/);
    await expect(range(view(page, 'todos'))).toHaveText('1-3 / 3');
  });
});

test.describe('nav source', () => {
  // top-level items and the Content dropdown's items, as shown
  const navState = async (page) => {
    const nav = page.locator('.navbar-nav').first();
    await expect(nav).toBeVisible();
    const top = await nav.locator(':scope > li').evaluateAll((items) => items.map((li) => li.querySelector('a, button').innerText.trim()));
    const content = await nav.locator(':scope > li.dropdown').filter({ hasText: 'Content' }).locator('.dropdown-item')
      .evaluateAll((items) => items.map((item) => item.innerText.trim()));
    return { top, content };
  };
  const withSource = (page, source) => page.route('**/vu-admin-settings.js', async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace("source: 'merge'", `source: '${source}'`);
    await route.fulfill({ response, body });
  });

  test("'merge': entity items first, backend items with the same href win, extra ones appended", async ({ page }) => {
    await openDashboard(page);
    // Dashboard / Content / Users exist on both sides: once each; Documentation only from the backend;
    // the backend's disabled items stay hidden
    expect(await navState(page)).toEqual({
      top: ['Dashboard', 'Content', 'Users', 'Tools', 'Documentation'],
      content: ['Products', 'Posts', 'Todos'],
    });
    // entity color on the icon of an entity item
    await expect(page.locator('.navbar-nav > li > a', { hasText: 'Users' }).locator('i')).toHaveAttribute('style', /--bs-primary/);
  });

  test("'merge': the backend can rename or disable an entity item", async ({ page }) => {
    await page.route('**/api/navs', async (route) => {
      const response = await route.fetch();
      const data = await response.json();
      data.admin.items = data.admin.items.map((item) => (item.href === '#user' ? { ...item, disabled: true } : item));
      data.admin.items.push({ name: 'Content', items: [{ name: 'All products', href: '#product' }] });
      await route.fulfill({ response, json: data });
    });
    await openDashboard(page);
    const state = await navState(page);
    expect(state.top).toEqual(['Dashboard', 'Content', 'Tools', 'Documentation']);
    expect(state.content).toEqual(['All products', 'Posts', 'Todos']);
  });

  test("'entities': only the entity list, no backend request", async ({ page }) => {
    await withSource(page, 'entities');
    let navRequests = 0;
    page.on('request', (request) => { if (request.url().includes('/api/navs')) navRequests++; });
    await openDashboard(page);
    expect(await navState(page)).toEqual({
      top: ['Dashboard', 'Content', 'Users'],
      content: ['Products', 'Posts', 'Todos'],
    });
    expect(navRequests).toBe(0);
  });

  test("'api': the backend menu as before (dropdown items sorted by name)", async ({ page }) => {
    await withSource(page, 'api');
    await openDashboard(page);
    expect(await navState(page)).toEqual({
      top: ['Dashboard', 'Content', 'Users', 'Tools', 'Documentation'],
      content: ['Posts', 'Products', 'Todos'],
    });
  });
});

test.describe('dashboard', () => {
  test('counters show the totals and link to the filtered views', async ({ page }) => {
    await openDashboard(page);
    expect(await counters(page)).toEqual(['15 Users', '13 Open todos', '7 Completed todos', '15 Products']);
    await expect(page.locator('.vu-admin-count').nth(1)).toHaveAttribute('href', '#todos?completed=false');
    // color: the entity's color (todos: warning), or the counter's own (Completed todos: success)
    await expect(page.locator('.vu-admin-count').nth(1).locator('.vu-admin-count-value span')).toHaveAttribute('style', /--bs-warning/);
    await expect(page.locator('.vu-admin-count').nth(2).locator('.vu-admin-count-icon')).toHaveAttribute('style', /--bs-success/);

    await page.locator('.vu-admin-count').nth(1).click();
    await expect(range(view(page, 'todos'))).toHaveText('1-10 / 13');
  });

  test('groups: own column, own row, item class, title; hidden widgets leave the group', async ({ page }) => {
    await openDashboard(page);
    const groups = page.locator('.vu-admin-dashboard-group');
    await expect(groups).toHaveCount(2);

    // counters: a col-12 group, the counters share its row (itemClass default 'col')
    await expect(groups.nth(0)).toHaveClass(/col-12/);
    await expect(groups.nth(0).locator('.vu-admin-dashboard-group-row')).toHaveClass(/row g-3/);
    await expect(groups.nth(0).locator('.vu-admin-dashboard-count')).toHaveCount(4);
    await expect(groups.nth(0).locator('.vu-admin-dashboard-count').first()).toHaveClass(/(^|\s)col(\s|$)/);
    const widths = await groups.nth(0).locator('.vu-admin-dashboard-count').evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().width)));
    expect(new Set(widths).size).toBe(1);

    // tables: titled group, itemClass 'col-xl-6' → two side by side, the third in the next row
    await expect(groups.nth(1).locator('.vu-admin-dashboard-group-title')).toHaveText('Latest');
    const tables = groups.nth(1).locator('.vu-admin-dashboard-table');
    await expect(tables).toHaveCount(3);
    await expect(tables.nth(2)).toHaveClass(/col-xl-6/);
    const tops = await tables.evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().top)));
    expect(tops[0]).toBe(tops[1]);
    expect(tops[2]).toBeGreaterThan(tops[0]);
    // no table is wider than its column (no horizontal scroll)
    const overflow = await tables.evaluateAll((items) => items.map((item) => {
      const scroller = item.querySelector('.table-responsive') || item;
      return scroller.scrollWidth - scroller.clientWidth;
    }));
    expect(overflow.every((value) => value <= 1)).toBe(true);

    // without access to users: one counter and one table less, the others fill the rows
    await userMenuButton(page, 'editor');
    await expect(groups.nth(0).locator('.vu-admin-dashboard-count')).toHaveCount(3);
    await expect(groups.nth(1).locator('.vu-admin-dashboard-table')).toHaveCount(2);
  });

  test('table widgets: columns, rows, sort, filter row, pagination, title link', async ({ page }) => {
    await openDashboard(page);
    const users = widget(page, 'table', 'user');
    const todos = widget(page, 'table', 'todos');

    expect(await visibleColumns(users)).toEqual(['Name ( username )', 'Created', '']);
    expect(await visibleColumns(todos)).toEqual(['Todo', 'User', 'Completed', '']);

    // the user column: a monogram badge (no avatar image), the same user always in the same color
    await expect(todos.locator('tbody img')).toHaveCount(0);
    const badges = todos.locator('tbody .vua-monogram');
    await expect(badges.first()).toHaveText(/^[A-Z]{2}$/);
    const colors = await todos.locator('tbody tr').evaluateAll((items) => items.map((row) => {
      const badge = row.querySelector('.vua-monogram');
      return badge ? [badge.textContent, [...badge.classList].find((name) => name.startsWith('text-bg-'))] : null;
    }).filter(Boolean));
    const byUser = {};
    colors.forEach(([text, color]) => { byUser[text] = byUser[text] || new Set(); byUser[text].add(color); });
    expect(Object.values(byUser).every((set) => set.size === 1)).toBe(true);

    await expect(rows(users)).toHaveCount(10);
    await expect(rows(todos)).toHaveCount(10);
    // order: { createdAt: 'DESC' } → the newest user first
    await expect(rows(users).first()).toContainText('Charlotte Hall');

    await expect(users.locator('tr.vua-table-filter')).toHaveCount(0);
    await expect(todos.locator('tr.vua-table-filter')).toHaveCount(1);

    // pages: 5 → 5 page number buttons, limits: [5, 10, 20, 50]
    await expect(users.locator('.pagination .page-item').filter({ hasText: /^\d+$/ })).toHaveCount(5);
    await users.locator('nav .dropdown-toggle').click();
    await expect(users.locator('nav .dropdown-menu .dropdown-item')).toHaveText(['5', '10', '20', '50'].map((v) => new RegExp(v)));

    await expect(users.locator('.vua-table-title-link')).toHaveAttribute('href', '#user');

    // icon only buttons: no margin after the icon, the icon is in the middle of the button
    const editButton = rows(users).first().locator('button:has(i.bi-pencil-square)');
    await expect(editButton.locator('i')).not.toHaveClass(/\bme-/);
    const [button, icon] = [await editButton.boundingBox(), await editButton.locator('i').boundingBox()];
    expect(Math.abs((icon.x + icon.width / 2) - (button.x + button.width / 2))).toBeLessThan(1.5);
    // a labeled button keeps the margin (Todos)
    await expect(rows(users).first().locator('button', { hasText: 'Todos' }).locator('i')).toHaveClass(/\bme-1\b/);

    // the cell labels of the mobile (card) layout: plain text of the column title, none for the buttons column
    const labels = await rows(users).first().locator('td').evaluateAll((cells) => cells.map((cell) => cell.getAttribute('data-label')));
    expect(labels).toContain('Name ( username )');
    expect(labels.some((label) => label && label.includes('<'))).toBe(false);
    await expect(rows(users).first().locator('td:has(button:has(i.bi-pencil-square))')).not.toHaveAttribute('data-label');

    // toolbar: false → the posts widget has no table toolbar, the others keep theirs
    const posts = widget(page, 'table', 'post');
    await expect(rows(posts)).toHaveCount(10);
    await expect(posts.locator('.vua-table-control')).toHaveCount(0);
    await expect(users.locator('.vua-table-control')).toHaveCount(1);

    // entity color (entities.user.color: 'primary'): table top line + title, nav icon
    await expect(users.locator('.vua-table-container')).toHaveClass(/vua-accent/);
    await expect(users.locator('.vua-table-container')).toHaveAttribute('style', /--vua-accent: var\(--bs-primary\)/);
    await expect(page.locator('.navbar-nav > li > a', { hasText: 'Users' }).locator('i')).toHaveAttribute('style', /--bs-primary/);
  });

  test('an entity without access (entities.user.roles: admin) disappears everywhere for another role', async ({ page }) => {
    await page.goto('/#user');
    await expect(rows(view(page, 'user')).first()).toBeVisible();
    const toolsItems = async () => {
      await page.locator('.navbar-nav .dropdown-toggle', { hasText: 'Tools' }).click();
      const items = await page.locator('.navbar-nav li.dropdown', { hasText: 'Tools' }).locator('.dropdown-menu > li')
        .evaluateAll((list) => list.map((li) => li.innerText.trim()));
      await page.keyboard.press('Escape');
      return items;
    };
    expect(await toolsItems()).toEqual(['Migrations', 'Users', 'Posts']);

    await userMenuButton(page, 'editor');
    // view: gone, the "#user" link shows the dashboard
    await expect(view(page, 'user')).toHaveCount(0);
    await expect(dashboard(page)).toBeVisible();
    // dashboard: counter + table of users gone, the others stay
    await expect(widget(page, 'count', 'user')).toHaveCount(0);
    await expect(widget(page, 'table', 'user')).toHaveCount(0);
    await expect(widget(page, 'table', 'todos')).toHaveCount(1);
    // nav: the Users item and the users migration (API action with entity: 'user') are gone
    await expect(page.locator('.navbar-nav > li', { hasText: 'Users' })).toHaveCount(0);
    expect(await toolsItems()).toEqual(['Migrations', 'Posts']);

    await userMenuButton(page, 'admin');
    await expect(widget(page, 'table', 'user')).toHaveCount(1);
    await expect(page.locator('.navbar-nav > li > a', { hasText: 'Users' })).toHaveCount(1);
  });

  test('counters refresh after an inline change', async ({ page }) => {
    await openDashboard(page);
    const todos = widget(page, 'table', 'todos');
    // the first row is an open todo (order: completed ASC); keep the row by its text, the order changes on save
    const title = (await rows(todos).first().locator('td:visible').first().innerText()).trim();
    const row = rows(todos).filter({ hasText: title });
    const completed = row.locator('select').last();

    await completed.selectOption({ label: 'Yes' });
    await expect(page.locator('.vu-admin-count').nth(1)).toContainText('12');
    await expect(page.locator('.vu-admin-count').nth(2)).toContainText('8');

    // saved as a boolean, without the related user object (relation data is display only)
    const all = await (await page.request.get('/api/todos?limit=0')).json();
    const saved = all.todos.find((todo) => todo.todo === title);
    expect(saved.completed).toBe(true);
    expect(saved.user).toBeUndefined();

    // back to the seed state (the row left the first page: completed todos are sorted to the end)
    await page.request.put(`/api/todos/${saved.id}`, { data: { completed: false } });
    await page.reload();
    await expect(page.locator('.vu-admin-count').nth(1)).toContainText('13');
  });

  test('the "Todos" button of the users widget filters the todos widget in place', async ({ page }) => {
    await openDashboard(page);
    const users = widget(page, 'table', 'user');
    const todos = widget(page, 'table', 'todos');

    await rows(users).filter({ hasText: 'Emily Johnson' }).locator('button', { hasText: 'Todos' }).click();
    await expect(range(todos)).toHaveText('1-3 / 3');
    await expect(rows(todos).first()).toContainText('Emily Johnson');
    // stays on the dashboard
    await expect(page).toHaveURL(/#$/);
    await expect(todos).toBeVisible();
  });

  test('an empty result shows "0 / 0"', async ({ page }) => {
    await openDashboard(page);
    const todos = widget(page, 'table', 'todos');
    await todos.locator('tr.vua-table-filter select').first().selectOption({ label: 'Elijah Lewis' });
    await expect(rows(todos)).toHaveCount(0);
    await expect(range(todos)).toHaveText('0 / 0');
  });

  test('a stored table state of an older config is dropped', async ({ page }) => {
    // state saved before the config changed (no fingerprint, 5 rows, other sort)
    await page.addInitScript(() => {
      localStorage.setItem('vu-tables', JSON.stringify({
        user: { dashboard: { order: { id: { dir: 'ASC', idx: 0, fixed: false } }, filter: {}, limit: 5 } },
      }));
    });
    await openDashboard(page);
    const users = widget(page, 'table', 'user');
    await expect(rows(users)).toHaveCount(10);
    await expect(rows(users).first()).toContainText('Charlotte Hall');
  });
});

// a 2x1 px PNG (red, blue): the avatar is cropped to a square and resized in the browser
const PNG_2x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAIAAAB7QOjdAAAAD0lEQVR4nGP4z8DAwPAfAAcAAf9+CLHQAAAAAElFTkSuQmCC', 'base64');

async function openProfile(page) {
  await openDashboard(page);
  await page.locator('.vua-user-button .dropdown-toggle').click();
  await page.locator('.vua-user-button .dropdown-menu li', { hasText: 'Profile' }).click();
  const panel = page.locator('.vua-auth');
  // the title is the user's name
  await expect(panel.locator('h1')).toHaveText('Emily Johnson');
  return panel;
}

test.describe('user menu', () => {
  test('theme switch applies everywhere and is kept after reload', async ({ page }) => {
    await openDashboard(page);
    await userMenuButton(page, 'Dark');
    await expect(page.locator('html')).toHaveAttribute('data-bs-theme', 'dark');
    await expect(page.locator('header')).toHaveAttribute('data-bs-theme', 'dark');
    await expect(page.locator('.vua-table-container[data-bs-theme="light"]')).toHaveCount(0);

    await page.reload();
    await expect(widget(page, 'table', 'todos').locator('.vua-table-container')).toHaveAttribute('data-bs-theme', 'dark');

    await userMenuButton(page, 'Light');
    await expect(page.locator('.vua-table-container[data-bs-theme="dark"]')).toHaveCount(0);
  });

  test('profile: password change', async ({ page }) => {
    await openDashboard(page);
    await page.locator('.vua-user-button .dropdown-toggle').click();
    await page.locator('.vua-user-button .dropdown-menu li', { hasText: 'Profile' }).click();

    const panel = page.locator('.vua-auth');
    // the title is the user's name, the username and the role under it
    await expect(panel.locator('h1')).toHaveText('Emily Johnson');
    await expect(panel.locator('.vua-auth-profile')).toContainText('emilys');
    await expect(panel.locator('.vua-auth-profile .badge')).toHaveText('admin');
    await expect(panel.locator('#email')).toHaveCount(0);
    // the password change is the second tab
    await panel.getByRole('tab', { name: 'Password' }).click();

    const submit = async (current, next) => {
      await panel.locator('#password_current').fill(current);
      await panel.locator('#password').fill(next);
      await panel.locator('#password_again').fill(next);
      await panel.locator('button[type="submit"]').click();
    };

    // a weak new password is stopped by the form (pattern: lowercase + uppercase + digit), nothing is sent
    await submit('emilyspass', 'newpass');
    expect(await panel.locator('#password').evaluate((input) => input.validity.patternMismatch)).toBe(true);
    await expect(panel.locator('.text-danger, .text-success').filter({ hasText: /changed|incorrect/ })).toHaveCount(0);

    // wrong current password: error, the user stays signed in
    await submit('wrong-password', 'Newpass1');
    await expect(panel).toContainText('The current password is incorrect');
    await expect(panel.locator('#password_current')).toHaveValue('wrong-password');

    await submit('emilyspass', 'Newpass1');
    await expect(panel).toContainText('Password changed');
    await expect(panel.locator('#password_current')).toHaveValue('');

    await submit('Newpass1', 'Newpass1');
    await expect(panel).toContainText('The new password must differ from the current one');

    // stored by the mock server; the page is still signed in
    const users = await (await page.request.get('/api/users?limit=0')).json();
    expect(users.users.find((user) => user.id === 1).password).toBe('Newpass1');
    await panel.locator('button', { hasText: 'Cancel' }).click();
    await expect(panel).toHaveCount(0);
    await expect(widget(page, 'table', 'user')).toBeVisible();
  });

  test('profile: own data — edit, validation, avatar; the header follows', async ({ page }) => {
    const panel = await openProfile(page);
    const data = panel.locator('.vua-auth-profile-data');
    await expect(panel.getByRole('tab', { name: 'Personal data' })).toHaveAttribute('aria-selected', 'true');
    await expect(data.locator('#vua-profile-firstName')).toHaveValue('Emily');
    await expect(data.locator('#vua-profile-lastName')).toHaveValue('Johnson');
    await expect(data.locator('#vua-profile-email')).toHaveValue('emily.johnson@example.com');

    // nothing changed: no request
    let requests = 0;
    page.on('request', (request) => { if (request.url().includes('/api/auth/profile')) requests++; });
    await data.locator('button[type="submit"]').click();
    await expect(data.locator('.vua-auth-profile-message')).toHaveText('Nothing to save');

    // validation in the browser: no request
    await data.locator('#vua-profile-firstName').fill('');
    await data.locator('#vua-profile-phone').fill('abc');
    await data.locator('button[type="submit"]').click();
    await expect(data.locator('#vua-profile-firstName')).toHaveClass(/is-invalid/);
    await expect(data.locator('#vua-profile-phone')).toHaveClass(/is-invalid/);
    expect(requests).toBe(0);

    // no avatar upload by default (the header shows a monogram)
    await expect(data.locator('input[type="file"][name="avatar"]')).toHaveCount(0);
    const userButton = page.locator('.vua-user-button .dropdown-toggle');
    await expect(userButton.locator('.vua-monogram')).toHaveText('EJ');
    await expect(userButton.locator('img')).toHaveCount(0);

    // name + phone: saved, the header's user button (name and monogram) and the title follow
    await data.locator('#vua-profile-firstName').fill('Olivia');
    await data.locator('#vua-profile-phone').fill('+36 30 123 4567');
    await data.locator('button[type="submit"]').click();
    await expect(data.locator('.vua-auth-profile-message')).toHaveText('Profile saved');
    expect(requests).toBe(1);
    await expect(userButton).toContainText('Olivia Johnson');
    await expect(userButton.locator('.vua-monogram')).toHaveText('OJ');
    await expect(panel.locator('h1')).toHaveText('Olivia Johnson');

    // stored by the mock server
    const me = await (await page.request.get('/api/auth/me')).json();
    expect(me).toMatchObject({ firstName: 'Olivia', phone: '+36 30 123 4567' });

    // back to the original name (other tests expect it)
    await data.locator('#vua-profile-firstName').fill('Emily');
    await data.locator('button[type="submit"]').click();
    await expect(userButton).toContainText('Emily Johnson');
  });

  test('profile: avatar upload when turned on (profile.avatar)', async ({ page }) => {
    await page.route('**/vu-admin-settings.js', async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace('// avatar: { size: 256', 'avatar: { size: 256');
      await route.fulfill({ response, body });
    });
    const panel = await openProfile(page);
    const data = panel.locator('.vua-auth-profile-data');
    await data.locator('input[type="file"][name="avatar"]').setInputFiles({ name: 'me.png', mimeType: 'image/png', buffer: PNG_2x1 });
    await expect(data.locator('img.vua-auth-profile-avatar')).toHaveAttribute('src', /^data:image\/jpeg;base64,/);
    await data.locator('button[type="submit"]').click();
    await expect(data.locator('.vua-auth-profile-message')).toHaveText('Profile saved');
    await expect(data.locator('img.vua-auth-profile-avatar')).toHaveAttribute('src', /\/mock\/uploads\/avatar-1-/);
    // stored by the mock server (a 256 px square image)
    const me = await (await page.request.get('/api/auth/me')).json();
    const avatar = await page.request.get(me.image);
    expect(avatar.headers()['content-type']).toMatch(/image/);
  });

  test('profile: the fields come from auth.profile.fields (readonly, date, select)', async ({ page }) => {
    const panel = await openProfile(page);
    const data = panel.locator('.vua-auth-profile-data');
    // the order of the settings
    expect(await data.locator('[data-field]').evaluateAll((items) => items.map((item) => item.dataset.field)))
      .toEqual(['username', 'email', 'firstName', 'lastName', 'phone', 'birthDate', 'gender']);
    // desktop: two fields in a row (username | e-mail, first | last name), the panel is wider than the sign in one
    const top = async (name) => Math.round((await data.locator(`[data-field="${name}"]`).boundingBox()).y);
    expect(await top('username')).toBe(await top('email'));
    expect(await top('firstName')).toBe(await top('lastName'));
    expect(await top('firstName')).toBeGreaterThan(await top('username'));
    expect((await panel.locator('.card').boundingBox()).width).toBeGreaterThan(700);

    // readonly: shown, not editable, not sent
    await expect(data.locator('#vua-profile-username')).toHaveValue('emilys');
    await expect(data.locator('#vua-profile-username')).toHaveAttribute('readonly', '');
    await expect(data.locator('#vua-profile-birthDate')).toHaveValue('1996-05-30');
    await expect(data.locator('#vua-profile-gender')).toHaveValue('female');

    let sent = null;
    page.on('request', (request) => {
      if (request.url().includes('/api/auth/profile')) sent = request.postDataJSON();
    });
    await data.locator('#vua-profile-gender').selectOption('other');
    await data.locator('#vua-profile-birthDate').fill('1996-06-01');
    await data.locator('button[type="submit"]').click();
    await expect(data.locator('.vua-auth-profile-message')).toHaveText('Profile saved');
    expect(sent).toEqual({ gender: 'other', birthDate: '1996-06-01' });
    const me = await (await page.request.get('/api/auth/me')).json();
    expect(me).toMatchObject({ gender: 'other', birthDate: '1996-06-01', username: 'emilys' });

    // back to the original values
    await data.locator('#vua-profile-gender').selectOption('female');
    await data.locator('#vua-profile-birthDate').fill('1996-05-30');
    await data.locator('button[type="submit"]').click();
    await expect(data.locator('.vua-auth-profile-message')).toHaveText('Profile saved');
  });

  test('profile: the Cancel button follows the dark theme', async ({ page }) => {
    await page.addInitScript(() => { if (!localStorage.getItem('vu-theme')) localStorage.setItem('vu-theme', 'dark'); });
    const panel = await openProfile(page);
    const cancel = panel.locator('button', { hasText: 'Cancel' });
    await expect(cancel).toHaveClass(/btn-secondary/);
    await expect(cancel).not.toHaveClass(/btn-light/);
  });

  test('profile: e-mail change waits for the confirmation link', async ({ page }) => {
    const panel = await openProfile(page);
    const data = panel.locator('.vua-auth-profile-data');
    const email = data.locator('#vua-profile-email');

    // an address of another user is refused by the server (field error)
    await email.fill('michael.williams@example.com');
    await data.locator('button[type="submit"]').click();
    await expect(email).toHaveClass(/is-invalid/);
    await expect(data.locator('.invalid-feedback')).toHaveText('This e-mail address is already taken');

    // a new address: pending, the current one stays
    await email.fill('emily.new@example.com');
    await data.locator('button[type="submit"]').click();
    await expect(data.locator('.vua-auth-profile-message')).toContainText('We sent a confirmation link to emily.new@example.com');
    await expect(email).toHaveValue('emily.johnson@example.com');
    await expect(data.locator('.vua-auth-profile-pending')).toContainText('emily.new@example.com');

    // the link (its answer faked: the mock's token goes to the server log only) → the profile shows the result
    await page.route('**/api/auth/email-confirm', (route) => route.fulfill({
      status: 200, json: { email: 'emily.new@example.com', message: 'Your e-mail address has been changed.' },
    }));
    await page.goto('/?vuparams=' + encodeURIComponent(JSON.stringify({ panel: 'emailConfirm', inputs: { token: 'abc' } })));
    const after = page.locator('.vua-auth');
    await expect(after.locator('.vua-auth-profile-message')).toHaveText('Your e-mail address has been changed.');
    await expect(after.locator('#vua-profile-email')).toHaveValue('emily.new@example.com');
    await expect(after.locator('.vua-auth-profile-pending')).toHaveCount(0);

    // the mock: an unknown token is refused
    const refused = await page.request.post('/api/auth/email-confirm', { data: { token: 'nope' } });
    expect(refused.status()).toBe(400);

    // back to the original address on the server (drops the pending change)
    const reset = await page.request.post('/api/auth/profile', { data: { email: 'emily.johnson@example.com' } });
    expect(reset.status()).toBe(200);
    expect((await reset.json()).pendingEmail).toBeUndefined();
  });

  test('profile: the menu item can be turned off in the settings', async ({ page }) => {
    // vu-admin-settings.js with auth.profile.enabled: false
    await page.route('**/vu-admin-settings.js', async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace(/profile: \{\s*enabled: true,/, 'profile: { enabled: false,');
      await route.fulfill({ response, body });
    });
    await openDashboard(page);
    await page.locator('.vua-user-button .dropdown-toggle').click();
    const menu = page.locator('.vua-user-button .dropdown-menu');
    await expect(menu).toContainText('Sign out');
    await expect(menu.locator('li', { hasText: 'Profile' })).toHaveCount(0);
  });

  test('language switch translates the page', async ({ page }) => {
    await openDashboard(page);
    await userMenuButton(page, 'HU');
    await expect(page.locator('.navbar-nav')).toContainText('Felhasználók');
    expect(await counters(page)).toContain('15 Felhasználók');
  });
});
