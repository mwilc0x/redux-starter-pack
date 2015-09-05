import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchInfo, updateInfo } from '../actions/actions';
import Info from '../components/Info';
import { config } from '../config';

export class Root extends Component {
  static propTypes = {
    infoStore: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (window.__SERVER_PAYLOAD__) {
      window.__SERVER_PAYLOAD__ = null;
    } else {
      this.props.dispatch(fetchInfo(config.url.info));
    }
  }

  static needs = [
    { fn: fetchInfo, url: config.url.info  }
  ]

  render() {
    const {
      infoStore,
      dispatch
    } = this.props;
    return (
      <div className="root">
        <h1>Root Container</h1>
        <Info store={infoStore}
              updateInfo={this.props.updateInfo}
              dispatch={dispatch}
        />
      </div>
    );
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  infoStore: PropTypes.object.isRequired,
  updateInfo: PropTypes.func.isRequired
};

export default connect((state) => {
  return {
    infoStore: state.info,
    fetchInfo: fetchInfo,
    updateInfo: updateInfo
  };
})(Root);
