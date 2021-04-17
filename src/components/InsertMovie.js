import { React, useState, useRef } from 'react';
import { Redirect} from "react-router-dom";
// import "./../styles/Authentification.css"
import "./../styles/MovieDetails.css"

export default function InsertMovie() {

    const [error, setError] = useState(null);
    const [request, setRequest] = useState(false);
    const [cancel, setCancel] = useState(false);


    
    let title = useRef(null);
    let synopsis = useRef(null);
    let releaseDate = useRef(null);
    let duration = useRef(null);
    let posterLink = useRef(null);
    let trailerLink = useRef(null);

    function postForm(){
        let isOK = true; 
        if(isOK){

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                body: new URLSearchParams({
                    "title":title.value,
                    "synopsis":synopsis.value,
                    "genre":"[]",
                    "duration":duration.value,
                    "posterLink":posterLink.value,
                    "trailerLink":trailerLink.value,
                    "releaseDate":releaseDate.value,
                    "directors":"[]",
                    "writers":"[]",
                    "actors":"[]",
                    "rate":"[]"
                })
            }

            fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/insertMovie`, requestOptions)
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

    if(request || cancel){
        return(
            <div>
                <Redirect to="/"/>;
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
        
    }else{
        return (
            <div className="moviedetails">
                <form>
                    <div className="moviedetails__infos">
                        <h2>Title</h2>
                        <input
                            id="movieTitle"
                            type="text"
                            ref={val => title = val}
                            className="updatemovie__synopsis"
                        />

                        <div className="moviedetails__synopsis">
                            <h2>Synopsis</h2>
                            <textarea 
                                type="text"
                                cols="50"
                                wrap="hard"
                                ref={val => synopsis = val}
                                >
                                
                            </textarea>
                        </div>
                        
                        <h2>RealeaseDate</h2>
                        <input
                            type="number"
                            ref={val => releaseDate = val}
                        />                  
                        
                        <div className="moviedetails__duration__genre">
                            <h2>Duration</h2>
                            <input
                                type="number"
                                ref={val => duration = val}
                            />
                        </div>

                        <h2>Poster link</h2>
                        <input
                            type="url"
                            ref={val => posterLink = val}
                        />

                        <h2>Trailer link</h2>
                        <input
                            type="url"
                            ref={val => trailerLink = val}
                        />

                        <h2>Choose genre(s):</h2>
                        {/* {movie.genre.map(genre =>
                            <div key={genre}>{genre}</div>    
                        )} */}
                    </div>
                </form>
				<button onClick={postForm} className="boutton__update">Add</button>
				<button onClick={setCancel} className="boutton__update">Cancel</button>
            </div>
        );
    }
}