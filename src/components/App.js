import { React, useState, useEffect } from 'react';
import Navbar    from "./navbar.js"
import Banner from "./banner.js"
import Row    from "./row.js"
import Space    from "./Space.js"
import ActorsList    from "./ActorsList.js"
import ActorDetails from "./ActorDetails.js";
import WritersList from "./WritersList.js";
import WriterDetails from "./WriterDetails.js";
import MovieDetails from "./MovieDetails.js";
import DirectorList from './DirectorsList.js';
import DirectorDetails from "./DirectorDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './../styles/App.css';

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);

  // Fetching data
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/movies`)
    .then(res => res.json())
    .then(
      (result) => {
        // console.log("SHEEEEEEEEEEEEE ",result[0].genre);
        setMovies(result);
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);

  let genreHaveDB = [];
  let genreNoDB = [];
  return (
    <Router>
      <Switch>
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

        <Route path="/directors">
          <Navbar/>
          <Space/>
          <DirectorList/>
        </Route>

        <Route path="/directorDetails">
          <Navbar/>
          <Space/>
          <DirectorDetails/>
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