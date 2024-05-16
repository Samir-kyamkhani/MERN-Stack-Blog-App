import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const changeInputHandler = (e) => {
    e.preventDefault()
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }
  return (
    <section className='register'>
      <div className="container">
        <h2>Sign in</h2>
        <form className="form register__form">
          <p className="form__error-message">This is error msg</p>
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