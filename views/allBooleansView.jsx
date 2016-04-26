import React from 'react';
import { Grid, Col, Row, Button, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
var getAllBooleans = require('./components/api').getAllBooleans;

class BooleanRow extends React.Component {
  render() {
    return (
      <Row className="rowItem">
        <Col lg={8}>
          <Link to={"/boolean/" + this.props.boolean._id}>{this.props.children}</Link>
        </Col>
        <Col lg={4}>
          <LinkContainer to={"/fight/" + this.props.boolean._id} disabled={this.props.boolean.ownedBy}>
            <Button bsStyle="success">Fight</Button>
          </LinkContainer>
        </Col>
      </Row>
    );
  }
}

class AllBooleansView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      booleans: []
    }
  }

  componentDidMount() {
    getAllBooleans((data) => this.setState({booleans: data}));
  }

  render() {
    var booleans = this.state.booleans.map(function(boolean) {
      return <BooleanRow key={boolean.name} boolean={boolean}>{boolean.name}</BooleanRow>;
    });

    return(
      <Grid>
        <Col>
          <PageHeader>All Booleans</PageHeader>
          {booleans}
        </Col>
      </Grid>
    );
  }
}

export default AllBooleansView;
