import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col, PageHeader, Alert, Panel, Button } from 'react-bootstrap';

class NotFound extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <PageHeader>Oops...</PageHeader>
            <Alert bsStyle="danger">
              No Boolean with that id exists.
            </Alert>
          </Col>
        </Row>
      </Grid>
    );
  }
}

class StatRow extends React.Component {
  render() {
    return (
      <Row className="statRowItem">
        <Col className="vcenter" lg={8}>
          <p>Is {this.props.stat.has ? "" : "not"} {this.props.stat.name}</p>
        </Col>
        <Col lg={4}>
          <Button bsStyle="success" disabled={this.props.stat.has || !this.props.alive}>Buy</Button>
        </Col>
      </Row>
    );
  }
}

class BooleanView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      alive: true,
      streaks: {},
      stats: [],
      error: false
    };
  }

  getInfoFromServer() {
    $.ajax({
        url: '/api/booleans/' + this.props.params.id,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({name: data.name, streaks: data.streaks, stats: data.stats});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({name: "Matt",
            streaks: {wins: 2, losses: 1, streak: 1},
            stats: [{name: "strong", has: false}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
            alive: true})
          // this.setState({error: true});
          // console.error('/api/booleans', status, err.toString());
        }.bind(this)
    });
  }

  componentDidMount() {
    this.getInfoFromServer();
  }

  render() {
    if (this.state.error) {
      return <NotFound />;
    }

    var alive = this.state.alive;

    var stats = this.state.stats.map(function(stat) {
      return <StatRow
        key={stat.name}
        stat={stat}
        alive={alive} />;
    });

    return(
      <Grid>
        <Col>
          <PageHeader>{this.state.name}</PageHeader>

          <Row>
            <Col lg={8}>
              <Panel>
                <p>Wins: {this.state.streaks.wins}</p>
                <p>Losses: {this.state.streaks.losses}</p>
                <p>Current Win Streak: {this.state.streaks.streak}</p>
              </Panel>
            </Col>
            <Col lg={4}>
              <Panel>
                {stats}
              </Panel>
            </Col>
          </Row>
        </Col>
      </Grid>
    );
  }
}

export default BooleanView;
