import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiDotsHorizontal } from 'react-icons/hi';

import { useState } from 'react';

const MiniUserInfo = () => {
    const user = useSelector((state) => state.userReducer);
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        setActive(false);
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT_USER', payload: null });
        navigate('/');
    };
    return (
        <div className='Mini-userinfo'>
            {user && (
                <div className='userinfo' onClick={() => setActive(true)}>
                    <img src={user.avatar} />
                    <div className='names'>
                        <h2>{user.nickname}</h2>
                        <h3>{user.username}</h3>
                    </div>
                    <HiDotsHorizontal className='threedots' />
                </div>
            )}

            {active && (
                <div className='logout-box'>
                    <h1>Log out {user.nickname}?</h1>
                    <button onClick={handleLogout}>Log out</button>
                    <button onClick={() => setActive(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default MiniUserInfo;
