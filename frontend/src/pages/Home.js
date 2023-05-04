import { Header } from '../components/Header';
import { ViewTweet } from '../components/ViewTweets';
import Searchbar from '../components/Searchbar';
import { RegisterLoginDialogue } from '../components/RegisterLoginDialogue';
import CreateTweet from '../components/CreateTweet';
import TrendingHash from '../components/TrendingHash';

import ShowTweetsContainer from '../components/showTweetsContainer';
import { useSelector } from 'react-redux';

export default function Home({ setId, id }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const tweetsList = useSelector((state) => state.matchingTweetsReducer);
    console.log('tweetlist: ', tweetsList);

    return (
        <>
            <div className='middle-main-container'>
                {user && <CreateTweet />}

                <ViewTweet setId={setId} id={id} />
            </div>
            <div className='right-main-container'>
                <Searchbar />
                {!user && <RegisterLoginDialogue />}
                <h3 className='hashtag' id='explore'>
                    Trending hashtags
                </h3>
                {/*             {tweetsList !== undefined && tweetsList.length !== 0 ? <ShowTweetsContainer tweetsList={tweetsList} /> : */}{' '}
                <TrendingHash />
                {/* } */}
            </div>
        </>
    );
}
