import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avaatar from "../images/avatar15.jpg"
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";



function UserProfile() {

  const [avatar, setAvatar] = useState(Avaatar)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <section className='profile'>
      <div className="container profile__container">
        <Link to={`/mypost/samir`} className='btn'>My Posts</Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar}/>
            </div>
            {/* form to update avatar */}
            <form className='avatar__form'>
              <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg' />
              <label htmlFor="avatar"> <FaEdit/> </label>
            </form>
            <button className='profile__avatar-btn'> <FaCheck/> </button>
          </div>
          <h1>Samir Khan</h1>

          {/* form to update user details */}

          <form className="form profile__form">
            <p className="form__error-message">
              This is an error message
            </p>
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            <button type='submit' className="btn primary">Update my details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile