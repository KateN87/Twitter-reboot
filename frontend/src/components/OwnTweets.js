import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShowTweetsContainer from './showTweetsContainer.js';

export const OwnTweets = () => {
    const [tweetsList, setTweetsList] = useState([]);
    const allTweets = useSelector((state) => state.tweetReducer);
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
            setTweetsList(tweets);
        };
        fetchOwnTweets();
    }, [idparam, allTweets]);

    if (idparam === undefined) {
        return <div>Loading...</div>;
    }

    return <ShowTweetsContainer tweetsList={tweetsList} />;
};

export default OwnTweets;
