import { expect } from '@playwright/test';

// a stored session, like after a sign-in: VuAuth restores it with the profile request (/api/auth/me → user 1, admin)
// and onSuccess.profile sets auth.settings (entities + dashboard) from vu-admin-settings.js — no captcha needed
export async function signIn(page, { language = 'en' } = {}) {
  await page.addInitScript(({ language }) => {
    if (!localStorage.getItem('vu-user')) {
      localStorage.setItem('vu-user', JSON.stringify({
        id: 1, username: 'emilys', firstName: 'Emily', lastName: 'Johnson', role: 'admin', roles: ['admin', 'editor'],
      }));
      localStorage.setItem('vu-header', JSON.stringify({ 'X-Auth-Token': 'e2e' }));
      localStorage.setItem('vu-language', language);
    }
  }, { language });
}

export const dashboard = (page) => page.locator('.vu-admin-dashboard');
export const widget = (page, type, entity) => page.locator(`.vu-admin-dashboard-${type}[data-entity="${entity}"]`);
export const view = (page, entity) => page.locator(`.vu-admin-view[data-entity="${entity}"]`);
export const rows = (scope) => scope.locator('tbody tr');
export const range = (scope) => scope.locator('nav span.small').first();

// visible header texts of a table, in order ('' for a column without a title); sort badges are left out
export async function visibleColumns(scope) {
  return scope.locator('thead tr').first().locator('th:visible').evaluateAll((cells) =>
    cells.map((cell) => {
      const copy = cell.cloneNode(true);
      copy.querySelectorAll('.badge').forEach((badge) => badge.remove());
      return (copy.textContent || '').replace(/\s+/g, ' ').trim();
    }));
}

export async function openDashboard(page) {
  await page.goto('/#');
  await expect(widget(page, 'table', 'user').locator('tbody tr').first()).toBeVisible();
  await expect(widget(page, 'table', 'todos').locator('tbody tr').first()).toBeVisible();
}

export async function counters(page) {
  const cards = page.locator('.vu-admin-count');
  await expect(cards.first().locator('.vu-admin-count-value .spinner-border')).toHaveCount(0);
  return cards.evaluateAll((items) => items.map((item) => item.innerText.replace(/\s+/g, ' ').trim()));
}

// opens the user menu and clicks a button of the role / language / theme switch by its text or title
export async function userMenuButton(page, label) {
  await page.locator('.vua-user-button .dropdown-toggle').click();
  const menu = page.locator('.vua-user-button .dropdown-menu');
  const button = menu.locator('button').filter({ hasText: new RegExp(`^${label}$`) })
    .or(menu.locator(`button[title="${label}"]`));
  await button.first().click();
  await page.keyboard.press('Escape');
}
