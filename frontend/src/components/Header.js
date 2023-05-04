import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/Header.css';
import logo from '../icons/twitter-logo-.png';
import hashtag from '../icons/hashtagtwitter.png';
import MiniUserInfo from './MiniUserInfo.js';
import TrendingHash from './TrendingHash.js';

export const Header = () => {
    const user = useSelector((state) => state.userReducer);
    return (
        <nav>
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
