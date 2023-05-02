import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Searchbar = () => {
   const [users, setUsers] = useState([]);
   const [errorMessage, setErrorMessage] = useState(null);
   const fetchedTweets = useSelector((state) => state.tweetReducer);

   const fetchMatchingUsers = async (searchQuery) => {
      try {
         const response = await fetch("http://localhost:3001/users");
         const data = await response.json();
         const matchingUsers = data.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
         );
         return matchingUsers;
      } catch (error) {
         console.error(error);
         setErrorMessage("Failed to fetch users.");
         return [];
      }
   }


   const handleSubmit = async (event) => {
      event.preventDefault();
      const searchQuery = event.target.elements.searchbar.value;

      // Fetch matching hashtags
      const matchingHashtags = fetchedTweets.filter((tweet) =>
         tweet.hashtags.includes(searchQuery.toLowerCase())
      );
      console.log('aaaaaaa', matchingHashtags)

      const matchingUsers = await fetchMatchingUsers(searchQuery);

      if (matchingUsers.length === 0 && matchingHashtags.length === 0) {
         setErrorMessage(`No user or hashtag found with the name ${searchQuery}`);
         setUsers([]);
      } else {
         setUsers(matchingUsers);
         setErrorMessage('')
      }
      const isSearchDisabled = searchQuery.trim().length === 0;
   };

   return (
      <div>
         <form id='submit' onSubmit={handleSubmit}>
            <input
               type='text'
               placeholder='Search on Twitter'
               id='searchbar'
            ></input>
            <button type="submit" disabled={isSearchDisabled}>
               search
            </button>
         </form>
         <ul>
            {users.map((user) => (
               <div key={user.id}>
                  <p>
                     <Link className='link' to={`/profile/${user.id}`}>
                        {user.username}
                     </Link>
                  </p>
               </div>
            ))}
         </ul>
         {errorMessage && <p>{errorMessage}</p>}
      </div>
   );

};

export { Searchbar };
