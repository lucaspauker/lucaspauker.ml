import React from "react"
import PropTypes from "prop-types"
import { Card } from "react-bootstrap"

class LinkCard extends React.Component {
  render () {
    var substring = this.props.text
    substring = substring.replace(new RegExp("</p>", "g"), "")
    substring = substring.replace(new RegExp("<p>", "g"), "")
    substring = substring.replace(new RegExp("<img.*>", "g"), "")
    substring = substring.replace(new RegExp("<a.*?>", "g"), "")
    substring = substring.replace(new RegExp("<\\a>", "g"), "")
    substring = substring.substring(0, 200) + "...";
    return (
      <React.Fragment>
        <a href={this.props.link}>
          <Card>
            <Card.Body>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{this.props.date}</Card.Subtitle>
              <Card.Text dangerouslySetInnerHTML={{ __html: substring}}></Card.Text>
            </Card.Body>
          </Card>
        </a>
      </React.Fragment>
    );
  }
}

LinkCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string
};
export default LinkCard
