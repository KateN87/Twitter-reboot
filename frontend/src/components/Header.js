import { useSelector } from "react-redux";
import "../styles/Header.css";

import { Link } from "react-router-dom";

import logo from "../icons/twitter-logo-.png";
import hashtag from "../icons/hashtagtwitter.png";
import MiniUserInfo from "./MiniUserInfo.js";

export const Header = () => {
	const user = useSelector((state) => state.userReducer);
	return (
		<nav>
			<img src={logo} id='logga'></img>
			<img src={hashtag} className='hashtag'></img>
			<Link to={`/`}>
				<button>Home</button>
			</Link>
			{user && (
				<Link to={`/profile/${user.id}`}>
					<button>My profile</button>
				</Link>
			)}

			{user && <MiniUserInfo />}
		</nav>
	);
};
