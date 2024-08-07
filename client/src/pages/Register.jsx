import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../slices/authSlice.js'
import { useDispatch, useSelector } from'react-redux'

function Register() {

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }) 
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {registerUser, error} = useSelector(state => state.auth)


  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault()
    dispatch(register(userData))
    setUserData("")
  }

  useEffect(() => {
    registerUser?.message ? navigate('/login') : {}
  })

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign up</h2>
        <form className="form register__form" onSubmit={handleSubmitRegister }>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder='Full Name' name='fullName' value={userData.fullName} onChange={changeInputHandler}/>
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler}/>
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler}/>
          <input type="password" placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword} onChange={changeInputHandler}/>
          <button type='submit' className="btn primary">Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register