import React from 'react';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import "./../styles/ActorList.css"

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
  
  return (
    <div className="actorsList">
      <h2 className="actors__title">Liste des acteurs</h2>
      <div className="actors">
        { (!isLoaded && !isLoaded2) ? ( <div>Chargement...</div> ) : (
          
          movies.map(movie => (
            movie.actors.map(actor=>(
              peoples.map(people => (
                (actor.id == people._id )? 
                (<span> 
                  {people._id} :: 
                  {people.firstname} {people.lastname}.
                </span>) : null
              ))  
            ))
          ))
        )}
      </div>
    </div>
  );
}

export default ActorsList;