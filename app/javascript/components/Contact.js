import React from "react"
import PropTypes from "prop-types"
import { Col, Row } from "react-bootstrap"

class Contact extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div id="contact">
          <Row>
            <Col>
              <a href="https://github.com/lucaspauker" target="_blank">
                <i className="fab fa-github"></i>
                <p>Github</p>
              </a>
            </Col>
            <Col>
              <a href="https://www.linkedin.com/in/lucas-pauker-7b4571150/" target="_blank">
                <i className="fab fa-linkedin"></i>
                <p>Linkedin</p>
              </a>
            </Col>
            <Col>
              <a href="">
                <i className="fas fa-envelope"></i>
                <p>Email</p>
              </a>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Contact
