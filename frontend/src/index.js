import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'

import App from './App';
import tweetReducer from './redux/tweetReducer'

const store = createStore(tweetReducer)

console.log(store.getState());

store.dispatch({ type: 'SEND_TWEET', payload: "test 2" });
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Router>
      <Provider store={store} >
         <App />
      </Provider>
   </Router>
);
