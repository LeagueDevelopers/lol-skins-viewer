// @flow
import flatMap from 'lodash.flatmap';
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

export async function getData (proxyPort: number, summoner: Summoner) {
  const collectionResponse = await fetch(`http://127.0.0.1:${proxyPort}/lol-collections/v1/inventories/${summoner.id}/champions`);
  if (collectionResponse.ok) {
    const collectionData = await collectionResponse.json();
    const champions = transformResult(collectionData);
    const ownedChampionIds = collectionData.filter(c => c.ownership.owned).map(c => c.id);
    const skinIds = flatMap(champions, c => c.skins).map(s => s.id);
    const skinMetadata = {};
    for (const id of skinIds) {
      const response = await fetch(`http://127.0.0.1:${proxyPort}/lol-loot/v1/player-loot/CHAMPION_SKIN_${id}`);
      if (response.ok) {
        const meta = await response.json();
        skinMetadata[id] = {
          id,
          lootId: meta.lootId,
          rarity: meta.rarity,
          name: meta.name,
          value: meta.value,
          tags: Array.isArray(meta.tags) ? meta.tags : meta.tags.split(',')
        };
      }
    }
    return {
      champions,
      skinMetadata,
      ownedChampionIds
    };
  }
  return collectionResponse;
}
