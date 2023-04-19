import { Header } from '../components/Header';
import { ViewTweet, Footer } from '../components/ViewTweets';
import { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar';
import { RegisterLoginDialogue } from '../components/RegisterLoginDialogue';

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
            <RegisterLoginDialogue></RegisterLoginDialogue>
            <ViewTweet
                fetchedTweets={fetchedTweets}
                setFetchedTweets={setFetchedTweets}
            ></ViewTweet>
            <Footer></Footer>
        </div>
    );
}
