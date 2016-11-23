import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


import './LoginPage.less';

export default class LoginPage extends Component {
  static propTypes ={
    onLogin: PropTypes.func
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
              onClick={this.props.onLogin}
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
