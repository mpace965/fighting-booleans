import React from 'react';
import $ from 'jquery';
import { Grid, Col, Button, Alert, PageHeader, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Link } from 'react-router';
var getAuth = require('./components/auth').getAuth;
var getMyBooleans = require('./components/api').getMyBooleans;
var createBoolean = require('./components/api').createBoolean;

class ManageView extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      auth: false,
      apiWaiting: true,
      showModal: false,
      myBooleans: [],
      createName: ""
    }
  }

  componentDidMount() {
    getAuth((authenticated) => this.setState({auth: authenticated, apiWaiting: false}));
    getMyBooleans((bools) => this.setState({myBooleans: bools}));
  }

  handleChange(event) {
    this.setState({createName: event.target.value});
  }

  submit() {
    createBoolean(this.state.createName);
    getMyBooleans((bools) => this.setState({myBooleans: bools}));
    this.setState({createName: "", showModal: false});
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
      var booleans = this.state.myBooleans.map(function(boolean) {
        var deadStyle;

        if (!boolean.alive) {
          deadStyle = {
            textDecoration: "line-through",
            color: 'red'
          }
        }

        return <p><Link style={deadStyle} to={"/boolean/" + boolean._id}>{boolean.name}</Link></p>;
      });

      return (
        <div>
          <Grid>
            <Col>
              <PageHeader>
                Manage Your Booleans
                <Button className="pullRight" bsStyle="success" bsSize="large" onClick={() => this.setState({showModal: true})}>Create</Button>
              </PageHeader>
              {booleans}
            </Col>
          </Grid>

          <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new Fighting Boolean</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup controlId="formControlsText">
                <ControlLabel>Name</ControlLabel>
                <FormControl onChange={this.handleChange} type="text" />
              </FormGroup>

              <Button onClick={this.submit}>Submit</Button>
            </Modal.Body>
          </Modal>
        </div>
      );
    }

  }
}

export default ManageView;
