import { React, useState, useEffect } from 'react';
import { useLocation} from "react-router-dom";
import moment from 'moment'
import './../styles/PeopleDetails.css';

function ActorDetails() {
  let query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [actor, setActor] = useState([]);

  // Fetching data
  useEffect(() => {
    let actorId = query.get("id");
    fetch(`${process.env.REACT_APP_SERVER_API}/peoples?_id=${actorId}`)
    .then(res => res.json())
    .then(
      (result) => {
        setActor(result[0]);
        setIsLoaded(true);
      },
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
    let birthdate = actor.birthDate;
    let name = actor.lastname.toUpperCase() + " " + actor.firstname;
    return (
      <div className="peopledetails">
        <img className="peopledetails__poster" src={actor.picture} alt={name}/>        
        <div className="peopledetails__infos">
          <h1>{name}</h1>
          <h3>(Détails de l'acteur)</h3>

          <p>Date de naissance : {moment(birthdate).format("DD/MM/YYYY")}</p>
          {(actor.deathDay === "")? (
            <p>Date de décès : {moment(actor.deathDay).format("DD/MM/YYYY")}</p>
          ) : null}
          <p className="peopledetails__biography">Biographie: {actor.biography}</p>
        </div>
      </div>
    );
  }
}

export default ActorDetails;