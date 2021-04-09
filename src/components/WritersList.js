import React from 'react';
import { useState, useEffect } from 'react';
import "./../styles/ActorList.css"
import { Link } from "react-router-dom";

export default function WriterList(){
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

  let writerListDB = [];
  let writersList = [];
  
  return (
    <div className="actorsList">
      <h2 className="actors__title">Liste des Scénaristes</h2>
      <div className="actors">
        { (!isLoaded && !isLoaded2) ? ( <div>Chargement...</div> ) : (
          
          movies.map(movie => (
            movie.writers.map(writer=>(
              peoples.map(people => (
                (writer == people._id )? 
                writerListDB.push(people) : null
              ))  
            ))
          )),
          writersList = Array.from(new Set(writerListDB)),
          writersList.map(writer => (
            <div className="actor__card">
              <Link key={writer._id} to={`/actorDetails?id=${writer._id}`}>

              <img className="actor__picture" src={writer.picture} alt={writer.firstname + " " + writer.lastname} />
              <span className="actor__name">{writer.firstname} {writer.lastname}</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}