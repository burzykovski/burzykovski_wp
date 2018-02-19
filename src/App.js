import React from "react";
import { Grid } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./scenes/Home";
import Collection from "./scenes/Collection";
import Photo from "./scenes/Photo";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Grid>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/collections/:colId" component={Collection} />
            <Route path="/photos/:photoId" component={Photo} />
          </Switch>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default App;
