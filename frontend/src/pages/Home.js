import { Header } from '../components/Header';
import { ViewTweet } from '../components/ViewTweets';
import { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar';
import { RegisterLoginDialogue } from '../components/RegisterLoginDialogue';
import CreateTweet from '../components/CreateTweet';
import { useSelector } from 'react-redux';

export default function Home() {
   const [fetchedTweets, setFetchedTweets] = useState([]);
   const [newTweet, setNewTweet] = useState(null);
   const user = JSON.parse(localStorage.getItem("user"));
   // Lägg till isloading för att vänta på user

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
   }, [newTweet]);
   return (
      <div>
         <Header />
         <Searchbar />
         {user && (<CreateTweet newTweet={newTweet} setNewTweet={setNewTweet} />)}
         <RegisterLoginDialogue />
         <ViewTweet
            fetchedTweets={fetchedTweets}
            setFetchedTweets={setFetchedTweets}
         />
      </div>
   );
}


