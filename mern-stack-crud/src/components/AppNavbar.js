import React, { Component } from 'react';
import {Navbar,NavbarBrand,Container} from 'reactstrap';

class AppNavbar extends Component {

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Skills Adder</NavbarBrand>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;