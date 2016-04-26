import React from 'react';
import { Grid, Col, Row, PageHeader } from 'react-bootstrap';
var getFightResult = require('./components/api').getFightResult;
var getBoolean = require('./components/api').getBoolean;

class FightResultView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opponent: {
        name: ""
      },
      boolean: {
        name: ""
      },
      won: false
    };
  }

  componentDidMount() {
    getFightResult(this.props.params.opponentId, this.props.params.yourId, (data) => this.setState({won: data.won}));
    getBoolean(this.props.params.opponentId, (data) => this.setState({opponent: data}));
    getBoolean(this.props.params.yourId, (data) => this.setState({boolean: data}));
  }

  render() {
    var resultMessage;

    if (this.state.won) {
      resultMessage = <p>You won!</p>;
    } else {
      resultMessage = <p>You lost.</p>;
    }

    return (
      <Grid>
        <Col>
          <PageHeader>{this.state.boolean.name} vs. {this.state.opponent.name}</PageHeader>
          {resultMessage}
        </Col>
      </Grid>
    );
  }
}

export default FightResultView;
