import { formatDistanceToNow } from "date-fns";

const returntimestamp = (tweet) => {
	let timestamp = formatDistanceToNow(new Date(tweet.timestamp));
	let time = timestamp.split(" ");

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

export default returntimestamp;
