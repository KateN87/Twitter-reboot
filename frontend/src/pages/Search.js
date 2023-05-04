import { useSelector } from 'react-redux';

import ShowTweetsContainer from '../components/showTweetsContainer';
import Searchbar from '../components/Searchbar';
import TrendingHash from '../components/TrendingHash';

const Search = () => {
    // Get the list of matching tweets from the store
    const tweetsList = useSelector((state) => state.matchingTweetsReducer);

    // Render Searchbar and show matching tweets if tweetsList is not undefined, otherwise show trending hastags
    return (
        <div>
            <Searchbar />
            <h3 className='hashtag' id='explore'>
                Trending hashtags
            </h3>
            <TrendingHash />
            {tweetsList !== undefined && (
                <ShowTweetsContainer tweetsList={tweetsList} />
            )}
        </div>
    );
};

export default Search;
