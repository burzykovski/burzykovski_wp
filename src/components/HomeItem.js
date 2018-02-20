import React, { Component } from "react";
import { Panel, Image } from "react-bootstrap";
import Masonry from "react-masonry-component";
import { APP_ID } from "../APP_ID";

class HomeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    const API_URL = `https://api.unsplash.com/collections/${
      this.props.colId
    }/photos?order_by=latest&client_id=${APP_ID}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.setState({ photos: data }));
  }

  render() {
    return (
      <Panel className="panel-collection">
        <Panel.Heading className="panel-collection-heading">
          <h4>{this.props.colTitle}</h4>
        </Panel.Heading>
        <Panel.Body className="panel-collection-body">
          <div className="test">
            <Masonry>
              {this.state.photos.map(img => (
                <Image
                  className="panel-collection-image"
                  key={img.id}
                  src={img.urls.thumb}
                  alt={img.description}
                  responsive
                />
              ))}
            </Masonry>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default HomeItem;
