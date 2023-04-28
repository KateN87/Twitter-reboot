import { useDispatch } from "react-redux";

export default function CreateTweet() {
	const dispatch = useDispatch();

	async function submitTweet(event) {
		event.preventDefault();

		const textInput = event.target.tweet.value;
		const checkUser = JSON.parse(localStorage.getItem("user"));
		const wordsArray = textInput.split(/[\s\n]+/);
		const foundHashtag = wordsArray.filter((word) => word.startsWith("#"));

		if (!checkUser) {
			console.log("User not authenticated");
			return;
		}

		const newTweetReq = {
			tweet: textInput,
			username: checkUser.username,
			hashtags: foundHashtag,
		};

		const options = {
			method: "POST",
			body: JSON.stringify(newTweetReq),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${checkUser.token}`,
			},
		};

		try {
			const response = await fetch(
				"http://localhost:3001/locked/tweets",
				options
			);
			if (!response.ok) {
				throw new Error("Failed to send tweet");
			}
			const newTweet = await response.json();

			dispatch({ type: "SEND_TWEET", payload: newTweet });
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className='tweet-component'>
			<form onSubmit={submitTweet} className='tweet-form' action=''>
				<textarea
					id='tweet'
					name='tweet'
					rows='5'
					maxLength='140'
					placeholder='Write tweet...'
				></textarea>
				<button type='submit'>Tweet</button>
			</form>
		</div>
	);
}
