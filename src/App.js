import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostPage from "./components/PostPage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
