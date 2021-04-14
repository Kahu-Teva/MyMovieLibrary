import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form            from "./Form.js"
import LogoBar         from "./LogoBar.js"
import Banner          from "./Banner.js"
import Navbar          from "./Navbar.js"
import Space           from "./Space.js"
import Row             from "./Row.js"
import MovieDetails    from "./MovieDetails.js";
import ActorsList      from "./ActorsList.js"
import ActorDetails    from "./ActorDetails.js";
import WritersList     from "./WritersList.js";
import WriterDetails   from "./WriterDetails.js";
import DirectorList    from './DirectorsList.js';
import DirectorDetails from "./DirectorDetails";
import Footer          from "./Footer.js"
import './../styles/App.css';
import "./../styles/Authentification.css"

export default function App() {
  let genreHaveDB = [];
  let genreNoDB = [];
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);

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
    return(<div className="app__is__load"/>);
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

          <Route path="/putOutMomently">
            <div className="signin">
              <LogoBar/>
              <Form/>
              <Footer/>
            </div>
          </Route>

          <Route path="/">
            <div className="app">
              <Navbar/>
              <Banner/>
              <Row key="f5f5f5f5f5f" title="The biggest hits on MyMovieLibrary" category="ALL"/>
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