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

    /* const viewComponent = (props) => { */
    /* return (
            <li className='nav-item' key={props.season}>
                <button
                    className={`nav-link ${
                        season === props.season ? 'active' : ''
                    }`}
                    onClick={() => setSeason(props.season)}
                >
                    {props.season}
                </button>
            </li>
        );
    }; */
    if (tweetsList.length === 0) {
        return <div>Loading...</div>;
    }

    const HeaderComponent = (props) => {
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
    };

    const ShowTweets = () => {};

    /* return (
        <div className='main-tweet-container'>
            <div className='header-container'>
                <HeaderComponent view='FOR YOU' />
                <HeaderComponent view='TRENDING' />
                <HeaderComponent view='MY TWEETS' />
            </div>
            <ShowTweets view={view}></ShowTweets>
        </div>
    ); */
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
