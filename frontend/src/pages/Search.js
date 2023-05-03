import { useSelector } from 'react-redux';

import ShowTweetsContainer from '../components/showTweetsContainer';
import Searchbar from "../components/Searchbar"
import TrendingHash from '../components/TrendingHash';
//import ShowTweetsContainer from '../components/showTweetsContainer';

const Search = () => {
   // Get the list of matching tweets from the store
   const tweetsList = useSelector((state) => state.matchingTweetsReducer);

   return (
      <div>
         <Searchbar />
         {tweetsList !== undefined ? <ShowTweetsContainer tweetsList={tweetsList} /> : <TrendingHash />}
      </div>
   )
}

export default Search;