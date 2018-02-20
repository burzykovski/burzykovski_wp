import React, { Component } from "react";
import { Grid, Col, Row, Image } from "react-bootstrap";
import Masonry from "react-masonry-component";

const applyUpdateResult = result => prevState => ({
  photos: [...prevState.photos, ...result],
  page: prevState.page + 1,
  isLoading: false
});

const getUnsplashUrl = (colId, page) =>
  `https://api.unsplash.com/collections/${colId}/photos?page=${page}&per_page=30&client_id=9e7a4bba4e2738e9e1aa9c34c4aa9433a10d037cd5b56a97c67a0e159a65b3fd`;

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      page: 1,
      isLoading: false
    };
  }

  actualUrl = this.props.match.url;
  collectionID = this.actualUrl.slice(this.actualUrl.lastIndexOf("/") + 1);

  fetchPhotos = (colId, page) => {
    this.setState({ isLoading: true });
    fetch(getUnsplashUrl(colId, page))
      .then(response => response.json())
      .then(result => this.stopFetchingWhenResultEmpty(result))
      .then(result => this.setState(applyUpdateResult(result)));
  };

  componentDidMount() {
    this.fetchPhotos(this.collectionID, this.state.page);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  stopFetchingWhenResultEmpty(result) {
    return new Promise(resolve => {
      resolve(
        result.length === 0 ? this.removeScrollListenerInFetch(result) : result
      );
    });
  }

  removeScrollListenerInFetch(result) {
    window.removeEventListener("scroll", this.onScroll, false);
    return result;
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.state.photos.length &&
      !this.state.isLoading
    ) {
      this.onPaginatedFetch();
    }
  };

  onPaginatedFetch = e => this.fetchPhotos(this.collectionID, this.state.page);

  render() {
    const masonryImages = this.state.photos.map(img => (
      <Col xs={12} sm={6} md={4} key={img.id}>
        <Image
          className="masonry-image"
          key={img.id}
          src={img.urls.small}
          alt={img.description}
          responsive
        />
      </Col>
    ));

    return (
      <div>
        <h2>Collection</h2>
        <Masonry>{masonryImages}</Masonry>
        <div>{this.state.isLoading && <span>Loading...</span>}</div>
      </div>
    );
  }
}

export default Collection;
