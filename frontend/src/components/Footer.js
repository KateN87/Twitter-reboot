import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<footer>
			<h2>Missa inte vad som händer</h2>
			<h4>Folk på twitter får reda på allt först.</h4>
			<div id='buttons'>
				<Link to='/login'>
					<button>Logga in</button>
				</Link>
				<Link to='/signup'>
					<button id='createuser'>Skapa användare</button>
				</Link>
				<button id='Logout'>Logga ut</button>
			</div>
		</footer>
	);
};

export default Footer;
