import { React, useState, useEffect } from "react";
import "./../styles/Row.css"

function Row({title}){
    const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setItems] = useState([]);

  // Fetching data
  console.log(`"Fetching data from ${process.env.REACT_APP_SERVER_API}...`);
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_API + "/movies")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Result : ", result);
          setIsLoaded(true);
          setItems(result);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  console.log("Fetching movies OK !");

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <img
                            key={movie._id}
                            className="row__poster"
                            src={movie.posterLink}
                            alt={movie.title}
                        />
                    ))
                }
            </div>
        </div>
    );
  }
}

export default Row