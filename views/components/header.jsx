import React from 'react';
import $ from 'jquery';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

class Header extends React.Component {
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
    var signOut;

    if (this.state.auth) {
      signOut = (
        <NavItem href="/logout">Log Out</NavItem>
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
          {signOut}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
