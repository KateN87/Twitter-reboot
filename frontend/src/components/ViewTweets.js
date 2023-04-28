import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import returntimestamp from '../formatTimestamp';
import { useSelector } from 'react-redux';

import '../styles/ViewTweets.css';

export const ViewTweet = ({ id, setId }) => {
   const navigate = useNavigate();

   //State för om TRENDING-tweets eller FOR YOU-tweets ska visas
   const [view, setView] = useState('TRENDING');
   //trending tweets hämtas från tweetsReducer(är just nu alla tweets)
   const trendingTweets = useSelector((state) => state.tweetReducer);
   //state för tweets som användaren följer
   const [forYouTweets, setForYouTweets] = useState([]);
   const user = useSelector((state) => state.userReducer.user);

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
   const tweetsList = view === 'TRENDING' ? trendingTweets : forYouTweets;

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

   //Containern som visar tweets
   const ShowTweets = () => {
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

   //Funktion för att gå till en profil
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

   /* if (tweetsList.length === 0) {
       return <div>Loading...</div>;
   } */
   //Headercomponenter ("knapparna") som bestämmer vilket view som ska visas
   return (
      <div className='main-tweet-container'>
         <div className='nav-container'>
            <HeaderComponent view='TRENDING' />
            {user && <HeaderComponent view='FOR YOU' />}
         </div>
         <ShowTweets tweetsList={tweetsList}></ShowTweets>
      </div>
   );
};
