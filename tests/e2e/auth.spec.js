import { test, expect } from '@playwright/test';

// no stored session: the sign in form is shown
test.describe('signed out page', () => {
  test('no header; logo, title, sign in button and registration link in the middle', async ({ page }) => {
    await page.goto('/');
    const landing = page.locator('.vu-admin-landing');
    await expect(landing).toBeVisible();
    await expect(page.locator('header')).toHaveCount(0);
    await expect(page.locator('.vu-admin-nav, nav.navbar')).toHaveCount(0);
    await expect(landing.locator('img.vu-admin-landing-logo')).toBeVisible();
    await expect(landing.locator('h1')).toHaveText('VU Admin');

    // centered on the screen
    const box = await landing.locator('.vu-admin-landing-sign-in').boundingBox();
    const viewport = page.viewportSize();
    expect(Math.abs(box.x + box.width / 2 - viewport.width / 2)).toBeLessThan(20);
    expect(Math.abs(box.y + box.height / 2 - viewport.height / 2)).toBeLessThan(viewport.height / 4);

    // registration link → registration panel
    await landing.getByRole('link', { name: 'Register' }).click();
    await expect(page.locator('#password_again')).toBeVisible();
  });

  test('after sign in the header is back, the landing is gone', async ({ page }) => {
    await page.goto('/');
    await page.locator('.vu-admin-landing-sign-in').click();
    const form = page.locator('form').filter({ has: page.locator('#password') });
    await form.locator('#password').fill('emilyspass');
    await page.route('**/api/auth/login', (route) => route.fulfill({ status: 200, json: {
      id: 1, username: 'emilys', firstName: 'Emily', lastName: 'Johnson', role: 'admin', roles: ['admin'], accessToken: 'e2e',
    } }));
    await form.locator('button[type="submit"]').click();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('.vu-admin-landing')).toHaveCount(0);
    // no register button in the header
    await expect(page.locator('header').getByText('Register')).toHaveCount(0);
  });

  test('language switch translates the landing and is kept', async ({ page }) => {
    await page.goto('/');
    const landing = page.locator('.vu-admin-landing');
    await landing.getByRole('button', { name: 'Magyar' }).click();
    await expect(landing.locator('.vu-admin-landing-sign-in')).toHaveText('Bejelentkezés');
    await expect(landing.locator('.vu-admin-landing-register')).toContainText('Még nincs fiókod?');
    await expect(landing.getByRole('button', { name: 'Magyar' })).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await expect(page.locator('.vu-admin-landing-sign-in')).toHaveText('Bejelentkezés');
  });

  test("dark theme: logoDark 'invert' inverts the logo", async ({ page }) => {
    await page.addInitScript(() => { if (!localStorage.getItem('vu-theme')) localStorage.setItem('vu-theme', 'dark'); });
    await page.goto('/');
    const logo = page.locator('.vu-admin-landing-logo');
    await expect(logo).toHaveCSS('filter', 'invert(1)');
    await page.evaluate(() => localStorage.setItem('vu-theme', 'light'));
    await page.reload();
    await expect(logo).toHaveCSS('filter', 'none');
  });
});

test.describe('sign in form', () => {
  test('password rules only on registration; honeypot field', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign in' }).click();
    const form = page.locator('form').filter({ has: page.locator('#password') });
    await expect(form).toBeVisible();

    // sign in: no pattern / length rule revealed
    const password = form.locator('#password');
    await expect(password).not.toHaveAttribute('pattern');
    await expect(password).toHaveAttribute('minlength', '1');

    // honeypot: ordinary name, no autocomplete, hidden from screen readers by its wrapper
    const honeypot = form.locator('input[name="website"]');
    await expect(honeypot).toHaveAttribute('autocomplete', 'off');
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
    await expect(honeypot).not.toHaveAttribute('aria-hidden');
    await expect(honeypot.locator('xpath=..')).toHaveAttribute('aria-hidden', 'true');
    await expect(form.locator('input[name="vu_b4t"]')).toHaveCount(0);

    // a filled honeypot sends no request (the form is valid otherwise, so only the honeypot can stop it)
    let requests = 0;
    page.on('request', (request) => { if (request.url().includes('/api/auth/login')) requests++; });
    await password.fill('x');
    await honeypot.fill('http://spam.example', { force: true });
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(300);
    expect(requests).toBe(0);
    // control: the same form without the honeypot is sent
    await honeypot.fill('', { force: true });
    await form.locator('button[type="submit"]').click();
    await expect.poll(() => requests).toBe(1);

    // registration: the rules apply
    await form.locator('button.btn-warning').click();
    await expect(password).toHaveAttribute('pattern', /.+/);
    expect(Number(await password.getAttribute('minlength'))).toBeGreaterThan(1);
  });

  test('the mock rejects a filled honeypot on login, register and forgot', async ({ request }) => {
    for (const action of ['login', 'register', 'forgot']) {
      const response = await request.post('/api/auth/' + action, { data: { username: 'emilys', password: 'x', honeypot: 'x' } });
      expect(response.status(), action).toBeGreaterThanOrEqual(400);
    }
    // forgot: the same answer for an unknown address as for a known one
    const unknown = await request.post('/api/auth/forgot', { data: { username: 'nobody@example.com' } });
    const known = await request.post('/api/auth/forgot', { data: { username: 'emilys' } });
    expect(unknown.status()).toBe(200);
    expect(await unknown.json()).toEqual(await known.json());
  });

  test('a hidden form_token field with a new random value on every submit, sent as formToken', async ({ page }) => {
    const sent = [];
    await page.route('**/api/auth/login', async (route) => {
      sent.push(route.request().postDataJSON().formToken);
      await route.fulfill({ status: 401, json: { message: 'Invalid username or password' } });
    });
    await page.goto('/');
    await page.locator('.vu-admin-landing-sign-in').click();
    const form = page.locator('form').filter({ has: page.locator('#password') });
    const field = form.locator('input[type="hidden"][name="form_token"]');
    const first = await field.inputValue();
    expect(first).toMatch(/^[0-9a-f]{32}$/);

    await form.locator('#password').fill('x');
    await form.locator('button[type="submit"]').click();
    await expect.poll(() => sent.length).toBe(1);
    expect(sent[0]).toBe(first);
    await expect(field).not.toHaveValue(first);
  });
});

test.describe('rate limit', () => {
  test('the mock locks a username after failed sign ins: 429 + Retry-After', async ({ request }) => {
    const statuses = [];
    let retryAfter = null;
    for (let i = 0; i < 6; i++) {
      const response = await request.post('/api/auth/login', { data: { username: 'nobody-api@example.com', password: 'wrong' } });
      statuses.push(response.status());
      if (response.status() === 429) retryAfter = response.headers()['retry-after'];
    }
    // 4 plain failures, then the lock (unknown usernames too: the lock does not reveal which ones exist)
    expect(statuses).toEqual([401, 401, 401, 401, 429, 429]);
    expect(Number(retryAfter)).toBeGreaterThan(0);
    // another username is not affected
    // (a seed user whose password no other test changes)
    const other = await request.post('/api/auth/login', { data: { username: 'michaelw', password: 'michaelwpass' } });
    expect(other.status()).toBe(200);
  });

  test('VuAuth: countdown and disabled submit after a 429', async ({ page }) => {
    await page.route('**/api/auth/login', (route) => route.fulfill({
      status: 429, headers: { 'Retry-After': '3' }, json: { message: 'Too many attempts, please try again later' },
    }));
    await page.goto('/');
    await page.locator('.vu-admin-landing-sign-in').click();
    const form = page.locator('form').filter({ has: page.locator('#password') });
    await form.locator('#password').fill('x');
    const submit = form.locator('button[type="submit"]');
    await submit.click();

    const retry = form.locator('.vua-auth-retry');
    await expect(retry).toContainText(/Too many attempts\. Please try again in 0:0[1-3]\./);
    await expect(submit).toBeDisabled();
    // the countdown ends: the message goes, the submit is enabled again
    await expect(retry).toHaveCount(0, { timeout: 6000 });
    await expect(submit).toBeEnabled();
  });
});

test.describe('password reset', () => {
  test('the e-mailed link opens the new password panel and sends the token to api.password', async ({ page }) => {
    let sent = null;
    await page.route('**/api/auth/reset', async (route) => {
      sent = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { message: 'Your password has been changed, you can sign in now.' } });
    });
    const params = encodeURIComponent(JSON.stringify({ panel: 'password', inputs: { token: 'abc123' } }));
    await page.goto('/?vuparams=' + params);

    const form = page.locator('form').filter({ has: page.locator('#password_again') });
    await expect(form).toBeVisible();
    await form.locator('#password').fill('NewPass1');
    await form.locator('#password_again').fill('NewPass1');
    await form.locator('button[type="submit"]').click();

    await expect.poll(() => sent).not.toBeNull();
    expect(sent).toMatchObject({ token: 'abc123', password: 'NewPass1' });
    await expect(page.getByText('Your password has been changed, you can sign in now.')).toBeVisible();
  });

  test('the mock rejects an unknown token', async ({ request }) => {
    const response = await request.post('/api/auth/reset', { data: { token: 'nope', password: 'NewPass1' } });
    expect(response.status()).toBe(400);
  });
});

test.describe('e-mail change link', () => {
  test('signed out: the result is shown on the sign in panel', async ({ page }) => {
    await page.route('**/api/auth/email-confirm', (route) => route.fulfill({
      status: 400, json: { message: 'The link is invalid or has expired' },
    }));
    await page.goto('/?vuparams=' + encodeURIComponent(JSON.stringify({ panel: 'emailConfirm', inputs: { token: 'old' } })));
    const panel = page.locator('.vua-auth');
    await expect(panel.locator('#password')).toBeVisible();
    await expect(panel.locator('.text-danger', { hasText: 'The link is invalid or has expired' })).toBeVisible();
    // the parameter is removed from the address
    expect(page.url()).not.toContain('vuparams');
  });
});
