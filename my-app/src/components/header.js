import Cart from "./cart.js"
import "./../styles/Header.css"
import logo from "./../assets/logo.png"

function Header(){
    const title = "My Movie Library."
    return (

        // ######################inline style
        // <div style={{
        //     color: 'black',
        //     textAlign: 'right',
        //     padding: 32,
        //     borderBottonm '3px solid black'
        // }}
        //#######################className for style it
        <div className="Header">
            <img src={logo} alt="My Movie Library" className="mml-logo" />
            <div className="mml-title">{title.toUpperCase()}</div>
            <Cart/>
        </div>
    )
}

export default Header