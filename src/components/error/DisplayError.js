import { React } from 'react';
import "./DisplayError.css"


export default function DisplayError({errorCode}) {
    let errorInfo = null;
    switch(errorCode){
        case "DATABASE_ERROR_UPDATE_PEOPLE":{
            errorInfo ="Sorry we could not reach the MyMovieLibrary service. Please try again later.";
            break;
        }
        case "DATABASE_ERROR_UPDATE_MOVIE":{
            errorInfo ="Sorry we could not reach the MyMovieLibrary service. Please try again later.";
            break;
        }
        case "DATABASE_ERROR_PEOPLE_NOT_FOUND":{
            errorInfo ="Sorry we could not reach the MyMovieLibrary service. Please try again later.";
            break;
        }
        case "DATABASE_ERROR_MOVIE_NOT_FOUND":{
            errorInfo ="This title is currently not available in your country. A wide choice of programs awaits you on the home page.";
            break;
        }
        default:{
            errorInfo ="Sorry we could not reach the MyMovieLibrary service. Please try again later.";
            break
        }
    }

    return (
        <div className="error__page">
            <div className="error__page__title">We apologize for this interruption</div>
            <div className="error__page__info">
                <div className="error__page__info__text">{errorInfo}</div>
                <div className="error__page__info__error__code">Error code: {errorCode}</div>
            </div>
        </div>
    );
    
}