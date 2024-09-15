import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./hooks/Toast";
import { UserContextProvider } from "./context/userContext";
import ProtectedRoute from "./context/protectRoute";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import Course from "./pages/course";
import Courseid from "./pages/courseid";

const App = () => {
  return (
    <UserContextProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/courses/:name" element={<Courseid />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </UserContextProvider>
  );
};

export default App;
