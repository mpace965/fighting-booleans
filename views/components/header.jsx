import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Fighting Booleans</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to={"/fight"}>
            <NavItem>Fight</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
