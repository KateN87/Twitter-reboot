import { default as ProfileInformation } from '../components/ProfileInformation.js';

import { OwnTweets } from '../components/OwnTweets';

export default function Profile({ id, setId }) {
    return (
        <>
            <div className='middle-main-container'>
                <OwnTweets id={id}></OwnTweets>
            </div>
            <div className='right-main-container'>
                <ProfileInformation id={id} setId={setId} />
            </div>
        </>
    );
}
