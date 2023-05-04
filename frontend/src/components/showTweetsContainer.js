import { useNavigate } from 'react-router-dom';
import returntimestamp from '../formatTimestamp';
import {useSelector} from 'react-redux'

//Containern som visar tweets
const ShowTweetsContainer = ({ tweetsList }) => {
    const navigate = useNavigate();
    //Funktion för att gå till en profil
    const goToProfile = async (tweet) => {
        const username = tweet.username;
        /* const fetchId = async () => { */
        const response = await fetch('http://localhost:3001/users/' + username);
        const user = await response.json();
        const foundId = user.id;
        navigate('/profile/' + foundId);
    };

    const likeTweet = async (tweet) => {
        const user = JSON.parse(localStorage.getItem("user"))
        const username = user.username
        const options = {
            method: 'PATCH',
            body: JSON.stringify({username}),
            headers:{
                "Content-Type" : "application/json",
            }
        }
        const response = await fetch('http://localhost:3001/liketweet/' + tweet.id, options)
        if(response.status === 200){
            console.log("liked tweet!")
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
                                className='tweetp'
                                onClick={() => goToProfile(tweet)}
                            >
                                {tweet.username}{' '}
                                <span id='time'>{returntimestamp(tweet)}</span>
                            </p>
                            <p className='tweetp'>{tweet.tweet}</p>
                            <ul id='tweetfeatures'>
                                <li><label>Like</label><input type="checkbox" onChange={() => likeTweet(tweet)}></input></li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShowTweetsContainer;
