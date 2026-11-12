// Light / dark theme chosen by the user (user menu → BUTTON_THEME), stored in localStorage.
// The choice wins over window.VuSettings.theme and over an entity config's own `theme`;
// without a choice everything works as configured.

const THEME_STORAGE_KEY = 'vu-theme';

// every vu-admin component listens to it: event.detail = { theme: 'light' | 'dark' | 'auto', resolved: 'light' | 'dark' }
export const THEME_CHANGE_EVENT = 'vu-theme-change';

// offered in the user menu; override with window.VuSettings.themes
export const THEMES = [
  { value: 'light', label: 'Light', icon: 'bi bi-sun' },
  { value: 'dark', label: 'Dark', icon: 'bi bi-moon-stars' },
  { value: 'auto', label: 'System', icon: 'bi bi-circle-half' },
];

export function availableThemes() {
  const custom = typeof window !== 'undefined' && window.VuSettings && window.VuSettings.themes;
  return Array.isArray(custom) && custom.length ? custom : THEMES;
}

function isAvailable(theme) {
  return availableThemes().some((item) => item.value === theme);
}

// the user's choice ('light' | 'dark' | 'auto'), or null when there is none
export function getTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored && isAvailable(stored) ? stored : null;
  } catch (e) {
    return null;
  }
}

function systemTheme() {
  try {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (e) {
    return 'light';
  }
}

// 'auto' → the operating system's scheme; null (no choice) → null
export function resolveTheme(theme) {
  if (!theme) {
    return null;
  }
  return theme === 'auto' ? systemTheme() : theme;
}

// the theme a component should use: the user's choice, else its configured theme, else 'light'
export function effectiveTheme(configured) {
  return resolveTheme(getTheme()) || configured || 'light';
}

// the page itself (body background, Bootstrap components outside vu-admin) follows the choice
export function applyDocumentTheme() {
  const resolved = resolveTheme(getTheme());
  if (resolved && typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-bs-theme', resolved);
  }
}

function notify() {
  applyDocumentTheme();
  if (typeof window !== 'undefined') {
    const theme = getTheme();
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme, resolved: resolveTheme(theme) } }));
  }
}

// store the user's choice and notify every vu-admin component on the page
export function setTheme(theme) {
  if (!isAvailable(theme)) {
    return;
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    // localStorage unavailable (e.g. private mode) - the choice lasts until reload
  }
  notify();
}

if (typeof window !== 'undefined') {
  applyDocumentTheme();
  // 'auto' follows the operating system switching between light and dark
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (getTheme() === 'auto') {
        notify();
      }
    });
  } catch (e) {
    // matchMedia unavailable - ignore
  }
}
