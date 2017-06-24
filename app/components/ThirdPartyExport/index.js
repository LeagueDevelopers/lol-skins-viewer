import React, { PureComponent, PropTypes } from 'react';
import open from 'open';

import Button from 'components/Button';
import Input from 'components/Input';

import styles from './index.scss';

class ThirdPartyExport extends PureComponent {
  static propTypes = {
    skins: PropTypes.array.isRequired,
    submitting: PropTypes.bool.isRequired,
    share: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      url: ''
    };
  }

  handleURLChange = nextValue => {
    this.setState({
      url: nextValue
    });
  }

  submit = () => {
    const { share } = this.props;
    const { url } = this.state;

    if (url) {
      share(url);
    }
  }

  render () {
    const { skins, submitting } = this.props;
    const { url } = this.state;

    return (
      <div className={styles.thirdPartyExport}>
        <div className={styles.info}>
          Upload your skins to an external service <a onClick={() => open('https://google.com')}>(List of Integrations)</a>
        </div>
        <Input
          placeholder="Paste your sharing link here"
          value={url}
          onChange={this.handleURLChange}
        />
        <div className={styles.actions}>
          <Button disabled={!url || submitting} onClick={this.submit}>
            {!submitting && `Share ${skins.length} skins`}
            {submitting && 'Submitting...'}
          </Button>
        </div>
      </div>
    );
  }
}

export default ThirdPartyExport;
