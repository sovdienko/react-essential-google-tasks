import React, { Component, PropTypes } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './styles/base.less';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
        <div className='App'>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
