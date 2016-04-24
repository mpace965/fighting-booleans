var React = require('react');
var ReactDOM = require('react-dom');

import LoginView from './loginView';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: LoginView,
      activeViewState: {}
    }
  }

  /* Handles navigation from all child views.
  Optionally, you can pass in a state that will get applied to the activeView.
  This is not automatic, you need to apply it in the view's componentWillMount.*/
  setActiveView(activeView, state) {
    this.setState({activeView: activeView});

    if (state != null) {
      this.setState({activeViewState: state});
    }
  }

  render() {
    var ActiveView = this.state.activeView;

    return (
      <div>
        <ActiveView setActiveView={this.setActiveView} activeViewState={this.state.activeViewState} />
      </div>
    );
  }
}

ReactDOM.render(
  <Wrapper />,
  document.getElementById('wrapper')
);
