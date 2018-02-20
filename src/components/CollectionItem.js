import React, { Component } from "react";
import { Image } from "react-bootstrap";

class CollectionItem extends Component {
  render() {
    return (
      <Image
        className="masonry-image"
        src={this.props.imgSrc}
        alt={this.props.imgAlt}
        responsive
      />
    );
  }
}

export default CollectionItem;
