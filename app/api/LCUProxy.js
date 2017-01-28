import http from 'http';
import connect from 'connect';
import url from 'url';
import { lcuRequest as request, dispatchToRenderer } from 'utils';
import skinMetadata from 'static/skinMetadata';

import store from '../store';

// const debug = require('debug')('lsv:LCUProxy');

const lootRegex = /CHAMPION_SKIN_([0-9]+)/;

const app = connect();
let server;

app.use((req, res, next) => {
  const path = url.parse(req.url).pathname;
  if (path.startsWith('/lol-loot')) {
    const skinId = lootRegex.exec(path)[1];
    const skinMeta = skinMetadata[skinId];
    if (skinMeta) {
      const body = JSON.stringify(skinMeta);
      res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) });
      return res.end(body, 'utf8');
    }
  }
  next();
});

app.use((req, res) => {
  const { port, password } = store.getState().app.lcu;
  const path = url.parse(req.url).pathname;
  request(port, password, path, {
    encoding: null
  }).pipe(res);
});

export default {
  start (_port) {
    if (server) return server;
    server = http.createServer(app);

    server.listen(_port || 0);

    dispatchToRenderer({
      type: 'PROXY_UP',
      payload: server.address().port
    });
  }
};
