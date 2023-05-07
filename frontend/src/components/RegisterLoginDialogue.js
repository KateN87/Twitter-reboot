import { Link } from "react-router-dom";

export const RegisterLoginDialogue = () => {
	return (
		<div id='registerlogindialogue'>
			<h2>Inte inloggad?</h2>
			<p id='registerp'>
				Logga in eller registrera dig nu och få en personlig tidslinje!
			</p>
			<Link to='/signup'>
				{" "}
				<button id='skapakonto'>Skapa ett konto</button>
			</Link>
			<br></br>
			<Link to='/login'>
				{" "}
				<button id='loggain'>Logga in</button>
			</Link>
		</div>
	);
};
