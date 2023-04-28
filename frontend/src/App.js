import './styles/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import Profile from './pages/Profile';

import Login from './pages/Login';
import Signup from './pages/Signup';
import { Header } from './components/Header';

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const [isLoading, setIsLoading] = useState(true);
    /* const [id, setId] = useState(0); */

    useEffect(() => {
        const checkUser = JSON.parse(localStorage.getItem('user'));

        if (checkUser) {
            const checkJwt = async () => {
                const response = await fetch(
                    'http://localhost:3001/locked/test',
                    {
                        headers: {
                            Authorization: `Bearer ${checkUser.token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.ok) {
                    const loggedUser = await response.json();

                    dispatch({ type: 'LOGIN_USER', payload: loggedUser });
                }
                setIsLoading(false);
            };
            checkJwt();
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='App'>
            <div className='left-main-container'>
                <Header />
            </div>
            <Routes>
                <Route
                    path='/'
                    element={<Home /* setId={setId} id={id}  */ />}
                />
                <Route
                    path='/profile/:id'
                    element={
                        user ? (
                            <Profile /* id={id} setId={setId} */ />
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
