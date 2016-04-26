import React from 'react';
import $ from 'jquery';
import { Grid, Col, Button, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
var getAuth = require('./components/auth').getAuth;

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      apiWaiting: true
    }
  }

  componentDidMount() {
    getAuth((authenticated) => this.setState({auth: authenticated, apiWaiting: false}));
  }

  render() {
    var signIn;

    if (!this.state.apiWaiting && !this.state.auth) {
      signIn = (
        <div>
          <p>Please sign in with Facebook to start fighting your Booleans.</p>
          <Button href="/auth/facebook" bsStyle="primary">Sign in with Facebook</Button>
        </div>
      );
    } else if (!this.state.apiWaiting && this.state.auth) {
      signIn = (
        <p>Thank you for signing in. Click "Manage" to get started.</p>
      );
    }

    return (
      <Grid>
        <Col>
          <PageHeader>Welcome to Fighting Booleans!</PageHeader>
          {signIn}
        </Col>
      </Grid>
    );
  }
}

export default LoginView;
