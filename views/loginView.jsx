import React from 'react';
import $ from 'jquery';
import { Grid, Col, Button, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.getAuthenticatedFromServer = this.getAuthenticatedFromServer.bind(this);

    this.state = {
      auth: false,
      apiWaiting: true
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
          this.setState({auth: data.auth, apiWaiting: false});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/auth/isAuthenticated', status, err.toString());
        }.bind(this)
    });
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
