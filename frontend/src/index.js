import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './App';
import tweetReducer from './redux/tweetReducer';
import userReducer from './redux/userReducer';
import matchingTweetsReducer from './redux/matchingTweetsReducer';

const store = configureStore({
    reducer: {
        tweetReducer: tweetReducer,
        userReducer: userReducer,
        matchingTweetsReducer: matchingTweetsReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Router>
);
