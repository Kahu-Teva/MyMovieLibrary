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

    const [movies, setMovies] = useState([]);
    const [idMovieG, setIdMovie] = useState(null);
    const [titleMovie, setTitleMovie] = useState('');
    const [description, setDescription] = useState('');
    const [bgBanner, setBgBanner] = useState('');

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_API + "/movies")
        .then(res => res.json())
        .then(
            (result) => {
                setMovies(result);
                setIsLoaded(true);
            },
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
        )
    },
    [])

    function getRandomMovie(tabMovies){
        const idMovie = Math.floor(Math.random() * tabMovies.length);
        setIdMovie(tabMovies[idMovie]._id);
        setTitleMovie(tabMovies[idMovie].title);
        setDescription(truncate(tabMovies[idMovie].synopsis));
        setBgBanner(tabMovies[idMovie].posterLink);
    }

    if(!isLoaded){
        return (
            <header>
                <div className="banner"
                    style={{
                        backgroundSize:`cover`,
                        backgroundImage: `url(`+bgBanner+`)`,
                        backgroundPosition:`center center`
                    }}
                >
                    <div className="banner__contents">
                        <h1 className="banner__title">{titleMovie}</h1>
                        <p className="banner__description">
                            {truncate(description,150)}
                        </p>
                        <div className="banner__buttons">                    
                        <Link to={`/movieDetails?id=${idMovieG}`} className="banner__button button_play">
                            <div className="banner__button_ico"/>
                            <span>Play</span>
                        </Link>  
                        <Link to={`/movieDetails?id=${idMovieG}`} className="banner__button button_more_info">
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
    else{
        getRandomMovie(movies);
        setIsLoaded(false);
        return (
            <header>
                <div className="banner"
                    style={{
                        backgroundSize:`cover`,
                        backgroundImage: `url(`+bgBanner+`)`,
                        backgroundPosition:`center center`
                    }}
                >
    
                    <div className="banner__contents">
                        <h1 className="banner__title">{titleMovie}</h1>
                        <p className="banner__description">
                            {truncate(description,150)}
                        </p>
                        <div className="banner__buttons">                    
                            <Link to={`/movieDetails?id=${idMovieG}`} className="banner__button button_play">
                                <div className="banner__button_ico"/>
                                <span>Play</span>
                            </Link>  
                            <Link to={`/movieDetails?id=${idMovieG}`} className="banner__button button_more_info">
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