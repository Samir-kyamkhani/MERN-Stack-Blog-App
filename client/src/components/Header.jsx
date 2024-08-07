import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import Logo from '../images/'
import {FaBars} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import { useSelector } from 'react-redux'

function Header() {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)

  const {loginUser} = useSelector(state => state.auth)
  
  const closNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false)
    } else {
      setIsNavShowing(true)
    }
  }

  return (
    <nav>
      <div className='container nav__container'>
        <Link to="/" className='nav__logo' onClick={closNavHandler}>
          {/* <img src={Logo} alt="Logo"/> */}
          <h3>Blog App</h3>
        </Link>
        { loginUser?.message && isNavShowing && <ul className='nav__menu'>
            <li><Link to={`/profile/${loginUser?.data?.user?._id}`} onClick={closNavHandler}>{loginUser?.data?.user?.fullName}</Link></li>
            <li><Link to="/create" onClick={closNavHandler}>Create Post</Link></li>
            <li><Link to="/authors" onClick={closNavHandler}>Authors</Link></li>
            <li><Link to="/logout" onClick={closNavHandler}>Logout</Link></li>
          </ ul>
        }

        { !loginUser?.message && isNavShowing && <ul className='nav__menu'>
            <li><Link to="/authors" onClick={closNavHandler}>Authors</Link></li>
            <li><Link to="/login" onClick={closNavHandler}>Login</Link></li>
          </ ul>
        }
        
        <button className='nav__toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>
          {
            isNavShowing ? <AiOutlineClose/> : <FaBars /> 
          }
        </button>
      </div>
    </nav>
  )
}

export default Header