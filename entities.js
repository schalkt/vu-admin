

import products from './entity-products.js';
import users from './entity-users.js';
import EntityChecks from './entity-checks.js';

window.VuEntities = {
    products: products,
    users: users,
    checks: EntityChecks,
};

// console.log(Object.keys(window.entities));
