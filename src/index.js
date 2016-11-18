import ReactDOM from 'react-dom';
import React from 'react';
import routes from './routes';
import SessionActions from './actions/SessionActions';


window.handleGoogleApiLoaded = () => {
  SessionActions.authorize(true, renderApp);
};


function renderApp() {
  ReactDOM.render(
    <div>
      {routes}
    </div>,
    document.getElementById('root')
  );
}
