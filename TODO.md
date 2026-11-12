# TODO

## Next

- **Nav from the entity list** — the menu comes from `/api/navs`, the entities from `auth.settings.entities`, so a new
  entity needs a menu item in a second place. Option: build the nav (or part of it) from `entities`
  (`title`, an optional `icon` / `group`), keeping `/api/navs` for extra links and API actions.
- **Automated tests** — e.g. Playwright against the mock server: hash navigation (`#user`, `#todos?userId=1`), lazy
  table loading, dashboard widgets (`columns`, `limit` / `limits` / `pages`, `filters`, `order`, `link`, `roles`),
  counters refreshing after an inline change, stored table state vs. config changes, session restore.
- **Profile settings of the signed-in user** (user menu → *Profile*), the usual account self-service:
  - change password (current + new + repeat, the same strength rules as registration);
  - edit own data (name, e-mail with re-confirmation, phone, avatar upload);
  - two-factor authentication: turn on / off, change the method, list / revoke the trusted devices;
  - active sessions / devices, "sign out everywhere";
  - preferences stored on the server too (language, theme, default start page);
  - notification settings (newsletter, e-mail notifications);
  - delete account / data export (GDPR).

## Later

- **Mobile layout** — collapsible (hamburger) nav in `VuAdminApp`'s header; the tables need a mobile layout first
  (wide tables, filter row, row buttons).
