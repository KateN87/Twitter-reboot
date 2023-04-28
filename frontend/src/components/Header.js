import { useSelector } from "react-redux";
import "../styles/Header.css";

import logo from "../icons/twitter-logo-.png";
import hashtag from "../icons/hashtagtwitter.png";
import MiniUserInfo from "./MiniUserInfo";

export const Header = () => {
<<<<<<< HEAD
	const user = useSelector((state) => state.userReducer.user);

	return (
		<nav>
			<img src={logo} id='logga'></img>
			<img src={hashtag} className='hashtag'></img>
			<h3 className='hashtag' id='explore'>
				Utforska
			</h3>
			{user && <MiniUserInfo />}
		</nav>
	);
=======
   const user = useSelector((state) => state.userReducer.user);
   return (
      <nav>
         <img src={logo} id='logga'></img>
         <img src={hashtag} className='hashtag'></img>
         <h3 className='hashtag' id='explore'>
            Utforska
         </h3>
         {user && <h2>{user.username}</h2>}
      </nav>
   );
>>>>>>> origin/Development
};
