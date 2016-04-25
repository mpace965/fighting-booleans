import React from 'react';
import $ from 'jquery';
import { Grid, Col, Row, Button, PageHeader } from 'react-bootstrap';

class BooleanRow extends React.Component {
  render() {
    return (
      <Row className="rowItem">
        <Col lg={8}>
          <p>{this.props.children}</p>
        </Col>
        <Col lg={4}>
          <Button bsStyle="success" disabled={!this.props.boolean.canFight}>Fight</Button>
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
