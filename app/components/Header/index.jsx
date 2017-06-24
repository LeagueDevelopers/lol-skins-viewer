import React, { PropTypes } from 'react';
import cx from 'classnames';
import { pure } from 'recompose';

import TitleBar from 'components/TitleBar';
import Navigation from 'components/Navigation';
import Button from 'components/Button';

import lolIcon from 'static/lcu/lol_icon.png';
import style from './index.scss';

function getStatus (newVersion, lcu, updateProgress) {
  if (newVersion) {
    return `Updating ${updateProgress}%`;
  }
  return lcu ? 'Connected' : 'No Connection';
}

function Header ({
  summoner,
  lcu,
  hasLoaded,
  proxy,
  pathname,
  reload,
  newVersion,
  updateProgress
}) {
  const { name, icon } = summoner;
  return (
    <section className={style.header}>
      <TitleBar className={style.titleBar} />
      <div className={style.content}>
        <div className={style.actions}>
          <div className={style.reloadButtonWrapper}>
            <Button onClick={hasLoaded ? reload : () => false}>Reload</Button>
          </div>
          <Navigation className={style.navigation} currentPath={pathname} />
        </div>
        <div className={style.identity}>
          <div className={style.iconWrapper}>
            <img
              className={style.summonerIcon}
              alt=""
              src={proxy && icon ? `http://localhost:${proxy}/lol-game-data/assets/v1/profile-icons/${icon}.jpg` : lolIcon}
            />
            <div
              className={cx(style.status, lcu ? style.on : style.off, newVersion && style.updating)}
            />
          </div>
          <div className={style.details}>
            <div className={style.name}>{name}</div>
            <div
              className={cx(
                style.connection,
                { [style.on]: !newVersion && lcu, [style.off]: !newVersion && !lcu },
                { [style.updating]: newVersion }
              )}
            >
              {getStatus(newVersion, lcu, updateProgress)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Header.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  proxy: PropTypes.number.isRequired,
  lcu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  summoner: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  pathname: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
  updateProgress: PropTypes.number.isRequired,
  newVersion: PropTypes.bool.isRequired
};

export default pure(Header);
