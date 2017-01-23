import { createSelector } from 'reselect';
import flatMap from 'lodash.flatmap';
import Fuse from 'fuse.js';

const nameSelector = state => state.skins.filters.name;

const showUnownedSkins = state => state.skins.filters.show;

const championsSelector = state => state.skins.champions;

export const skinsSelector = createSelector(
  championsSelector,
  champions => flatMap(champions, c => c.skins)
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

export const filteredSkins = createSelector(
  skinIndexSelector,
  nameSelector,
  (skinsIndex, name) => {
    if (!name || name === '') {
      return skinsIndex.list;
    }
    return skinsIndex.search(name);
  }
);
