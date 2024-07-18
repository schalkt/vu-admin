
export function getResponseErrors(response, data) {
    if (!response.ok || (response.status >= 400 && response.status <= 511)) {
        if (data.errors) {
            return data.errors;
        } else {
            return {
                "": [
                    {
                        message: response.statusText,
                        value: null,
                    },
                ],
            };
        }
    }
}

export async function getResponseJson(response) {
    try {
        return await response.json();
    } catch (error) {
        return null;
    }
}

export function prepareFetchOptions(method, settings) {

    let api = settings.api;

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
    }

    api.options.body = undefined;
    api.options.method = method;

    return api.options;

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

export function translate(key, translates) {
    if (!translates) {
        return key;
    }

    if (!translates[key]) {
        return key;
    }

    return translates[key];
}