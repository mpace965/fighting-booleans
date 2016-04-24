import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends React.Component {
  navigate(eventKey, e) {
    switch (eventKey) {
      case 1:
        console.log("Hey lamae clicked!");
        break;
    }
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Fighting Booleans</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav onSelect={this.navigate}>
          <NavItem eventKey={1} href="#">Fight</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
