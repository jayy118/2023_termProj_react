import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if( accessToken && accessToken !== null ) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }

    console.log(options.url)
    return fetch(options.url, options)
        .then((response) =>
        response.json().then((json) => {
            if (!response.ok) {
            // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
            return Promise.reject(json);
            }
            return json;
        })
        )
        .catch((error) => {
        // 추가된 부분
        console.log(error.status);
        if (error.status === 403) {
            window.location.href = "/login"; // redirect
        }
        return Promise.reject(error);
        });
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
            .then((response) => {
                //console.log("response: ", response);
                //alert("로그인 토큰: " + response.token);
                if( response.token ) {
                    localStorage.setItem(ACCESS_TOKEN, response.token);
                    window.location.href = "/";
                }
            })
}

export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href = "/login";
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}


export function get(api, method, request) {
    let options = {
        headers: new Headers( {
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
    };

    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const params = {
        title: request
    }

    const headers = { 'Authorization': 'Bearer '+ accessToken };

    const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
    const requrl = `${options.url}?${queryString}`;

    return fetch(requrl, {method: 'GET', headers: {'Authorization': 'Bearer '+accessToken}}).then((response) => 
        response.json().then((json) => {
            if( !response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    )
    .catch((error) => {
        // 추가된 부분
        console.log(error.status);
        if (error.status === 403) {
            window.location.href = "/login"; // redirect
        }
        return Promise.reject(error);
    });
}