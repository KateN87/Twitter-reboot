import { useNavigate } from 'react-router-dom';
import returntimestamp from '../formatTimestamp';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/showTweets.css';
import { useEffect, useState } from 'react';

//Containern som visar tweets
const ShowTweetsContainer = ({ tweetsList }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [liked, setliked] = useState([])

    useEffect(() => {

            const user = JSON.parse(localStorage.getItem('user'));
            const username = user.username;
            let newlikes = []
            for(let i = 0; i < tweetsList.length; i++){
                let id = tweetsList[i].id
                let likedByList = tweetsList[i].likedBy
                if(likedByList.includes(username)){
                    newlikes.push(id)
                }
                
            }
            setliked(newlikes)
            return
    }, [tweetsList])

    //Funktion för att gå till en profil
    const goToProfile = async (tweet) => {
        const username = tweet.username;
        const response = await fetch('http://localhost:3001/users/' + username);
        const user = await response.json();
        const foundId = user.id;
        navigate('/profile/' + foundId);
    };

    const likeTweet = async (tweet) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const username = user.username;
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(
            'http://localhost:3001/liketweet/' + tweet.id,
            options
        );
        const data = await response.json();
        if (response.status === 200) {
            dispatch({ type: 'CHANGE_LIKE', payload: data });
        }
    };

    const seeLikes = (tweet) => {
        const likedByList = tweet.likedBy;
        const likes = likedByList?.length;
        return likes;
    };

    const checkLike = (tweet) => {
        let id = tweet.id
        let found = liked.includes(id)
        switch(found){
            case true:
                return "liked";
                default:
                    return "notliked";
        }
    }

    return (
        <div className='tweet-big-container'>
            {tweetsList.length === 0 ? (
                <div>
                    <p>No tweets to display. </p>
                </div>
            ) : (
                <ul id='viewtweet'>
                    {tweetsList.map((tweet, index) => (
                        <li className='tweet-container' key={index}>
                            <p
                                className='tweetName'
                                onClick={() => goToProfile(tweet)}
                            >
                                {tweet.username}
                                {tweet.nickname}{' '}
                                <span id='time'>{returntimestamp(tweet)}</span>
                            </p>
                            <p className='tweetp'>{tweet.tweet}</p>
                            <ul id='tweetfeatures'>
                                <li>
                                    <i className='fas fa-comment'></i>
                                </li>
                                <li>
                                    <i className='fas fa-retweet'></i>0
                                </li>
                                <li id={checkLike(tweet)}>
                                    <i
                                        className='fas fa-heart'
                                        onClick={() => likeTweet(tweet)}
                                    ></i>
                                    <span>{seeLikes(tweet)}</span>
                                </li>

                                <li>
                                    <i className='fas fa-share'></i>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShowTweetsContainer;
