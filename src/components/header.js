import logo from "./../assets/logo.png"
import "./../styles/Header.css"

function Header(){
    return (
        <div className="Header">
            <div className="nav-bar">
                <a href=".">
                    <img src={logo} alt="My Movie Library" className="mml-logo" />
                </a>
                <p style={{ 
                    display: "inline-block",
                    color: "white",
                    padding: 3,
                    textSize: 10
                }}> Accueil</p>
            </div>
        </div>
    )
}

export default Header