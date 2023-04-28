import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import returntimestamp from "../formatTimestamp";

export const OwnTweets = ({ id, idparam }) => {
	const [ownTweets, setOwnTweets] = useState([]);
	idparam = useParams().id;

	useEffect(() => {
		const fetchOwnTweets = async () => {
			let username;
			if (id === 0) {
				const response = await fetch("http://localhost:3001/users/" + idparam);
				const user = await response.json();
				username = user.username;
			} else {
				const response = await fetch("http://localhost:3001/users/" + id);
				const user = await response.json();
				username = user.username;
			}
			const response2 = await fetch("http://localhost:3001/tweets/" + username);
			const tweets = await response2.json();
			tweets.sort(function (a, b) {
				var c = new Date(a.timestamp);
				var d = new Date(b.timestamp);
				return d - c;
			});
			setOwnTweets(tweets);
		};
		fetchOwnTweets();
	}, []);

	return (
		<div id='tweet-big-container'>
			<ul id='viewtweet'>
				{ownTweets.map((tweet, index) => (
					<li className='tweet-container' key={index}>
						<p className='tweetp'>
							{tweet.username} <span id='time'>{returntimestamp(tweet)}</span>
						</p>
						<p className='tweetp'>{tweet.tweet}</p>
						<ul id='tweetfeatures'>
							<li></li>
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};
