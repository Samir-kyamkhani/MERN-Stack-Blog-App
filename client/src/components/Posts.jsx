import React, { useEffect , useCallback} from "react";
import PostItem from "./PostItem.jsx";
import { getAllPosts } from "../slices/postSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Posts() {
  const { allPosts, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();  
  
  const memorisePost = useCallback(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    memorisePost();
  }, [memorisePost]);

  if (isLoading) {
    return (
      <section className="center">
        <div className="container">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="posts">
      {allPosts && allPosts.length > 0 ? (
        <div className="container posts__container">
          {allPosts.map(({ _id: id, thumbnail, title, category, description, createdBy, createdAt }) => (
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
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
}

export default Posts;
