import React from 'react';
import App from './App';
import LoginPageContainer from './containers/LoginPageContainer';
import TasklistsPageContainer from './containers/TasklistsPageContainer';
import TasksPageContainer from './containers/TasksPageContainer';
import AboutPage from './components/AboutPage';
import LoggedInLayout from './components/LoggedInLayout';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import SessionStore from './stores/SessionStore';

export default(
  <Router history={hashHistory}>
    <Redirect from='/' to='/login'/>
    <Route path='/' component={App}>
      <Route path='/login' component={LoginPageContainer}/>
      <Route component={LoggedInLayout} onEnter={requireAuth}>
        <Route path='/about' component={AboutPage}/>
        <Route path='/lists' component={TasklistsPageContainer}>
          <Route path='/lists/:id' component={TasksPageContainer}/>
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
