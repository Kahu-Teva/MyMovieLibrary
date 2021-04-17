import { React, useState , useEffect, useMemo } from 'react';
import { useLocation , Link , Redirect } from "react-router-dom";
import moment from 'moment'
import './../styles/PeopleDetails.css';

export default function PeopleDetails() {
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [people, setPeople] = useState([]);
    const [request, setRequest] = useState(false);
    
    function deletePeople(){
        if(window.confirm("Do you really want to delete this people ?")){
            let peopleId = query.get("id");
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                body: new URLSearchParams({
                    "id":peopleId
                })
            }

            fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/deletePeople`, requestOptions)
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


    const test = useLocation().search;
    let query = useMemo(() => new URLSearchParams(test), [test])
    // Fetching data
    useEffect(() => {
        let peopleId = query.get("id");
        fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/peopleDetails?id=${peopleId}`)
        .then(res => res.json())
        .then((result) => {
            setPeople(result);
            setIsLoaded(true);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        }
        )
    }, [query])
    
    if(request){
        return(
            <div>
                <Redirect to="peoples"/>;
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
        
    } else if (!isLoaded) {
        return <div className="people__load"/>;
    } else {    
        let birthdate = people.birthDate;
        let name = people.lastname.toUpperCase() + " " + people.firstname;
        return (
            <div className="peopledetails">
                <img className="peopledetails__poster" src={people.picture} alt={name}/>        
                <div className="peopledetails__infos">
                    <h1>{name}</h1>
                    
                    <p>Born : {moment(birthdate).format("LL")}</p>
                    {(people.deathDay === "")?
                        (<p>Date de décès : {moment(people.deathDay).format("LL")}</p>) 
                        : null
                    }
                    <p className="peopledetails__biography">Biography: {people.biography}</p>
                </div>
                <Link to={`/updatePeople?id=${people._id}`} className="banner__button button_more_info">
                    <div className="banner__button_ico"/>
                    <span>Edit infos</span>
                </Link>
				<div onClick={deletePeople} className="boutton__update">DELETE</div>
            </div>
        );
    }
}