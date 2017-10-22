import Router from 'koa-router';
import processImages from './handlers/process-images';

const router = new Router();

router.post('/api/images', processImages);

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
