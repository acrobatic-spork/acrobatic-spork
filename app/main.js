import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import App from './components/App.js'
import Signin from './components/Signin.js'
import Dashboard from './components/dashboardView.js'
import Spork from './components/SporkView.js'
import Categories from './components/CategoriesView.js'
import Uber from './components/ConnectUberView.js'
import auth from './components/Authorize'
import Status from './components/UberStatusView.js'



function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function notAlreadyAuth (nextState, replace) {
  if (auth.loggedIn()) {
    replace({
      pathname: '/',
    });
  }
}

function redirectToRoot (nextState, replace) {
  replace({
    pathname: '/',
  });
}



render((
  <Router history={ browserHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ Spork } onEnter={requireAuth}/>
      <Route path="/status" component={ Status }/>
      <Route path="/signin" component={ Signin } onEnter={notAlreadyAuth}/>
      <Route path="/dashboard" component={ Dashboard } onEnter={requireAuth} >
        <Route path="/categories" component={ Categories }/>
      </Route>
      <Route path="/uber" component={ Uber } onEnter={requireAuth} />
      <Route path="*" onEnter={redirectToRoot} />
    </Route>
  </Router>

  ), document.getElementById('root'))

