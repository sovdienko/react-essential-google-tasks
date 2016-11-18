import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SessionActions from '../actions/SessionActions';
import SessionStore from '../stores/SessionStore';

import './LoginPage.less';

function getStateFromFlux() {
  return {
    isLoggedIn: SessionStore.isLoggedIn()
  };
}

export default class LoginPage extends Component {
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
      <div className='LoginPage'>
        <div className='LoginPage__banner'>
          <div className='LoginPage__text'>
            <h1>React Google tasks</h1>
            <p>Organise your life!</p>
            <RaisedButton
              className='login-button'
              label='Log in with Google'
              onClick={this.handleLogIn.bind(this)}
            />
          </div>
          <img
            src='/img/desk.png'
            className='LoginPage__image'
          />
        </div>
      </div>
    );
  }
}
