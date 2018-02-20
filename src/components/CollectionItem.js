import React, { Component } from "react";
import { Image, Popover, OverlayTrigger, Label } from "react-bootstrap";
import { APP_ID } from "../APP_ID";

class CollectionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoInfo: []
    };
  }

  API_URL = `https://api.unsplash.com/photos/${
    this.props.imgId
  }?client_id=${APP_ID}`;

  handleMouseOver = () => {
    this.state.photoInfo.length === 0 ? this.fetchPhotoInfo() : null;
  };

  extractPhotoInfo = data => {
    return new Promise(resolve => {
      resolve({
        likes: data.likes,
        downloads: data.downloads,
        country: data.location && data.location.country
      });
    });
  };

  fetchPhotoInfo = () => {
    fetch(this.API_URL)
      .then(response => response.json())
      .then(data => this.extractPhotoInfo(data))
      .then(data => this.setState({ photoInfo: data }));
  };

  render() {
    const { likes, downloads, country } = this.state.photoInfo;
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title="More info">
        <Label>Likes:</Label> {likes}
        <br />
        <Label>Downloads:</Label> {downloads}
        <br />
        <Label>Country:</Label> {country === undefined ? "N/A" : country}
      </Popover>
    );
    return (
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="right"
        overlay={popoverHoverFocus}
      >
        <Image
          className="masonry-image"
          src={this.props.imgSrc}
          alt={this.props.imgAlt}
          responsive
          onMouseOver={this.handleMouseOver}
        />
      </OverlayTrigger>
    );
  }
}

export default CollectionItem;
