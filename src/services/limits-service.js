export default {
    getLimits: () => fetch('/api/limit').then(res => res.json()),
    deleteLimit: id => fetch(`/api/limit/${id}`, { method: 'DELETE' }).then(res => res.json())
};
