import React, { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import html2canvas from "html2canvas";
import { FiImage, FiSun, FiMoon, FiCopy } from "react-icons/fi";
import "../postPage.css";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [ogImage, setOgImage] = useState(null);
  const [ogImageBlobUrl, setOgImageBlobUrl] = useState(null); 
  const [theme, setTheme] = useState("light");
  const urlInputRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const generateOgImage = () => {
    const previewElement = document.createElement("div");
    previewElement.style.position = "absolute";
    previewElement.style.left = "-9999px";
    previewElement.innerHTML = `
      <div id="post-preview" class="og-image-preview">
        ${
          image
            ? `<div class="image-container"><img src="${image}" alt="Post" class="generated-image"/></div>`
            : ""
        }
        <div class="post-content">
          <h1 class="og-title">${title}</h1>
          <p class="og-description">${content}</p>
        </div>
      </div>
    `;
    document.body.appendChild(previewElement);

    html2canvas(previewElement.querySelector("#post-preview"), {
      useCORS: true,
      scale: 2,
    })
      .then((canvas) => {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setOgImage(url);
          setOgImageBlobUrl(url); 
          document.body.removeChild(previewElement);
        }, "image/png");
      })
      .catch((error) => {
        console.error("Error generating OG image:", error);
        document.body.removeChild(previewElement);
      });
  };

  const copyImageUrl = () => {
    if (ogImageBlobUrl && urlInputRef.current) {
      urlInputRef.current.select();
      document.execCommand("copy");
      alert("Image URL copied to clipboard!");
    }
  };

  return (
    <HelmetProvider>
      <div className="post-form">
        <Helmet>
          {ogImage && <meta property="og:image" content={ogImage} />}
        </Helmet>

        <div className="post-form-content">
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
              <FiImage size={24} />
            </label>
            <input
              type="file"
              id="image-upload"
              onChange={handleImageUpload}
              className="post-form-file-input"
            />
            <button onClick={generateOgImage} className="post-form-button">
              Generate OG Image
            </button>
          </div>
        </div>
        {ogImage && (
          <div className="generated-og-image">
            <h2>Generated OG Image</h2>
            <img src={ogImage} alt="OG Preview" />
            <div className="url-container">
              <input
                type="text"
                value={ogImageBlobUrl || ""}
                readOnly
                ref={urlInputRef}
                className="url-input"
              />
              <button onClick={copyImageUrl} className="copy-button">
                <FiCopy />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="theme-toggle-button"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </HelmetProvider>
  );
};

export default PostPage;
