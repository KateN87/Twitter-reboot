import { Header } from '../components/Header';
import { ViewTweet } from '../components/ViewTweets';
import { useState, useEffect } from 'react';
import { Searchbar } from '../icons/Searchbar';
import { RegisterLoginDialogue } from '../components/RegisterLoginDialogue';
import CreateTweet from '../components/CreateTweet';
import { useSelector } from 'react-redux';

export default function Home() {
    const [fetchedTweets, setFetchedTweets] = useState([]);
    const checkUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTweets = async () => {
            const response = await fetch(
                'http://localhost:3001/locked/followtweet',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${checkUser.token}`,
                    },
                }
            );
            const tweets = await response.json();

            tweets.sort(function (a, b) {
                var c = new Date(a.timestamp);
                var d = new Date(b.timestamp);
                return d - c;
            });
            console.log(tweets);
            setFetchedTweets(tweets);
        };
        fetchTweets();
    }, []);

    return (
        <div>
            <Header />
            <Searchbar />
            {checkUser && <CreateTweet />}
            <RegisterLoginDialogue />
            <ViewTweet
                fetchedTweets={fetchedTweets}
                setFetchedTweets={setFetchedTweets}
            />
        </div>
    );
}
