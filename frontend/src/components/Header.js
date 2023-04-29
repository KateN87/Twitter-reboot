import { useSelector } from 'react-redux';
import '../styles/Header.css';

import logo from '../icons/twitter-logo-.png';
import hashtag from '../icons/hashtagtwitter.png';
import MiniUserInfo from './MiniUserInfo.js';

export const Header = () => {
    const user = useSelector((state) => state.userReducer);

    return (
        <nav>
            <img src={logo} id='logga'></img>
            <img src={hashtag} className='hashtag'></img>
            <h3 className='hashtag' id='explore'>
                Utforska
            </h3>
            {user !== undefined && <MiniUserInfo />}
        </nav>
    );
};
