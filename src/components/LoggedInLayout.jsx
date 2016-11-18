import React, { Component, PropTypes } from 'react';

export default class LoggedInLayout extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div className='LoggedInLayout'>
        <div className='LoggedInLayout__content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
