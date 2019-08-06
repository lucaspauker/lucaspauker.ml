import React from "react"
import PropTypes from "prop-types"
import { Navbar, NavDropdown, Nav } from "react-bootstrap"

class MyNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quantity: this.props.number_items}
  }

  render () {
    return (
      <React.Fragment>
        <Navbar>
          <div id="title">
            <Navbar.Brand href="/#">Lucas Pauker</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div id="links">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/articles">Blog</Nav.Link>
                <Nav.Link href="/">Projects</Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default MyNav
