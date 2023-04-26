import { set } from "date-fns";
import { useEffect, useState } from "react";

export const Searchbar = ({ fetchedTweets, setFetchedTweets }) => {
   const [matchingHashtags, setMatchingHashtags] = useState([])
   const [matchingTweets, setMatchingTweets] = useState([])
   const [searchInput, setSearchInput] = useState('');

   useEffect(() => {
      const fetchHashtags = async () => {
         const response = await fetch('http://localhost:3001/hashtags')
         const data = await response.json()
         // Set all hashtags as matching hashtags initially
         setMatchingHashtags(data)
      }
      fetchHashtags()
   }, []);

   const handleSearchInputChange = (event) => {
      setSearchInput(event.target.value)
      // Filter the hashtags based on the searchInput value
      const filteredHashtags = matchingHashtags.filter(hashtag => hashtag.includes(event.target.value));
      setMatchingHashtags(filteredHashtags)

      // Filter the tweets based on the matching hashtags
      const filteredTweets = fetchedTweets.filter(tweet => tweet.hashtags.some(h => filteredHashtags.includes(h)));
      setMatchingTweets(filteredTweets)

      setFetchedTweets(matchingTweets)

      console.log('matching hashtags: ', filteredHashtags)
      console.log('matching tweets: ', filteredTweets)
   }

   return (
      // TODO
      // Gör en dropdown med alla matching hashtags
      <form id='search'>
         <input
            onChange={handleSearchInputChange}
            value={searchInput}
            type='text'
            placeholder='Sök på twitter'
            id='searchbar'
         ></input>

         <button>Sök</button>

      </form>
   );
};

