import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/Header.css';
import MiniUserInfo from './MiniUserInfo.js';

export const Header = () => {
    const user = useSelector((state) => state.userReducer);
    return (
        <nav>
            <Link to={`/`}>
                <button>Home</button>
            </Link>
            {user && (
                <Link to={`/profile/${user._id}`}>
                    <button>My profile</button>
                </Link>
            )}

            {user && <MiniUserInfo />}
        </nav>
    );
};
