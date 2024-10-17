import { fromHono } from 'chanfana';
import { Hono } from 'hono';
import apiRouter from 'routes/apiRouter';

// Start a Hono app
const app = new Hono();

// Use the routes
app.route('/', apiRouter);

// Export the Hono app
export default app;
