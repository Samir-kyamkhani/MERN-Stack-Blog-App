import React, { useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostDetails } from "../slices/postSlice";
import DeletePost from "./DeletePost";

function PostDetails() {
  const {id} = useParams()
  const [post, setPost] = useState(null)
  
  

  const dispatch = useDispatch()
  const { userPostDetails, error, isLoading } = useSelector(state => state.post)
  const {loginUser} = useSelector(state => state.auth)
  
  useEffect(() => {
    if (!userPostDetails) {
      dispatch(getPostDetails(id))
    }
  }, [dispatch, getPostDetails, id, userPostDetails])

  useEffect(() => {
    if (id !== userPostDetails?._createdBy) {
      console.log("lllll");
      setPost(userPostDetails)
    }
  }, [userPostDetails, getPostDetails])


  if (isLoading) {
    return (
      <section className="center">
      <div className="container">
        <h1>Loading...</h1>
      </div>
    </section>
    )
  }

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor authorId={post?.createdBy} createdAt={post?.createdAt} />
          {loginUser?.data?.user?._id === post?.createdBy && <div className="post-detail__buttons">
            <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">
              Edit
            </Link>
            <DeletePost postId={id}/>
          </div>}
        </div>

        <h1>{post?.title}</h1>
        <div className="post-detail__thumbnail">
          <img src={post?.thumbnail} />
        </div>
        <p dangerouslySetInnerHTML={{__html: post?.description}}></p>
      </div>}
    </section>
  );
}

export default PostDetails;
