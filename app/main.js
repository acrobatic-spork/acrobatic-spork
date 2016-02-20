import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import App from './components/App.js'
import Signin from './components/Signin.js'
import Dashboard from './components/dashboardView.js'

render((
  <Router history={ browserHistory }>
    <Route path="/" component={ App }/>
    <Route path="/signin" component={ Signin }/>
    <Route path="/dashboard" component={ Dashboard }/>
  </Router>
  ), document.getElementById('root'))

