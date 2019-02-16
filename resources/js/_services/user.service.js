import service from './service.js';

export const UserService = {
    listUser
};

function listUser() {
    return new Promise((resolve, reject) => {
        service.get('/vueitems').then(res => {
            console.log(res);
            if (res.status == 200) {
                if (res.data.status) {
                    resolve(res.data);
                } else {
                    reject(res.data.message);

                }

            } else {
                reject(res.statusText);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
}
