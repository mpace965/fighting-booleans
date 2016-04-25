import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col, PageHeader, Alert, Modal, Panel, Button } from 'react-bootstrap';

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
  constructor(props) {
    super(props);
    this.buyStatFromServer = this.buyStatFromServer.bind(this);

    this.state = {
      has: false
    };
  }

  componentDidMount() {
    this.setState({has: this.props.stat.has});
  }

  buyStatFromServer() {
    $.ajax({
        url: '/api/boolean/' + this.props.id + '/buyStat',
        dataType: 'json',
        cache: false,
        data: {userId: 0, stat: this.props.stat.name},
        success: function(data) {
          if (data.bought) {
            this.setState({has: true});
          } else {
            this.props.showModal();
          }
        }.bind(this),
        error: function(xhr, status, err) {
          this.props.showModal();
          // console.error('/api/boolean/' + this.props.id + '/buyStat', status, err.toString());
        }.bind(this)
    });
  }

  render() {
    return (
      <Row className="rowItem">
        <Col lg={8}>
          <p>Is {this.props.stat.has ? "" : "not"} {this.props.stat.name}</p>
        </Col>
        <Col lg={4}>
          <Button bsStyle="success" disabled={this.state.has || !this.props.alive} onClick={this.buyStatFromServer}>Buy</Button>
        </Col>
      </Row>
    );
  }
}

class BooleanView extends React.Component {
  constructor(props) {
    super(props);
    this.getInfoFromServer = this.getInfoFromServer.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      name: "",
      alive: true,
      streaks: {},
      stats: [],
      error: false,
      showModal: false
    };
  }

  componentDidMount() {
    this.getInfoFromServer();
  }

  getInfoFromServer() {
    $.ajax({
        url: '/api/boolean/' + this.props.params.id,
        dataType: 'json',
        cache: false,
        data: {userId: 0},
        success: function(data) {
          this.setState({name: data.name, streaks: data.streaks, stats: data.stats, alive: data.alive});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({name: "Matt",
            streaks: {wins: 2, losses: 1, streak: 1},
            stats: [{name: "strong", has: false}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
            alive: true});
          // this.setState({error: true});
          // console.error('/api/boolean/' + this.props.params.id, status, err.toString());
        }.bind(this)
    });
  }

  showModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    if (this.state.error) {
      return <NotFound />;
    }

    var context = this;

    var stats = this.state.stats.map(function(stat) {
      return <StatRow
        key={stat.name}
        stat={stat}
        alive={context.state.alive}
        id={context.props.params.id}
        showModal={context.showModal} />;
    });

    return(
      <div>
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

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Insufficient Tautologies</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You lack the tautologies to add a new stat to your Boolean.</p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default BooleanView;
