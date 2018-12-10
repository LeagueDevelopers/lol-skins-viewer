import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remote } from 'electron';

import { sortedChampions } from 'selectors/champions';

import ChampionSelector from '../components/ChampionSelector';
import BindingEditor from '../components/BindingEditor';
import Sidebar from '../components/Sidebar';

import * as bindingsActionCreators from '../actions/bindings';

@connect(
  state => ({
    lcu: state.app.lcu,
    proxy: state.app.proxy,
    summoner: state.app.summoner,
    sortMethod: state.bindings.sortMethod,
    filters: state.bindings.filters,
    editing: state.bindings.editing,
    hasChanges: state.bindings.hasChanges,
    champions: sortedChampions(state),
    lowSpec: state.settings.lowSpec.value
  }),
  dispatch => ({
    bindingsActions: bindActionCreators(bindingsActionCreators, dispatch)
  })
)
export default class SkinsContainer extends Component {
  static propTypes = {
    summoner: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    lcu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    proxy: PropTypes.number.isRequired,
    hasLoaded: PropTypes.bool.isRequired,
    champions: PropTypes.array.isRequired,
    sortMethod: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    lowSpec: PropTypes.bool,
    editing: PropTypes.any.isRequired,
    hasChanges: PropTypes.bool.isRequired,
    bindingsActions: PropTypes.object.isRequired
  };

  static defaultProps = {
    collectionValue: 0,
    lowSpec: false
  }

  componentDidMount () {
    const { hasLoaded } = this.props;

    if (!hasLoaded) {
      /*
       * if we havent loaded yet, initiate LCUWatcher on the main process
       * subsequent start() calls simply restart the watcher
       */
      const lcuWatcher = remote.getGlobal('LCUWatcher');
      lcuWatcher.start();
    }
  }

  componentWillReceiveProps (nextProps) {
    const { hasLoaded, proxy, lcu, summoner } = this.props;
    if (!hasLoaded && (proxy !== nextProps.proxy || lcu !== nextProps.lcu)) {
      // this.reloadChampions(nextProps);
    } else if (summoner !== nextProps.summoner) {
      // this.reloadChampions(nextProps);
    }
  }

  handleChampionClick = (id) => {
    const { bindingsActions } = this.props;

    bindingsActions.openEditor(id);
  }

  handleEditorClose = () => {
    const { bindingsActions } = this.props;

    bindingsActions.closeEditor();
  }

  render () {
    const {
      champions,
      sortMethod,
      filters,
      lowSpec,
      editing,
      bindingsActions
    } = this.props;
    return (
      <section className="bindings">
        <Sidebar
          sortMethod={sortMethod}
          filters={filters}
          {...bindingsActions}
        />
        <div className="container">
          <ChampionSelector
            champions={champions}
            reload={this.reloadChampions}
            disableAnimations={lowSpec}
            onClick={this.handleChampionClick}
            {...bindingsActions}
          />
        </div>
        {editing && <div className="modal">
          <BindingEditor onClose={this.handleEditorClose} {...editing} championNames={{}} {...bindingsActions} />
        </div>}
      </section>
    );
  }
}
