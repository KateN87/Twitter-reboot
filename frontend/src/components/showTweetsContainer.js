import { useNavigate } from 'react-router-dom';
import returntimestamp from '../formatTimestamp';
import "../styles/showTweets.css"

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
                                {tweet.username}{' '}
                                <span id='time'>{returntimestamp(tweet)}</span>
                            </p>
                            <p className='tweetp'>{tweet.tweet}</p>
                            <ul id='tweetfeatures'>
                                <li>
                                    <i className='fas fa-comment'></i>
                                    0
                                </li>
                                <li>
                                    <i className='fas fa-retweet'></i>
                                    0
                                </li>
                                <li>
                                    <i className='fas fa-heart'></i>
                                    0
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
