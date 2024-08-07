import React, { useState, useEffect } from 'react'
import { Dumy_Posts } from './data'
import {Link, useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuthorPosts } from '../slices/postSlice'
import DeletePost from './DeletePost'

function DashBoard() {

  const [posts, setPosts] = useState(Dumy_Posts || [])

  const navigate = useNavigate();
  const { loginUser } = useSelector(state => state.auth);
  const accessToken = loginUser?.data?.accessToken;
  
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });

  // const [authorLocalPosts, setAuthorLocalPosts] = useState([]);
  const { authorPosts, isLoading, error } = useSelector((state) => state.post);

  const {id} = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (id) {
      dispatch(getAuthorPosts(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (authorPosts && authorPosts?.createdBy !== id ) {
      setPosts(authorPosts);
    }
  }, [authorPosts, id]);


  if (isLoading) { 
    return (
      <section className="center">
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }
  
  return (
    <section className='dashboard'>
      {
        posts.length ? <div className='container dashboard__container'>
          {
            posts.map((post) => (
              <article className='dashboard__post' key={post._id}>
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={post.thumbnail} />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post._id}`} className="btn sm"> view</Link>
                  <Link to={`/posts/${post._id}/edit`} className="btn sm primary"> Edit</Link>
                  <DeletePost postId={post._id} />
                </div>
              </article>
            ))
          }
        </div> : <h2>You have no post yet.</h2>
      }
    </section>
  )
}

export default DashBoard