import React from "react";

class Thumbnail extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.receiveImage(this.props.imageObject);
  }

  render() {
    return (
      <img
        src={this.props.imageObject.urls.thumb}
        onClick={this.handleClick}
        className="thumb"
        id="thumb"
      />
    );
  }
}

export default Thumbnail;
