import { React , useState } from 'react'
import "./../styles/Authentification.css"

export default function Formulaire(){
	const [nameUser, setName] = useState('');
    const [mdpUser, setMdp] = useState('');

	function postForm(){
		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			body: new URLSearchParams({
				'name' : nameUser,
				'mdp' : mdpUser
			})
		}
		fetch(`HTTP://${process.env.REACT_APP_SERVER_ADRESS}:${process.env.REACT_APP_SERVER_PORT}/api/insert`, requestOptions)
			.then(res => res.json())
			.then(result => {
				console.log("resultat DB du post Formulaire: ", result);
			});
	}

	return (
		<div className="signin">
			<form onSubmit={postForm}>
				
				<h2>Name</h2>
				<input
					type="text"
					onChange={e => setName(e.target.value)}
					/>
				<h2>Mot de passe</h2>
				<input
					type="text"
					onChange={e => setMdp(e.target.value)}
					/>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	)
}