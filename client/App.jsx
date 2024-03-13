import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx"
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Home from "./pages/Home.jsx";
import { createRoot } from "react-dom/client";

import { AuthProvider } from './authContext.jsx';

import ProtectedRoute from './protectedRoute.jsx';

const App = () => {

    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="settings" element={<ProtectedRoute>
      <Settings />
    </ProtectedRoute>} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<ProtectedRoute>
      < Dashboard />,
    </ProtectedRoute>} />
          <Route path="onboard" element={<ProtectedRoute>
      < Onboarding />,
    </ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute>
      <Profile />
    </ProtectedRoute>} />
        </Routes>
    </BrowserRouter>
    )
}


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AuthProvider><App /></AuthProvider>);
