import React from 'react';
import App from './App';
import LoginPage from './components/LoginPage';
import TasklistsPage from './components/TasklistsPage';
import TasksPage from './components/TasksPage';
import AboutPage from './components/AboutPage';
import LoggedInLayout from './components/LoggedInLayout';
import { Router, Route, hashHistory } from 'react-router';
import SessionStore from './stores/SessionStore';

export default(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='/login' component={LoginPage}/>
      <Route component={LoggedInLayout} onEnter={requireAuth}>
        <Route path='/about' component={AboutPage}/>
        <Route path='/lists' component={TasklistsPage}>
          <Route path='/lists/:id' component={TasksPage}/>
        </Route>
      </Route>
    </Route>
  </Router>
);

function requireAuth(nextState, replace) {
  if (!SessionStore.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
