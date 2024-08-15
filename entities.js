
import EntityPost from './entity-post.js';
import EntityChecks from './entity-checks.js';
import EntityLorem from './entity-lorem.js';

window.VuEntities = {
    post: EntityPost,
    checks: EntityChecks,
    lorem: EntityLorem,
    user: {
        pkey: '_id',
        api: {
            url: 'http://supercms.vi/szerk/api/user',
            input: {
                item: 'item',
                items: 'items'
            }
        },
    }

};

// console.log(Object.keys(window.entities));
