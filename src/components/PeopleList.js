import { React, useState, useEffect } from 'react';
import "./../styles/PeopleList.css"
import { Link } from "react-router-dom";

export default function PeopleList() {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [peoples, setPeoples] = useState([]);
    
  useEffect(() => {
    fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/peoples`)
    .then(res => res.json())
    .then(
      (result) => {
        setPeoples(result);
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);
  
  return (
    <div className="people__list">
      <h2>Liste des personnes</h2>
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
            peoples.map(actor => (
              <div key={actor._id} className="people__card">
                <Link key={actor._id} to={`/peopleDetails?id=${actor._id}`}>
                  <img className="people__picture" src={actor.picture} alt={actor.picture}/>
                  <span className="people__name">{actor.firstname} {actor.lastname}</span>
                </Link>
              </div>)
            ,
            
          )
        )}
      </div>
      <Link to="/insertPeople" className="banner__button button_more_info">
        <div className="banner__button_ico"/>
        <span>New People</span>
      </Link>
    </div>
  );
}