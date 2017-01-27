import React, { PureComponent } from 'react';
import { remote } from 'electron';
import cx from 'classnames';

import style from './index.scss';

export default class TitleBar extends PureComponent {
  close = () => remote.getCurrentWindow().close();
  minimize = () => remote.getCurrentWindow().minimize();

  render () {
    return (
      <div className={style.titleBar}>
        <button className={cx(style.button, style.minimize)} onClick={this.minimize} />
        <button className={cx(style.button, style.close)} onClick={this.close} />
      </div>
    );
  }
}
