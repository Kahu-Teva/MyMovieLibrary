import { React, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./../styles/Banner.css"

function truncate(str, n){
    return str?.length > n ? str.substr(0, n - 1) + "..." :str;
}

function Banner() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [movies, setMovies] = useState([]);
    const [idMovie, setIdMovie] = useState(null);
    const [titleMovie, setTitleMovie] = useState('');
    const [description, setDescription] = useState('');
    const [bgBanner, setBgBanner] = useState('');

    // Fetching data
    console.log(`"Fetching data from ${process.env.REACT_APP_SERVER_API}...`);
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
                            <button className="banner__button button_play">
                                <div className="banner__button_ico"/>
                                <span>Lecture</span>
                            </button>
                            <button className="banner__button button_more_info">
                                <div className="banner__button_ico"/>
                                <span>Plus d'infos</span>
                            </button>                
                        </div>
                    </div>
                    <div className="banner__fadeBottom"></div>
                
                </div>
            </header>
        )
    }
    else{
        getRandomMovie(movies);
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
                            <button className="banner__button button_play">
                                <div className="banner__button_ico"/>
                                <span>Lecture</span>
                            </button>
                            <button className="banner__button button_more_info">
                                <Link key={idMovie} to={`/writerDetails?id=${idMovie}`}></Link>
                                <div className="banner__button_ico"/>
                                <span>Plus d'infos</span>
                            </button>                
                        </div>
                    </div>
                    <div className="banner__fadeBottom"></div>
                
                </div>
            </header>
        )
    }
}

export default Banner