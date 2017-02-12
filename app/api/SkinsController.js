// @flow
import flatMap from 'lodash.flatmap';
import type { Summoner, Champion } from '../types';

function transformResult (champions, mastery): Champion[] {
  // TODO: Move all of this stupid logic to the skin selector
  return champions.reduce((acc, c) => {
    const championMastery = mastery.find(cm => cm.championId === c.id) || {};
    const champSkins = c.skins.filter(s => s.name !== c.name).map(s => ({
      id: s.id,
      championId: c.id,
      championName: c.name,
      name: s.name,
      lastSelected: s.lastSelected,
      owned: s.ownership.owned,
      splashPath: s.splashPath,
      tilePath: s.tilePath
    }));
    const champion = {
      id: c.id,
      name: c.name,
      alias: c.alias,
      owned: c.ownership.owned,
      skins: champSkins,
      hasSkin: champSkins.some(s => s.owned),
      portraitPath: c.portraitPath,
      masteryLevel: championMastery.championLevel || 0,
      masteryPoints: championMastery.championPoints || 0,
      chestGranted: championMastery.chestGranted || false
    };
    acc.push(champion);
    return acc;
  }, []);
}

export async function getData (proxyPort: number, summoner: Summoner) {
  const collectionResponse = await fetch(`http://127.0.0.1:${proxyPort}/lol-collections/v1/inventories/${summoner.id}/champions`);
  const masteryResponse = await fetch(`http://127.0.0.1:${proxyPort}/lol-collections/v1/inventories/${summoner.id}/champion-mastery`);
  if (collectionResponse.ok && masteryResponse.ok) {
    const collectionData = await collectionResponse.json();
    const masteryData = await masteryResponse.json();
    const champions = transformResult(collectionData, masteryData);
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
          rpValue: meta.value,
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
