import React from 'react';
import { useState, useEffect } from 'react';
import "./../styles/ActorList.css"
import { Link } from "react-router-dom";

function ActorsList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [peoples, setPeoples] = useState([]);
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

    fetch(`${process.env.REACT_APP_SERVER_API}/peoples`)
    .then(res2 => res2.json())
    .then(
      (result2) => {
        setPeoples(result2);
        setIsLoaded2(true);
      },
      (error) => {
        setError(error);
        setIsLoaded2(true);
      }
    )
  }, []);

  let actorsListDB = [];
  let actorsList = [];
  
  return (
    <div className="actorsList">
      <h2 className="actors__title">Liste des acteurs</h2>
      <div className="actors">
        { (!isLoaded || !isLoaded2) ? ( <div>Chargement...</div> ) : (
          
          movies.map(movie => (
            movie.actors.map(actor=>(
              peoples.map(people => (
                (actor._id === people._id )? 
                actorsListDB.push(people) : null
              ))  
            ))
          )),
          actorsList = Array.from(new Set(actorsListDB)),
          actorsList.map(actor => (
            <div key={actor._id} className="actor__card">
              <Link key={actor._id} to={`/actorDetails?id=${actor._id}`}>
                <img className="actor__picture" src={actor.picture} alt={actor.picture}/>
                <span className="actor__name">{actor.firstname} {actor.lastname}</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ActorsList;