/* eslint-disable no-console */
import express from 'express';
import next from 'next';
import setHeadersMiddleware from './middlewares/setHeadersMiddleware';

const port = parseInt(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  setHeadersMiddleware(server);

  server.get('*', (req, res, next) => {
    try {
      return handle(req, res);
    } catch (e) {
      next(e);
    }
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
