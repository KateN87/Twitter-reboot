import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Searchbar = () => {
   const [users, setUsers] = useState([]);
   const [errorMessage, setErrorMessage] = useState(null);
   const [matchingTweets, setMatchingTweets] = useState([])

   // Get the list of fetched tweets from the store
   const fetchedTweets = useSelector((state) => state.tweetReducer);


   // Fetch users that match the search query
   const fetchMatchingUsers = async (searchQuery) => {
      try {
         const response = await fetch("http://localhost:3001/users");
         const data = await response.json();
         // Filter the list of users to only include those that match the search query
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
      // Get the search query from the input field
      const searchQuery = event.target.elements.searchbar.value;

      // Get the matching tweets based on the matching hashtag of the searchQuery
      const matchingHashtags = fetchedTweets.filter((tweet) =>
         tweet.hashtags.includes(searchQuery.toLowerCase())
      );
      console.log("matching hashtags", matchingHashtags)

      // Fetch matching users
      const matchingUsers = await fetchMatchingUsers(searchQuery);
      console.log("matching users", matchingUsers)


      if (matchingUsers.length === 0 && matchingHashtags.length === 0) {
         // If there are no matching users or hashtags, set the error message state and clear the users state
         setErrorMessage(`No user or hashtag found with the name ${searchQuery}`);
         setUsers([]);
      } else {
         // Otherwise, set the users state to the matching users and the matching tweets state to the matching hashtags's tweets
         setUsers(matchingUsers);
         setMatchingTweets(...[matchingHashtags])
         console.log('matching hashtags: ', matchingHashtags)
         setErrorMessage('')

      }
   };

   return (
      <div>
         <form id='submit' onSubmit={handleSubmit}>
            <input
               type='text'
               placeholder='Search on Twitter'
               id='searchbar'
            ></input>
            <button type='submit'>Search</button>
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

// --------------- FETCH HASHTAGS -----------------
/*    useEffect(() => {
      const fetchHashtags = async () => {
         try {
            const response = await fetch("http://localhost:3001/hashtags");
            const data = await response.json();
            setHashtags(data);
         } catch (error) {
            console.error(error);
            setErrorMessage("Failed to fetch hashtags.");
         }
      };
      fetchHashtags();
   }, []); */