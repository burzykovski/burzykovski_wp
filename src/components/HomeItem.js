import React, { Component } from "react";
import { Panel, Col, Image } from "react-bootstrap";



class HomeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    }
  }
  

  getNewestPhotos = data => {
    data = data.sort((a,b) => b.created_at.localeCompare(a.created_at)).slice(0,10);

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
      <Col xs={12} md={4}>
        <Panel >
          <Panel.Body className="panel-collection">
            {this.state.photos.map(img => (
              <Image className="panel-collection-image" key={img.id} src={img.urls.thumb} alt={img.description} responsive />
            ))}
          </Panel.Body>
        </Panel>
      </Col>
    );
  }
}

export default HomeItem;
