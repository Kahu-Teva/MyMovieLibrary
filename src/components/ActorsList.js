import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./../styles/ActorList.css"

function ActorsList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [actors, setActors] = useState([]);

  // Fetching data
  console.log(`"Fetching people from ${process.env.REACT_APP_SERVER_API}...`);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/peoples`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Result : ", result);
          setIsLoaded(true);
          setActors(result);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  console.log("Fetching people OK !");

  return (
    <div className="actorsList">
      <h2 className="actors__title">Liste des acteurs</h2>
      <div className="actors">
        { !isLoaded ? ( <div>Chargement...</div> ) : ( 
          actors.map(actor => (
            <div id={actor._id} className="actor">
              <Link to={`/actorDetails?id=${actor._id}`}>
                <span>{actor._id} {actor.lastname} {actor.firstname}</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ActorsList;