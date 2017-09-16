import Router from 'koa-router';

const router = new Router();

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
