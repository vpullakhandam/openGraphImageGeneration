import React from 'react';
import { Link } from 'react-router-dom';
import './post.css';

function Post({ post, onGenerateOGImage }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <button onClick={() => onGenerateOGImage(post)}>Generate OG Image</button>
      <Link to={`/post/${post.id}`}>
        <img src={post.ogImageUrl} alt="OG Image" />
      </Link>
    </div>
  );
}

export default Post;
