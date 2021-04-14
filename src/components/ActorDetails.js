import { React, useState, useEffect } from 'react';
import { useLocation} from "react-router-dom";
import moment from 'moment'
import './../styles/PeopleDetails.css';

function ActorDetails() {
  let query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [actor, setActor] = useState([]);

  useEffect(() => {
    let actorId = query.get("id");
    fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/actorDetails?id=${actorId}`)
    .then(res => res.json())
    .then(
      (result) => {
        setActor(result[0]);
        setIsLoaded(true);
      },
      (error) => {
        console.log("error: ", error);
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

          <p>Born : {moment(birthdate).format("LL")}</p>
          {(actor.deathDay === "")? (
            <p>Date de décès : {moment(actor.deathDay).format("LL")}</p>
          ) : null}
          <p className="peopledetails__biography">Biography: {actor.biography}</p>
        </div>
      </div>
    );
  }
}

export default ActorDetails;