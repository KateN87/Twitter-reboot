import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import returntimestamp from '../formatTimestamp';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/ViewTweets.css';

export const ViewTweet = ({ id, setId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [view, setView] = useState('TRENDING');
    const tweetsList = useSelector((state) => state.tweetReducer);
    /* const [tweets, setTweets] = useState([]); */

    const HeaderComponent = (props) => {
        console.log(props.view);
        return (
            <button
                className={`nav-link ${view === props.view ? 'active' : ''}`}
                onClick={() => setView(props.view)}
            >
                {props.view}
            </button>
        );
    };
    if (tweetsList.length === 0) {
        return <div>Loading...</div>;
    }

    const ShowTweets = () => {
        return (
            <div className='tweet-big-container'>
                <ul id='viewtweet'>
                    {tweetsList.map((tweet, index) => (
                        <li className='tweet-container' key={index}>
                            <p
                                className='tweetp'
                                onClick={() => goToProfile(tweet)}
                            >
                                {tweet.username}{' '}
                                <span id='time'>{returntimestamp(tweet)}</span>
                            </p>
                            <p className='tweetp'>{tweet.tweet}</p>
                            <ul id='tweetfeatures'>
                                <li></li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const goToProfile = (tweet) => {
        const username = tweet.username;
        const fetchId = async () => {
            const response = await fetch('http://localhost:3001/' + username);
            const user = await response.json();
            const foundId = user.id;
            setId(foundId);
            navigate('/profile/' + foundId);
        };
        fetchId();
    };

    /*     const HeaderComponent = (props) => {
        return (
            <li className='nav-item' key={view}>
                <button
                    className={`nav-link ${
                        view === props.view ? 'active' : ''
                    }`}
                    onClick={() => setView(props.view)}
                >
                    {props.view}
                </button>
            </li>
        );
    }; */

    return (
        <div className='main-tweet-container'>
            <div className='nav-container'>
                <HeaderComponent view='FOR YOU' />
                <HeaderComponent view='TRENDING' />
            </div>
            <ShowTweets tweetsList={tweetsList}></ShowTweets>
        </div>
    );
};
