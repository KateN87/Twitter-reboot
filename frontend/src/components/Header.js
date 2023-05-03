import { useSelector } from 'react-redux';
import '../styles/Header.css';

import { Link } from 'react-router-dom';

import logo from '../icons/twitter-logo-.png';
import hashtag from '../icons/hashtagtwitter.png';
import MiniUserInfo from './MiniUserInfo.js';

export const Header = () => {
    const user = useSelector((state) => state.userReducer);
    return (
        <nav>
            <h3 className='hashtag' id='explore'>
                Trending hashtags
            </h3>
            <TrendingHash />
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
