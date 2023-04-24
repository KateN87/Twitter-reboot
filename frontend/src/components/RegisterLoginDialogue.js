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
			<Link to='/login'>
				{" "}
				<button id='skapakonto'>Logga in</button>
			</Link>
		</div>
	);
};
