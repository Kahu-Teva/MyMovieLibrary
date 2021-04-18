import { React, useState, useEffect, useRef , useMemo } from 'react';
import { useLocation, Redirect} from "react-router-dom";
import "./../styles/MovieDetails.css"
import moment from 'moment'

export default function UpdatePeople() {

    const location = useLocation().search;
    let query = useMemo(() => new URLSearchParams(location), [location]) 
    const [error, setError] = useState(null);
    const [request, setRequest] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [people, setPeople] = useState([]);


    
    let lastname = useRef(null);
    let firstname = useRef(null);
    let biography = useRef(null);
    let birthDate = useRef(null);
    let picture = useRef(null);

    function postForm(){
        let isOK = true; 
        if(isOK){ 
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                body: new URLSearchParams({
                    "id":people._id,
                    "lastname":lastname.value,
                    "firstname":firstname.value,
                    "biography":biography.value,
                    "birthDate":moment(birthDate.value,"YYYY-MM-DD").format('YYYYMMDD'),
                    "deathDate":people.deathDate,
                    "picture":picture.value,
                })
            }

            fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/updatePeople`, requestOptions)
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
        let peopleId = query.get("id");
        fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/peopleDetails?id=${peopleId}`)
        .then(res => res.json())
        .then(
            (result) => {
                if(!result.error){
                    setPeople(result);
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
    }, [query]);

    if(request || cancel){
        return(
            <div>
                <Redirect to={`/peopleDetails?id=${people._id}`}/>;
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
        
    }else if (!isLoaded1) {
        return <div className="movie__load"/>;
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
                            defaultValue={people.firstname}
                            className="updatemovie__synopsis"
                        />
                        <h2>Lastname</h2>
                        <input
                            id="lastname"
                            type="text"
                            ref={val => lastname = val}
                            defaultValue={people.lastname}
                            className="updatemovie__synopsis"
                        />

                        <div className="moviedetails__synopsis">
                            <h2>biography</h2>
                            <textarea 
                                type="text"
                                cols="50"
                                wrap="hard"
                                ref={val => biography = val}
                                defaultValue={people.biography}
                                >
                                
                            </textarea>
                        </div>
                        
                        <h2>BirthDate</h2>
                        
                        <input
                            type="date"
                            ref={val => birthDate = val}
                            defaultValue={moment(people.birthDate,"YYYYMMDD").format('YYYY-MM-DD')}
                        />                  
                        

                        <h2>Poster link</h2>
                        <input
                            type="url"
                            ref={val => picture = val}
                            defaultValue={people.picture}
                        />
                    </div>
				<button type="submit" onClick={postForm} className="boutton__update">Update</button>
				<button type="submit" onClick={setCancel} className="boutton__update">Cancel</button>
                </form>
            </div>
        );
    }
}