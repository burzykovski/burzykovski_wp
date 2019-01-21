import React, { Component } from "react";
import { Col, Row, Image } from "react-bootstrap";
import FbLikeButton from "../components/FbLikeButton";
import { APP_ID } from "../APP_ID";

class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoData: null
    };
  }

  actualUrl = this.props.match.url;
  photoID = this.actualUrl.slice(this.actualUrl.lastIndexOf("/") + 1);

  API_URL = `https://api.unsplash.com/photos/${
    this.photoID
  }?client_id=${APP_ID}`;

  componentDidMount() {
    fetch(this.API_URL)
      .then(response => response.json())
      .then(data => this.setState({ photoData: data }));
  }

  render() {
    if (!this.state.photoData) {
      return <p>Loading…</p>;
    }
    const {
      urls,
      likes,
      views,
      downloads,
      user,
      description,
      width,
      height
    } = this.state.photoData;
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Image
              className="center-block"
              src={urls.regular}
              alt={description}
              responsive
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <h4 className="text-center">Info</h4>
            <ul className="photo-info-list text-center">
              <li>Description: {description}</li>
              <li>Width: {width}</li>
              <li>Height: {height}</li>
            </ul>
          </Col>
          <Col xs={4}>
            <h4 className="text-center">Stats</h4>
            <ul className="photo-info-list text-center">
              <li>Likes: {likes}</li>
              <li>Downloads: {downloads}</li>
              <li>Views: {views}</li>
            </ul>
          </Col>
          <Col xs={4}>
            <h4 className="text-center">Author</h4>
            <ul className="photo-info-list text-center">
              <li>Username: {user.username}</li>
              <li>Name: {user.name}</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col xs={4} xsOffset={4}>
            <FbLikeButton photoUrl={urls.regular} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Photo;
