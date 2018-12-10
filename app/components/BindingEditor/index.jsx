import React, { PureComponent, PropTypes } from 'react';

import FullPageModal from '../FullPageModal';
import PrimaryHotkey from './PrimaryHotkey';

import style from './index.scss';

const sections = [
  { name: 'Abilities', keybinds: [1, 2, 3, 4].map(n => `evtCastSpell${n}`) },
  { name: 'Summoner Spells', keybinds: ['evtCastAvatarSpell1', 'evtCastAvatarSpell2'] },
  { name: 'Items', keybinds: [1, 2, 3, 4, 5, 6].map(n => `evtUseItem${n}`) },
  { name: 'Trinket', keybinds: ['evtUseVisionItem'] }
];

const upperSection = sections.slice(0, 2);
const lowerSection = sections.slice(2, 4);

export default class BindingPage extends PureComponent {
  static propTypes = {
    group: PropTypes.string,
    championId: PropTypes.string,
    championNames: PropTypes.array.isRequired,
    hasChanges: PropTypes.bool.isRequired,
    current: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    disableAnimations: false
  }

  componentDidUpdate (prevProps) {
  }

  renderPrimaryBindingsRow = ({ name, keybinds }) => {
    const { current } = this.props;

    return (
      <div className={style.category}>
        <div className={style.label}>{name}</div>
        <div>
          {keybinds.map(k => {
            const props = current || {};

            return <PrimaryHotkey key={k} {...props} />;
          })}
        </div>
      </div>
    );
  }

  render () {
    const { group, championId, championNames, onClose } = this.props;
    return (
      <FullPageModal onClose={onClose}>
        <section className={style.editor}>
          <h1>Editing hotkeys for {group || championNames[championId]}</h1>
          <div className={style.primaryBindingsWrapper}>
            <h3>Primary Bindings</h3>
            <div className={style.primaryBindings}>
              <div className={style.row}>{upperSection.map(this.renderPrimaryBindingsRow)}</div>
              <div className={style.row}>{lowerSection.map(this.renderPrimaryBindingsRow)}</div>
            </div>
          </div>
        </section>
      </FullPageModal>
    );
  }
}
