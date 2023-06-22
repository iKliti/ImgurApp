import React from 'react'
import "./assets/scss/main.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Gallery from "./components/GalleryList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/imgurapp" element={<Gallery />} />
        <Route path="*" element={<Navigate to="/imgurapp" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
{
  /* <MainStructure>
        <Gallery />
      </MainStructure> */
}
