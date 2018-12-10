import request from '../utils/lcuRequest';

export function getCurrentSummoner (port, password) {
  return request(port, password, '/lol-chat/v1/me', {
    json: true
  })
    .then(summoner => getChampions(port, password, summoner.id)
      .then(champions => ({ summoner, champions })));
}

export function getChampions (port, password, summonerId) {
  return request(port, password, `/lol-champions/v1/inventories/${summonerId}/champions-minimal`, {
    json: true
  }).then(data => {
    const champions = data.reduce((acc, c) => {
      if (c.id) {
        acc.push({
          id: c.id,
          name: c.name,
          alias: c.alias,
          ownership: c.ownership,
          roles: c.roles,
          squarePortraitPath: c.squarePortraitPath
        });
      }

      return acc;
    }, []);

    // const path = require('path');
    // console.log(`writing to ${path.resolve(__dirname, '..', 'static/champions.json')}`);

    // require('fs').writeFileSync(path.resolve(__dirname, '..', 'static/champions.json'), JSON.stringify(champions));

    return champions;
  });
}
