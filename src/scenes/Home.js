import React, { Component } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { Col } from "react-bootstrap";
import { APP_ID } from "../APP_ID";

import HomeItem from "../components/HomeItem";

const BASE_URL = "https://api.unsplash.com";
const LIST_FEATURED_COLLECTIONS = "/collections/featured";
const AUTHORIZATION = "?client_id=";
const API_URL = BASE_URL + LIST_FEATURED_COLLECTIONS + AUTHORIZATION + APP_ID;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionsInfo: null
    };
  }

  extractCollectionIdAndTitle = data => {
    return new Promise(resolve => {
      resolve(data.map(item => ({ id: item.id, title: item.title })));
    });
  };

  componentDidMount() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.extractCollectionIdAndTitle(data))
      .then(data => this.setState({ collectionsInfo: data }));
  }

  render() {
    if (!this.state.collectionsInfo) {
      return <p>Loading…</p>;
    }
    const homeItems = this.state.collectionsInfo.map(col => (
      <Col xs={12} sm={6} md={4} key={col.id} >
        <Link to={`/collections/${col.id}`}>
          <HomeItem colId={col.id} colTitle={col.title} />
        </Link>
      </Col>
    ));
    return (
      <div>
        <h2>Unsplashy Splash</h2>
        <Masonry>{homeItems}</Masonry>
      </div>
    );
  }
}

export default Home;
