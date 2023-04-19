import {useEffect, useState} from 'react'

import '../view.css'

export const Footer = () => {
    return(
        <footer>
            <h2>Missa inte vad som händer</h2>
            <h4>Folk på twitter får reda på allt först.</h4>
            <div id="buttons">
                <button>Logga in</button>
                <button id="createuser">Skapa användare</button>
            </div>
        </footer>
    )
}

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