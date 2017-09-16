import request from 'request';

export default {
    get: url => (
        new Promise((resolve, reject) => {
            request.get({ url, json: true }, (err, res, body) => {
                if (err) reject(err);
                resolve(body);
            });
        })
    ),

    post: (url, json) => (
        new Promise((resolve, reject) => {
            request.post({ url, json }, (err, res, body) => {
                if (err) reject(err);
                resolve(body);
            });
        })
    )
};
