export function getButtonClassByAction(action) {
  switch (action) {
    case 'TABLE_RESET_ORDERS':
    case 'TABLE_RESET_FILTERS':
      return 'btn btn-sm btn-outline-secondary text-nowrap mx-1';
    case 'TABLE_CLOSE_DETAILS':
      return 'btn btn-sm btn-outline-secondary text-nowrap mx-1';
    case 'TABLE_ROW_EDIT':
      return 'btn btn-sm btn-secondary text-nowrap mx-1';
    case 'FORM_SUBMIT':
    case 'TABLE_ROW_SAVE':
    case 'TABLE_BULK_SAVE':
      return 'btn btn-sm btn-primary text-nowrap mx-1';
    case 'FORM_DELETE':
    case 'TABLE_ROW_DELETE':
    case 'TABLE_BULK_DELETE':
      return 'btn btn-sm btn-danger text-nowrap mx-1';
    case 'TABLE_ROW_DETAIL':
      return 'btn btn-sm btn-outline-secondary text-nowrap mx-1';
    case 'FORM_RELOAD':
    case 'TABLE_RELOAD':
      return 'btn btn-sm btn-outline-secondary text-nowrap mx-1';
    case 'TABLE_COLUMNS':
      return 'btn btn-sm btn-outline-secondary text-nowrap mx-1';
    case 'TABLE_EXPORT':
      return 'btn btn-sm btn-primary text-nowrap mx-1';
    default:
      return 'btn btn-sm btn-outline-primary text-nowrap mx-1';
  }
}

/** Ensure form/table button icons always have Bootstrap me-1 spacing. */
export function withButtonIconMe1(iconClass) {
  if (iconClass == null || iconClass === false) return iconClass;
  if (typeof iconClass !== 'string') return iconClass;
  const trimmed = iconClass.trim();
  if (!trimmed) return trimmed;
  if (/\bme-\d+\b/.test(trimmed)) {
    return trimmed.replace(/\bme-\d+\b/g, 'me-1');
  }
  return `${trimmed} me-1`;
}

export function getButtonIconClassByAction(action) {
  let icon;
  switch (action) {
    case 'TABLE_RESET_ORDERS':
    case 'TABLE_RESET_FILTERS':
      icon = 'bi bi-x';
      break;
    case 'TABLE_CLOSE_DETAILS':
      icon = 'bi bi-chevron-compact-up';
      break;
    case 'TABLE_ROW_EDIT':
      icon = 'bi bi-pencil-square';
      break;
    case 'FORM_SUBMIT':
    case 'TABLE_ROW_SAVE':
    case 'TABLE_BULK_SAVE':
      icon = 'bi bi-save';
      break;
    case 'FORM_DELETE':
    case 'TABLE_ROW_DELETE':
    case 'TABLE_BULK_DELETE':
      icon = 'bi bi-trash';
      break;
    case 'TABLE_ROW_DETAIL':
      icon = 'bi bi-chevron-compact-down';
      break;
    case 'FORM_RELOAD':
    case 'TABLE_RELOAD':
      icon = 'bi bi-arrow-clockwise';
      break;
    case 'TABLE_COLUMNS':
      icon = 'bi bi-table';
      break;
    case 'TABLE_EXPORT':
      icon = 'bi bi-download';
      break;
    default:
      icon = 'bi bi-question';
  }
  return withButtonIconMe1(icon);
}
