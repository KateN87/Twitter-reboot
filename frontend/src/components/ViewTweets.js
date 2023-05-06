import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import '../styles/ViewTweets.css';
import ShowTweetsContainer from './showTweetsContainer.js';

export const ViewTweet = () => {
    //State för om TRENDING-tweets eller FOR YOU-tweets ska visas
    const [view, setView] = useState('DISCOVER');
    //trending tweets hämtas från tweetsReducer(är just nu alla tweets)
    const trendingTweets = useSelector((state) => state.tweetReducer);
    //state för tweets som användaren följer
    const [forYouTweets, setForYouTweets] = useState([]);
    const user = useSelector((state) => state.userReducer);

    //Useeffect som hämtar tweets som användaren följer. Dependency är på när view ändras.
    useEffect(() => {
        //Kollar om user (och token finns)
        const checkUser = JSON.parse(localStorage.getItem('user'));
        const fetchForYouTweets = async () => {
            //Gör request för att hämta tweets
            const response = await fetch(
                'http://localhost:3001/locked/followtweet',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${checkUser.token}`,
                    },
                }
            );
            const tweets = await response.json();
            //Sets tweetsen
            setForYouTweets(tweets);
        };
        //Om view är FOR YOU så körs funktionen
        if (view === 'FOR YOU') {
            fetchForYouTweets();
        }
        //Dependency på när view ändras
    }, [view]);

    //Om view är trending är tweetsList trendingTweets, annars forYouTweets
    const tweetsList = view === 'DISCOVER' ? trendingTweets : forYouTweets;

    //"Knapparna" för for you eller trending
    const HeaderComponent = (props) => {
        //Om nuvarande view är samma som props view får knappen clasName-active, annars inget extra klassnamn
        return (
            <button
                className={`nav-link ${view === props.view ? 'active' : ''}`}
                onClick={() => setView(props.view)}
            >
                {props.view}
            </button>
        );
    };

    return (
        <div className='main-tweet-container'>
            <div className='nav-container'>
                <HeaderComponent view='DISCOVER' />
                {user && <HeaderComponent view='FOR YOU' />}
            </div>
            <ShowTweetsContainer tweetsList={tweetsList} />
        </div>
    );
};
