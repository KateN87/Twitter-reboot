import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/createTweet.css';

export default function CreateTweet() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const [characters, setCharacters] = useState('');

    const handleCharacters = () => {
        let text = characters.length;
        return text;
    };

    async function submitTweet(event) {
        event.preventDefault();
        const textInput = event.target.tweet.value;
        const checkToken = JSON.parse(localStorage.getItem('user'));

        const wordsArray = textInput.split(/[\s\n]+/);
        const foundHashtag = wordsArray.filter((word) => word.startsWith('#'));
        const hashtagsWithout = foundHashtag.map((hashtag) =>
            hashtag.replace(/^#/, '').toLowerCase()
        );

        if (!checkToken) {
            console.log('User not authenticated');
            return;
        }

        const newTweetReq = {
            tweet: textInput,
            username: user.username,
            hashtags: hashtagsWithout,
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(newTweetReq),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${checkToken}`,
            },
        };

        try {
            const response = await fetch(
                'http://localhost:3001/locked/tweets',
                options
            );
            if (!response.ok) {
                throw new Error('Failed to send tweet');
            }
            const newTweet = await response.json();

            dispatch({ type: 'SEND_TWEET', payload: newTweet });
            event.target.reset();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='tweet-component'>
            <form onSubmit={submitTweet} className='tweet-form' action=''>
                <textarea
                    onChange={(e) => setCharacters(e.target.value)}
                    className='textarea'
                    id='tweet'
                    name='tweet'
                    rows='5'
                    maxLength='140'
                    placeholder='Write tweet...'
                ></textarea>

                <button type='submit'>Tweet</button>
            </form>
            <span id='characters'>{handleCharacters()}/140</span>
        </div>
    );
}
