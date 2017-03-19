import React, { PropTypes } from 'react';
import cx from 'classnames';

import lolIcon from 'static/lcu/lol_icon.png';

import style from './index.scss';

const Identity = ({ proxy, lcu, summoner: { icon, name } }) =>
  <div className={style.identity}>
    <div className={style.iconWrapper}>
      <img
        className={style.summonerIcon}
        alt=""
        src={proxy && icon ? `http://localhost:${proxy}/lol-game-data/assets/v1/profile-icons/${icon}.jpg` : lolIcon}
      />
      <div
        className={cx(style.status, lcu ? style.on : style.off)}
      />
    </div>
    <div className={style.details}>
      <div className={style.name}>{name}</div>
      <div
        className={cx(
          style.connection,
          lcu ? style.on : style.off
        )}
      >
        {lcu ? 'Connected' : 'No Connection'}
      </div>
    </div>
  </div>;

Identity.propTypes = {
  proxy: PropTypes.number.isRequired,
  lcu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  summoner: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
};

export default Identity;
