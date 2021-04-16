import { React, useState, useRef } from 'react';
import { Redirect} from "react-router-dom";
import "./../styles/MovieDetails.css"

export default function InsertPeople() {

    const [error, setError] = useState(null);
    const [request, setRequest] = useState(false);
    const [cancel, setCancel] = useState(false);

    
    let lastname = useRef(null);
    let firstname = useRef(null);
    let biography = useRef(null);
    let birthDate = useRef(null);
    let deathDate = useRef(null);
    let picture = useRef(null);

    function postForm(){
        let isOK = true; 
        if(isOK){

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                body: new URLSearchParams({
                    "lastname":lastname.value,
                    "firstname":firstname.value,
                    "biography":biography.value,
                    "birthDate":birthDate.value,
                    "deathDate":" ",
                    "picture":picture.value,
                })
            }

            fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/insertPeople`, requestOptions)
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
                <Redirect to="/peoples"/>;
            </div>
        )
    }
    else if(error) {
        switch(error.error){
            case "DATABASE_ERROR_UPDATE_PEOPLE":{
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
        
    }else {
        return (
            <div className="moviedetails">
                <form>
                    <div className="moviedetails__infos">
                        <h2>Firstname</h2>
                        <input
                            id="firstname"
                            type="text"
                            ref={val => firstname = val}
                            className="updatemovie__synopsis"
                        />
                        <h2>Lastname</h2>
                        <input
                            id="lastname"
                            type="text"
                            ref={val => lastname = val}
                            className="updatemovie__synopsis"
                        />

                        <div className="moviedetails__synopsis">
                            <h2>biography</h2>
                            <textarea 
                                type="text"
                                cols="50"
                                wrap="hard"
                                ref={val => biography = val}
                                >
                                
                            </textarea>
                        </div>
                        
                        <h2>BirthDate</h2>
                        
                        <input
                            type="date"
                            ref={val => birthDate = val}
                        />                  
                        

                        <h2>Poster link</h2>
                        <input
                            type="url"
                            ref={val => picture = val}
                        />
                    </div>
                </form>
				<button onClick={postForm} className="boutton__update">Add</button>
				<button onClick={setCancel} className="boutton__update">Cancel</button>
            </div>
        );
    }
}