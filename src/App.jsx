import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Categories from "./Pages/Categories";
import Dashboard from "./Pages/Dashboard";
import { AuthUserProvider } from "./Contexts/AutUserProvider";
import Appearance from "./Pages/Appearance";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";
import { AppearanceProvider } from "./Contexts/AppearanceContext";
import RenderProfile from "./Pages/RenderProfile";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <AuthUserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category" element={<Categories />} />
          <Route
            path="/dashboard"
            element={
              <AppearanceProvider>
                <Dashboard />
              </AppearanceProvider>
            }
          >
            <Route path="appearance" element={<Appearance />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/:username" element={<RenderProfile />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
    </AuthUserProvider>
  );
};

export default App;
