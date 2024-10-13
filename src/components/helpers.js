
export function deepMerge(target, source) {

    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }

    return Object.assign(target || {}, source);

}

export function getValueOrFunction(object, params, settings, vua) {
    try {

        if (typeof object === 'function') {
            return object(params, settings, vua);
        }

        return object;

    } catch (error) {
        return null;
    }
}

export async function getResponseJson(response) {
    try {
        return {
            data: await response.json(),
            error: null
        }
    } catch (error) {
        return {
            data: undefined,
            error: error
        }
    }
}


export function getResponseErrors(response, data) {

    let errors = [];

    if (data && data.errors) {

        for (let error of data.errors) {
            errors.push({
                message: error.message,
                timeout: 3500,
                priority: 'danger',
            });
        }

    } else if (response.status >= 400 && response.status <= 511) {

        errors.push({
            message: response.status + (response.statusText ? (' ' + response.statusText) : ''),
            timeout: 3500,
            priority: 'danger'
        });

    }

    return errors.length > 0 ? errors : null;
}



export function prepareFetchOptions(method, api, options) {

    if (!api.options) {
        api.options = {};
    }

    if (!api.options.headers) {
        api.options.headers = {};
    }

    if (method != "GET") {
        if (!api.options.headers["Content-Type"]) {
            api.options.headers["Content-Type"] =
                "application/json";
        }
    }

    if (api.auth) {
        if (api.auth.type == 'Basic' && api.auth.user) {
            api.options.headers['Authorization'] = "Basic " + btoa(api.auth.user + ":" + api.auth.password);
        }
        if (api.auth.type == 'Bearer' && api.auth.token) {
            api.options.headers['Authorization'] = "Bearer " + api.auth.token;
        }
        if (api.auth.type == 'Cookie') {
            api.options.credentials = 'include';
            // api.options.headers['Cookie'] = "";
        }
    }

    api.options.body = undefined;
    api.options.method = method;

    if (options) {
        Object.assign(api.options, options);
    }

    if (api.debug) {
        console.log('FETCH OPTIONS', api.options);
    }

    return api.options;

}

export function prepareFetchUrl(method, api, id, urlParams) {

    let haveParams = false;
    let queryParams = Object.assign({}, urlParams ? urlParams : {});

    if (urlParams) {

        if (urlParams.filter) {
            queryParams.filter = JSON.stringify(urlParams.filter);
        }

        if (urlParams.order) {
            queryParams.order = JSON.stringify(urlParams.order);
        }

        haveParams = Object.keys(queryParams).length;
    }

    return api.url + (id ? '/' + id : '') + (haveParams ? "?" + (new URLSearchParams(queryParams)).toString() : '');

}


export function slugify(value, separator = "-") {
    return value.toString() // Cast to string (optional)
        .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase() // Convert the string to lowercase letters
        .trim() // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\_/g, "-") // Replace _ with -
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/\-$/g, ""); // Remove trailing -
};


export function flattenArrayObjects(array) {

    let rows = [];

    for (let row of array) {
        rows.push(flattenObject(row));
    }

    return rows;

}

export function flattenObject(obj, parent = '', res = {}) {
    for (let key in obj) {
        let propName = parent ? parent + '.' + key : key;
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            flattenObject(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}

export function unflattenObject(data) {

    let result = {};

    for (let i in data) {
        let keys = i.split('.');
        keys.reduce((res, key, j) => {
            return res[key] || (res[key] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 === j ? data[i] : {}) : []);
        }, result);
    }

    return result;

}

export function isModified(original, current) {

    let originalString = JSON.stringify(original);
    let currentString = JSON.stringify(current);

    return originalString !== currentString;

}

export function translate(key, translates, vars, language) {

    const replaceVars = (value, vars) => {

        if (!value || !vars) return value;

        return value.replace(/{\s*(.*?)\s*}/g, (match, p1) => {
            return vars[p1] ? vars[p1] : '';
        });
    }

    if (!translates) {
        return replaceVars(key, vars);
    }

    language = language ? language : document.documentElement.lang;

    if (!language || !translates[language]) {
        return replaceVars(key, vars);
    }

    if (!translates[language][key]) {
        return replaceVars(key, vars);
    }

    return replaceVars(translates[language][key]);

}

export function convertToCSV(items, fields, delimiter = ';') {

    const headers = fields.map(field => field.title ? field.title : (field.name.charAt(0).toUpperCase() + field.name.slice(1))).join(delimiter);
    const rows = items.map(row =>
        fields.map(field => {

            let value = row[field.name];

            if (field.template) {
                return field.template(value, row, items);
            }

            return value !== undefined ? value : '';

        }).join(delimiter)
    );

    return [headers, ...rows].join('\n');

}


export function downloadCSV(csvContent, filename = 'export.csv') {

    csvContent = '\uFEFF' + csvContent;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);

}

export function arrayUnique(array) {

    return [... new Set(array)];

}

export function arrayToggleOne(arr, val) {

    if (arr.indexOf(val) >= 0) {
        arr.splice(arr.indexOf(val), 1);
    } else {
        arr.push(val);
    }

    return;

};

export function arraySelectAll(array, options) {

    for (let option of options) {
        if (array.indexOf(option.value) < 0) {
            array.push(option.value);
        }
    }

};

export function arraySelectInvert(array, options) {

    for (let option of options) {
        if (array.indexOf(option.value) < 0) {
            array.push(option.value);
        } else {
            array.splice(array.indexOf(option.value), 1);
        }
    }

};

export function arraySelectClear(array) {
    array.length = 0;
};

export function arrayItemMoveUp(arr, index) {

    if (index <= 0 || index >= arr.length) {
        return;
    }

    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];

}

export function arrayItemMoveDown(arr, index) {

    if (index <= 0 || index >= arr.length) {
        return;
    }

    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];

}

export function executeFunctions(obj, params) {

    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'function') {
            obj[key] = obj[key](params);
        }
    });

}