import logo from '../icons/twitter-logo-.png';
import hashtag from '../icons/hashtagtwitter.png';
import { useSelector } from 'react-redux';

export const Header = () => {
    const user = useSelector((state) => state.userReducer.user);

    return (
        <nav>
            {/* <img src={logo} id='logga'></img>
            <img src={hashtag} className='hashtag'></img> */}
            <h3 className='hashtag' id='explore'>
                Utforska
            </h3>
            {user && <h2>{user.username}</h2>}
        </nav>
    );
};
