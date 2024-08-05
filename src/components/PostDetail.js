import React from "react";
import { useParams } from "react-router-dom";
import "./postDetail.css";

function PostDetail() {
  const { id } = useParams();
  // Fetch the post by ID or get it from state
  const post = {
    id: id,
    title: "Sample Post Title",
    content: "This is the detailed content of the post.",
    image: "https://via.placeholder.com/150",
  };

  return (
    <div className="postDetail">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
    </div>
  );
}

export default PostDetail;
