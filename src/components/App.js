import React from "react";
import Navbar    from "./navbar.js"
import Banner from "./banner.js"
import Row    from "./row.js"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './../styles/App.css';

export default function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Switch>
        <Route path="/">
          <div className="app">
            <Navbar />
            <Banner/>
            <Row/>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}