import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllAuthors } from '../slices/postSlice.js'

function Authors() {

  const [authors, setAuthors] = useState([])
  
  const dispatch = useDispatch()
  const {allauthors, isLoading, error} = useSelector(state => state.post)
  

  useEffect(() => {
      dispatch(getAllAuthors())
  }, [dispatch])

  useEffect(() => {
    if (allauthors) {
      setAuthors(allauthors)
    }
  }, [allauthors])

  if (isLoading) { 
    return (
      <section className="center">
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="center">
        <div className="container">
          <h1>Error: {error}</h1>
        </div>
      </section>
    );
  }


  return (
    <section className='authors'>
      {authors.length > 0 ? <div className="container authors__container">
        {authors?.map(({_id, avatar, fullName, posts}) => (
          <Link key={_id} to={`/posts/users/${_id}`} className='author'>
            <div className="author__avatar">
              <img src={avatar} alt={`image of ${name}`} />
            </div>
            <div className="author__info">
              <h4>{fullName}</h4>
              <p>User post: {posts}</p>
            </div>
          </Link>
        ))}
      </div> : <h2 className='center'>No Authors found.</h2> }
    </section>
  )
}

export default Authors