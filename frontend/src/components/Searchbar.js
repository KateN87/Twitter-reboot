import { useEffect, useState } from "react";

export const Searchbar = () => {
   const [matchingHashtags, setMatchingHashtags] = useState([])
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
      console.log('filtered hashtags: ', filteredHashtags)
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
