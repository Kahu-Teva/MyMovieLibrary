import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Formulaire      from "./Formulaire.js"
import Banner          from "./Banner.js"
import Navbar          from "./Navbar.js"
import Space           from "./Space.js"
import Row             from "./Row.js"
import MovieDetails    from "./MovieDetails.js";
/* import ActorsList      from "./ActorsList.js"
import ActorDetails    from "./ActorDetails.js";
import WritersList     from "./WritersList.js";
import WriterDetails   from "./WriterDetails.js";
import DirectorList    from './DirectorsList.js';
import DirectorDetails from "./DirectorDetails"; */
import Footer          from "./Footer.js"
import './../styles/App.css';
import "./../styles/Authentification.css"

import InsertMovie from './InsertMovie.js';
import UpdateMovie from './UpdateMovie.js';

import PeopleList from './PeopleList.js';
import PeopleDetails from './PeopleDetails.js';
import UpdatePeople from './UpdatePeople.js';
import InsertPeople from './InsertPeople.js';

export default function App() {
  let genreHaveDB = [];
  let genreNoDB = [];
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/movies`)
    .then(res => res.json())
    .then(
      (result) => {
        setMovies(result);
        setIsLoaded(true);
      },
      (error) => {
        console.log(error);
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
    console.log("genreNoDB: ", genreNoDB);
    return (
      <Router>
        <Switch>
{/*           <Route path="/actors">
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
          </Route> */}

          <Route path="/peoples">
              <Navbar/>
              <Space/>
              <PeopleList/>
              <Footer/>
          </Route>

          <Route path="/peopleDetails">
            <div className="signin">
              <Navbar/>
              <Space/>
              <PeopleDetails/>
              <Footer/>
            </div>
          </Route>

          <Route path="/movieDetails">
              <Navbar/>
              <Space/>
              <MovieDetails/>
          </Route>

{/*    Formulaire movie       */}
          <Route path="/insertMovie">
            <div className="signin">
              <Navbar/>
              <Space/>
              <InsertMovie/>
              <Footer/>
            </div>
          </Route>

          <Route path="/updateMovie">
            <div className="signin">
              <Navbar/>
              <Space/>
              <UpdateMovie/>
              <Footer/>
            </div>
          </Route>

{/*    Formulaire  people       */}
          <Route path="/insertPeople">
            <div className="signin">
              <Navbar/>
              <Space/>
              <InsertPeople/>
              <Footer/>
            </div>
          </Route>

          <Route path="/updatePeople">
            <div className="signin">
              <Navbar/>
              <Space/>
              <UpdatePeople/>
              <Footer/>
            </div>
          </Route>


{/*    Formulaire users       */}
          <Route path="/signin">
            <div className="signin">
              <Navbar/>
              <Formulaire/>
              <Footer/>
            </div>
          </Route>

{/*         Main         */}
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
              <Link to="/insertMovie" className="banner__button button_more_info">
                <div className="banner__button_ico"/>
                <span>New Movie</span>
              </Link>
              <Footer/>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}