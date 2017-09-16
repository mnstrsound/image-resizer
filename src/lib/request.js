const API_ROOT = 'https://api.open.ru/';

export default {
    get: url => fetch(`${API_ROOT}${url}`).then(data => data.json()),

    post: (url, data = {}) => fetch(`${API_ROOT}${url}`,
        {
            method: 'POST',
            body: JSON.stringify(data)
        }
    ).then(data => data.json())
};
