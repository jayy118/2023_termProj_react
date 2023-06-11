import { API_BASE_URL } from "../app-config";

export function call(api, method, request) {
    let options = {
        headers: new Headers( {
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
    };

    if(request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => 
        response.json().then((json) => {
            if( !response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

}

export function get(api, method, request) {
    let options = {
        headers: new Headers( {
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
    };

    const params = {
        title: request
    }

    const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
    const requrl = `${options.url}?${queryString}`;

    return fetch(requrl).then((response) => 
        response.json().then((json) => {
            if( !response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
}