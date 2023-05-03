import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/searchbar.css';

const Searchbar = () => {
   const dispatch = useDispatch()
   const [users, setUsers] = useState([]);
   const [errorMessage, setErrorMessage] = useState(null);

   // Get the list of fetched tweets from the store
   const fetchedTweets = useSelector((state) => state.tweetReducer);
   const [searchQuery, setSearchQuery] = useState("");


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
      const matchingUsers = await fetchMatchingUsers(searchQuery);

      if (matchingUsers.length === 0 && matchingHashtags.length === 0) {
         setErrorMessage(`No user or hashtag found with the name ${searchQuery}`);
         setUsers([]);
      } else {
         setUsers(matchingUsers);
         dispatch({ type: "SET_MATCHING_TWEETS", payload: matchingHashtags }); // Dispatch the matching tweets to the store 
         setErrorMessage('')
      }
   };

   const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
   };
   const isSearchDisabled = searchQuery.trim().length === 0;

   return (
      <div>
         <form
            id='submit'
            onSubmit={handleSubmit}
            onChange={handleInputChange}
         >
            <input
               type='text'
               placeholder='Search on Twitter'
               id='searchbar'
            ></input>
            <button type='submit' disabled={isSearchDisabled}>
               search
            </button>
         </form>
         <ul>
            {users.map((user) => (
               <div key={user.id} className='user-info'>
                  <p>
                     <img
                        src={`http://localhost:3001/images/${user.avatar}`}
                        alt='Profile avatar'
                        className='avatar'
                     />
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

export default Searchbar;

