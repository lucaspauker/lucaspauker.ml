import React from "react"
import PropTypes from "prop-types"
import { Navbar, NavDropdown, Nav } from "react-bootstrap"

function Active(props) {
  const active = props.active;
  if (active=="articles") {
    return [
      <Nav.Link href="/">Home</Nav.Link>,
      <div id="active">
        <Nav.Link href="/articles">Blog</Nav.Link>
      </div>
    ]
  } else {
    return [
      <div id="active">
        <Nav.Link href="/">Home</Nav.Link>
      </div>,
      <Nav.Link href="/articles">Blog</Nav.Link>,
    ]
  }
}

class MyNav extends React.Component {
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
                <Active active={this.props.active}/>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

MyNav.propTypes = {
  active: PropTypes.string
};

export default MyNav
