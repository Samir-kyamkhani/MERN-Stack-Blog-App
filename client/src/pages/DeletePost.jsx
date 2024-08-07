import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { postDelete } from '../slices/postSlice'


function DeletePost({postId: id}) {

  const navigate = useNavigate();
  const { loginUser } = useSelector(state => state.auth);
  const accessToken = loginUser?.data?.accessToken;

  useEffect(() => {
    if (!accessToken) {
      navigate('/login') 
    }
  });
  
  const dispatch = useDispatch();
  const { deletePost, isLoading, error} = useSelector(state => state.post);



  const deletePostHandler = () => {
    dispatch(postDelete(id))
  }

  useEffect(() => {
    if (deletePost) {
      navigate('/')
    }
  }, [deletePost])

  if (isLoading) {
    return (
      <div className='center'>
        <h1>Loading...</h1>
      </div>
    )
  }


  return (
    <Link className='btn sm danger' onClick={deletePostHandler}>Delete</Link>
  )
}

export default DeletePost