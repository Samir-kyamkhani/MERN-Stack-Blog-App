import React from 'react'
import { useState } from 'react';
import { Dumy_Posts } from './data';
import PostItem from '../components/PostItem';

function CategoryPosts() {
  const [posts, setPosts] = useState(Dumy_Posts);

  return (
    <section className="author__posts">
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
export default CategoryPosts