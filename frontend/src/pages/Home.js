import { useSelector } from 'react-redux';
import { ViewTweet } from '../components/ViewTweets';
import Searchbar from '../components/Searchbar';
import { RegisterLoginDialogue } from '../components/RegisterLoginDialogue';
import CreateTweet from '../components/CreateTweet';
import TrendingHash from '../components/TrendingHash';

export default function Home() {
    const user = useSelector((state) => state.userReducer);
    return (
        <>
            <div className='middle-main-container'>
                {user && <CreateTweet />}

                <ViewTweet />
            </div>
            <div className='right-main-container'>
                <Searchbar />
                {!user && <RegisterLoginDialogue />}
                <h3 className='hashtag' id='explore'>
                    Trending hashtags
                </h3>
                <TrendingHash />
            </div>
        </>
    );
}
