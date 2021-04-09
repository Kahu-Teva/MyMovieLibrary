import React, { useState, useEffect} from "react";
import logo_mml    from "./../assets/logo.png";
import logo_avatar from "./../assets/avatar1.png";
import "./../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar(){
    const[show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            }else{
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        };


    }, []);

    return(
        <div className={`navbar ${show && "navbar__black"}`}>
            <Link to="/Home">
                <img src={logo_mml} alt="My Movie Library Logo" className="navbar__logo" />
            </Link>
            <Link to="/Home"    className="nav__button b1">Accueil</Link>
            <Link to="/actors"  className="nav__button b2">Actors</Link>
            <Link to="/writers" className="nav__button b3">Writers</Link>
            <Link to="/profil">
                <img src={logo_avatar} alt="My Avatar" className="navbar__avatar" />
            </Link>
        </div>
    )
}

export default Navbar