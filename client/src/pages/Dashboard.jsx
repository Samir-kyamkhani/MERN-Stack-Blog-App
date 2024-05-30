import React, { useState } from 'react'
import { Dumy_Posts } from './data'
import {Link} from "react-router-dom"

function DashBoard() {

  const [posts, setPosts] = useState(Dumy_Posts || [])

  return (
    <section className='dashboard'>
      {
        posts.length ? <div className='container dashboard__container'>
          {
            posts.map((post) => (
              <article className='dashboard__post' key={post.id}>
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={post.thumbnail} />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post.id}`} className="btn sm"> view</Link>
                  <Link to={`/posts/${post.id}/edit`} className="btn sm primary"> Edit</Link>
                  <Link to={`/posts/${post.id}/delete`} className="btn sm danger"> Delete</Link>
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