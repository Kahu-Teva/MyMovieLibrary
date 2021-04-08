import React from "react";
import Navbar    from "./navbar.js"
import Banner from "./banner.js"
import Row    from "./row.js"
import ActorsList    from "./ActorsList.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './../styles/App.css';

export default function App() {
  return (
    <Router>
      <Switch>
      <Route path="/actors">
          <div className="app">
            <Navbar />
            <Banner/>
            <ActorsList/>
          </div>
        </Route>

        <Route path="/movies">
          <div className="app">
            <Navbar />
            <Banner/>
            <Row title="Liste des films sur MML"/>
          </div>
        </Route>

        <Route path="/">
          <div className="app">
            <Navbar />
            <Banner/>
            <Row title="Liste des films sur MML"/>
          </div>
        </Route>

      </Switch>
    </Router>
  );
}