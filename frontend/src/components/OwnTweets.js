import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'react-router-dom';

const getTimeFromNow = (timestamp) => {
   let time = formatDistanceToNow(new Date(timestamp)).split(' ');

   if (time[0] === 'about') {
      time = `${time.splice(1, time.length - 1).join(' ')} h`;
   } else if (time[1] === 'days' || time[1] === 'day') {
      time = `${time[0]} d`;
   } else if (time[1] === 'minutes') {
      time = `${time[0]} m`;
   } else {
      time = `${time[0]} s`;
   }

   return time;
};

const OwnTweets = ({ id }) => {
   const [ownTweets, setOwnTweets] = useState([]);
   const { idparam } = useParams();

   useEffect(() => {
      const fetchOwnTweets = async () => {
         let username;
         if (id === 0) {
            const response = await fetch(`http://localhost:3001/users/${idparam}`);
            const user = await response.json();
            username = user.username;
         } else {
            const response = await fetch(`http://localhost:3001/users/${id}`);
            const user = await response.json();
            username = user.username;
         }

         const response2 = await fetch(`http://localhost:3001/tweets/${username}`);
         const tweets = await response2.json();
         tweets.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
         setOwnTweets(tweets);
      };

      fetchOwnTweets();
   }, [id, idparam]);

   return (
      <div id='tweet-big-container'>
         <ul id='viewtweet'>
            {ownTweets.map(({ username, timestamp, tweet }, index) => (
               <li className='tweet-container' key={index}>
                  <p className='tweetp'>
                     {username} <span id='time'>{getTimeFromNow(timestamp)}</span>
                  </p>
                  <p className='tweetp'>{tweet}</p>
                  <ul id='tweetfeatures'>
                     <li></li>
                  </ul>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default OwnTweets;
