import React, { useState, useEffect} from "react";
import logo_mml    from "./../assets/logo.png";
import logo_avatar from "./../assets/avatar1.png";
import "./../styles/Navbar.css";

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
            <a href=".">
                <img src={logo_mml} alt="My Movie Library Logo" className="navbar__logo" />
            </a>

            <a href=".">
                <img src={logo_avatar} alt="My Avatar" className="navbar__avatar" />
            </a>
        </div>
    )
}

export default Navbar