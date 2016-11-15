import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


import './LoginPage.less';

export default class LoginPage extends Component {

  handleLogIn() {
    console.log('Click login');
  }

  render() {
    return (
      <div className='LoginPage'>
        <div className='LoginPage__banner'>
          <div className='LoginPage__text'>
            <h1>Almost Google tasks</h1>
            <p>Organise your life!</p>
            <RaisedButton
              className='login-button'
              label='Log in with Google'
              onClick={this.handleLogIn}
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
