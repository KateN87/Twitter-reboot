import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TrendingHash = () => {
	const [trendingList, setTrendingList] = useState([]);
	const tweets = useSelector((state) => state.tweetReducer);

	useEffect(() => {
		const getTrending = async () => {
			const response = await fetch("http://localhost:3001/trending");
			const data = await response.json();
			setTrendingList(data);
		};
		getTrending();
	}, [tweets]);

	return (
		<ul>
			{trendingList.map((trend) => (
				<li key={trend.hashtag}>{trend.hashtag}</li>
			))}
		</ul>
	);
};

export default TrendingHash;
