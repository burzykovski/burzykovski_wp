import React, { Component } from "react";
import { Grid, Col, Row, Image } from "react-bootstrap";
import Masonry from "react-masonry-component";

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  actualUrl = this.props.match.url;
  collectionID = this.actualUrl.slice(this.actualUrl.lastIndexOf("/") + 1);

  componentDidMount() {
    const API_URL = `data/${this.collectionID}.json`;
    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.setState({ photos: data }));
  }
  render() {
    const masonryImages = this.state.photos.map(function(img) {
      return (
        <Col xs={12} sm={6} md={4} key={img.id}>
        <Image
          className="masonry-image"
          key={img.id}
          src={img.urls.small}
          alt={img.description}
          responsive
        />
        </Col>
      );
    });

    return <Masonry>{masonryImages}</Masonry>;
  }
}

export default Collection;
