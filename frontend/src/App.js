import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import MapDetail from "./pages/MapDetail";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMapForm from "./pages/AdminMapForm";
import AdminMapEdit from "./pages/AdminMapEdit";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <AdminProvider>
          <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/map/:slug" element={<MapDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/maps/new" element={<AdminMapForm />} />
            <Route path="/admin/maps/edit/:id" element={<AdminMapEdit />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AdminProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
