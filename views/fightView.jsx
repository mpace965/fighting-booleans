import React from 'react';
import $ from 'jquery';
import { Grid, Col, Row, Button, DropdownButton, MenuItem, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class FightView extends React.Component {
  constructor(props) {
    super(props);
    this.getOpponentInfoFromServer = this.getOpponentInfoFromServer.bind(this);
    this.getBooleansFromServer = this.getBooleansFromServer.bind(this);

    this.state = {
      opponent: {
        name: "",
        id: "",
        alive: true,
        streaks: {},
        stats: []
      },
      myBooleans: []
    }
  }

  componentDidMount() {
    this.getOpponentInfoFromServer();
    this.getBooleansFromServer();
  }

  getOpponentInfoFromServer() {
    $.ajax({
        url: '/api/boolean/' + this.props.params.opponentId,
        dataType: 'json',
        cache: false,
        data: {userId: 0},
        success: function(data) {
          this.setState({opponent: data});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({opponent: {name: "Tom",
            id: "2393",
            streaks: {wins: 2, losses: 1, streak: 1},
            stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
            alive: true}});
          // this.setState({error: true});
          // console.error('/api/boolean/' + this.props.params.opponentId, status, err.toString());
        }.bind(this)
    });
  }

  getBooleansFromServer() {
    $.ajax({
        url: '/api/booleans/mine',
        dataType: 'json',
        cache: false,
        data: {userId: 0},
        success: function(data) {
          this.setState({myBooleans: data});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({myBooleans: [{name: "Matt",
            id: "2393",
            streaks: {wins: 2, losses: 1, streak: 1},
            stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
            alive: true},
            {name: "Matt2",
              id: "2395",
              streaks: {wins: 2, losses: 1, streak: 1},
              stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
              alive: true}]});
          // this.setState({error: true});
          // console.error('/api/boolean/' + this.props.params.opponentId, status, err.toString());
        }.bind(this)
    });
  }

  render() {
    var opponentId = this.props.params.opponentId;
    var myBooleansList = this.state.myBooleans.map(function(boolean) {
      return (
        <LinkContainer key={boolean.id} to={"/fight-result/" + opponentId + "/" + boolean.id}>
          <MenuItem>{boolean.name}</MenuItem>
        </LinkContainer>
      );
    });

    return (
      <Grid>
        <Col>
          <PageHeader>Fight</PageHeader>
          <p>Which of your Booleans would you like to fight against {this.state.opponent.name}?</p>
          <DropdownButton title="Booleans" id="Booleans">
            {myBooleansList}
          </DropdownButton>
        </Col>
      </Grid>
    );
  }
}

export default FightView;
