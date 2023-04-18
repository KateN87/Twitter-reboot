import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'

import './index.css';
import App from './App';
import counter from './redux/counter'

const store = createStore(counter)

console.log(store.getState());

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Router>
      <Provider store={store} >
         <App />
      </Provider>
   </Router>
);
