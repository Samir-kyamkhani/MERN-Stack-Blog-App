import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuthorPosts } from "../slices/postSlice.js";
import PostItem from "../components/PostItem";

function AuthorPosts() {
  const [authorLocalPosts, setAuthorLocalPosts] = useState([]);
  const { authorPosts, isLoading, error } = useSelector((state) => state.post);

  const {id} = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (id) {
      dispatch(getAuthorPosts(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (authorPosts && authorPosts?.createdBy !== id ) {
      setAuthorLocalPosts(authorPosts);
    }
  }, [authorPosts, id]);


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
    <section className="posts">
      {authorLocalPosts?.length > 0 ? (
        <div className="container posts__container">
          {authorLocalPosts.map(
            ({
              _id: id,
              thumbnail,
              title,
              category,
              description,
              createdBy,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postId={id}
                thumbnail={thumbnail}
                title={title}
                category={category}
                description={description}
                authorId={createdBy}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
}

export default AuthorPosts;
