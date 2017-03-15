import React, { PureComponent, PropTypes } from 'react';
import { forceCheck } from 'react-lazyload';
import FlipMove from 'react-flip-move';

import style from './index.scss';

import SkinTile from '../SkinTile';

export default class SkinsList extends PureComponent {
  static propTypes = {
    disableAnimations: PropTypes.bool,
    skins: PropTypes.array.isRequired
  }

  static defaultProps = {
    disableAnimations: false
  }

  componentDidUpdate (prevProps) {
    if (this.areAnimationsDisabled() && prevProps.skins !== this.props.skins) {
      forceCheck();
    }
  }

  areAnimationsDisabled = () => this.props.skins.length > 200 || this.props.disableAnimations

  render () {
    const { skins } = this.props;
    return (
      <section className={style.skinsList}>
        <FlipMove
          onFinishAll={forceCheck}
          disableAllAnimations={this.areAnimationsDisabled()}
        >
          {skins && skins.map(skin => <SkinTile key={skin.id} {...skin} />)}
        </FlipMove>
      </section>
    );
  }
}
