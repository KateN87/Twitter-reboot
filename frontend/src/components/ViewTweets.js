import {useEffect, useState} from 'react'

import '../view.css'

export const Searchbar = () => {
    return(
        <form id="search">
        <input type="text" placeholder='Sök på twitter' id="searchbar"></input>
        <div id="tabs">
            <p className='trending'>För dig</p>
            <p className='trending'>Trendar</p>
        </div>
        </form>
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