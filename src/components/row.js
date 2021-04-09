import { React, useState, useEffect } from "react";
// import { useLocation, Link  } from "react-router-dom";
import RowDetail from "./rowDetail.js";
import "./../styles/Row.css"

function Row({title}){
    // let query = new URLSearchParams(useLocation().search);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showDetail, setIsLoadedDetail] = useState(false);
    const [movies, setItems] = useState([]);
    const [detail, setDetail] = useState([]);

    // Fetching data
    console.log(`"Fetching data from ${process.env.REACT_APP_SERVER_API}...`);
    useEffect(() => {
        // let actorId = query.get("id");

        // console.log('Query : ', query);
        // console.log(`Actor ID : ${actorId}`);
        // console.log(`Fetching actor details from ${process.env.REACT_APP_SERVER_API}...`);


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
    
    function handleShowMovie(currentMovie){
        setDetail(currentMovie);
        setIsLoadedDetail(true);
    }

    if(error) {
        return <div>Erreur : {error.message}</div>;
    }else if(!isLoaded) {
        return <div>Chargement...</div>;
    }else if(showDetail){
        console.log("HAAAAAAAAAAAAAAAAAAA ",movies);
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
                <RowDetail info={detail}/>
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