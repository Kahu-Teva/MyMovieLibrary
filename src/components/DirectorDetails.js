import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import moment from 'moment'
import './../styles/PeopleDetails.css';

function ActorDetails() {
  let query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [director, setDirector] = useState([]);

  // Fetching data
  useEffect(() => {
    let directorId = query.get("id");
    fetch(`${process.env.REACT_APP_SERVER_API}/directors/${directorId}`)
    .then(res => res.json())
    .then(
      (result) => {
        setDirector(result[0]);
        setIsLoaded(true);
      },
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      (error) => {
        setError(error);
        setIsLoaded(true);
      }
    )
  })

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="people__load"/>;
  } else {    
    let birthdate = director.birthDate;
    let name = director.lastname.toUpperCase() + " " + director.firstname;
    return (
      <div className="peopledetails">
        <img className="peopledetails__poster" src={director.picture} alt={name}/>        
        <div className="peopledetails__infos">
          <h1>{name}</h1>
          <h3>(Détails du producteur)</h3>

          <p>Date de naissance : {moment(birthdate).format("DD/MM/YYYY")}</p>
          {(director.deathDay === "")? (
            <p>Date de décès : {moment(director.deathDay).format("DD/MM/YYYY")}</p>
          ) : null}
          <p className="peopledetails__biography">Biographie: {director.biography}</p>
        </div>
      </div>
    );
  }
}

export default ActorDetails;