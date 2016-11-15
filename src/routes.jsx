import React from 'react';
import App from './App';
import LoginPage from './components/LoginPage';
import TasklistsPage from './components/TasklistsPage';
import TasksPage from './components/TasksPage';
import AboutPage from './components/AboutPage';
import { Router, Route, hashHistory } from 'react-router';


export default (
  <Router history={hashHistory} >
    <Route path='/' component={App}>
      <Route path='/login' component={LoginPage}/>
      <Route path='/about' component={AboutPage}/>
      <Route path='/lists' component={TasklistsPage}>
        <Route path='/lists/:id' component={TasksPage} />
      </Route>
    </Route>
  </Router>
);
