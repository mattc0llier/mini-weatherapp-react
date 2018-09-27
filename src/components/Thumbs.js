import React from "react";
import Thumbnail from "./Thumbnail.js";

class Thumbs extends React.Component {
  render() {
    return (
      <div className="thumbs" id="thumbs">
        {this.props.images.map(image => (
          <Thumbnail
            key={image.id}
            imageObject={image}
            receiveImage={this.props.receiveImage}
          />
        ))}
      </div>
    );
  }
}

export default Thumbs;
