# TODO

## Next

- **Nav from the entity list** — the menu comes from `/api/navs`, the entities from `auth.settings.entities`, so a new
  entity needs a menu item in a second place. Option: build the nav (or part of it) from `entities`
  (`title`, an optional `icon` / `group`), keeping `/api/navs` for extra links and API actions.
- **Automated tests** — e.g. Playwright against the mock server: hash navigation (`#user`, `#todos?userId=1`), lazy
  table loading, dashboard widgets (`columns`, `limit` / `limits` / `pages`, `filters`, `order`, `link`, `roles`),
  counters refreshing after an inline change, stored table state vs. config changes, session restore.
- **Light / dark theme switch** in the user menu next to the language switch (stored in localStorage); today the
  theme is fixed per entity (`theme`) and globally (`VuSettings.theme`).

## Later

- **Mobile layout** — collapsible (hamburger) nav in `VuAdminApp`'s header; the tables need a mobile layout first
  (wide tables, filter row, row buttons).
