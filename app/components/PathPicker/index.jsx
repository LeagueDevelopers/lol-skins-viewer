import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import { remote } from 'electron';

import Button from 'components/Button';
import Input from 'components/Input';

import style from './index.scss';

const { dialog } = remote;

export default class PathPicker extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    isValidPath: PropTypes.bool.isRequired,
    hasChanged: PropTypes.bool.isRequired,
    changeSetting: PropTypes.func.isRequired,
    resetSetting: PropTypes.func.isRequired
  }
  onChange = nextValue => {
    const { changeSetting } = this.props;
    changeSetting('clientPath', nextValue);
    return false;
  }
  onReset = () => {
    const { resetSetting } = this.props;
    resetSetting('clientPath');
    return false;
  }
  browse = () => {
    const { changeSetting, value, isValid } = this.props;
    const filepaths = dialog.showOpenDialog({
      title: 'Find your League of Legends client folder',
      defaultPath: isValid ? value : undefined,
      properties: ['openDirectory']
    });
    if (filepaths && filepaths.length && filepaths[0]) {
      changeSetting('clientPath', filepaths[0]);
    }
  }
  render () {
    const { value, isValid, isValidPath, hasChanged } = this.props;
    return (
      <div className={style.pathPicker}>
        <div className={style.info} >
          Locate your League of Legends directory (where LeagueClient.exe is).
        </div>
        <Input className={style.picker} inputClassName={style.input} value={value} placeholder="Find your League of Legends client folder..." onChange={this.onChange} hideClear>
          <i
            className={cx('fa fa-undo', style.reset, { [style.hidden]: !hasChanged })}
            onClick={this.onReset}
          />
          <Button className={style.browse} onClick={this.browse}>
            browse
          </Button>
        </Input>
        <div className={style.state}>
          <div className={style.path}>
            <div className={cx(style.status, isValidPath ? style.on : style.off)} />
            <span className={style.text}>Valid Path</span>
          </div>
          <div className={style.hasLeague}>
            <div className={cx(style.status, isValid ? style.on : style.off)} />
            <span className={style.text}>Found League</span>
          </div>
        </div>
      </div>
    );
  }
}
