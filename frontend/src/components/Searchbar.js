import { useState, useEffect } from "react";
import { Link, } from "react-router-dom";

const Searchbar = ({ fetchedTweets, setFetchedTweets }) => {
   const [matchingHashtags, setMatchingHashtags] = useState([]);
   const [matchingTweets, setMatchingTweets] = useState([]);
   const [searchInput, setSearchInput] = useState("");
   const [users, setUsers] = useState([]);
   const [errorMessage, setErrorMessage] = useState(null);

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
   };

   const handleSearchInputChange = (event) => {
      const input = event.target.value;
      setSearchInput(input);
      const filteredHashtags = matchingHashtags.filter((hashtag) =>
         hashtag.includes(input)
      );
      setMatchingHashtags(filteredHashtags);
      const filteredTweets = fetchedTweets.filter((tweet) =>
         tweet.hashtags.some((h) => filteredHashtags.includes(h))
      );
      setMatchingTweets(filteredTweets);
      setFetchedTweets(filteredTweets);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const searchQuery = event.target.elements.searchbar.value;
      const matchingUsers = await fetchMatchingUsers(searchQuery);
      if (matchingUsers.length === 0) {
         setErrorMessage(`No user found with the name ${searchQuery}`);
         setUsers([]);
      } else {
         setUsers(matchingUsers);
      }
   };

   useEffect(() => {
      const fetchHashtags = async () => {
         try {
            const response = await fetch("http://localhost:3001/hashtags");
            const data = await response.json();
            setMatchingHashtags(data);
         } catch (error) {
            console.error(error);
            setErrorMessage("Failed to fetch hashtags.");
         }
      };
      fetchHashtags();
   }, []);

   return (
      <div>
         <form id="submit" onSubmit={handleSubmit}>
            <input
               onChange={handleSearchInputChange}
               value={searchInput}
               type="text"
               placeholder="Search on Twitter"
               id="searchbar"
            ></input>
            <button type="submit">Search</button>
         </form>
         <ul>
            {users.map((user) => (
               <div key={user.id}>
                  <p>
                     <Link className="link" to={`/profile/${user.id}`}>
                        {user.username}
                     </Link>
                  </p>
               </div>
            ))}
         </ul>
         {errorMessage && <p>{errorMessage}</p>}
         <div id="tabs">
            <p className="trending">For you</p>
            <p className="trending">Trending</p>
         </div>
      </div>
   );
};


export { Searchbar }
