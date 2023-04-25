import { React, useState, useEffect } from 'react';

import { IoMdPin } from 'react-icons/io';
import { IoMdMail } from 'react-icons/io';
import { IoMdPerson } from 'react-icons/io';
import { IoMdCalendar } from 'react-icons/io';
import { IoIosPaperPlane } from 'react-icons/io';
import { IoMdBriefcase } from 'react-icons/io';

export const Button = ({ownProfile}) => {
  switch(ownProfile){
    case false:
      return <button>Follow</button>;
      default:
        return <button>Redigera profil</button>
  }
}

export default function ProfileInformation({id, setId}) {
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

    const[ownProfile, setOwnProfile] = useState(false)

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
            const loggedinId= checkUser.id
            if(loggedinId === data.id){
              setOwnProfile(true)
            }
        }
        fetchProfile()
    }, []);

    //

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
            <Button ownProfile={ownProfile}></Button>
        </div>
    );
}
