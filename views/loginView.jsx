import React from 'react';
import { Grid, Col, PageHeader } from 'react-bootstrap';

class LoginView extends React.Component {
  render() {
    return (
      <Grid>
        <Col>
          <PageHeader>Welcome to Fighting Booleans!</PageHeader>
          <p>Please sign in with Facebook to start fighting your Booleans.</p>
        </Col>
      </Grid>
    );
  }
}

export default LoginView;
