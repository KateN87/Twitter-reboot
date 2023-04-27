import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'react-router-dom';

export const OwnTweets = ({id, idparam}) => {
    const [ownTweets, setOwnTweets] = useState([]);
    idparam = useParams().id
    useEffect(() => {

        const fetchOwnTweets = async () => {
            let username
            if(id === 0){
                const response = await fetch('http://localhost:3001/users/' + idparam)
                const user = await response.json()
                username = user.username
            } else {
                const response = await fetch('http://localhost:3001/users/' + id)
            const user = await response.json()
            username = user.username
            }
            const response2 = await fetch(
                'http://localhost:3001/tweets/' + username
            );
            const tweets = await response2.json();
            tweets.sort(function (a, b) {
                var c = new Date(a.timestamp);
                var d = new Date(b.timestamp);
                return d - c;
            });
            setOwnTweets(tweets);
        };
        fetchOwnTweets();
    }, []);

    const returntimestamp = (tweet) => {
        let timestamp = formatDistanceToNow(new Date(tweet.timestamp));
        let time = timestamp.split(' ');
        if (time[0] === 'about') {
            let remove = time.indexOf('about');
            let firstremove = time.splice(remove, 1);
            let remove2 = time.indexOf('hours');
            let secondremove = time.splice(remove2, 1);
            let realtime = `${time + ' h'}`;
            return realtime;
        } else if (time[1] === 'days' || time[1] === 'day') {
            let realtime = `${time[0] + ' d'}`;
            return realtime;
        } else if (time[1] === 'minutes') {
            let realtime = `${time[0] + ' m'}`;
            return realtime;
        } else {
            let realtime = `${time[0] + ' s'}`;
            return realtime;
        }
    };

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
