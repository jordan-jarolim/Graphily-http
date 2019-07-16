/* eslint-disable no-console */
import express from 'express';
import next from 'next';
import setHeadersMiddleware from './middlewares/setHeadersMiddleware';
import asyncMiddleware from './middlewares/asyncMiddleware';

import log2json from '../scripts/log2json/log2json';
import {
  requestPerMinute,
  methodDistribution,
  codeDistribution,
  sizeDistribution,
} from '../scripts/log2json/chartsData';

const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  setHeadersMiddleware(server);

  server.post('/parse-static', asyncMiddleware(async (_, res) => {
    await log2json({});
    res.status(200).send(JSON.stringify({ result: 'ok' }));
  }));

  server.get('/req-per-min', asyncMiddleware(async (_, res) => {
    const stat = await requestPerMinute();
    res.status(200).send(JSON.stringify(stat));
  }));

  server.get('/method-distribution', asyncMiddleware(async (_, res) => {
    const stat = await methodDistribution();
    res.status(200).send(JSON.stringify(stat));
  }));

  server.get('/codes-distribution', asyncMiddleware(async (_, res) => {
    const stat = await codeDistribution();
    res.status(200).send(JSON.stringify(stat));
  }));

  server.get('/size-distribution', asyncMiddleware(async (_, res) => {
    const stat = await sizeDistribution();
    res.status(200).send(JSON.stringify(stat));
  }));

  server.get('/is-parsed', (_, res) => {
    const absoluteResultPath = path.resolve(__dirname, '../static/result.json');
    try {
      if (fs.existsSync(absoluteResultPath)) {
        res.status(200).send(JSON.stringify({ isParsed: true }));
      } else {
        res.status(200).send(JSON.stringify({ isParsed: false }));
      }
    } catch (err) {
      console.error(err);
      res.status(200).send(JSON.stringify({ isParsed: false }));
    }
  });

  server.post('/delete-parsed', (_, res) => {
    const absoluteResultPath = path.resolve(__dirname, '../static/result.json');
    try {
      fs.unlinkSync(absoluteResultPath);
      res.status(200).send(JSON.stringify({ removed: true }));
    } catch (err) {
      console.error(err);
      res.status(500).send(JSON.stringify({ removed: false }));
    }
  });

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
