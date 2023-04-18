import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home"
import Login from './components/Login';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
         </Routes>
      </div>
   );
}

export default App;
