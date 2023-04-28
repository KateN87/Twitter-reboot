import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { formatDistanceToNow, set } from 'date-fns';

import { useSelector } from 'react-redux';

export const ViewTweet = ({ setFetchedTweets, fetchedTweets, id, setId }) => {
   const navigate = useNavigate();
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

   return (
      <div id='tweet-big-container'>
         <ul id='viewtweet'>
            {/* HÄR GÖR EN TURNERY GREJ OCH HA MATCHING TWEETS OM SÖKT PÅ HASHTAG
         KANSKE GÖR EN FUNKTION DÄR MAN RETURNAR ANTINGEN FETCHEDTWEETS ELR MATCHING TWEETS */}
            {fetchedTweets.map((tweet, index) => (
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
