import { React, useState, useEffect } from "react";
// import { useLocation, Link  } from "react-router-dom";
import RowDetail from "./rowDetail.js";
import "./../styles/Row.css"

function Row({title}){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showDetail, setIsLoadedDetail] = useState(false);
    const [movies, setItems] = useState([]);
    const [movieDetails, setDetails] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_API + "/movies")
        .then(res => res.json())
        .then(
            (result) => {
            console.log("Result : ", result);
            setIsLoaded(true);
            setItems(result);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    },
    [])

    function handleShowMovie(currentMovie){
        setDetails(currentMovie);
        setIsLoadedDetail(true);
    }

    if(error) {
        return <div>Erreur : {error.message}</div>;
    }else if(!isLoaded) {
        return <div>Chargement...</div>;
    }else if(showDetail){
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
                        onClick={() => handleShowMovie(currentMovie)}
                        />
                    ))
                }
                </div>
                <RowDetail movie={movieDetails}/>
            </div>
        );
    }
    else{
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
                        onClick={() => handleShowMovie(currentMovie)}
                        />
                    ))
                }
                </div>
            </div>
        );
    }
        
}
export default Row