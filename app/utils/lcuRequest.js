import request from 'request-promise-native';

export default function (port: number, password: string, path: string, options: Object): Promise {
  const authorization = new Buffer(`riot:${password}`).toString('base64');
  return request(Object.assign({
    uri: `https://127.0.0.1:${port}${path}`,
    headers: {
      authorization: `Basic ${authorization}`,
      Referer: `https://127.0.0.1:${port}/index.html`
    },
    rejectUnauthorized: false
  }, options));
}
