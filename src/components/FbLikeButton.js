import React, { Component } from "react";
import ReactFBLike from "react-fb-like";

class FbLikeButton extends Component {
  render() {
    return (
      <ReactFBLike
        href={this.props.photoUrl}
        share
        showFaces
        language="pl_PL"
        appId="153745258664383"
        version="v2.12"
      />
    );
  }
}

export default FbLikeButton;
