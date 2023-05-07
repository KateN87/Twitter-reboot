import { useNavigate } from 'react-router-dom';
import returntimestamp from '../formatTimestamp';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/showTweets.css';
import { useEffect, useState } from 'react';

//Containern som visar tweets
const ShowTweetsContainer = ({ tweetsList }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Funktion för att gå till en profil
    const goToProfile = async (tweet) => {
        const username = tweet.username;
        const response = await fetch('http://localhost:3001/users/' + username);
        const user = await response.json();

        const foundId = user._id;
        console.log('FOUND ID', foundId);
        navigate('/profile/' + foundId);
    };

    const likeTweet = async (tweet) => {
        const checkToken = JSON.parse(localStorage.getItem('user'));
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${checkToken}`,
            },
        };
        const response = await fetch(
            'http://localhost:3001/locked/liketweet/' + tweet._id,
            options
        );
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            dispatch({ type: 'CHANGE_LIKE', payload: data });
        }
    };

    const seeLikes = (tweet) => {
        const likedByList = tweet.likedBy;
        const likes = likedByList?.length;
        return likes;
    };

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
                                <li>
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
