import Router from 'koa-router';

import Limit from './models/limit';

const router = new Router();

router.post('/api/limit', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        const limit = new Limit(ctx.request.body);

        limit.save((err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
});

router.put('/api/limit/:id', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        const limit = ctx.request.body;

        Limit.update({ _id: limit._id }, limit, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
});

router.get('/api/limit', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        Limit.find({}, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
});

router.delete('/api/limit/:id', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        Limit.remove({ _id: ctx.params.id }, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
});

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
