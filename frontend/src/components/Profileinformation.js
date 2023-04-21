import { React, useEffect, useState } from 'react';
import { IoMdPin } from 'react-icons/io'
import { IoMdMail } from 'react-icons/io'
import { IoMdPerson } from 'react-icons/io'
import { IoMdCalendar } from 'react-icons/io'
import { IoIosPaperPlane } from 'react-icons/io'
import { IoMdBriefcase } from 'react-icons/io'
import {useSelector} from 'react-redux'




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
  const currentUser = useSelector((state) => state.userReducer.user);

  if(currentUser === null){
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div className="profile">
      <img src={currentUser.avatar} alt="Profile avatar" className="avatar" />

      <h2 className="nickname">{currentUser.nickname}</h2>

      <div className="icon-container">
        <IoMdPerson className="icon" />
        <p className="username">{currentUser.username}</p>
      </div>

      <div className="about-container">
        <p className="about">{currentUser.about}</p>
      </div>

      <div className="icon-container">
        <IoMdMail className="icon" />
        <p className="email">{currentUser.email}</p>
      </div>

      <div className="icon-container">
        <IoMdBriefcase className="icon" />
        <p className="occupation">{currentUser.occupation}</p>
      </div>

      <div className="icon-container">
        <IoMdPin className="icon" />
        <p className="hometown">{currentUser.hometown}</p>
      </div>

      <div className="icon-container">
        <IoIosPaperPlane className="icon" />
        <a href={`https://${currentUser.website}`} className="website">{currentUser.website}</a>
      </div>

      <div className="icon-container">
        <IoMdCalendar className="icon" />
        <p className="joined">{currentUser.joined}</p>
      </div>

    </div>
  );
}

