import React, { Component } from 'react';

class Collection extends Component {
  render() {
    return (
      <div>
        <p>id to: {this.props.match.url}</p>
      </div>
    )
  }
};

export default Collection;