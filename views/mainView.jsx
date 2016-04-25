import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import LoginView from './loginView';
import FightView from './fightView';
import Header from './components/header';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }

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
      <Router path="fight" component={FightView} />
    </Route>
  </Router>
), document.getElementById('wrapper'));
