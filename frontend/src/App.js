import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import Profile from './pages/Profile';

import Login from './components/Login';
import Signup from './components/Signup';
import { Header } from './components/Header';
import Footer from './components/Footer';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);

    useEffect(() => {
        const checkUser = JSON.parse(localStorage.getItem('user'));
        console.log('This is checkUser', checkUser);

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
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/profile'
                    element={user ? <Profile /> : <Navigate to='/login' />}
                />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
