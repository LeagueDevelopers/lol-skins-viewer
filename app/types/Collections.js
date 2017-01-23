// @flow

export type Skin = {
  id: number,
  name: string,
  lastSelected: boolean,
  owned: boolean,
  splashPath: string,
  tilePath: string,
  uncenteredSplashPath: string
}

export type ChampionMastery = {
  championId: number,
  championLevel: number,
  championPoints: number,
  highestGrade: string,
  chestGranted: boolean
}

export type Champion = {
  id: number,
  name: string,
  alias: string,
  owned: boolean,
  hasSkin: boolean,
  skins: Skin[],
  portraitPath: string
}
