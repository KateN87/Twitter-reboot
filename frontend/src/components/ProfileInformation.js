import { React, useState, useEffect } from 'react';
import { IoMdPin } from 'react-icons/io';
import { IoMdMail } from 'react-icons/io';
import { IoMdPerson } from 'react-icons/io';
import { IoMdCalendar } from 'react-icons/io';
import { IoIosPaperPlane } from 'react-icons/io';
import { IoMdBriefcase } from 'react-icons/io';

export const Button = ({ ownProfile, following, setFollowing, profile }) => {

    /*const followingFunction = async () => {
  
    }
  
    const handleChecker = () => {
      setFollowing(!following)
        followingFunction()
    }*/

    const followUser = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user.id
        const acc = profile.username
        let username = acc.replace('@', "")
        console.log(username)
        const options = {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch('http://localhost:3001/users/' + id, options)
        if (response.status === 201) {
            console.log("FOllowing!")
        }
    }

    switch (ownProfile) {
        case false:
            return <button onClick={() => followUser()}>Follow</button>
        default:
            return <button>Redigera profil</button>
    }
}

export default function ProfileInformation({ id, setId }) {
    const [profile, setProfile] = useState({
        avatar: '',
        nickname: '',
        username: '',
        about: '',
        email: '',
        occupation: '',
        hometown: '',
        website: '',
        joined: '',
    });

    const [ownProfile, setOwnProfile] = useState(false)

    useEffect(() => {


        const fetchProfile = async () => {
            const response = await fetch('http://localhost:3001/users/' + id)
            const data = await response.json()
            setProfile({
                avatar: data.avatar,
                nickname: data.nickname,
                username: data.username,
                about: data.about,
                email: data.email,
                occupation: data.occupation,
                hometown: data.hometown,
                website: data.website,
                joined: data.joined,
            })
            const checkUser = JSON.parse(localStorage.getItem('user'));
            const loggedinId = checkUser.id
            if (loggedinId === data.id) {
                setOwnProfile(true)
            }
        }
        fetchProfile()
    }, []);
    const [selectedUser, setSelectedUser] = useState(null);
    //
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt.verify(token, process.env.SECRET);
            const userId = decodedToken.id;
            fetch(`http://localhost:3001/users/${userId}`)
                .then(response => response.json())
                .then(data => setSelectedUser(data))
                .catch(error => console.error(error));
        }
    }, []);

    if (!selectedUser) {
        return <p>Loading...</p>;
    }




    return (
        <div className='profile'>
            <img src={profile.avatar} alt='Profile avatar' className='avatar' />

            <h2 className='nickname'>{profile.nickname}</h2>

            <div className='icon-container'>
                <IoMdPerson className='icon' />
                <p className='username'>{profile.username}</p>
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
            <Button ownProfile={ownProfile} profile={profile}></Button>
        </div>
    );
}
