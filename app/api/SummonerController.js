import request from '../utils/lcuRequest';
import type { Summoner } from '../types';

export function getCurrentSummoner (port: number, password: string): Summoner {
  return request(port, password, '/lol-chat/v1/me', {
    json: true
  })
  .then(summoner => request(port, password, '/lol-platform-config/v1/namespaces', {
    json: true
  })
      .then(({ LoginDataPacket }) => ({
        ...summoner,
        platformId: LoginDataPacket.platformId
      })));
}
