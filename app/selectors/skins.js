import { createSelector } from 'reselect';
import flatMap from 'lodash.flatmap';
import sortBy from 'lodash.sortby';
import orderBy from 'lodash.orderby';
import Fuse from 'fuse.js';

const skinMetadataSelector = state => state.skins.skinMetadata;

const nameSelector = state => state.skins.filters.name;

const showUnownedSkins = state => state.skins.filters.show;

const sortMethod = state => state.skins.sortMethod;

const championsSelector = state => state.skins.champions;

export const skinsSelector = createSelector(
  championsSelector,
  skinMetadataSelector,
  (champions, skinMetadata) => flatMap(champions, c => {
    const championTotalCount = c.skins.length;
    const championOwnedCount = c.skins.filter(s => s.owned).length;
    const masteryLevel = c.masteryLevel;
    const masteryPoints = c.masteryPoints;
    return c.skins.map(s => {
      const metadata = skinMetadata[s.id];
      let rpValue = 9999;
      if (metadata && metadata.rpValue && metadata.rpValue > 0) {
        rpValue = metadata.rpValue;
      }
      return {
        ...s,
        championTotalCount,
        championOwnedCount,
        masteryLevel,
        masteryPoints,
        rpValue
      };
    });
  })
);

export const countOwnedSkins = createSelector(
  skinsSelector,
  skins => skins.filter(s => s.owned).length
);

export const filterOptions = [
  { value: 'ALL', label: 'All Skins' },
  { value: 'OWNED', label: 'Owned Skins' },
  { value: 'UNOWNED', label: 'Unowned Skins' }
];

const filterSkinsByOwnership = createSelector(
  skinsSelector,
  showUnownedSkins,
  (skins, show) => {
    switch (show) {
      case 'ALL':
        return skins;
      default:
      case 'OWNED':
        return skins.filter(s => s.owned);
      case 'UNOWNED':
        return skins.filter(s => !s.owned);
    }
  }
);

export const skinIndexSelector = createSelector(
  filterSkinsByOwnership,
  skins => new Fuse(skins, {
    keys: ['championName', 'name'],
    threshold: '0.1'
  })
);

export const sortingOptions = [
  { value: 'ALPHABETICAL', label: 'ALPHABETICAL' },
  { value: 'MASTERY', label: 'MASTERY' },
  { value: 'RP VALUE', label: 'RP VALUE' },
  { value: 'SKINS OWNED', label: 'SKINS OWNED' },
];

export const filteredSkins = createSelector(
  skinIndexSelector,
  nameSelector,
  (skinIndex, name) => {
    if (!name || name === '') {
      return skinIndex.list;
    }
    return skinIndex.search(name);
  }
);

export const sortedSkins = createSelector(
  filteredSkins,
  sortMethod,
  (skins, sort) => {
    switch (sort) {
      default:
      case 'ALPHABETICAL':
        return sortBy(skins, ['championName', 'name']);
      case 'MASTERY':
        return orderBy(skins, ['masteryLevel', 'masteryPoints', 'championName', 'name'], ['desc', 'desc', 'asc', 'asc']);
      case 'RP VALUE':
        return orderBy(skins, ['rpValue', 'championName', 'name'], ['desc', 'asc', 'asc']);
      case 'SKINS_OWNED':
        return orderBy(skins, ['championOwnedCount', 'championName', 'name'], ['desc', 'asc', 'asc']);
    }
  }
);
