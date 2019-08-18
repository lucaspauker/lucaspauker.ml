import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

class GithubButton extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Button href="https://github.com/lucaspauker" target="_blank">
          See More on Github
        </Button>
      </React.Fragment>
    );
  }
}

export default GithubButton
