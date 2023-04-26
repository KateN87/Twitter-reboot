import { useEffect, useState } from "react";

export const Searchbar = () => {
   // TODO
   const [matchingHashtags, setMatchingHashtags] = useState([])



   useEffect(() => {
      const fetchHashtags = async () => {
         const response = await fetch('http://localhost:3001/hashtags')
         const data = await response.json()
         console.log('data: ', data)
         setMatchingHashtags(data)
         console.log(matchingHashtags)
      }
      fetchHashtags()
   }, []);


   return (
      <form id='search'>
         <input
            type='text'
            placeholder='Sök på twitter'
            id='searchbar'
         ></input>
         <div id='tabs'></div>

      </form>
   );
};
