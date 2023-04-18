import {useEffect, useState} from 'react'

import '../view.css'

export const ViewTweet = ({fetchedTweets}) => {
  
    return(
        <div id="tweet-big-container">
        <ul id="viewtweet">
            {fetchedTweets.map((tweet, index) => <li className='tweet-container' key={index}>
                <p className='tweetp'>{tweet.username}</p>
                <p className='tweetp'>{tweet.tweet}</p>
                <ul id="tweetfeatures">
                    <li></li>
                </ul>
                </li>)}
        </ul>
        </div>
    )
}