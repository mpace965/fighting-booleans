import React from 'react';
import { Link } from 'react-router';
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
        <Nav onSelect={this.navigate}>
          <NavItem eventKey={1} ><Link to="/fight">Fight</Link></NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
