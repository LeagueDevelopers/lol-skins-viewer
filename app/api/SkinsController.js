import request from 'request-promise-native';
import type { Summoner, Champion } from '../types';

function transformResult (champions): Champion[] {
//  const ownedChampions = champions.filter(c => c.ownership.owned);
  return champions.reduce((acc, c) => {
    const champSkins = c.skins.filter(s => s.name !== c.name).map(s => ({
      id: s.id,
      championId: c.id,
      championName: c.name,
      name: s.name,
      lastSelected: s.lastSelected,
      owned: s.ownership.owned,
      splashPath: s.splashPath,
      tilePath: s.tilePath,
      uncenteredSplashPath: s.uncenteredSplashPath
    }));
    const champion = {
      id: c.id,
      name: c.name,
      alias: c.alias,
      owned: c.ownership.owned,
      skins: champSkins,
      hasSkin: champSkins.some(s => s.owned),
      portraitPath: c.portraitPath
    };
    acc.push(champion);
    return acc;
  }, []);
}

export function getData (proxyPort: number, summoner : Summoner) {
  return request({
    uri: `http://127.0.0.1:${proxyPort}/lol-collections/v1/inventories/${summoner.id}/champions`,
    json: true
  })
    .then(champions => ({
      ownedChampionIds: champions.filter(c => c.ownership.owned).map(c => c.id),
      champions: transformResult(champions)
    }));
}
