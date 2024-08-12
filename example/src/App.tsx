import "./index.scss";
import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import { useAnalytics } from "./utils";
import Widget from "../../src";

const App = () => {
  useAnalytics();

  return (
    <>
      <Widget />
      <Layout>
        <Switch>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </Layout>
    
    </>
  );
};

export default App;

