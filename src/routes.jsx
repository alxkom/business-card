import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import App from './app';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
    </div>
  </Router>
);

export default Routes;
