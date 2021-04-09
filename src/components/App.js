import React from "react";
import Navbar    from "./navbar.js"
import Banner from "./banner.js"
import Row    from "./row.js"
import Space    from "./Space.js"
import ActorsList    from "./ActorsList.js"
import ActorDetails from "./ActorDetails.js";
import WritersList from "./WritersList.js";
import WriterDetails from "./WriterDetails.js";
import MovieDetails from "./MovieDetails.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './../styles/App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movies">
            <Navbar/>
            <Banner/>
            <Row title="Liste des films sur MML"/>
        </Route>

        <Route path="/movieDetails">
            <Navbar/>
            <Space/>
            <MovieDetails/>
        </Route>

        <Route path="/actors">
          <Navbar/>
          <Space/>
          <ActorsList/>
        </Route>

        <Route path="/actorDetails">
          <Navbar/>
          <Space/>
          <ActorDetails/>
        </Route>

        <Route path="/writers">
          <Navbar/>
          <Space/>
          <WritersList/>
        </Route>
        
        <Route path="/writerDetails">
          <Navbar/>
          <Space/>
          <WriterDetails/>
        </Route>

        <Route path="/">
          <div className="app">
            <Navbar/>
            <Banner/>
            <Row title="Liste des films sur MML"/>
          </div>
        </Route>

      </Switch>
    </Router>
  );
}