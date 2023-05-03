import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import ProfileInformation from '../components/ProfileInformation.js';
import { OwnTweets } from '../components/OwnTweets';
import CreateTweet from '../components/CreateTweet.js';

export default function Profile() {
    const user = useSelector((state) => state.userReducer);
    const idparam = useParams().id;

    const ownProfile = user.id === Number(idparam);

    return (
        <>
            <div className='middle-main-container'>
                {ownProfile && <CreateTweet />}
                <OwnTweets />
            </div>
            <div className='right-main-container'>
                <ProfileInformation />
            </div>
        </>
    );
}
