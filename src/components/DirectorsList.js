import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./../styles/PeopleList.css"

export default function DirectorList(){
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [directors, seDirectors] = useState([]);

  // Fetching data
  useEffect(() => {
    fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/directors`)
    .then(res => res.json())
    .then(
      (result) => {
        seDirectors(result);
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);
  
  return (
    <div className="diretors__list">
      <h2 className>Liste des producteurs</h2>
      <div className="peoples">
      { 
        (!isLoaded) ? ( 
          <div className="list__load">
            <div className="people__card r1"/>
            <div className="people__card r2"/>
            <div className="people__card r3"/>
            <div className="people__card r4"/>
            <div className="people__card r5"/>
          </div>
        ) : (   
          directors.map(director => (
            <div key={director._id} className="people__card">
              <Link key={director._id} to={`/directorDetails?id=${director._id}`}>
                <img className="people__picture" src={director.picture} alt={director.picture}/>
                <span className="people__name">{director.firstname} {director.lastname}</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}