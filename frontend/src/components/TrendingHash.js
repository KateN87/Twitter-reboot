import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TrendingHash = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [trendingList, setTrendingList] = useState([]);
    const tweets = useSelector((state) => state.tweetReducer);
    // Get the list of fetched tweets from the store
    const fetchedTweets = useSelector((state) => state.tweetReducer);

    const handleClick = (hashtag) => {
        // Find matching hashtags from the tweets fetched from the store
        const matchingHashtags = fetchedTweets.filter((tweet) =>
            tweet.hashtags.includes(hashtag.toLowerCase())
        );

        if (matchingHashtags.length > 0) {
            dispatch({
                type: 'SET_MATCHING_TWEETS',
                payload: matchingHashtags,
            });
            navigate('/search');
        }
    };

    useEffect(() => {
        const getTrending = async () => {
            const response = await fetch('http://localhost:3001/trending');
            const data = await response.json();
            setTrendingList(data);
        };
        getTrending();
    }, [tweets]);

    return (
        <ul>
            {trendingList.map((trend) => (
                <li
                    key={trend.hashtag}
                    onClick={() => handleClick(trend.hashtag)}
                >
                    #{trend.hashtag} {trend.occurance}
                </li>
            ))}
        </ul>
    );
};

export default TrendingHash;
