# TODO

Ideas, not decided yet — each one only if it is really needed.

## Candidates

- **Mobile header** — on a phone the nav of `VuAdminApp`'s header does not fit (Tools, Documentation and the user
  button run off to the right). A collapsible (hamburger) nav; the user button stays outside with the monogram only
  (no name) on small screens.

- **Profile → Security tab: two-factor authentication** (the `profile` panel of VuAuth; password change and own data
  — name, e-mail with re-confirmation, phone, optional avatar, configurable fields — are done):
  - turn 2FA on / off (on: confirmed with a code, off: with the password), change the method (now: e-mail code only);
  - list / revoke the trusted devices one by one;
  - new mock endpoints for these.

- **Profile → Security tab: active sessions** — where the user is signed in (browser, last activity), revoke one,
  "sign out everywhere". Together with the 2FA part (both handle devices / tokens).

- **Preferences stored on the server** — language, theme, default start page (now only in localStorage).

- **Notification settings** — newsletter, e-mail notifications.

- **Delete account / data export (GDPR)**.

- **Mobile layout of the tables** — wide tables, filter row, row buttons on small screens (the card layout exists,
  it needs polishing).
