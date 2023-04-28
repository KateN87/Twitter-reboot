import { Header } from '../components/Header';
import { ViewTweet } from '../components/ViewTweets';
import { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar';
import { RegisterLoginDialogue } from '../components/RegisterLoginDialogue';
import CreateTweet from '../components/CreateTweet';
import { useDispatch, useSelector } from 'react-redux';

export default function Home({ setId, id }) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    // Lägg till isloading för att vänta på user

    useEffect(() => {
        const fetchTweets = async () => {
            const response = await fetch('http://localhost:3001/tweets');
            const tweets = await response.json();

            tweets.sort(function (a, b) {
                var c = new Date(a.timestamp);
                var d = new Date(b.timestamp);
                return d - c;
            });
            dispatch({ type: 'GET_TWEETS', payload: tweets });
        };
        fetchTweets();
    }, []);
    return (
        <>
            <div className='middle-main-container'>
                {user && <CreateTweet />}

                <ViewTweet setId={setId} id={id} />
            </div>
            <div className='right-main-container'>
                <Searchbar />
                {!user && <RegisterLoginDialogue />}
            </div>
        </>
    );
}
