import logo from '../icons/twitter-logo-.png';
import hashtag from '../icons/hashtagtwitter.png';
import '../header.css';
import { useSelector } from 'react-redux';

export const Header = () => {
    return (
        <nav>
            <img src={logo} id='logga'></img>
            <img src={hashtag} className='hashtag'></img>
            <h3 className='hashtag' id='explore'>
                Utforska
            </h3>
        </nav>
    );
};
