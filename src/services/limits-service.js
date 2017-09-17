export default {
    getLimits: () => fetch('/api/limit').then(res => res.json()),
    deleteLimit: id => fetch(`/api/limit/${id}`, { method: 'DELETE' }).then(res => res.json()),
    saveLimit: limit => fetch('/api/limit', {
        method: 'POST',
        body: JSON.stringify(limit),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()),
    updateLimit: limit => fetch(`/api/limit/${limit._id}`, {
        method: 'PUT',
        body: JSON.stringify(limit),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
};
