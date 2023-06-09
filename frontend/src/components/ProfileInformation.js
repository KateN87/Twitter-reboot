import { React, useState, useEffect } from 'react';
import '../styles/profile.css';
import {
    IoMdPin,
    IoMdMail,
    IoMdCalendar,
    IoIosPaperPlane,
    IoMdBriefcase,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditProfile from './EditProfile';

export default function ProfileInformation() {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState({});

    const [following, setFollowing] = useState([]);
    const [followList, setFollowlist] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [showFollowers, setShowFollowers] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const user = useSelector((state) => state.userReducer);
    const idparam = useParams().id;

    const [ownProfile, setOwnProfile] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(
                'http://localhost:3001/users/' + idparam
            );
            const data = await response.json();
            setProfile(data);
            setFollowing(data.following);

            if (user._id === data._id) {
                setOwnProfile(true);
            }

            if (data.username) {
                const findFollowing = user.following.includes(data.username);
                if (findFollowing) {
                    setIsFollowing(true);
                } else {
                    setIsFollowing(false);
                }
            }
        };
        fetchProfile();
    }, [idparam, user]);

    const followUser = async () => {
        const checkToken = JSON.parse(localStorage.getItem('user'));
        const username = profile.username;
        setIsLoading(true);
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${checkToken}`,
            },
        };
        const response = await fetch(
            'http://localhost:3001/locked/follow/',
            options
        );
        const data = await response.json();

        if (response.status === 201) {
            dispatch({ type: 'ADD_FOLLOWING', payload: data });
            setIsLoading(false);
        }
        if (response.status === 200) {
            dispatch({ type: 'DELETE_FOLLOWING', payload: data });
            setIsLoading(false);
        }
    };

    const checkFollowing = (profile) => {
        let followList = profile.following;
        const following = followList?.length;
        return following;
    };

    if (profile.username === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profile'>
            {!editMode && (
                <>
                    <div id='topProfile'>
                        <img
                            src={`http://localhost:3001/images/${user.avatar}`}
                            alt='Profile avatar'
                            className='avatar'
                        />

                        <h2 className='nickname'>{profile.nickname}</h2>
                        {ownProfile && (
                            <button
                                id='editbtn'
                                onClick={() => setEditMode(true)}
                            >
                                Edit profile info
                            </button>
                        )}
                    </div>
                    <p className='username'>{profile.username}</p>
                    <div>
                        <div className='about-container'>
                            <p className='about'>{profile.about}</p>
                        </div>
                        <div id='follow-container'>
                            <p onClick={() => setShowFollowers(!showFollowers)}>
                                {profile.followers.length} Followers
                            </p>
                            <ul>
                                {showFollowers &&
                                    profile.followers.map((follow) => (
                                        <li key={follow}>{follow}</li>
                                    ))}
                            </ul>
                            <p onClick={() => setFollowlist(!followList)}>
                                {checkFollowing(profile)} Following
                            </p>
                            <ul>
                                {followList &&
                                    following.map((follow) => (
                                        <li key={follow}>{follow}</li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    <div className='icon-container'>
                        <IoMdMail className='icon' />
                        <p className='email'>{profile.email}</p>
                    </div>

                    <div className='icon-container'>
                        <IoMdBriefcase className='icon' />
                        <p className='occupation'>{profile.occupation}</p>
                    </div>

                    <div className='icon-container'>
                        <IoMdPin className='icon' />
                        <p className='hometown'>{profile.hometown}</p>
                    </div>

                    <div className='icon-container'>
                        <IoIosPaperPlane className='icon' />
                        <a
                            href={`https://${profile.website}`}
                            className='website'
                        >
                            {profile.website}
                        </a>
                    </div>

                    <div className='icon-container'>
                        <IoMdCalendar className='icon' />
                        <p className='joined'>{profile.joined}</p>
                    </div>
                    {!ownProfile && (
                        <button
                            onClick={() => followUser()}
                            disabled={isLoading}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </>
            )}
            {editMode && <EditProfile setEditMode={setEditMode} />}
        </div>
    );
}
