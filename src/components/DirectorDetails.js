import { React, useState, useEffect } from 'react';
import { useLocation, Link} from "react-router-dom";
//import './ActorDetails.css';

function truncate(str, startTo, stopTo){
  return str?.slice(startTo, stopTo);
}

function ActorDetails() {
  let query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [director, setDirector] = useState([]);

  // Fetching data
  useEffect(() => {
    let directorId = query.get("id");
    fetch(`${process.env.REACT_APP_SERVER_API}/peoples?_id=${directorId}`)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setDirector(result[0]);
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
    let birtdate = director.birthDate;
    return (
      <div>
        <Link to="/directors" >
          <div className="">back</div>
        </Link>
        <h3>Détail du producteur</h3>
        <div>
          <p>Nom : {director.lastname}</p>
          <p>Prénom : {director.firstname}</p>

          <p>Date de naissance : {truncate(birtdate,4,6)}/{truncate(birtdate,6,8)}/{truncate(birtdate,0,4)}</p>
          {(director.deathDay === "")? (
            <p>Date de décès : {truncate(director.deathDay,7,8)}/{truncate(director.deathDay,5,6)}/{truncate(director.deathDay,1,4)}</p>
          ) : null}
          <p>Biographie: {director.biography}</p>
        </div>
      </div>
    );
  }
}

export default ActorDetails;