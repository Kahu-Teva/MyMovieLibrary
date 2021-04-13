import { React, useState, useEffect } from 'react';
import "./../styles/PeopleList.css"
import { Link } from "react-router-dom";

function ActorsList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/actors`)
    .then(res => res.json())
    .then(
      (result) => {
        setActors(result);
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);
  
  return (
    <div className="actors__list">
      <h2>Liste des acteurs</h2>
      <div className="peoples">
        { (!isLoaded) ? ( 
          <div className="list__load">
            <div className="people__card r1"/>
            <div className="people__card r2"/>
            <div className="people__card r3"/>
            <div className="people__card r4"/>
            <div className="people__card r5"/>
          </div>
         ) : (
          actors.map(actor => (
            <div key={actor._id} className="people__card">
              <Link key={actor._id} to={`/actorDetails?id=${actor._id}`}>
                <img className="people__picture" src={actor.picture} alt={actor.picture}/>
                <span className="people__name">{actor.firstname} {actor.lastname}</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ActorsList;