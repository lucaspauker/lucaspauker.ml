import React from "react"
import PropTypes from "prop-types"

class Information extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div id="info">
            <h3>About Me</h3>
            <p>
              Hi, I am an undergraduate student at Stanford University studying physics and computer science. I love learning about the world, and building solutions to problems with software. In my free time, I like to play piano and spend time outdoors.
            </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Information
