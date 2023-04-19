import { Header } from '../components/Header'
import { ViewTweet } from '../components/ViewTweets'
import { useState, useEffect } from 'react';

export default function Home() {
   const [fetchedTweets, setFetchedTweets] = useState([]);
   useEffect(() => {

      const fetchTweets = async () => {
         const response = await fetch('http://localhost:3001/tweets');
         const tweets = await response.json();
         setFetchedTweets(tweets)
      }
      fetchTweets()
   })


   return (
      <div>
         <Header></Header>
         <ViewTweet fetchedTweets={fetchedTweets} setFetchedTweets={setFetchedTweets}></ViewTweet>
      </div>
   )
}