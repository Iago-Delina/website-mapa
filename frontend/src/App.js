import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import MapDetail from "./pages/MapDetail";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="App">
      <AdminProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/map/:slug" element={<MapDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AdminProvider>
    </div>
  );
}

export default App;
