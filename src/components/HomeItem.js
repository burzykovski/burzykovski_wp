import React, { Component } from "react";
import { Panel, Col, Row, Image } from "react-bootstrap";

/*
const BASE_URL = "https://api.unsplash.com"
const GET_COLLECTION_PHOTOS = `/collections/${this.propscolId}/photos`
const GET_NEWEST = "?order_by=latest&"
const AUTHORIZATION = "client_id="
const MY_APP_ID = "9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd"

const API_URL = BASE_URL+GET_COLLECTION_PHOTOS+GET_NEWEST+AUTHORIZATION+MY_APP_ID;

API_URL = `https://api.unsplash.com/collections/${this.props.colId}/photos?order_by=latest&client_id=9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd`
*/

class HomeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  getNewestPhotos = data => {
    data = data
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 10);

    return new Promise((resolve, reject) => {
      resolve(data);
      reject(console.log("There is a problem with extracting IDs from data"));
    });
  };

  componentDidMount() {
    const API_URL = `data/${this.props.colId}.json`;
    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.getNewestPhotos(data))
      .then(data => this.setState({ photos: data }));
  }

  render() {
    return (
      <Panel className="gallery-panel">
        <Panel.Heading>
          <h4>{this.props.colTitle}</h4>
        </Panel.Heading>
        <Panel.Body className="panel-collection">
          {this.state.photos.map(img => (
            <Image
              className="panel-collection-image"
              key={img.id}
              src={img.urls.thumb}
              alt={img.description}
              responsive
            />
          ))}
        </Panel.Body>
      </Panel>
    );
  }
}

export default HomeItem;
