import PingService from 'app/services/ping.service';
import { Context } from 'hono';

export const home = (c: Context) => {
  return c.json({ message: 'Hello, From Hurtle!' });
};

export const ping = (c: Context) => {
  return c.json(PingService.getPingMessage());
};
