import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from "../images/avatar1.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { getPostAuthor } from '../slices/postSlice';

function PostAuthor({ authorId, createdAt }) {
  const [author, setAuthor] = useState([]);
  
  const dispatch = useDispatch();
  const { postAuthor } = useSelector(state => state.post);
  

    useEffect(() => {
      if (!postAuthor) {
        dispatch(getPostAuthor(authorId));
      }
    }, [authorId , postAuthor, dispatch]);

  
    useEffect(() => {
      if (postAuthor && postAuthor?._id === authorId) {
        setAuthor(postAuthor);
      }
    }, [postAuthor, authorId]);
  

  const timeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diffInSeconds = Math.floor((now - created) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Link to={`/posts/users/${authorId}`} className='post__author'>
      <div className="post__author-avatar">
        <img src={author?.avatar || Avatar} alt={author?.fullName} />
      </div>
      <div className="post__author-details">
        <h5>By: {author?.fullName}</h5>
        <small>{timeAgo(createdAt)}</small>
      </div>
    </Link>
  );
}

export default PostAuthor;
