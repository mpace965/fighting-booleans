import React from 'react';
import $ from 'jquery';
import { Grid, Col, Button, Alert, PageHeader } from 'react-bootstrap';

class ManageView extends React.Component {
  constructor(props) {
    super(props);
    this.getAuthenticatedFromServer = this.getAuthenticatedFromServer.bind(this);

    this.state = {
      auth: false,
    }
  }

  componentDidMount() {
    this.getAuthenticatedFromServer();
  }

  getAuthenticatedFromServer() {
    $.ajax({
        url: '/auth/isAuthenticated/',
        dataType: 'json',
        cache: false,
        data: {userId: 0},
        success: function(data) {
          this.setState({auth: data.auth});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/auth/isAuthenticated', status, err.toString());
        }.bind(this)
    });
  }

  render() {
    if (!this.state.auth) {
      return (
        <Grid>
          <Col>
            <PageHeader>Oops...</PageHeader>
            <Alert bsStyle="danger">
              Please <a href="/auth/facebook">sign in</a> to view this page.
            </Alert>
          </Col>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Col>
            <PageHeader>Manage</PageHeader>
          </Col>
        </Grid>
      );
    }

  }
}

export default ManageView;
