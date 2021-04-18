import { React, useState, useEffect , useMemo } from 'react';
import { useLocation, Link , Redirect } from "react-router-dom";
import DisplayError from './error/DisplayError.js';
import "./../styles/MovieDetails.css"


export default function MovieDetails() {
    const location = useLocation().search;
    let query = useMemo(() => new URLSearchParams(location), [location]) 
    const [error, setError] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [request, setRequest] = useState(false);
    const [movie, setMovie] = useState([]);
    /* const [peoples, setPeoples] = useState([]);
    const [isLoaded2, setIsLoaded2] = useState(false); */

    function deleteMovie(){
        if(window.confirm("Do you really want to delete this movie ?")){
            let movieId = query.get("id");
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                body: new URLSearchParams({
                    "id":movieId
                })
            }

            fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/deleteMovie`, requestOptions)
            .then(res => res.json())
            .then(result => {
                if(!result.error){
                    setRequest(result);
                }
                else{
                    setError(result);
                }
            });
        }
    }


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
    }, [query]);
    /* let directors = [];
    let writers = [];
    let actors = []; */
    if(request){
        return(
        <div>
            <Redirect to="/"/>;
        </div>)
    }
    else if(error) {
        return(
        <div className="Error">
            <DisplayError errorCode={error.error}/>
        </div>)     
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

                    <Link to={`/updateMovie?id=${movie._id}`} className="boutton__update">Update movie</Link>
				    <div onClick={deleteMovie} className="boutton__update">DELETE</div>

                                     
                </div>
            </div>
        );
    }
}