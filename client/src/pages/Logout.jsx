import { useEffect } from 'react'
import React from 'react'
import { logout } from '../slices/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Logout() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser } = useSelector(state => state.auth);
  const accessToken = loginUser?.data?.accessToken;
  const userId = loginUser?.data?.user?._id;
  useEffect(() => {
    dispatch(logout(userId, accessToken));
    !loginUser?.message ? navigate('/login') : null;
  });
    
  return (
    <></>
  )
}

export default Logout