import { Header } from '../components/Header';
import { Searchbar, ViewTweet } from '../components/ViewTweets';
import { useState, useEffect } from 'react';

export default function Home() {
    const [fetchedTweets, setFetchedTweets] = useState([]);
    useEffect(() => {
        const fetchTweets = async () => {
            const response = await fetch('http://localhost:3001/tweets');
            const tweets = await response.json();

            tweets.sort(function(a, b) {
           var c = new Date(a.timestamp);
            var d = new Date(b.timestamp);
            return d-c;
            });
            setFetchedTweets(tweets);
        };
        fetchTweets();
    }, []);

    return (
        <div>
            <Header></Header>
            <Searchbar></Searchbar>
            <ViewTweet
                fetchedTweets={fetchedTweets}
                setFetchedTweets={setFetchedTweets}
            ></ViewTweet>
        </div>
    );
}
