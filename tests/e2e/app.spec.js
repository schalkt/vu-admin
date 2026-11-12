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

test.describe('dashboard', () => {
  test('counters show the totals and link to the filtered views', async ({ page }) => {
    await openDashboard(page);
    expect(await counters(page)).toEqual(['15 Users', '13 Open todos', '7 Completed todos', '15 Products']);
    await expect(page.locator('.vu-admin-count').nth(1)).toHaveAttribute('href', '#todos?completed=false');

    await page.locator('.vu-admin-count').nth(1).click();
    await expect(range(view(page, 'todos'))).toHaveText('1-10 / 13');
  });

  test('table widgets: columns, rows, sort, filter row, pagination, title link', async ({ page }) => {
    await openDashboard(page);
    const users = widget(page, 'table', 'user');
    const todos = widget(page, 'table', 'todos');

    expect(await visibleColumns(users)).toEqual(['Avatar', 'Name ( username )', 'Created', '']);
    expect(await visibleColumns(todos)).toEqual(['Todo', 'User', 'Completed', '']);

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
  });

  test('widgets with roles disappear for another role', async ({ page }) => {
    await openDashboard(page);
    await expect(widget(page, 'count', 'user')).toHaveCount(1);
    await expect(widget(page, 'table', 'user')).toHaveCount(1);

    await userMenuButton(page, 'editor');
    await expect(widget(page, 'count', 'user')).toHaveCount(0);
    await expect(widget(page, 'table', 'user')).toHaveCount(0);
    await expect(widget(page, 'table', 'todos')).toHaveCount(1);

    await userMenuButton(page, 'admin');
    await expect(widget(page, 'table', 'user')).toHaveCount(1);
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

  test('language switch translates the page', async ({ page }) => {
    await openDashboard(page);
    await userMenuButton(page, 'HU');
    await expect(page.locator('.navbar-nav')).toContainText('Felhasználók');
    expect(await counters(page)).toContain('15 Felhasználók');
  });
});
