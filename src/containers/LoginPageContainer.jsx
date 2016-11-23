import React, { Component, PropTypes } from 'react';

import SessionActions from '../actions/SessionActions';
import SessionStore from '../stores/SessionStore';

import LoginPage from '../components/LoginPage';


function getStateFromFlux() {
  return {
    isLoggedIn: SessionStore.isLoggedIn()
  };
}

export default class LoginPageContainer extends Component {
  static propTypes ={
    location: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.state = getStateFromFlux();
  }

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isLoggedIn) {
      const { location } = this.props;

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname);
      } else {
        this.context.router.replace('/lists');
      }
    }
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  }

  handleLogIn() {
    SessionActions.authorize();
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

  render() {
    return (
      <LoginPage onLogin={this.handleLogIn.bind(this)} />
    );
  }
}
