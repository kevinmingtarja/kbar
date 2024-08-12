import "./index.scss";
import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import { useAnalytics } from "./utils";

const App = () => {
  useAnalytics();

  return (
    <>
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

