import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoriesPosts } from "../slices/postSlice.js";
import PostItem from "../components/PostItem";

function CategoryPosts() {
  const [catPosts, setcatPosts] = useState([]);
  const { categoriesPosts, isLoading, error } = useSelector((state) => state.post);

  const {category} = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(getCategoriesPosts(category));
  }, [dispatch, category]);

  useEffect(() => {
    if (categoriesPosts) {
      setcatPosts(categoriesPosts);
    }
  }, [categoriesPosts, category]);


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
      {catPosts?.length > 0 ? (
        <div className="container posts__container">
          {catPosts.map(
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

export default CategoryPosts;
