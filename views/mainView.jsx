import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Header from './components/header';
import LoginView from './loginView';
import AllBooleansView from './allBooleansView';
import BooleanView from './booleanView';

class Wrapper extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Wrapper}>
      <IndexRoute component={LoginView} />
      <Route path="booleans" component={AllBooleansView} />
      <Route path="boolean/:id" component={BooleanView} />
    </Route>
  </Router>
), document.getElementById('wrapper'));
