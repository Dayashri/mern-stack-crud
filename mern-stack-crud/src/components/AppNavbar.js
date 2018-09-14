import React, { Component } from 'react';
import {Navbar,NavbarBrand,Container} from 'reactstrap';
import logo from '../Logo.png'

class AppNavbar extends Component {

  render() {
    return (
      <div>
        <Navbar expand="sm" className="mb-3" style={{'background':'#3f51b5'}}>
            <NavbarBrand href="/" className="brand"><img className="img-responsive" src={logo}/></NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
