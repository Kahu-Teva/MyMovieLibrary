import { React, useState, useEffect } from 'react';
import { useLocation, Link} from "react-router-dom";
import "./../styles/MovieDetails.css"


export default function MovieDetails() {
    let query = new URLSearchParams(useLocation().search);
  // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [movie, setMovie] = useState([]);
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
        let movieId = query.get("id");
        fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/movieDetails?id=${movieId}`)
        .then(res => res.json())
        .then(
            (result) => {
                if(!result.error){
                    setMovie(result);
                    setIsLoaded1(true);
                }
                else{
                    setError(result);
                }
            },
            (error) => {
                setIsLoaded1(true);
                setError(error);
            }
        )
        /* fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/peoples`)
        .then(res => res.json())
        .then(result => {
                setPeoples(result);
                setIsLoaded2(true);
            },
            (error) => {
                setIsLoaded2(true);
                setError(error);
            }
        ) */
    }, []);
    /* let directors = [];
    let writers = [];
    let actors = []; */
    if(error) {
        switch(error.error){
            case "ERROR_MOVIE_NOT_FOUND":{
                return (<div className="error__page">
                    <div className="error__page__title">We apologize for this interruption</div>
                    <div className="error__page__info">
                        <div className="error__page__info__text">This title is currently not available in your country. A wide choice of programs awaits you on the home page.</div>
                        <div className="error__page__info__error__code">Error code: {error.error}</div>
                    </div>
                </div>);
            }
            default:
                return (<div>
                    Error : {error.error}
                </div>);
        }
        
    }else if (!isLoaded1 /* || !isLoaded2 */) {
        return <div className="movie__load"/>;
    }else {
        /* let nbDirectors;
        let nbWriters;
        let nbActors;

        movie.directors.map(directorID => (
            peoples.map((people) =>(
                (people._id===directorID)?(
                    nbDirectors = directors.push(people)
                ):null
            ))
        ))

        movie.writers.map(writerID => (
            peoples.map((people) =>(
                (people._id===writerID)?(
                    nbWriters = writers.push(people)
                ):null
            ))
        ))

        movie.actors.map(actor => (
            peoples.map((people) =>(
                (people._id===actor._id)?(
                    nbActors = actors.push(people)
                ):null
            ))
        )) */
        return (
            <div className="moviedetails">
                <img className="moviedetails__poster" src={movie.posterLink} alt={movie.title}/>            
                <div className="moviedetails__infos">
                    <h1>
                        {movie.title} ({movie.releaseDate})
                    </h1>
                    
                    <p className="moviedetails__duration__genre">
                    {movie.duration} min | {/* {movie.genre.map((currentGenre,index) => (
                        (index+1===movie.genre.length)? " "+currentGenre.toUpperCase() : " "+currentGenre.toUpperCase() + ", "
                    ))} */}
                    </p>

                    <p className="moviedetails__synopsis">
                        {movie.synopsis}
                    </p>
                    
                   {/*  <p>
                        <h3>
                            Director:
                        </h3>
                        {
                            directors.map((director,index) => (
                                (index+1 === nbDirectors)? (
                                    <Link key={director._id} to={`/directorDetails?id=${director._id}`}>
                                        {" "+director.firstname} {director.lastname.toUpperCase()}.
                                    </Link>
                                    ) : (
                                        <Link key={director._id} to={`/directorDetails?id=${director._id}`}>
                                        {" "+director.firstname} {director.lastname.toUpperCase()},
                                    </Link>
                                )
                            ))
                        }
                    </p>

                    <p>
                        <h3>
                            Writers:
                        </h3>
                        {
                            writers.map((writer,index) => (
                                (index+1 === nbWriters)? (
                                    <Link key={writer._id} to={`/writerDetails?id=${writer._id}`}>
                                        {" "+writer.firstname} {writer.lastname.toUpperCase()}.
                                    </Link>
                                    ) : (
                                        <Link key={writer._id} to={`/writerDetails?id=${writer._id}`}>
                                        {" "+writer.firstname} {writer.lastname.toUpperCase()},
                                    </Link>
                                )
                                ))
                        }
                    </p>
                    
                    <p>
                        <h3>
                            Actors:
                        </h3>
                        {
                            actors.map((actor,index) => (
                            (index+1 === nbActors)? (
                                    <Link key={actor._id} to={`/actorDetails?id=${actor._id}`}>
                                        {" "+actor.firstname} {actor.lastname.toUpperCase()}.
                                    </Link>
                                    ) : (
                                    <Link key={actor._id} to={`/actorDetails?id=${actor._id}`}>
                                        {" "+actor.firstname} {actor.lastname.toUpperCase()},
                                    </Link>
                                )
                            ))
                        }
                    </p> */}
                </div>
            </div>
        );
    }
}