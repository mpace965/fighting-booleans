import React from 'react';
import $ from 'jquery';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
var getAuth = require('./auth').getAuth;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
    }
  }

  componentDidMount() {
    getAuth((authenticated) => this.setState({auth: authenticated}));
  }

  render() {
    var signOut;

    if (this.state.auth) {
      signOut = (
        <Nav pullRight>
          <NavItem href="/logout">Log Out</NavItem>
        </Nav>
      );
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Fighting Booleans</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to={"/booleans"}>
            <NavItem>Fight</NavItem>
          </LinkContainer>
          <LinkContainer to={"/manage"}>
            <NavItem>Manage</NavItem>
          </LinkContainer>
        </Nav>
        {signOut}
      </Navbar>
    );
  }
}

export default Header;
