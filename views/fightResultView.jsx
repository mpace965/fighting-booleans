import React from 'react';
import $ from 'jquery';
import { Grid, Col, Row, PageHeader } from 'react-bootstrap';

class FightResultView extends React.Component {
  constructor(props) {
    super(props);
    this.getResultFromServer = this.getResultFromServer.bind(this);

    this.state = {
      opponent: {
        name: "",
        id: "",
        alive: true,
        streaks: {},
        stats: []
      },
      boolean: {
        name: "",
        id: "",
        alive: true,
        streaks: {},
        stats: []
      },
      won: false
    };
  }

  componentDidMount() {
    this.getResultFromServer();
  }

  getResultFromServer() {
    $.ajax({
        url: '/api/fight-result/' + this.props.params.opponentId + '/' + this.props.params.yourId,
        dataType: 'json',
        cache: false,
        data: {userId: 0},
        success: function(data) {
          this.setState({opponent: data.opponent});
          this.setState({boolean: data.boolean});
          this.setState({result: data.result});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({opponent: {name: "Tom",
            id: "2393",
            streaks: {wins: 2, losses: 1, streak: 1},
            stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
            alive: true}});
          this.setState({boolean: {name: "Matt",
            id: "2393",
            streaks: {wins: 2, losses: 1, streak: 1},
            stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
            alive: true}});
          this.setState({result: true});
          // this.setState({error: true});
          // console.error('/api/boolean/' + this.props.params.opponentId, status, err.toString());
        }.bind(this)
    });
  }

  render() {
    var resultMessage;

    if (this.state.result) {
      resultMessage = <p>You won! One tautology has been added to your account.</p>;
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
