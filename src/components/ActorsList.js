import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./../styles/ActorList.css"

function ActorsList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resp, setData] = useState({ movies: null, peoples: null });

  // Fetching data
  useEffect(() => {
    console.log(`"Fetching people from ${process.env.REACT_APP_SERVER_API}...`);
    const fetchData = async () => {
      const respMovies = await axios(
        `${process.env.REACT_APP_SERVER_API}/movies`
      );
      const respPeoples = await axios(
        `${process.env.REACT_APP_SERVER_API}/peoples`
      );

      setData({ movies: respMovies.data, peoples: respPeoples.data });
    };
    fetchData()
  .then(setIsLoaded(true));
  }, [])
  let actorsMovies = [];
  return (
    <div className="actorsList">
      <h2 className="actors__title">Liste des acteurs</h2>
      <div className="actors">
        { !isLoaded ? ( <div>Chargement...</div> ) : ( 
          console.log("render"),          
          /* resp.movies.map(movie => (
            movie.actors.length > 0 ? null : (
            actorsMovies.push(movie.actors))
          )), */
          console.log("sososo: ", resp.movies.actors),
          console.log("sososo: ", resp.peoples)


          
          /*
          noDoublonsActors = Array.from(new Set(peopleIds))
          noDoublonsActors.map(id => (
            <div id={id} className="actor">
              <Link to={`/actorDetails?id=${id}`}>
                <span>Actor :: {id}</span>
              </Link>
            </div>
          )) */
        )}
      </div>
    </div>
  );
}

export default ActorsList;