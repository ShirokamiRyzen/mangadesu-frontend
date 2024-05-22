import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/Beranda";
import Detail from "./pages/Detail";
import Chapter from "./pages/Chapter";
import History from "./pages/History";
import BottomNavbar from "./components/BottomNavbar";
import Navbar from "./components/Navbar";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  useEffect(() => {
    localStorage.setItem("mode", mode);
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <BrowserRouter>
      <Navbar mode={mode} setMode={setMode} />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/history" element={<History />} />
        <Route path="/manga/:slug" element={<Detail />} />
        <Route path="/manga/:slug/:chapter" element={<Chapter />} />
        <Route path="*" element={<Beranda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
