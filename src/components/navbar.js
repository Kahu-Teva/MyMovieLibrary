import { React,  useState, useEffect} from "react";
import { Link } from "react-router-dom";
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
        })
    }, []);

    return(
        <div className={`navbar ${show && "navbar__black"}`}>
            <Link to="/Home">
                <img src={logo_mml} alt="My Movie Library Logo" className="navbar__logo" />
            </Link>
            <Link to="/Home"    className="nav__button">Home</Link>
            <Link to="/actors"  className="nav__button">Actors</Link>
            <Link to="/writers" className="nav__button">Writers</Link>
            <Link to="/directors" className="nav__button">Directors</Link>
            {/* <img src={logo_avatar} alt="My Avatar">
                <Link to="/profil" className="nav__avatar"/>
            </img> */}
        </div>
    )
}

export default Navbar