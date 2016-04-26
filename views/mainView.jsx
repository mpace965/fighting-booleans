import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Header from './components/header';
import LoginView from './loginView';
import AllBooleansView from './allBooleansView';
import BooleanView from './booleanView';
import FightView from './fightView';
import FightResultView from './fightResultView';
import ManageView from './manageView';

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
      <Route path="manage" component={ManageView} />
      <Route path="booleans" component={AllBooleansView} />
      <Route path="boolean/:id" component={BooleanView} />
      <Route path="fight/:opponentId" component={FightView} />
      <Route path="fight-result/:opponentId/:yourId" component={FightResultView} />
    </Route>
  </Router>
), document.getElementById('wrapper'));
