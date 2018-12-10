import { createSelector } from 'reselect';
import sortBy from 'lodash.sortby';
import orderBy from 'lodash.orderby';
import Fuse from 'fuse.js';

const nameSelector = state => state.bindings.filters.name;

const showUnownedSkins = state => state.bindings.filters.show;

const sortMethod = state => state.bindings.sortMethod;

export const championsSelector = state => state.app.champions;

export const filterOptions = [
  { value: 'ALL', label: 'All Skins' },
  { value: 'OWNED', label: 'Owned Skins' },
  { value: 'UNOWNED', label: 'Unowned Skins' }
];

const filterChampionsByOwnership = createSelector(
  championsSelector,
  showUnownedSkins,
  (champions, show) => {
    switch (show) {
      case 'ALL':
        return champions;
      default:
      case 'OWNED':
        return champions.filter(s => s.ownership.owned);
      case 'UNOWNED':
        return champions.filter(s => !s.ownership.owned);
    }
  }
);

export const championsIndexSelector = createSelector(
  filterChampionsByOwnership,
  champions => new Fuse(champions, {
    keys: ['alias', 'name'],
    threshold: '0.1'
  })
);

export const sortingOptions = [
  { value: 'ALPHABETICAL', label: 'ALPHABETICAL' },
  { value: 'MASTERY', label: 'MASTERY' },
  { value: 'RP VALUE', label: 'RP VALUE' },
  { value: 'SKINS OWNED', label: 'SKINS OWNED' },
];

export const filteredChampions = createSelector(
  championsIndexSelector,
  nameSelector,
  (championIndex, name) => {
    if (!name || name === '') {
      return sortBy(championIndex.list, ['championName', 'name']);
    }
    return sortBy(championIndex.search(name), ['championName', 'name']);
  }
);

export const sortedChampions = createSelector(
  filteredChampions,
  sortMethod,
  (champions, sort) => {
    switch (sort) {
      default:
      case 'ALPHABETICAL':
        return champions;
      case 'MASTERY':
        return orderBy(champions, ['masteryLevel', 'masteryPoints'], ['desc', 'desc']);
      case 'RP VALUE':
        return orderBy(champions, ['rpValue'], ['desc']);
      case 'SKINS OWNED':
        return orderBy(champions, ['championOwnedCount'], ['desc']);
    }
  }
);
