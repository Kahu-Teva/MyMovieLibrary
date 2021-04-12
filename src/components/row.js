import { React, useState, useEffect } from "react";
import RowDetail from "./rowDetail.js";
import "./../styles/Row.css"

function Row({title,category}){
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
        return (
        <div className="row">
            <div className="row__title__loading"></div>
            <div className="row__posters__loading">
                <div className="row__poster__loading r1"/>
                <div className="row__poster__loading r2"/>
                <div className="row__poster__loading r3"/>
                <div className="row__poster__loading r4"/>
                <div className="row__poster__loading r5"/>
            </div>
        </div>
        );
    }else if(showDetail){
        return (
            <div className="row">
                <h2 className="row__title">{title}</h2>
                <div className="row__posters">
                {
                    movies.map(currentMovie => (
                        currentMovie.genre.includes(category)?(
                        <img
                        key={category+currentMovie._id}
                        className="row__poster"
                        src={currentMovie.posterLink}
                        alt={currentMovie.title}
                        onClick={() => handleShowMovie(currentMovie)}
                        />):null
                    ))
                }
                </div>
                <RowDetail movie={movieDetails}/>
            </div>
        );
    }
    else{
        let printTitle;
        switch(category){
            case ("sf"): printTitle = "Science Fiction"; break;
            case ("drama"): printTitle = "Drames"; break;
            case ("romance"): printTitle = "Romance"; break;
            case ("action"): printTitle = "Action"; break;
            case ("thriller"): printTitle = "Policier"; break;
            case ("adventure"): printTitle = "Aventure"; break;
            case ("fanstasy"): printTitle = "Fantastique"; break;
            default: printTitle = "Liste des films sur MML";
        }
        return (
            <div className="row">
                <h2 className="row__title">{printTitle}</h2>
                <div className="row__posters">
                {
                    (category==="ALL")? (
                        movies.map(currentMovie => (
                            <img
                            key={category+currentMovie._id}
                            className="row__poster"
                            src={currentMovie.posterLink}
                            alt={currentMovie.title}
                            onClick={() => handleShowMovie(currentMovie)}
                            />
                        ))
                    ):(
                    movies.map(currentMovie => (
                        currentMovie.genre.includes(category)?(
                        <img
                        key={category+currentMovie._id}
                        className="row__poster"
                        src={currentMovie.posterLink}
                        alt={currentMovie.title}
                        onClick={() => handleShowMovie(currentMovie)}
                        />):null
                    )))
                }
                </div>
            </div>
        );
    }
        
}
export default Row