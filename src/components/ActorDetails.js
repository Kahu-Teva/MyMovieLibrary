import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
//import './ActorDetails.css';

function ActorDetails(props) {
  let query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [actor, setActor] = useState([]);

  // Fetching data
  useEffect(() => {
    let actorId = query.get("id");

    console.log('Query : ', query);
    console.log(`Actor ID : ${actorId}`);
    console.log(`Fetching actor details from ${process.env.REACT_APP_SERVER_API}...`);

    fetch(`https://my-json-server.typicode.com/fchapman97/MyMovieLibrary/peoples?_id=${actorId}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Result : ", result);
          setIsLoaded(true);
          setActor(result[0]);
          console.log("Actor : ", actor);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  })

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    
    return (
      <React.Fragment>
        <h3>Détail de l'acteur</h3>
        <div>
          <p>ID : {actor._id}</p>
          <p>Nom : {actor.lastname}</p>
          <p>Prénom : {actor.firstname}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default ActorDetails;