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

export function getButtonIconClassByAction(action) {
  switch (action) {
    case 'TABLE_RESET_ORDERS':
    case 'TABLE_RESET_FILTERS':
      return 'bi bi-x';
    case 'TABLE_CLOSE_DETAILS':
      return 'bi bi-chevron-compact-up';
    case 'TABLE_ROW_EDIT':
      return 'bi bi-pencil-square';
    case 'FORM_SUBMIT':
    case 'TABLE_ROW_SAVE':
    case 'TABLE_BULK_SAVE':
      return 'bi bi-save';
    case 'FORM_DELETE':
    case 'TABLE_ROW_DELETE':
    case 'TABLE_BULK_DELETE':
      return 'bi bi-trash';
    case 'TABLE_ROW_DETAIL':
      return 'bi bi-chevron-compact-down';
    case 'FORM_RELOAD':
    case 'TABLE_RELOAD':
      return 'bi bi-arrow-clockwise';
    case 'TABLE_COLUMNS':
      return 'bi bi-table';
    case 'TABLE_EXPORT':
      return 'bi bi-download';
    default:
      return 'bi bi-question';
  }
}
