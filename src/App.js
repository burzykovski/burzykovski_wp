import React from "react";
import { Grid } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./scenes/Home";
import Collection from "./scenes/Collection";
import Photo from "./scenes/Photo";

const API_URL = "data/collectionsDefault.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionsIds: []
    };
  }

   extractIds = data => {
    return new Promise((resolve, reject) => {
      resolve(data.map(item => item.id));
      reject(console.log("There is a problem with extracting IDs from data"));
    });
  };

  componentDidMount() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.extractIds(data))
      .then(data => this.setState({ collectionsIds: data }));
  }
  
  render() {
    return (
      <BrowserRouter>
        <Grid>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home collections={this.state.collectionsIds} />}
            />
            <Route path="/col/:colId" component={Collection} />
            <Route path="/photo/:photoId" component={Photo} />
          </Switch>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default App;
