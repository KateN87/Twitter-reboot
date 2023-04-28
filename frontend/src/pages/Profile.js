import { default as ProfileInformation } from '../components/ProfileInformation.js';

import { OwnTweets } from '../components/OwnTweets';
import CreateTweet from '../components/CreateTweet.js';

export default function Profile(/* { id, setId } */) {
    /* let idparam; */
    return (
        <>
            <div className='middle-main-container'>
                <CreateTweet />
                <OwnTweets /* id={id} idparam={idparam} */></OwnTweets>
            </div>
            <div className='right-main-container'>
                <ProfileInformation /* id={id} setId={setId} idparam={idparam} */
                />
            </div>
        </>
    );
}
