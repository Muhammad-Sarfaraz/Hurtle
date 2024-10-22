import { Hono } from 'hono';
import { home, ping } from '../app/controllers/base.controller';

const apiRouter = new Hono();

apiRouter.get('/', home);
apiRouter.get('/api/ping', ping);

export default apiRouter;
