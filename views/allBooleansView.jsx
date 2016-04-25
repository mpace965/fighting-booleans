import React from 'react';
import $ from 'jquery';
import { Grid, Col, Row, Button, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class BooleanRow extends React.Component {
  render() {
    return (
      <Row className="rowItem">
        <Col lg={8}>
          <Link to={"/boolean/" + this.props.boolean.id}>{this.props.children}</Link>
        </Col>
        <Col lg={4}>
          <LinkContainer to={"/fight/" + this.props.boolean.id} disabled={!this.props.boolean.canFight}>
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
      booleans: [],
      error: false
    }
  }

  getBooleansFromServer() {
    $.ajax({
        url: '/api/booleans/',
        dataType: 'json',
        cache: false,
        data: {userId: 0},
        success: function(data) {
          this.setState({booleans: data.booleans});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({booleans: [{name: "Matt", id: "2393", canFight: false}, {name: "Tom", id: "2394", canFight: true}]});
          // this.setState({error: true});
          // console.error('/api/booleans', status, err.toString());
        }.bind(this)
    });
  }

  componentDidMount() {
    this.getBooleansFromServer();
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
