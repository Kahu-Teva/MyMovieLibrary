import {React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./../styles/PeopleList.css"

export default function WriterList(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [writers, setWriters] = useState([]);

  // Fetching data
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/writers`)
    .then(res => res.json())
    .then(
      (result) => {
        setWriters(result);
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
      <h2>Liste des scénaristes</h2>
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
          writers.map(writer => (
            <div key={writer._id} className="people__card">
              <Link to={`/writerDetails?id=${writer._id}`}>
              <img className="people__picture" src={writer.picture} alt={writer.firstname + " " + writer.lastname} />
              <span className="people__name">{writer.firstname} {writer.lastname}</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}