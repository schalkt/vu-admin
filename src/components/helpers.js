export function getValueOrFunction(object, params) {
    try {

        if (typeof object === 'string') {
            return object;
        }

        if (typeof object === 'function') {
            return object(params);
        }

    } catch (error) {
        return null;
    }
}

export async function getResponseJson(response) {
    try {
        return await response.json();
    } catch (error) {
        return null;
    }
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


    if (urlParams.filter) {
        urlParams.filter = JSON.stringify(urlParams.filter);
    }

    if (urlParams.order) {
        urlParams.order = JSON.stringify(urlParams.order);
    }

    const haveParams = urlParams && Object.keys(urlParams).length;
    return api.url + (id ? '/' + id : '') + (haveParams ? "?" + (new URLSearchParams(urlParams)).toString() : '');

}

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

export function translate(key, translates, vars, language) {

    if (!translates) {
        return key;
    }

    language = language ? language : document.documentElement.lang;

    if (!language || !translates[language]) {
        return key;
    }

    if (!translates[language][key]) {
        return key;
    }

    let translated = translates[language][key];
    vars = vars || {};
    
    // translated = translated.replace(/{\s*(.*?)\s*}/g, (match, p1) => {
    //     return vars[p1] ? vars[p1] : '';
    // });    

    return translated;

}

export function convertToCSV(array, fields, delimiter = ';') {

    const headers = fields.map(field => field.title).join(delimiter);
    const rows = array.map(obj =>
        fields.map(field => {

            let value = obj[field.name];

            if (field.template) {
                return field.template(value);
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

export function array_unique(array) {

    return [... new Set(array)];

}
