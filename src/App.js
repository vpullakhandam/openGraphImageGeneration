import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostPage from "./components/PostPage";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
