import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../slices/authSlice.js'
import { useDispatch, useSelector } from'react-redux'


function Login() {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loginUser, error} = useSelector(state => state.auth)

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    dispatch(login(userData))
    setUserData("")
  }
  // useEffect(() => {
  //     setDefaultAuthorizationHeader(loginUser.data?.accessToken)
  // },)

  useEffect(() => {
    if (loginUser && loginUser.data) {
      navigate("/")
    }
  })

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign in</h2>
        <form className="form register__form" onSubmit={handleSubmitLogin}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus/>
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler}/>
          <button type='submit' className="btn primary">Login</button>
        </form>
        <small>Don't have an account? <Link to="/register">Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login