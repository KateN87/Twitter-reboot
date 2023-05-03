import { default as ProfileInformation } from '../components/ProfileInformation.js';

import { OwnTweets } from '../components/OwnTweets';
import CreateTweet from '../components/CreateTweet.js';
import Searchbar from './Search.js';

export default function Profile(/* { id, setId } */) {
   /* let idparam; */
   return (
      <>
         <div className='middle-main-container'>
            <ProfileInformation /* id={id} setId={setId} idparam={idparam} */
            />

            <CreateTweet />
            <OwnTweets /* id={id} idparam={idparam} */></OwnTweets>
         </div>
         <div className='right-main-container'>
            <Searchbar />
         </div>
      </>
   );
}
