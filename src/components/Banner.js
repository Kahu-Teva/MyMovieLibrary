import { React, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./../styles/Banner.css"

function truncate(str, n){
    return str?.length > n ? str.substr(0, n - 1) + "..." :str;
}

export default function Banner() {
  // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/randomMovie`)
        .then(res => res.json())
        .then(
            (result) => {
                setMovie(result);
                setIsLoaded(true);
            },
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
        )
    },
    [])

    if(!isLoaded){
        return(<header>
            <div className="banner">
                <div className="banner__contents">
                    <h1 className="banner__title">{movie.title}</h1>
                    <p className="banner__description">
                        {truncate(movie.synopsis,150)}
                    </p>
                    <div className="banner__buttons">                    
                    <div className="banner__button button_play">
                        <div className="banner__button_ico"/>
                        <span>Play</span>
                    </div>  
                    <div className="banner__button button_more_info">
                        <div className="banner__button_ico"/>
                        <span>More infos</span>
                    </div>                
                    </div>
                </div>
                <div className="banner__fadeBottom"></div>
            
            </div>
        </header>)
    }
    else{
        return (
            <header>
                <div className="banner"
                    style={{
                        backgroundSize:`cover`,
                        backgroundImage: `url(`+movie.posterLink+`)`,
                        backgroundPosition:`center center`
                    }}
                >
                    <div className="banner__contents">
                        <h1 className="banner__title">{movie.title}</h1>
                        <p className="banner__description">
                            {truncate(movie.synopsis,150)}
                        </p>
                        <div className="banner__buttons">                    
                        <Link to={`/movieDetails?id=${movie._id}`} className="banner__button button_play">
                            <div className="banner__button_ico"/>
                            <span>Play</span>
                        </Link>  
                        <Link to={`/movieDetails?id=${movie._id}`} className="banner__button button_more_info">
                            <div className="banner__button_ico"/>
                            <span>More infos</span>
                        </Link>                
                        </div>
                    </div>
                    <div className="banner__fadeBottom"></div>
                
                </div>
            </header>
        )
    }
}