import { React, useState, useEffect } from 'react';
import { useLocation, Link} from "react-router-dom";
import "./../styles/MovieDetails.css"

export default function MovieDetails() {
    let query = new URLSearchParams(useLocation().search);
    const [error, setError] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [movie, setMovie] = useState([]);
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
        let movieId = query.get("id");
        fetch(`${process.env.REACT_APP_SERVER_API}/movies?_id=${movieId}`)
        .then(res => res.json())
        .then(
            (result) => {
                setMovie(result[0]);
                setIsLoaded1(true);
            },
            (error) => {
                setIsLoaded1(true);
                setError(error);
            }
        )
        fetch(`${process.env.REACT_APP_SERVER_API}/peoples`)
        .then(res => res.json())
        .then(result => {
                setPeoples(result);
                setIsLoaded2(true);
            },
            (error) => {
                setIsLoaded2(true);
                setError(error);
            }
        )
    }, []);

    if(error) {
        return <div>Erreur : {error.message}</div>;
    }else if (!isLoaded1 || !isLoaded2) {
        return <div>Chargement...</div>;
    }else {
        
        return (
            <div>
                <Link to="/" >
                    <div className="">back</div>
                </Link>
                <img src={movie.posterLink} className="linkPosterMovie" alt={movie.title}/>
                <h3>{movie.title} ({movie.releaseDate}) </h3>
               
                <p>
                    Duration: {movie.duration} min
                </p>
                <p>Synopsis: {movie.synopsis}</p>
                <p>Genre: 
                    {movie.genre.map(res => res + "|")}
                </p>

                <p>Directors:
                    <ul>
                    {movie.directors.map(directorID =>
                        (
                            peoples.map(people =>(
                                (people._id===directorID)?(<li key={"director"+people._id}> {people.firstname} {people.lastname} </li>):null
                            ))
                        )
                    )}
                    </ul>
                </p>

                <p>Writers:
                    <ul>
                    {movie.writers.map(writerID =>
                        (
                            peoples.map(people =>(
                                (people._id===writerID)?(<li key={"writer"+people._id}> {people.firstname} {people.lastname} </li>):null
                            ))
                        )
                    )}
                    </ul>
                </p>

                <p>Actors:
                    <ul>
                    {movie.actors.map(actor =>
                        (
                            peoples.map(people =>(
                                (people._id===actor._id)?(<li key={"actor"+people._id}> {people.firstname} {people.lastname} </li>):null
                            ))
                        )
                    )}
                    </ul>
                </p>
            </div>
        );
    }
}