import { React, useState, useEffect } from 'react';
import { useLocation, Link} from "react-router-dom";
//import './ActorDetails.css';

function ActorDetails() {
  let query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [writer, setWriter] = useState([]);

  // Fetching data
  useEffect(() => {
    let actorId = query.get("id");

    // console.log('Query : ', query);
    // console.log(`Actor ID : ${actorId}`);
    // console.log(`Fetching actor details from ${process.env.REACT_APP_SERVER_API}...`);

    fetch(`${process.env.REACT_APP_SERVER_API}/peoples?_id=${actorId}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Result : ", result);
          setIsLoaded(true);
          setWriter(result[0]);
          // console.log("Writer : ", writer);
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
      <div>
        <Link to="/writers" >
          <div className="">back</div>
        </Link>
        <h3>Détail de lu scénariste.</h3>
        <div>
          <p>ID : {writer._id}</p>
          <p>Nom : {writer.lastname}</p>
          <p>Prénom : {writer.firstname}</p>
        </div>
      </div>
    );
  }
}

export default ActorDetails;