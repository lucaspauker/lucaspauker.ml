import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap"

class ShowCard extends React.Component {
  componentDidMount() {
    console.log("Rerendering MathJax");
    <script>
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.querySelector('.card-text')]);
    </script>
  }

  render () {
    document.title = this.props.title;
    return (
      <React.Fragment>
        <Card>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{this.props.date}</Card.Subtitle>
            <Card.Text dangerouslySetInnerHTML={{ __html: this.props.text }}></Card.Text>
            <Card.Link href={this.props.back}>Back</Card.Link>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

ShowCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  back: PropTypes.string,
};

export default ShowCard
