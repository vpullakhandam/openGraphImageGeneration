import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import html2canvas from "html2canvas";
import "./postPage.css";
import { FiImage } from "react-icons/fi";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [ogImage, setOgImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const generateOgImage = () => {
    if (ogImage) return;

    const previewElement = document.createElement("div");
    previewElement.style.position = "absolute";
    previewElement.style.left = "-9999px";
    previewElement.style.top = "-9999px";
    previewElement.innerHTML = `
      <div id="post-preview" style="width: 1200px; height: 630px; background-color: white; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 1px solid #e1e8ed; border-radius: 8px;">
        <h1 style="font-size: 36px; color: #14171a;">${title}</h1>
        <p style="font-size: 18px; color: #657786;">${content}</p>
        ${
          image
            ? `<img src="${image}" alt="Post" style="max-width: 100%; max-height: 400px; margin-top: 10px;" />`
            : ""
        }
      </div>
    `;
    document.body.appendChild(previewElement);

    const imageElement = previewElement.querySelector("img");
    if (imageElement) {
      imageElement.onload = () => captureCanvas(previewElement);
      imageElement.onerror = () => captureCanvas(previewElement);
    } else {
      captureCanvas(previewElement);
    }
  };

  const captureCanvas = (previewElement) => {
    html2canvas(previewElement, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        setOgImage(imgData);
        document.body.removeChild(previewElement); // Clean up
      })
      .catch((error) => {
        console.error("Error generating OG image:", error);
        document.body.removeChild(previewElement); // Clean up
      });
  };

  return (
    <HelmetProvider>
      <div className="post-form">
        <Helmet>
          {ogImage && <meta property="og:image" content={ogImage} />}
        </Helmet>
        <div className="post-form-content">
          <textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="post-form-textarea"
          />
          <div className="post-form-footer">
            <label htmlFor="image-upload" className="image-upload-label">
              <FiImage size={24} color="#1DA1F2" />
            </label>
            <input
              type="file"
              id="image-upload"
              onChange={handleImageUpload}
              className="post-form-file-input"
            />
            <button onClick={generateOgImage} className="post-form-button">
              Post
            </button>
          </div>
        </div>
        {ogImage && (
          <div className="generated-og-image">
            <h2>Generated OG Image</h2>
            <img src={ogImage} alt="OG Preview" />
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default PostPage;
