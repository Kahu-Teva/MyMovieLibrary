import { React, useState, useEffect } from 'react';
import { useLocation, Link} from "react-router-dom";

function truncate(str, startTo, stopTo){
  return str?.slice(startTo, stopTo);
}

function ActorDetails() {
  let query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [writer, setWriter] = useState([]);

  // Fetching data
  useEffect(() => {
    let actorId = query.get("id");
    fetch(`${process.env.REACT_APP_SERVER_API}/peoples?_id=${actorId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setWriter(result[0]);
        },(error) => {
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
    let birtdate = writer.birthDate;
    return (
      <div>
        <Link to="/writers" >
          <div className="">back</div>
        </Link>
        <h3>Détail du scénariste</h3>
        <div>
          <p>Nom : {writer.lastname}</p>
          <p>Prénom : {writer.firstname}</p>

          <p>Date de naissance : {truncate(birtdate,4,6)}/{truncate(birtdate,6,8)}/{truncate(birtdate,0,4)}</p>
          {(writer.deathDay === "")? (
            <p>Date de décès : {truncate(writer.deathDay,7,8)}/{truncate(writer.deathDay,5,6)}/{truncate(writer.deathDay,1,4)}</p>
          ) : null}
          <p>Biographie: {writer.biography}</p>
        </div>
      </div>
    );
  }
}

export default ActorDetails;