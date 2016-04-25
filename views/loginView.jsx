import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

class LoginView extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <PageHeader>Welcome to Fighting Booleans!</PageHeader>
            <p>Please sign in with Facebook to start fighting your Booleans.</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LoginView;
