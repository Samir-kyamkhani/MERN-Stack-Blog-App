import React, { useState } from "react";
import PostItem from "./PostItem.jsx";

import thumbnail1 from "../images/blog1.jpg";
import thumbnail2 from "../images/blog2.jpg";
import thumbnail3 from "../images/blog3.jpg";
import thumbnail4 from "../images/blog4.jpg";

const Dumy_Posts = [
  {
    id: 1,
    thumbnail: thumbnail1,
    title: "Post dsjkn sdkmvklslkvsmn kl;sdmclksmdlk",
    category: "science",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi sit vitae eligendi eveniet voluptates atque, minima quos iure exercitationem esse veniam magni voluptatum, praesentium ad ab nisi, repudiandae voluptatem pariatur",
    authorId: 1,
  },
  {
    id: 2,
    thumbnail: thumbnail2,
    title: "Post 2",
    category: "education",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi sit vitae eligendi eveniet voluptates atque, minima quos iure exercitationem esse veniam magni voluptatum, praesentium ad ab nisi, repudiandae voluptatem pariatur",
    authorId: 2,
  },
  {
    id: 3,
    thumbnail: thumbnail3,
    title: "Post 3",
    category: "art",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi sit vitae eligendi eveniet voluptates atque, minima quos iure exercitationem esse veniam magni voluptatum, praesentium ad ab nisi, repudiandae voluptatem pariatur",
    authorId: 3,
  },
  {
    id: 4,
    thumbnail: thumbnail4,
    title: "Post 4",
    category: "business",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi sit vitae eligendi eveniet voluptates atque, minima quos iure exercitationem esse veniam magni voluptatum, praesentium ad ab nisi, repudiandae voluptatem pariatur",
    authorId: 4,
  },
];

function Posts() {
  const [posts, setPosts] = useState(Dumy_Posts);
  return (
    <section className="posts">
      <div className="cpontaine posts__container">
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
      </div>
    </section>
  );
}

export default Posts;
