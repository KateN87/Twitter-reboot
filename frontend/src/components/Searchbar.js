import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/searchbar.css';

const Searchbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    // Get the list of fetched tweets from the store
    const fetchedTweets = useSelector((state) => state.tweetReducer);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to fetch users matching the search query
    const fetchMatchingUsers = async (searchQuery) => {
        try {
            const response = await fetch('http://localhost:3001/users');
            const data = await response.json();
            const matchingUsers = data.filter((user) =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return matchingUsers;
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to fetch users.');
            return [];
        }
    };

    // Function to handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Get the search query from the input field
        const searchQuery = event.target.elements.searchbar.value;

        // Find matching hashtags from the tweets fetched from the store
        const matchingHashtags = fetchedTweets.filter((tweet) =>
            tweet.hashtags.includes(searchQuery.toLowerCase())
        );
        // Fetch matching users from the backend
        const matchingUsers = await fetchMatchingUsers(searchQuery);

        if (matchingHashtags.length > 0) {
            dispatch({
                type: 'SET_MATCHING_TWEETS',
                payload: matchingHashtags,
            });
            navigate('/search');
        }

        // If no matching users or hashtags found, set the error message and clear the user list
        if (matchingUsers.length === 0 && matchingHashtags.length === 0) {
            setErrorMessage(
                `No user or hashtag found with the name ${searchQuery}`
            );
            setUsers([]);
            // Otherwise, update the user list with the matching users and dispatch the matching hashtags to the store
        } else {
            setUsers(matchingUsers);
            // Dispatch the matching tweets to the store
            /*          dispatch({ type: "SET_MATCHING_TWEETS", payload: matchingHashtags }); */

            setErrorMessage('');
        }
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const isSearchDisabled = searchQuery.trim().length === 0;

    // Render the search bar and the list of matching users
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
