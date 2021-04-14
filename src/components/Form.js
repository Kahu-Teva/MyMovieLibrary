import {useState} from "react";
import {users} from './../datas/users';
import "./../styles/Authentification.css"

export default function Form({setVerifUser}) {

    const [activeLogin, setActiveLogin] = useState("")
    const [activePassword, setActivePassword] = useState("")

    function VerifUser(){
        users.map(user =>
            {if(user.login === activeLogin && user.password === activePassword){  
              return setVerifUser(true);
            }else{
              return null;
            }
        });
    }

    return (
        <div className="authentification__page">
            <p className="authentification__title">Sign In</p>
            <form onSubmit={VerifUser} className="authentification__login__form">
                <label className="authentification__lab">Username</label>
                <input type="text" className="authentification__champs" onChange={e => setActiveLogin(e.target.value)}/>
                <label className="authentification__lab">Password</label>
                <input className="authentification__champs" type="password" onChange={e => setActivePassword(e.target.value)}/>
                <button className="authentification__submit" type="submit">Login</button>
            </form>
        </div>
    )
}