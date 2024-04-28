import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../images/avatar1.jpg"

function PostAuthor() {
  return (
    <Link to={`/posts/users/samir`} className='post__author'>
        <div className="post__author-avatar">
            <img src={Avatar}/>
        </div>
        <div className="post__author-details">
            <h5>By: samir</h5>
            <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor