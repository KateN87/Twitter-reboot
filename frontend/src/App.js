import './App.css';
import { Routes, Route } from 'react-router-dom';
import { createStore } from 'redux'
import { useSelector } from 'react-redux';

import Home from "./pages/Home"
import Profile from "./pages/Profile"
import counter from './redux/counter'

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
         </Routes>
      </div>
   );
}

export default App;