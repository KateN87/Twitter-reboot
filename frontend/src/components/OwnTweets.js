import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export const OwnTweets = () => {
	const [ownTweets, setOwnTweets] = useState([]);

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem("user"));
		let username = user.username;

		const fetchOwnTweets = async () => {
			const response = await fetch("http://localhost:3001/tweets/" + username);
			const tweets = await response.json();
			tweets.sort(function (a, b) {
				var c = new Date(a.timestamp);
				var d = new Date(b.timestamp);
				return d - c;
			});
			setOwnTweets(tweets);
		};
		fetchOwnTweets();
	}, []);

	const returntimestamp = (tweet) => {
		let timestamp = formatDistanceToNow(new Date(tweet.timestamp));
		let time = timestamp.split(" ");
		console.log(time);
		if (time[0] === "about") {
			let remove = time.indexOf("about");
			let firstremove = time.splice(remove, 1);
			let remove2 = time.indexOf("hours");
			let secondremove = time.splice(remove2, 1);
			let realtime = `${time + " h"}`;
			return realtime;
		} else if (time[1] === "days" || time[1] === "day") {
			let realtime = `${time[0] + " d"}`;
			return realtime;
		} else if (time[1] === "minutes") {
			let realtime = `${time[0] + " m"}`;
			return realtime;
		} else {
			let realtime = `${time[0] + " s"}`;
			return realtime;
		}
	};

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
