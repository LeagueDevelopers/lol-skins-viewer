import request from '../utils/lcuRequest';
import type { Summoner } from '../types';

export function getCurrentSummoner (port: number, password: string): Summoner {
  return request(port, password, '/lol-chat/v1/me', {
    json: true
  });
}
