import React from 'react';
import { useState, useEffect } from 'react';
import "./../styles/ActorList.css"
import { Link } from "react-router-dom";

export default function DirectorList(){
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

  let directorsListDB = [];
  let directorsList = [];
  
  return (
    <div className="actorsList">
      <h2 className="actors__title">Liste des producteurs</h2>
      <div className="actors">
        { (!isLoaded || !isLoaded2) ? ( <div>Chargement...</div> ) : (
          
          movies.map(movie => (
            movie.directors.map(director=>(
              peoples.map(people => (
                (director === people._id )? 
                directorsListDB.push(people) : null
              ))  
            ))
          )),
          directorsList = Array.from(new Set(directorsListDB)),
          directorsList.map(director => (
            <div key={director._id} className="actor__card">
              <Link key={director._id} to={`/directorDetails?id=${director._id}`}>
                <img className="actor__picture" src={director.picture} alt={director.picture}/>
                <span className="actor__name">{director.firstname} {director.lastname}</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}