import { React, useState, useEffect } from 'react';
import {
    IoMdPin,
    IoMdMail,
    IoMdPerson,
    IoMdCalendar,
    IoIosPaperPlane,
    IoMdBriefcase,
} from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//TODO: dispatch when follow

export const Button = ({ profile, isFollowing, setIsFollowing }) => {
    const user = useSelector((state) => state.userReducer.user);

    const findFollowing = user.following.includes(profile.username);
    if (findFollowing) {
        setIsFollowing(true);
    } else {
        setIsFollowing(false);
    }

    const followUser = async () => {
        const checkUser = JSON.parse(localStorage.getItem('user'));
        const id = user.id;
        const acc = profile.username;
        let username = acc.replace('@', '');
        console.log(username);
        const options = {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${checkUser.token}`,
            },
        };
        const response = await fetch(
            'http://localhost:3001/locked/' + id,
            options
        );
        if (response.status === 201) {
            dispatchEvent();
        }
    };

    return (
        <button onClick={() => followUser()}>
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    );
};

export default function ProfileInformation() {
    const [profile, setProfile] = useState({});

    const [following, setFollowers] = useState([]);
    const [followList, setFollowlist] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const user = useSelector((state) => state.userReducer.user);
    const idparam = useParams().id;

    const [ownProfile, setOwnProfile] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(
                'http://localhost:3001/users/' + idparam
            );
            const data = await response.json();

            setProfile(data);
            setFollowers(data.following);
            /*             const checkUser = JSON.parse(localStorage.getItem('user'));
            const loggedinId = checkUser.id; */
            if (user.id === data.id) {
                setOwnProfile(true);
            }
        };
        fetchProfile();
    }, [user]);

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
            <img src={profile.avatar} alt='Profile avatar' className='avatar' />

            <h2 className='nickname'>{profile.nickname}</h2>

            <div className='icon-container'>
                <IoMdPerson className='icon' />
                <p className='username'>{profile.username}</p>
            </div>
            <div>
                <p>Followers {profile.followers}</p>
                <p onClick={() => setFollowlist(!followList)}>
                    Following {checkFollowing(profile)}
                </p>
                <ul>
                    {followList &&
                        following.map((follow, index) => <li>{follow}</li>)}
                </ul>
            </div>

            <div className='about-container'>
                <p className='about'>{profile.about}</p>
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
                <a href={`https://${profile.website}`} className='website'>
                    {profile.website}
                </a>
            </div>

            <div className='icon-container'>
                <IoMdCalendar className='icon' />
                <p className='joined'>{profile.joined}</p>
            </div>
            {!ownProfile && (
                <Button
                    ownProfile={ownProfile}
                    profile={profile}
                    isFollowing={isFollowing}
                    setIsFollowing={setIsFollowing}
                ></Button>
            )}
        </div>
    );
}
