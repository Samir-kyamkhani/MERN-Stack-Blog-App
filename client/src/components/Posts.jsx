import React, { useState } from "react";
import PostItem from "./PostItem.jsx";

import {Dumy_Posts} from "../pages/data.js"

function Posts() {
  const [posts, setPosts] = useState(Dumy_Posts);
  return (
    <section className="posts">
     {posts.length > 0 ?  <div className="container posts__container">
        {posts?.map(({ id, thumbnail, title, category, desc, authorId }) => (
          <PostItem
            key={id}
            postId={id}
            thumbnail={thumbnail}
            title={title}
            category={category}
            description={desc}
            authorId={authorId}
          />
        ))}
      </div> : <h2 className="center">No posts found</h2>}
    </section>
  );
}

export default Posts;
