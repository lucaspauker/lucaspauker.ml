import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap"

class ShowCard extends React.Component {
  render () {
    document.title = this.props.title;
    var text = this.props.text;
    return (
      <React.Fragment>
        <Card>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{this.props.date}</Card.Subtitle>
            <Card.Text dangerouslySetInnerHTML={{ __html: text }}></Card.Text>
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
