import { useSelector } from 'react-redux';
import '../styles/Header.css';

import logo from '../icons/twitter-logo-.png';
import hashtag from '../icons/hashtagtwitter.png';
import MiniUserInfo from './MiniUserInfo.js';
import { Link } from 'react-router-dom';

export const Header = () => {
    const user = useSelector((state) => state.userReducer);

    return (
        <nav>
            <img src={logo} id='logga'></img>
            <img src={hashtag} className='hashtag'></img>
            <h3 className='hashtag' id='explore'>
                Utforska
            </h3>
            <Link to={`/`}>
                <button>Home</button>
            </Link>
            {user !== undefined && (
                <Link to={`/profile/${user.id}`}>
                    <button>My profile</button>
                </Link>
            )}

            {user !== undefined && <MiniUserInfo />}
        </nav>
    );
};
