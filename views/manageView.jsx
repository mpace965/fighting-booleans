import React from 'react';
import $ from 'jquery';
import { Grid, Col, Button, Alert, PageHeader } from 'react-bootstrap';
import getAuth from './components/auth';

class ManageView extends React.Component {
  constructor(props) {
    super(props);
    // this.getBooleansFromServer = this.getBooleansFromServer.bind(this);

    this.state = {
      auth: false,
      apiWaiting: true
    }
  }

  componentDidMount() {
    getAuth((authenticated) => this.setState({auth: authenticated, apiWaiting: false}));

    if (this.state.auth) {

    }
  }

  render() {
    if (!this.state.auth && !this.state.apiWaiting) {
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
