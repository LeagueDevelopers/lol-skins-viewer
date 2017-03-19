import React, { PropTypes } from 'react';
import { pure } from 'recompose';

import TitleBar from 'components/TitleBar';
import Button from 'components/Button';

import Navigation from './Navigation';
import Identity from './Identity';

import style from './index.scss';

function Header ({ hasLoaded, reload, ...props }) {
  return (
    <section className={style.header}>
      <TitleBar className={style.titleBar} />
      <div className={style.content}>
        <div className={style.actions}>
          <div className={style.reloadButtonWrapper}>
            <Button onClick={hasLoaded ? reload : () => false}>Reload</Button>
          </div>
          <Navigation className={style.navigation} {...props} />
        </div>
        <Identity {...props} />
      </div>
    </section>
  );
}

Header.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired
};

export default pure(Header);
