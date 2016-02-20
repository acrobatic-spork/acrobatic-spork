import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import App from './components/App.js'
import Signin from './components/Signin.js'
import Dashboard from './components/dashboardView.js'
import Spork from './components/SporkView.js'

render((
  <Router history={ browserHistory }>
    <Route path="/" component={ App }/>
    <Route path="/signin" component={ Signin }/>
    <Route path="/dashboard" component={ Dashboard }/>
    <Route path="/spork" component={ Spork }/>

  </Router>
  ), document.getElementById('root'))

