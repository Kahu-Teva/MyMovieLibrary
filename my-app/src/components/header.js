import Cart from "./cart.js"

function Header(){
    const title = "My Movie Library."
    return (
        <div className="Header">
            <h1>{title.toUpperCase()}</h1>
            <Cart/>
        </div>
    )
}

export default Header