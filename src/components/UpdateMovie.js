import { React, useState, useEffect, useRef } from 'react';
import { useLocation, Redirect} from "react-router-dom";
import "./../styles/MovieDetails.css"

export default function UpdateMovie() {

    let query = new URLSearchParams(useLocation().search);
    const [error, setError] = useState(null);
    const [request, setRequest] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [movie, setMovie] = useState([]);

    
    let title = useRef(null);
    let synopsis = useRef(null);
    let releaseDate = useRef(null);
    let duration = useRef(null);
    let posterLink = useRef(null);
    let trailerLink = useRef(null);

    function postForm(){
        console.log("genre: ", movie.genre);
        let isOK = true; 
        if(isOK){
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({
                    "id":movie._id,
                    "title":title.value,
                    "synopsis":synopsis.value,
                    "genre":movie.genre,
                    "duration":duration.value,
                    "posterLink":posterLink.value,
                    "trailerLink":trailerLink.value,
                    "releaseDate":releaseDate.value,
                    "directors":movie.directors,
                    "writers":movie.writers,
                    "actors":movie.actors,
                    "rate":movie.rate
                })
            }

            fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/updateMovie`, requestOptions)
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
                    console.log(result);
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
    }, []);

    if(request || cancel){
        return(
            <div>
                <Redirect to={`/movieDetails?id=${movie._id}`}/>;
            </div>
        )
    }
    else if(error) {
        switch(error.error){
            case "DATABASE_ERROR_UPDATE_MOVIE":{
                return (<div className="error__page">
                    <div className="error__page__title">We apologize for this interruption</div>
                    <div className="error__page__info">
                        <div className="error__page__info__text">Sorry we could not reach the MyMovieLibrary service. Please try again later.</div>
                        <div className="error__page__info__error__code">Error code: {error.error}</div>
                    </div>
                </div>);
            }
            default:
                return (<div>
                    Error : {error.error}
                </div>);
        }
        
    }else if (!isLoaded1) {
        return <div className="movie__load"/>;
    }else {
        return (
            <div className="moviedetails">
                <form>
                    <div className="moviedetails__infos">
                        <h2>Title</h2>
                        <input
                            id="movieTitle"
                            type="text"
                            ref={val => title = val}
                            defaultValue={movie.title}
                            className="updatemovie__synopsis"
                        />

                        <div className="moviedetails__synopsis">
                            <h2>Synopsis</h2>
                            <textarea 
                                type="text"
                                cols="50"
                                wrap="hard"
                                ref={val => synopsis = val}
                                defaultValue={movie.synopsis}
                                >
                                
                            </textarea>
                        </div>
                        
                        <h2>RealeaseDate</h2>
                        <input
                            type="number"
                            ref={val => releaseDate = val}
                            defaultValue={movie.releaseDate}
                        />                  
                        
                        <div className="moviedetails__duration__genre">
                            <h2>Duration</h2>
                            <input
                                type="number"
                                ref={val => duration = val}
                                defaultValue={movie.duration}
                            />
                        </div>

                        <h2>Poster link</h2>
                        <input
                            type="url"
                            ref={val => posterLink = val}
                            defaultValue={movie.posterLink}
                        />

                        <h2>Trailer link</h2>
                        <input
                            type="url"
                            ref={val => trailerLink = val}
                            defaultValue={movie.trailerLink}
                        />

                        <h2>Choose genre(s):</h2>
                        {movie.genre.map(genre =>
                            <div key={genre}>{genre}</div>    
                        )}
                    </div>
                </form>
				<button onClick={postForm} className="boutton__update">Update</button>
				<button onClick={setCancel} className="boutton__update">Cancel</button>
            </div>
        );
    }
}