import http from 'http';
import url from 'url';
import { lcuRequest as request, dispatchToRenderer } from 'utils';

import store from '../store';
// import Cache from 'node-cache';

// const assetCache = new Cache({ useClones: false });

let server;

export default {
  start (_port) {
    if (server) return server;

    server = http.createServer((req, res) => {
      const { port, password } = store.getState().app.lcu;
      const path = url.parse(req.url).pathname;
      request(port, password, path, {
        encoding: null
      }).pipe(res);
    });

    server.listen(_port || 0);

    dispatchToRenderer({
      type: 'PROXY_UP',
      payload: server.address().port
    });
  }
};
