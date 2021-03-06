import React from "react"
import PropTypes from "prop-types"
import { Jumbotron, Button, Image } from "react-bootstrap"

class Header extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Jumbotron>
          <div id="jumbo">
            <Image src={this.props.image_path} alt="Profile Photo" roundedCircle />
            <h1>Lucas Pauker</h1>
            <div className="text-box">
              <p>
                Stanford University undergraduate
              </p>
              <p>
                physics and computer science student
              </p>
            </div>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  image_path: PropTypes.string
}

export default Header
