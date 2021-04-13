import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import moment from 'moment'
import './../styles/PeopleDetails.css';

function WriterDetails() {
  let query = new URLSearchParams(useLocation().search);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [writer, setWriter] = useState([]);

  // Fetching data
  useEffect(() => {
    let writerId = query.get("id");
    fetch(`${process.env.REACT_APP_SERVER_API}/writerDetails?id=${writerId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setWriter(result[0]);
          setIsLoaded(true);
        },(error) => {
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
    let birthdate = writer.birthDate;
    let name = writer.lastname.toUpperCase() + " " + writer.firstname;
    return (
      <div className="peopledetails">
        <img className="peopledetails__poster" src={writer.picture} alt={name}/>        
        <div className="peopledetails__infos">
          <h1>{name}</h1>

          <p>Born : {moment(birthdate).format("LL")}</p>
          {(writer.deathDay === "")? (
            <p>Date de décès : {moment(writer.deathDay).format("LL")}</p>
          ) : null}
          <p className="peopledetails__biography">Biography: {writer.biography}</p>
        </div>
      </div>
    );
  }
}

export default WriterDetails;