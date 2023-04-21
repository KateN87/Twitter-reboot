import { default as ProfileInformation } from "../components/ProfileInformation.js";

import { OwnTweets } from "../components/OwnTweets";

export default function Profile() {
	return (
		<div className=' container'>
			<OwnTweets></OwnTweets>
			<ProfileInformation />
		</div>
	);
}
