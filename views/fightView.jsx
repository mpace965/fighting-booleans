import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

class FightView extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <PageHeader>Fight!</PageHeader>
            <p>You can fight your Booleans here!</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default FightView;
