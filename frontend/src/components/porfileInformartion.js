import { React } from 'react';
import { IoMdPin } from 'react-icons/io'
import { IoMdMail } from 'react-icons/io'
import { IoMdPerson } from 'react-icons/io'
import { IoMdCalendar } from 'react-icons/io'
import { IoIosPaperPlane } from 'react-icons/io'
import { IoMdBriefcase } from 'react-icons/io'




const profile = {

  id: 2,
  username: "@Kate",
  password: "$2b$10$Vw/fyEBVIAu4WcmzTAlO4.t9Dr0Pez6Y8Eypx2qZy5FQq3/jEgCae",
  avatar: "https://i.postimg.cc/4xw9qHxk/avatar.png",
  email: "kate@kate.se",
  nickname: "TheKate",
  about: "I am Kate",
  occupation: "Student",
  hometown: "Katetown",
  website: "kate.com",
  joined: "2023-04-19T17:17:10.353Z"

}

export default function ProfileInformation() {
  return (
    <div className="profile">
      <img src={profile.avatar} alt="Profile avatar" className="avatar" />

      <stronger className="nickname">{profile.nickname}</stronger>

      <div className="icon-container">
        <IoMdPerson className="icon" />
        <p className="username">{profile.username}</p>
      </div>

      <div className="about-container">
        <p className="about">{profile.about}</p>
      </div>

      <div className="icon-container">
        <IoMdMail className="icon" />
        <p className="email">{profile.email}</p>
      </div>

      <div className="icon-container">
        <IoMdBriefcase className="icon" />
        <p className="occupation">{profile.occupation}</p>
      </div>

      <div className="icon-container">
        <IoMdPin className="icon" />
        <p className="hometown">{profile.hometown}</p>
      </div>

      <div className="icon-container">
        <IoIosPaperPlane className="icon" />
        <a href={`https://${profile.website}`} className="website">{profile.website}</a>
      </div>

      <div className="icon-container">
        <IoMdCalendar className="icon" />
        <p className="joined">{profile.joined}</p>
      </div>

    </div>
  );
}

