import React from 'react';
import { Grid, Col, Row, Button, DropdownButton, MenuItem, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
var getBoolean = require('./components/api').getBoolean;
var getMyBooleans = require('./components/api').getMyBooleans;

class FightView extends React.Component {
  constructor(props) {
    super(props);

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
    getBoolean(this.props.params.opponentId, (data) => this.setState({opponent: data}));
    getMyBooleans((data) => this.setState({myBooleans: data}));
  }

  render() {
    var opponentId = this.props.params.opponentId;
    var myBooleansList = this.state.myBooleans.map(function(boolean) {
      if (boolean.alive) {
        return (
          <LinkContainer key={boolean._id} to={"/fight-result/" + opponentId + "/" + boolean._id}>
            <MenuItem>{boolean.name}</MenuItem>
          </LinkContainer>
        );
      }
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
