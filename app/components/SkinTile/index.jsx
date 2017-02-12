import React, { PropTypes, PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Image from 'components/Image';

import rpImage from 'static/rp.png';

import style from './index.scss';

export default class SkinTile extends PureComponent {
  static propTypes = {
    id: PropTypes.any,
    name: PropTypes.string,
    rpValue: PropTypes.number,
    tilePath: PropTypes.string.isRequired
  }
  render () {
    const { id, name, tilePath } = this.props;
    let { rpValue } = this.props;
    if (rpValue === 9999) {
      rpValue = 'Limited';
    }
    if (rpValue === 0) {
      rpValue = 'Free';
    }
    return (
      <div className={style.skinTile}>
        <LazyLoad
          once
          overflow
          resize
          offset={550}
          placeholder={<div className={style.placeholder} />}
        >
          <ReactCSSTransitionGroup
            key={`t_${id}`}
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Image key={tilePath} className={style.background} path={tilePath} />
          </ReactCSSTransitionGroup>
        </LazyLoad>
        <div className={style.text}>
          <span className={style.name}>{name}</span>
          <span className={style.price}>
            <img alt="RP" src={rpImage} className={style.icon} />
            {rpValue}
          </span>
        </div>
      </div>
    );
  }
}
