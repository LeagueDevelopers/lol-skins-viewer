import http from 'http';
import connect from 'connect';
import url from 'url';
import { lcuRequest as request, dispatchToRenderer } from 'utils';

import store from '../store';

const app = connect();
let server;

app.use((req, res) => {
  const { port, password } = store.getState().app.lcu;
  const path = url.parse(req.url).pathname;
  request(port, password, path, {
    encoding: null
  }).pipe(res);
});

export default {
  start (port) {
    if (server) return server;
    server = http.createServer(app);

    server.listen(port || 0);

    dispatchToRenderer({
      type: 'PROXY_UP',
      payload: server.address().port
    });
  }
};
