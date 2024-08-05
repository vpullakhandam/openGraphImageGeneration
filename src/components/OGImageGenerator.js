import React from "react";

function OGImageGenerator({ post }) {
  // Placeholder for OG image generation
  return (
    <div>
      <h2>OG Image for {post.title}</h2>
      <img
        src={`https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`}
        alt="OG Image"
      />
    </div>
  );
}

export default OGImageGenerator;
