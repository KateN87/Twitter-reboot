import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import Profile from './pages/Profile';

import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    const user = useSelector((state) => state.userReducer);

    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
