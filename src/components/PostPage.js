import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import html2canvas from "html2canvas";
import "./PostPage.css";
import { FiImage } from "react-icons/fi";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [ogImage, setOgImage] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [theme, setTheme] = useState("Light");

  useEffect(() => {
    if (theme === "Dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

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
      <div id="post-preview" class="og-image-preview" style="width: 1200px; height: 630px; padding: 20px; box-sizing: border-box; display: flex; align-items: center; border-radius: 10px;">
        ${
          image
            ? `<div class="image-container" style="margin-right: 6px;"><img src="${image}" alt="Post" class="generated-image" style="width: 50%;"/></div>`
            : ""
        }
        <div class="post-content" style="color: ${
          theme === "Light" ? "#000000" : "#ffffff"
        }; width: 50%;">
          <h1 class="og-title">${title}</h1>
          <p class="og-description">${content}</p>
        </div>
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
        setOgImageUrl(imgData); // Set the URL for easy copying
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
          <button
            onClick={() => setTheme(theme === "Light" ? "Dark" : "Light")}
            className="theme-toggle-button"
          >
            {theme === "Light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </button>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="post-form-input"
          />
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
            <p>Image URL:</p>
            <textarea
              readOnly
              value={ogImageUrl}
              style={{
                width: "40%",
                padding: "20px",
                marginTop: "10px",
              }}
            />
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default PostPage;
