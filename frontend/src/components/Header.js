import { useSelector } from "react-redux";
import "../styles/Header.css";

import { Link } from "react-router-dom";

import logo from "../icons/twitter-logo-.png";
import hashtag from "../icons/hashtagtwitter.png";
import MiniUserInfo from "./MiniUserInfo.js";
import Trending from "./Trending";

export const Header = () => {
	const user = useSelector((state) => state.userReducer);
	console.log(user);
	return (
		<nav>
			<img src={logo} id='logga'></img>
			<img src={hashtag} className='hashtag'></img>
			<h3 className='hashtag' id='explore'>
				Trending hashtags
			</h3>
			<Trending />
			<Link to={`/`}>
				<button>Home</button>
			</Link>
			{user !== null && (
				<Link to={`/profile/${user.id}`}>
					<button>My profile</button>
				</Link>
			)}

			{user !== null && <MiniUserInfo />}
		</nav>
	);
};
