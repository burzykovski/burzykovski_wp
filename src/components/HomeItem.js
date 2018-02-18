import React, { Component } from "react";
import { Panel, Col } from "react-bootstrap";

class HomeItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col xs={12} md={4}>
        <Panel>
          <Panel.Body>
            <div>
              <img src={`https://robohash.org/${this.props.id}.png`} alt={"asdf"} />
            </div>
          </Panel.Body>
        </Panel>
      </Col>
    );
  }
}

export default HomeItem;
