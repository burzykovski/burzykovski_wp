import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Row, Col } from "react-bootstrap";

import HomeItem from "../components/HomeItem";



// import Unsplash from "unsplash-js";

// const AppID = "9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd"
// const unsplash = new Unsplash({
//   applicationId: "9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd",
//   secret: "50a8d5f1cd1adf7047ddf375af4be6d171fb8118bb82e690856a775e97304804",
//   callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
// });

class Home extends Component {
  constructor(props) {
    super(props);

  }

  // componentDidMount() {
  //   unsplash.collections
  //     .listFeaturedCollections(1, 10)
  //     .then(rsp => rsp.json())
  //     .then(data => {
  //       this.setState({ ...this.state, collections: data });
  //     });
  // }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <h2>Unsplashy Splash</h2>
        </Col>

        {this.props.collections.map(item => (
          <Link to={`/col/${item.id}`} key={item.id}>
            <HomeItem key={item.id} id={item.id} />
          </Link>
        ))}
      </Row>
    );
  }
}

export default Home;
