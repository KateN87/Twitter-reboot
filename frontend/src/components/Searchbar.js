import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Searchbar = () => {
	const [hashtags, setHashtags] = useState([]);
	const [matchingHashtags, setMatchingHashtags] = useState([]);
	const [matchingTweets, setMatchingTweets] = useState([]);

	const [searchInput, setSearchInput] = useState("");
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const fetchedTweets = useSelector((state) => state.tweetReducer) || [];

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

		/* fetchedTweets.map((tweet) =>
			console.log("Hashtags in every tweet", tweet.hashtags)
		); */
		if (searchInput !== "") {
			const filteredTweets = fetchedTweets.filter((tweet) =>
				tweet.hashtags.includes(searchInput)
			);
			console.log("FETCHEDTWEETS", filteredTweets);
		}

		//console.log('filtered tweets: ', filteredTweets)

		//console.log('searchinput: ', searchInput);

		/*       const input = event.target.value;
            setSearchInput(input);
            const filteredHashtags = hashtags.filter((hashtag) =>
               hashtag.includes(input)
            );
            setHashtags(...filteredHashtags);
            const filteredTweets = fetchedTweets.filter((tweet) =>
               tweet.hashtags.some((ht) => filteredHashtags.includes(ht))
            );
      
            setMatchingTweets(filteredTweets); */
	};

	useEffect(() => {
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
	}, []);

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

	return (
		<div>
			<form id='submit' onSubmit={handleSubmit}>
				<input
					onChange={handleSearchInputChange}
					value={searchInput}
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
