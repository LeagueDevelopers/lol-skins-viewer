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
      let tags = [];
      let rpValue = -1;
      if (metadata && metadata.rpValue >= 0) {
        rpValue = metadata.rpValue;
      }
      if (tags && metadata.tags) {
        tags = metadata.tags;
      }
      return {
        ...s,
        championTotalCount,
        championOwnedCount,
        masteryLevel,
        masteryPoints,
        rpValue,
        tags
      };
    });
  })
);

export const rpTotal = createSelector(
  skinsSelector,
  skins => skins.filter(s => s.owned).reduce((total, s) => {
    if (s.rpValue === -1) {
      return total;
    }
    return total + s.rpValue;
  }, 0)
);

export const ownedSkins = createSelector(
  skinsSelector,
  skins => skins.filter(s => s.owned)
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
      return sortBy(skinIndex.list, ['championName', 'name']);
    }
    return sortBy(skinIndex.search(name), ['championName', 'name']);
  }
);

export const sortedSkins = createSelector(
  filteredSkins,
  sortMethod,
  (skins, sort) => {
    switch (sort) {
      default:
      case 'ALPHABETICAL':
        return skins;
      case 'MASTERY':
        return orderBy(skins, ['masteryLevel', 'masteryPoints'], ['desc', 'desc']);
      case 'RP VALUE':
        return orderBy(skins, ['rpValue'], ['desc']);
      case 'SKINS OWNED':
        return orderBy(skins, ['championOwnedCount'], ['desc']);
    }
  }
);
