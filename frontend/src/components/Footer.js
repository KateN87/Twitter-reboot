import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiDotsHorizontal } from 'react-icons/hi';

import '../footer.css';
import { useState } from 'react';

const Footer = () => {
    const user = useSelector((state) => state.userReducer.user);
    const [active, setActive] = useState(false);

    return (
        <footer>
            {!user && (
                <>
                    <h2>Missa inte vad som händer</h2>
                    <h4>Folk på twitter får reda på allt först.</h4>
                    <div id='buttons'>
                        <Link to='/login'>
                            <button>Logga in</button>
                        </Link>
                        <Link to='/signup'>
                            <button id='createuser'>Skapa användare</button>
                        </Link>
                    </div>
                </>
            )}
            <div className='userinfo'>
                <img src={user.avatar} />
                <div className='names'>
                    <h2>{user.nickname}</h2>
                    <h3>{user.username}</h3>
                </div>
                <HiDotsHorizontal className='threedots' />
            </div>
        </footer>
    );
};

export default Footer;
