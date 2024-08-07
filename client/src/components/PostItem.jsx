import React from 'react'
import {Link} from "react-router-dom"
import PostAuthor from './PostAuthor'

function PostItem({postId, thumbnail, title, category, description, authorId, createdAt}) {

const shortDescription = description?.length > 145 ? description.slice(0, 145) + "..." : description
const shortitle = title.length > 30 ? title.slice(0, 50) + "..." :title

  return (
    <article className='post'>
        <div className="post__thumbnail">
            <img src={thumbnail} alt={title} />
        </div>
        <div className="post__content">
            <Link to={`/posts/${postId}`}>
                <h3>{shortitle}</h3>
            </Link>
            <p dangerouslySetInnerHTML={{__html: shortDescription}}></p>
            <div className="post__footer">
                <PostAuthor  authorId={authorId} createdAt={createdAt} />
                <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
            </div>
        </div>
    </article>
  )
}

export default PostItem