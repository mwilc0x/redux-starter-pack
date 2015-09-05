import React, { Component, PropTypes } from 'react';

export class Info extends Component {

  constructor(props) {
    super(props);
    this.state = { message: props.store.info.message };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({message: nextProps.store.info.message });
  }

  handleChange(e) {
    this.setState({message: e.target.value});
  }

  updateInfo() {
    this.props.dispatch(this.props.updateInfo(this.state.message));
  }

  render() {
    const value = this.state.message;
    return (
      <div className="info">
        <input type="text" value={value} onChange={this.handleChange.bind(this)} />
        <button type="submit" onClick={this.updateInfo.bind(this)}>Update Info</button>
      </div>
    );
  }
}

Info.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  updateInfo: PropTypes.func.isRequired
};

export default Info;
