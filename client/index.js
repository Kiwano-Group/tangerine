// import React from "react";
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx'
// import './style.css';


// const root = createRoot(document.getElementById('root'));
// root.render(
//     <App />
// )


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

const router = createBrowserRouter([{
  path: "/",
  element: <Home />
}, {
  path: "login",
  element: <Login />
},
{
  path: "dashboard",
  element: <Dashboard />,
},
{
  path: "onboard",
  element: <Onboarding />,
},
{
  path: "signup",
  element: <Signup />
},
{
  path: "profile",
  element: <Profile />
},
{
  path: "settings",
  element: <Settings />
},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);