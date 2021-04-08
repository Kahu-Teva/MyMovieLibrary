import { React, useState, useEffect } from "react";
import RowDetail from "./rowDetail.js";
import "./../styles/Row.css"

function Row({title}){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movies, setItems] = useState([]);
    const [isDetailLoad, setIsLoadedDetail] = useState(false);
    const [detail, setDetail] = useState([]);

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
    },
    [])

    console.log("Fetching movies OK !");
    
    function handlePoster(currentMovie){
        setDetail(currentMovie);
        setIsLoadedDetail(true);
    }

    if(error) {
        return <div>Erreur : {error.message}</div>;
    }else if(!isLoaded) {
        return <div>Chargement...</div>;
    }else if(!isDetailLoad){
        return (
            <div className="row">
                <h2 className="row__title">{title}</h2>
                <div className="row__posters">
                    {
                        movies.map(currentMovie => (
                            <img
                            key={currentMovie._id}
                            className="row__poster"
                            src={currentMovie.posterLink}
                            alt={currentMovie.title}
                            onClick={() => handlePoster(currentMovie)}
                            />
                            ))
                        }
                </div>
            </div>
        );
    }else{
        return (
            <div>

                <div className="row">
                    <h2 className="row__title">{title}</h2>
                    <div className="row__posters">
                        {
                            movies.map(currentMovie => (
                                <img
                                key={currentMovie._id}
                                className="row__poster"
                                src={currentMovie.posterLink}
                                alt={currentMovie.title}
                                onClick={() => handlePoster(currentMovie)}
                                />
                                ))
                            }
                    </div>
                </div>
                <RowDetail info={detail}/>
            </div>
        );
    }
}
export default Row