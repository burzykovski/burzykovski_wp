import React, { Component } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { Row, Col } from "react-bootstrap";

import HomeItem from "../components/HomeItem";

const API_URL = "data/collectionsDefault.json";
/*
const BASE_URL = "https://api.unsplash.com"
const LIST_FEATURED_COLLECTIONS = "/collections/featured"
const AUTHORIZATION = "?client_id="
const MY_APP_ID = "9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd"

const API_URL = BASE_URL+LIST_FEATURED_COLLECTIONS+AUTHORIZATION+MY_APP_ID;
API_URL: https://api.unsplash.com/collections/featured?client_id=9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd

*/

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionsInfo: []
    };
  }

  extractCollectionIdAndTitle = data => {
    return new Promise((resolve, reject) => {
      resolve(data.map(item => ({ id: item.id, title: item.title })));
      reject(console.log("There is a problem with extracting IDs from data"));
    });
  };

  componentDidMount() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.extractCollectionIdAndTitle(data))
      .then(data => this.setState({ collectionsInfo: data }));
  }

  render() {
    const homeItems = this.state.collectionsInfo.map(col => (
      <Col xs={12} sm={6} md={4} key={col.id}>
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

// import Unsplash from "unsplash-js";

// const AppID = "9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd"
// const unsplash = new Unsplash({
//   applicationId: "9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd",
//   secret: "50a8d5f1cd1adf7047ddf375af4be6d171fb8118bb82e690856a775e97304804",
//   callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
// });

// componentDidMount() {
//   unsplash.collections
//     .listFeaturedCollections(1, 10)
//     .then(rsp => rsp.json())
//     .then(data => {
//       this.setState({ ...this.state, collections: data });
//     });
// }
