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
import Footer from "./Footer.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './../styles/App.css';

export default function App() {
  let genreHaveDB = [];
  let genreNoDB = [];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);

  // Fetching data
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/movies`)
    .then(res => res.json())
    .then(
      (result) => {
        setMovies(result);
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);


  
  if(!isLoaded){
    return(<div className="app__is__load">
    </div>);
  }
  else{
    movies.map(movie =>(
      movie.genre.map(currentGenre => (
        genreHaveDB.push(currentGenre))
    )));
    genreNoDB = Array.from(new Set(genreHaveDB));
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
              <Row key="f5f5f5f5f5f" title="Liste des films sur MML" category="ALL"/>
              {
                genreNoDB.map((genre,index) => (
                  <Row key={"category"+index} title={genre} category={genre}/>
                ))
              }
              <Footer/>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}