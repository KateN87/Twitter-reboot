import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import returntimestamp from '../formatTimestamp';
import { useSelector } from 'react-redux';

export const OwnTweets = () => {
    const [ownTweets, setOwnTweets] = useState([]);
    const tweetsList = useSelector((state) => state.tweetReducer);
    const idparam = useParams().id;

    useEffect(() => {
        const fetchOwnTweets = async () => {
            const response = await fetch(
                'http://localhost:3001/tweets/' + idparam
            );
            const tweets = await response.json();
            tweets.sort(function (a, b) {
                var c = new Date(a.timestamp);
                var d = new Date(b.timestamp);
                return d - c;
            });
            setOwnTweets(tweets);
        };
        fetchOwnTweets();
    }, [tweetsList]);

    if (idparam === undefined) {
        console.log('TEST');
        return <div>Loading...</div>;
    }

    return (
        <div id='tweet-big-container'>
            <ul id='viewtweet'>
                {ownTweets.map((tweet, index) => (
                    <li className='tweet-container' key={index}>
                        <p className='tweetp'>
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

/*             let username
            if(id === 0){
                const response = await fetch('http://localhost:3001/users/' + idparam)
                const user = await response.json()
                username = user.username
            } else {
                const response = await fetch('http://localhost:3001/users/' + id)
            const user = await response.json()
            username = user.username
            } */
