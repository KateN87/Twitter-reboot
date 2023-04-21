import { Header } from '../components/Header';
import { ViewTweet } from '../components/ViewTweets';
import { useState, useEffect } from 'react';
import { Searchbar } from '../icons/Searchbar';
import { RegisterLoginDialogue } from '../components/RegisterLoginDialogue';
import CreateTweet from '../components/CreateTweet';

export default function Home() {
   const [fetchedTweets, setFetchedTweets] = useState([]);
   useEffect(() => {
      const fetchTweets = async () => {
         const response = await fetch('http://localhost:3001/tweets');
         const tweets = await response.json();

         tweets.sort(function (a, b) {
            var c = new Date(a.timestamp);
            var d = new Date(b.timestamp);
            return d - c;
         });
         setFetchedTweets(tweets);
      };
      fetchTweets();
   }, []);

   return (
      <div>
         <Header />
         <Searchbar />
         <CreateTweet />
         <RegisterLoginDialogue />
         <ViewTweet
            fetchedTweets={fetchedTweets}
            setFetchedTweets={setFetchedTweets}
         />
      </div>
   );
}
