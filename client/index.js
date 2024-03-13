import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx"
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Home from "./pages/Home.jsx";

import { AuthProvider } from './authContext.jsx';

import ProtectedRoute from './protectedRoute.jsx';  // adjust the path accordingly


const router = createBrowserRouter([{
  path: "/",
  element: <Home />
}, {
  path: "login",
  element: <Login />
},
{
  path: "signup",
  element: <Signup />
},
{
  path: "dashboard",
  element: (
    <ProtectedRoute>
      < Dashboard />,
    </ProtectedRoute>
  )
},
{
  path: "onboard",
  element: (
    <ProtectedRoute>
      < Onboarding />,
    </ProtectedRoute>
  )
},
{
  path: "profile",
  element: (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  )
},
{
  path: "settings",
  element: (
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  )
},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
