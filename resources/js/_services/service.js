import axios from 'axios';
// const baseURL = 'https://demo.devteam.mobi:2222';
// const baseURL = 'http://192.168.1.151:3000';
// const baseURL = 'http://192.168.1.14:3000';
// const baseURL = 'http://192.168.1.95:3000';
// const baseURL = 'https://bossvegas.pro:3000';
const baseURL = 'http://bossvegas.dev.io:3030';
const qs = require('qs');
class Service {
    constructor() {
        // let user = JSON.parse(localStorage.getItem('user'));
        // let authHeader = "";
        // if (user && user.sessionID) {
        //     authHeader = user.sessionID;
        // }
        let service = axios.create({
            // baseURL: baseURL,
            // baseURL: 'http://192.168.1.151:2222',
            // baseURL: 'http://192.168.1.10:2222',
            withCredentials: false,
            headers: {
                // 'sessionID': authHeader,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    handleSuccess(response) {
        return response;
    }

    handleError = (error) => {
        // debugger;
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    // required session
                    error.message = "Please Login";
                    this.redirectTo(document, '/login')
                    break;
                case 401:
                    // session expired
                    error.message = "Session expired";
                    this.redirectTo(document, '/login')
                    break;
                case 402:
                    // session expired
                    error.message = "Please verify email";
                    this.redirectTo(document, '/verify-email');
                    break;
                case 403:
                    // session permission
                    console.log("SERVER : YOU NOT PERMISSION")
                    error.message = "Not a permission";
                    this.redirectTo(document, '/permission')
                    break;
                case 404:
                    // this.redirectTo(document, '/404')
                    break;
                default:
                    //this.redirectTo(document, '/500')
                    break;
            }
        }

        return Promise.reject(error)
    }

    redirectTo = (document, path) => {
        document.location = path
    }

    get(path) {
        var sefl = this;
        return new Promise((resolve, reject) => {
            sefl.service.get(path).then((response) => {
                resolve(response);
            }).catch(error => {
                if (error.response && error.response.status == 404) {

                    resolve({
                        status: 200,
                        data: {
                            message: "try again",
                            status: false,
                            data: [],
                        }
                    });
                } else {
                    reject(error);
                }

            });
        });
    }

    patch(path, payload) {
        var sefl = this;
        return new Promise((resolve, reject) => {
            sefl.service.request({
                method: 'PATCH',
                url: path,
                responseType: 'json',
                data: payload
            }).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    post(path, payload) {
        var sefl = this;
        return new Promise((resolve, reject) => {
            sefl.service.request({
                method: 'POST',
                url: path,
                responseType: 'json',
                data: qs.stringify(payload)
            }).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    postFormData(path, body) {
        var sefl = this;
        const formData = new FormData();
        Object.keys(body).forEach(
            key => {
                formData.append(key, body[key])
            }
        );

        return new Promise((resolve, reject) => {
            sefl.service.request({
                method: 'POST',
                url: path,
                responseType: 'json',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            }).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    setAuth(user) {
        let authHeader = "";
        if (user && user.sessionID) {
            authHeader = user.sessionID;
        }
        let service = axios.create({
            // baseURL: 'https://demo.devteam.mobi:2222',
            // baseURL: 'http://192.168.1.151:2222',
            // baseURL: 'http://192.168.1.10:2222',
            baseURL: baseURL,
            withCredentials: false,
            headers: {
                'sessionID': authHeader,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }
}

export default new Service;
